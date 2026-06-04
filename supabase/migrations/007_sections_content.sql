-- ============================================================
-- 007_sections_content.sql — Section içerikleri + Menü seed
-- ============================================================

-- Hero section
INSERT INTO site_settings (key, value)
SELECT 'section_hero', $json${
  "badge": "Klinik & Güzellik Merkezleri İçin SaaS Yazılım",
  "heading_line1": "Kliniğinizin Yönetimini",
  "heading_highlight": "Bir Üst Seviyeye",
  "heading_line2": "Taşıyın.",
  "subheading": "Dijivexa; randevu, hasta takibi, kasa, stok, operasyon ve WhatsApp iletişimini tek platformda birleştirir. AI destekli, çok dilli, çok şubeli.",
  "cta_primary": "Ücretsiz Deneyin",
  "cta_primary_href": "/demo",
  "cta_secondary": "Canlı Demo Talep Et",
  "cta_secondary_href": "/iletisim",
  "trust_items": ["Kredi kartı gerekmez", "15 gün ücretsiz", "Kurulum desteği dahil", "Çok dilli"]
}$json$::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'section_hero');

-- AI section
INSERT INTO site_settings (key, value)
SELECT 'section_ai', $json${
  "badge": "AI Asistanımız Her Zaman Yanınızda",
  "heading": "AI destekli klinik değerlendirme.",
  "subheading": "Muayene formundaki bilgileri analiz ederek klinik özet, takip notu ve tedavi önerisi taslağı oluşturur. Ekibiniz daha düzenli çalışır.",
  "features": [
    "Muayene özetini otomatik oluşturur",
    "Risk bilgilerini görünür kılar",
    "Tedavi önerisi taslağı hazırlar",
    "Doktor notlarını düzenler",
    "Kliniğe özel API key desteği"
  ],
  "disclaimer": "Nihai karar klinik ekibine aittir. AI asistan yardımcı olur, karar vermez.",
  "cta_text": "AI Klinik Asistanı İncele →",
  "cta_href": "/ai-klinik-asistani"
}$json$::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'section_ai');

-- WhatsApp section
INSERT INTO site_settings (key, value)
SELECT 'section_whatsapp', $json${
  "badge": "💬 WhatsApp Entegrasyonu",
  "heading": "Hastalarınızla iletişimi otomatikleştirin.",
  "subheading": "Randevu hatırlatma, kontrol mesajları, kampanya bildirimi ve yorum daveti — hepsi WhatsApp üzerinden otomatik.",
  "features": [
    "Otomatik randevu hatırlatması (24 saat önce)",
    "10. gün ve 1. ay kontrol mesajları",
    "Kampanya & yeni hizmet bildirimleri",
    "Google yorum daveti otomasyonu",
    "Toplu mesaj gönderimi"
  ],
  "cta_text": "WhatsApp Takip Sistemini İncele →",
  "cta_href": "/whatsapp-takip"
}$json$::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'section_whatsapp');

-- Security section
INSERT INTO site_settings (key, value)
SELECT 'section_security', $json${
  "badge": "Güvenlik",
  "heading": "Veriniz güvenli, erişiminiz kontrollü.",
  "subheading": "Bulut tabanlı mimari, yetki kontrolü, veri izolasyonu ve günlük yedekleme.",
  "items": [
    {"icon": "Shield", "label": "Yetki Yönetimi", "desc": "Rol bazlı erişim kontrolü. Her kullanıcı sadece yetkili alana girer.", "color": "#3B82F6"},
    {"icon": "Lock", "label": "Veri İzolasyonu", "desc": "Her klinik kendi güvenli alanında. Veriler karışmaz.", "color": "#0D9488"},
    {"icon": "Eye", "label": "Güvenli Oturum", "desc": "JWT token doğrulama, oturum yönetimi.", "color": "#8B5CF6"},
    {"icon": "FileCheck", "label": "Audit Log", "desc": "Tüm işlemler kayıt altında. Kimin ne yaptığı izlenir.", "color": "#F59E0B"},
    {"icon": "RotateCcw", "label": "Günlük Yedekleme", "desc": "Otomatik günlük yedekleme, veri kaybı yok.", "color": "#10B981"},
    {"icon": "Database", "label": "Soft Delete", "desc": "Veriler fiziksel silinmez. İstediğinizde geri alınabilir.", "color": "#6366F1"}
  ]
}$json$::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'section_security');

