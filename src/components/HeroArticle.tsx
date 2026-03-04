import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

export default function HeroArticle({ article }: { article: Article }) {
  return (
    <article className="relative rounded-xl overflow-hidden bg-gray-900 mb-10">
      <div className="relative aspect-[21/9] md:aspect-[3/1]">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.image_alt || article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        {article.category_name && (
          <Link
            href={`/category/${article.category_slug}`}
            className="inline-block bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-3 hover:bg-accent-dark transition-colors"
          >
            {article.category_name}
          </Link>
        )}

        <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-3 max-w-3xl">
          <Link href={`/news/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h2>

        <p className="text-gray-200 text-sm md:text-base max-w-2xl mb-3 line-clamp-2">
          {article.summary}
        </p>

        <time className="text-xs text-gray-400" dateTime={article.published_at}>
          {timeAgo(article.published_at)}
        </time>
      </div>
    </article>
  );
}
