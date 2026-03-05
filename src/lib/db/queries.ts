import { neon } from "@neondatabase/serverless";
import { Article, Category } from "@/lib/types";

const sql = neon(process.env.POSTGRES_URL!);

export async function getLatestArticles(limit: number = 12): Promise<Article[]> {
  const rows = await sql`
    SELECT a.*, c.name as category_name, c.slug as category_slug
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    ORDER BY a.published_at DESC
    LIMIT ${limit}
  `;
  return rows as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await sql`
    SELECT a.*, c.name as category_name, c.slug as category_slug
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.slug = ${slug}
    LIMIT 1
  `;
  return (rows[0] as Article) || null;
}

export async function getArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 12
): Promise<Article[]> {
  const offset = (page - 1) * limit;
  const rows = await sql`
    SELECT a.*, c.name as category_name, c.slug as category_slug
    FROM articles a
    JOIN categories c ON a.category_id = c.id
    WHERE c.slug = ${categorySlug}
    ORDER BY a.published_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  return rows as Article[];
}

export async function getArticleCount(categorySlug?: string): Promise<number> {
  if (categorySlug) {
    const rows = await sql`
      SELECT COUNT(*)::int as count
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      WHERE c.slug = ${categorySlug}
    `;
    return rows[0].count;
  }
  const rows = await sql`SELECT COUNT(*)::int as count FROM articles`;
  return rows[0].count;
}

export async function getCategories(): Promise<Category[]> {
  const rows = await sql`
    SELECT * FROM categories ORDER BY name
  `;
  return rows as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const rows = await sql`
    SELECT * FROM categories WHERE slug = ${slug} LIMIT 1
  `;
  return (rows[0] as Category) || null;
}

export async function getRelatedArticles(
  categoryId: number,
  excludeId: number,
  limit: number = 4
): Promise<Article[]> {
  const rows = await sql`
    SELECT a.*, c.name as category_name, c.slug as category_slug
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.category_id = ${categoryId} AND a.id != ${excludeId}
    ORDER BY a.published_at DESC
    LIMIT ${limit}
  `;
  return rows as Article[];
}

export async function getTopStoriesByCategory(): Promise<Article[]> {
  const rows = await sql`
    SELECT DISTINCT ON (a.category_id)
      a.*, c.name as category_name, c.slug as category_slug
    FROM articles a
    JOIN categories c ON a.category_id = c.id
    ORDER BY a.category_id, a.published_at DESC
  `;
  return rows as Article[];
}

export async function createArticle(data: {
  title: string;
  slug: string;
  summary: string;
  content: string;
  source_name: string;
  source_url: string;
  image_url?: string;
  image_alt?: string;
  category_id: number;
  tags?: string[];
  published_at: string;
  title_hash: string;
}): Promise<Article> {
  const tagsLiteral = data.tags
    ? `{${data.tags.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(",")}}`
    : null;
  const rows = await sql`
    INSERT INTO articles (
      title, slug, summary, content, source_name, source_url,
      image_url, image_alt, category_id, tags, published_at, title_hash
    ) VALUES (
      ${data.title}, ${data.slug}, ${data.summary}, ${data.content},
      ${data.source_name}, ${data.source_url},
      ${data.image_url || null}, ${data.image_alt || null},
      ${data.category_id}, ${tagsLiteral},
      ${data.published_at}, ${data.title_hash}
    )
    RETURNING *
  `;
  return rows[0] as Article;
}

export async function checkDuplicate(
  titleHash: string
): Promise<{ isDuplicate: boolean; existingSlug?: string }> {
  const rows = await sql`
    SELECT slug FROM articles WHERE title_hash = ${titleHash} LIMIT 1
  `;
  if (rows.length > 0) {
    return { isDuplicate: true, existingSlug: rows[0].slug as string };
  }
  return { isDuplicate: false };
}

export async function getAllArticleSlugs(): Promise<{ slug: string; published_at: string }[]> {
  const rows = await sql`
    SELECT slug, published_at FROM articles ORDER BY published_at DESC
  `;
  return rows as { slug: string; published_at: string }[];
}

export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  const rows = await sql`SELECT slug FROM categories ORDER BY name`;
  return rows as { slug: string }[];
}