-- Demo Process section
INSERT INTO site_settings (key, value)
SELECT 'section_demo', $json${
  "heading": "Dijivexa'yı 15 Gün Ücretsiz Deneyin",
  "subheading": "Demo hesabınızı oluşturun. Kredi kartı gerekmez, anında erişim sağlayın.",
  "steps": [
    {"num": "01", "text": "Formu doldurun — 2 dakika sürer"},
    {"num": "02", "text": "Demo hesabınız otomatik açılır"},
    {"num": "03", "text": "15 gün tüm modülleri test edin"}
  ],
  "badges": ["500+ aktif klinik", "Kurulum desteği", "Türkçe arayüz"]
}$json$::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'section_demo');

-- Final CTA section
INSERT INTO site_settings (key, value)
SELECT 'section_finalcta', $json${
  "heading": "Dijital sisteminizi bugün kurmaya başlayın.",
  "subheading": "15 gün ücretsiz deneyin veya ekibimizden canlı demo talep edin.",
  "cta_primary": "15 Gün Ücretsiz Dene",
  "cta_primary_href": "/demo",
  "cta_secondary": "Demo Talep Et",
  "cta_secondary_href": "/iletisim",
  "footnote": "Kredi kartı gerekmez · Kurulum desteği dahil · 15 gün ücretsiz"
}$json$::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key = 'section_finalcta');

-- Header menü öğeleri (Türkçe)
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Dijivexa Clinic', '/tr/dijivexa-clinic', 1, true FROM site_menus m WHERE m.slug = 'header'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Özellikler', '/tr/ozellikler', 2, true FROM site_menus m WHERE m.slug = 'header'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Fiyatlandırma', '/tr/fiyatlandirma', 3, true FROM site_menus m WHERE m.slug = 'header'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Blog', '/tr/blog', 4, true FROM site_menus m WHERE m.slug = 'header'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'İletişim', '/tr/iletisim', 5, true FROM site_menus m WHERE m.slug = 'header'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Demo Al', '/tr/demo', 6, true FROM site_menus m WHERE m.slug = 'header'
ON CONFLICT DO NOTHING;

-- Footer menü öğeleri
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Dijivexa Clinic', '/tr/dijivexa-clinic', 1, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Dijivexa Growth', '/tr/dijivexa-growth', 2, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Dijivexa Web', '/tr/dijivexa-web', 3, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Hakkımızda', '/tr/hakkimizda', 4, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Blog', '/tr/blog', 5, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'İletişim', '/tr/iletisim', 6, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'KVKK', '/tr/kvkk', 7, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;
INSERT INTO site_menu_items (menu_id, locale, label, href, sort_order, is_active)
SELECT m.id, 'tr', 'Gizlilik Politikası', '/tr/gizlilik-politikasi', 8, true FROM site_menus m WHERE m.slug = 'footer'
ON CONFLICT DO NOTHING;

-- Sayfa kayıtları
INSERT INTO site_pages (slug, locale, title, is_published, is_indexable) VALUES
('/', 'tr', 'Anasayfa', true, true),
('dijivexa-clinic', 'tr', 'Dijivexa Clinic — Klinik Yönetim Yazılımı', true, true),
('dijivexa-growth', 'tr', 'Dijivexa Growth — Dijital Büyüme', true, true),
('dijivexa-web', 'tr', 'Dijivexa Web — Web Sitesi Geliştirme', true, true),
('ozellikler', 'tr', 'Tüm Özellikler', true, true),
('fiyatlandirma', 'tr', 'Fiyatlandırma', true, true),
('demo', 'tr', '15 Gün Ücretsiz Demo', true, true),
('iletisim', 'tr', 'İletişim', true, true),
('hakkimizda', 'tr', 'Hakkımızda', true, true),
('blog', 'tr', 'Blog', true, true),
('kvkk', 'tr', 'KVKK Aydınlatma Metni', true, true),
('gizlilik-politikasi', 'tr', 'Gizlilik Politikası', true, true),
('whatsapp-takip', 'tr', 'WhatsApp Takip Sistemi', true, true),
('ai-klinik-asistani', 'tr', 'AI Klinik Asistanı', true, true),
('sac-ekimi-merkezleri', 'tr', 'Saç Ekimi Merkezleri', true, true)
ON CONFLICT (slug, locale) DO NOTHING;

-- Blog kategorileri
INSERT INTO site_blog_categories (slug, locale, name, sort_order) VALUES
('klinik-yonetimi', 'tr', 'Klinik Yönetimi', 1),
('dijital-donusum', 'tr', 'Dijital Dönüşüm', 2),
('whatsapp-pazarlama', 'tr', 'WhatsApp & Pazarlama', 3),
('ai-saglik', 'tr', 'AI & Sağlık Teknolojisi', 4),
('sac-ekimi', 'tr', 'Saç Ekimi', 5)
ON CONFLICT (slug, locale) DO NOTHING;
