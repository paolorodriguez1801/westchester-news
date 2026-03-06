import { NextRequest, NextResponse } from "next/server";
import { createArticle, getCategoryBySlug } from "@/lib/db/queries";
import { slugify, generateSourceHash } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = [
    "title",
    "content",
    "summary",
    "category_slug",
    "source_name",
    "source_url",
  ] as const;

  const missing = required.filter((field) => !body[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const title = body.title as string;
  const content = body.content as string;
  const summary = body.summary as string;
  const categorySlug = body.category_slug as string;
  const sourceName = body.source_name as string;
  const sourceUrl = body.source_url as string;
  const imageUrl = (body.image_url as string) || undefined;
  const imageAlt = (body.image_alt as string) || undefined;
  const tags = (body.tags as string[]) || undefined;
  const publishedAt =
    (body.published_at as string) || new Date().toISOString();

  const category = await getCategoryBySlug(categorySlug);
  if (!category) {
    return NextResponse.json(
      { error: `Category not found: ${categorySlug}` },
      { status: 400 }
    );
  }

  const slug = slugify(title) + "-" + Date.now().toString(36);
  const titleHash = generateSourceHash(sourceUrl);

  try {
    const article = await createArticle({
      title,
      slug,
      summary,
      content,
      source_name: sourceName,
      source_url: sourceUrl,
      image_url: imageUrl,
      image_alt: imageAlt,
      category_id: category.id,
      tags,
      published_at: publishedAt,
      title_hash: titleHash,
    });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://westchesternewstoday.com";

    return NextResponse.json(
      {
        success: true,
        article: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          url: `${siteUrl}/news/${article.slug}`,
          published_at: article.published_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    if (message.includes("title_hash")) {
      return NextResponse.json(
        { error: "Duplicate article: a story from this source URL already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create article", details: message },
      { status: 500 }
    );
  }
}
