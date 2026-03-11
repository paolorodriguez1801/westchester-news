import { neon } from '@neondatabase/serverless';

export const revalidate = 3600;

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);

  let articles: { slug: string; title: string; published_at: string }[] = [];

  try {
    articles = await sql`
      SELECT slug, title, published_at
      FROM articles
      WHERE published_at >= NOW() - INTERVAL '2 days'
      ORDER BY published_at DESC
      LIMIT 1000
    `;
  } catch (error) {
    console.error('Error fetching articles for news sitemap:', error);
  }

  const xmlParts: string[] = articles.map((article) => {
    const loc = `https://westchesternewstoday.com/news/${article.slug}`;
    const date = new Date(article.published_at).toISOString();
    const title = article.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>Westchester News Today</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${date}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlParts.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}