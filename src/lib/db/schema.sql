CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  source_name VARCHAR(200),
  source_url TEXT,
  image_url TEXT,
  image_alt VARCHAR(500),
  category_id INTEGER REFERENCES categories(id),
  tags TEXT[],
  published_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  title_hash VARCHAR(64) UNIQUE
);

CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_published ON articles(published_at DESC);
CREATE INDEX idx_articles_slug ON articles(slug);

INSERT INTO categories (name, slug, description) VALUES
  ('Public Safety', 'public-safety', 'Crime, police, fire department and emergency news in Westchester County'),
  ('Local Government', 'local-government', 'Government meetings, elections, policy and municipal news'),
  ('Education', 'education', 'Schools, universities, education policy and student news'),
  ('Business & Economy', 'business-economy', 'Local business news, economic development and job market updates'),
  ('Real Estate', 'real-estate', 'Housing market, property development and real estate news'),
  ('Health', 'health', 'Healthcare, hospitals, public health and wellness news'),
  ('Transportation', 'transportation', 'Roads, Metro-North, buses, traffic and infrastructure news'),
  ('Community', 'community', 'Community events, nonprofit organizations and neighborhood news'),
  ('Environment', 'environment', 'Environmental news, conservation and sustainability in Westchester'),
  ('Arts & Culture', 'arts-culture', 'Arts, entertainment, cultural events and lifestyle news'),
  ('Sports', 'sports', 'Local sports teams, high school athletics and recreational sports');
