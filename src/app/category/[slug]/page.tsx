import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getArticlesByCategory,
  getArticleCount,
} from "@/lib/db/queries";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";

const ARTICLES_PER_PAGE = 12;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://westchesternewstoday.com";

  return {
    title: `${category.name} News`,
    description:
      category.description ||
      `Latest ${category.name} news from Westchester County, NY.`,
    alternates: {
      canonical: `${siteUrl}/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} News - Westchester News Today`,
      description:
        category.description ||
        `Latest ${category.name} news from Westchester County, NY.`,
      type: "website",
      url: `${siteUrl}/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const [articles, totalCount] = await Promise.all([
    getArticlesByCategory(slug, currentPage, ARTICLES_PER_PAGE),
    getArticleCount(slug),
  ]);
  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://westchesternewstoday.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} News`,
    description:
      category.description ||
      `Latest ${category.name} news from Westchester County, NY.`,
    url: `${siteUrl}/category/${category.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Westchester News Today",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-navy mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
          <div className="mt-4 h-1 w-20 bg-accent rounded-full" />
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">
            No articles in this category yet. Check back soon.
          </p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/category/${slug}`}
        />
      </div>
    </>
  );
}
