export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  source_name: string | null;
  source_url: string | null;
  image_url: string | null;
  image_alt: string | null;
  category_id: number;
  tags: string[] | null;
  published_at: string;
  created_at: string;
  title_hash: string | null;
  category_name?: string;
  category_slug?: string;
}
