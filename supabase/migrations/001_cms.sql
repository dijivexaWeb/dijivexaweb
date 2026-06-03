-- ============================================================
-- 001_cms.sql — Dijivexa CMS Tabloları
-- ============================================================

-- Site genel ayarları
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Aktif diller
CREATE TABLE site_languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE, -- tr, en, ka, ru
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
);

INSERT INTO site_languages (code, name, is_active, is_default, sort_order) VALUES
  ('tr', 'Türkçe', true, true, 1),
  ('en', 'English', true, false, 2),
  ('ka', 'ქართული', true, false, 3),
  ('ru', 'Русский', true, false, 4);

-- Menü tanımları
CREATE TABLE site_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE, -- header, footer, mobile
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO site_menus (slug, name) VALUES
  ('header', 'Header Menü'),
  ('footer', 'Footer Menü'),
  ('mobile', 'Mobil Menü');

-- Menü öğeleri (nested, dil bazlı)
CREATE TABLE site_menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id UUID NOT NULL REFERENCES site_menus(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES site_menu_items(id) ON DELETE CASCADE,
  locale TEXT NOT NULL DEFAULT 'tr',
  label TEXT NOT NULL,
  href TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  opens_new_tab BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sayfalar
CREATE TABLE site_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'tr',
  title TEXT NOT NULL,
  template_type TEXT DEFAULT 'default', -- default, landing, blog, product
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_indexable BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug, locale)
);

-- Sayfa section'ları
CREATE TABLE site_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES site_pages(id) ON DELETE CASCADE,
  locale TEXT NOT NULL DEFAULT 'tr',
  section_type TEXT NOT NULL, -- hero, problem, features, cta, faq, ...
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Section içi bloklar
CREATE TABLE site_section_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES site_sections(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL, -- heading, text, button, image, card, ...
  sort_order INT DEFAULT 0,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Genel çeviri stringleri (UI mesajları)
CREATE TABLE site_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  namespace TEXT DEFAULT 'common',
  UNIQUE(locale, key, namespace)
);

-- Medya kütüphanesi
CREATE TABLE site_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT, -- image, video, pdf, 3d, lottie
  mime_type TEXT,
  file_size INT,
  alt_text TEXT,
  locale TEXT,
  category TEXT,
  width INT,
  height INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dijivexa Clinic modülleri
CREATE TABLE site_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'tr',
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  icon TEXT,
  image_url TEXT,
  feature_list JSONB DEFAULT '[]',
  cta_text TEXT,
  cta_href TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug, locale)
);

-- Alt hizmetler (Clinic, Growth, Web, Mobile, Studio, AI)
CREATE TABLE site_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'tr',
  name TEXT NOT NULL,
  tagline TEXT,
  short_description TEXT,
  long_description TEXT,
  target_audience TEXT,
  feature_list JSONB DEFAULT '[]',
  icon TEXT,
  image_url TEXT,
  show_price BOOLEAN DEFAULT false,
  has_quote_form BOOLEAN DEFAULT true,
  cta_text TEXT,
  cta_href TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug, locale)
);

-- SSS
CREATE TABLE site_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL DEFAULT 'tr',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general', -- general, demo, software, whatsapp, ai, security, pricing
  page_slug TEXT, -- hangi sayfada gösterileceği
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog kategorileri
CREATE TABLE site_blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'tr',
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  UNIQUE(slug, locale)
);

-- Blog yazıları
CREATE TABLE site_blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'tr',
  category_id UUID REFERENCES site_blog_categories(id),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT, -- markdown veya HTML
  cover_image TEXT,
  author TEXT DEFAULT 'Dijivexa',
  tags JSONB DEFAULT '[]',
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug, locale)
);

-- Referanslar / Testimonials
CREATE TABLE site_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL DEFAULT 'tr',
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Fiyatlandırma blokları
CREATE TABLE site_pricing_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL DEFAULT 'tr',
  name TEXT NOT NULL,
  tagline TEXT,
  price_label TEXT, -- "Teklif Al" veya fiyat
  features JSONB DEFAULT '[]',
  cta_text TEXT,
  cta_href TEXT,
  is_featured BOOLEAN DEFAULT false,
  show_price BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sayfa bazlı SEO meta
CREATE TABLE site_seo_meta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'tr',
  meta_title TEXT,
  meta_description TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  schema_type TEXT, -- Organization, SoftwareApplication, Article, FAQ
  schema_json JSONB,
  robots TEXT DEFAULT 'index,follow',
  sitemap_priority DECIMAL(2,1) DEFAULT 0.8,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(page_slug, locale)
);

-- 301/302 yönlendirmeler
CREATE TABLE site_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  status_code INT DEFAULT 301,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- RLS: CMS Tabloları
-- ============================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_section_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_pricing_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_seo_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_redirects ENABLE ROW LEVEL SECURITY;

-- Public okuma: yayındaki içerikler herkese açık
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read site_languages" ON site_languages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_menus" ON site_menus FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_menu_items" ON site_menu_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_pages" ON site_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_sections" ON site_sections FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_section_blocks" ON site_section_blocks FOR SELECT USING (true);
CREATE POLICY "Public read site_translations" ON site_translations FOR SELECT USING (true);
CREATE POLICY "Public read site_media" ON site_media FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_modules" ON site_modules FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_services" ON site_services FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_faqs" ON site_faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_blog_categories" ON site_blog_categories FOR SELECT USING (true);
CREATE POLICY "Public read site_blog_posts" ON site_blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_testimonials" ON site_testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_pricing_blocks" ON site_pricing_blocks FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_seo_meta" ON site_seo_meta FOR SELECT USING (true);
CREATE POLICY "Public read site_redirects" ON site_redirects FOR SELECT USING (is_active = true);
