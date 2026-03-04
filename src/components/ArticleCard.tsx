import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <Link href={`/news/${article.slug}`}>
        <div className="relative aspect-[16/10] bg-gray-100">
          {article.image_url ? (
            <Image
              src={article.image_url}
              alt={article.image_alt || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {article.category_name && (
          <Link
            href={`/category/${article.category_slug}`}
            className="inline-block text-xs font-semibold text-accent uppercase tracking-wider mb-2 hover:text-accent-dark"
          >
            {article.category_name}
          </Link>
        )}

        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
          <Link
            href={`/news/${article.slug}`}
            className="hover:text-accent transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {article.summary}
        </p>

        <time className="text-xs text-gray-400" dateTime={article.published_at}>
          {timeAgo(article.published_at)}
        </time>
      </div>
    </article>
  );
}
