import { getLatestArticles, getTopStoriesByCategory } from "@/lib/db/queries";
import HeroArticle from "@/components/HeroArticle";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";

export const revalidate = 300;

export default async function HomePage() {
  const [articles, topStories] = await Promise.all([
    getLatestArticles(13),
    getTopStoriesByCategory(),
  ]);

  const heroArticle = articles[0];
  const gridArticles = articles.slice(1, 13);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://westchesternewstoday.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Westchester News Today",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `https://www.google.com/search?q=site:${siteUrl}+{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {heroArticle && <HeroArticle article={heroArticle} />}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-navy mb-6 border-b-2 border-accent pb-2">
              Latest News
            </h2>
            {gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">
                No articles yet. Check back soon for the latest news from
                Westchester County.
              </p>
            )}
          </div>

          <div className="lg:col-span-1">
            <Sidebar stories={topStories} />
          </div>
        </div>
      </div>
    </>
  );
}
