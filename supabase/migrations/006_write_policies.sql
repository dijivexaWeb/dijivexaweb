-- ============================================================
-- 006_write_policies.sql — Admin Yazma Politikaları + İçerik Seed
-- ============================================================

-- testimonials tablosuna location kolonu ekle
ALTER TABLE site_testimonials ADD COLUMN IF NOT EXISTS location TEXT;

-- Authenticated kullanıcılar için yazma politikaları
CREATE POLICY "Auth write site_testimonials" ON site_testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_faqs" ON site_faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_modules" ON site_modules FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_services" ON site_services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_pages" ON site_pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_sections" ON site_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_section_blocks" ON site_section_blocks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_media" ON site_media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_blog_posts" ON site_blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_blog_categories" ON site_blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_seo_meta" ON site_seo_meta FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_menus" ON site_menus FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_menu_items" ON site_menu_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_pricing_blocks" ON site_pricing_blocks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_redirects" ON site_redirects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_languages" ON site_languages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_translations" ON site_translations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Homepage bölümleri için site_settings seed
INSERT INTO site_settings (key, value) VALUES
('homepage_stats', '[
  {"value": 500, "suffix": "+", "label": "Aktif Klinik", "icon": "🏥"},
  {"value": 25000, "suffix": "+", "label": "Hasta Kaydı", "icon": "👤"},
  {"value": 1000000, "suffix": "+", "label": "Randevu İşlendi", "icon": "📅"},
  {"value": 99.9, "suffix": "%", "label": "Sistem Uptime", "icon": "⚡"}
]'::jsonb)
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
('homepage_trustbar', '[
  {"icon": "💇", "label": "Saç Ekimi Merkezleri"},
  {"icon": "✨", "label": "Estetik Klinikleri"},
  {"icon": "💅", "label": "Güzellik Merkezleri"},
  {"icon": "⚡", "label": "Lazer Epilasyon"},
  {"icon": "🔬", "label": "Trikoloji Merkezleri"},
  {"icon": "🏢", "label": "Yerel İşletmeler"}
]'::jsonb)
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
('homepage_problems', '{
  "heading": "Hasta, randevu, kasa ve stok takibi dağınık mı?",
  "subheading": "Pek çok klinik bunları hâlâ çözemiyor. Dijivexa tüm bunları tek sistemde toplar.",
  "cta": "✓ Dijivexa Clinic tüm klinik sürecini dijital ortamda toplar.",
  "items": [
    "Hasta bilgileri WhatsApp'\''ta dağınık kalıyor.",
    "Randevular karışıyor, çift kayıt oluşuyor.",
    "Ödemeler Excel veya kağıtta takip ediliyor.",
    "Seanslar ve kontrol tarihleri unutuluyor.",
    "Stok tüketimi takip edilemiyor.",
    "Personel verimliliği ölçülemiyor.",
    "Reklamdan gelen leadler kaybolup gidiyor.",
    "Operasyon belgeleri kağıtta kalıyor."
  ]
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
