import Link from "next/link";
import { Article } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

export default function Sidebar({ stories }: { stories: Article[] }) {
  if (stories.length === 0) return null;

  return (
    <aside className="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 className="text-lg font-bold text-navy border-b-2 border-accent pb-2 mb-4">
        Top Stories
      </h2>

      <div className="space-y-4">
        {stories.map((article) => (
          <div
            key={article.id}
            className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
          >
            {article.category_name && (
              <Link
                href={`/category/${article.category_slug}`}
                className="text-xs font-semibold text-accent uppercase tracking-wider hover:text-accent-dark"
              >
                {article.category_name}
              </Link>
            )}
            <h3 className="text-sm font-bold text-gray-900 leading-snug mt-1">
              <Link
                href={`/news/${article.slug}`}
                className="hover:text-accent transition-colors"
              >
                {article.title}
              </Link>
            </h3>
            <time
              className="text-xs text-gray-400 mt-1 block"
              dateTime={article.published_at}
            >
              {timeAgo(article.published_at)}
            </time>
          </div>
        ))}
      </div>
    </aside>
  );
}
