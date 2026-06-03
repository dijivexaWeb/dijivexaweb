-- ============================================================
-- 003_forms.sql — Form / Lead Tabloları
-- ============================================================

-- Form tanımları
CREATE TABLE site_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE, -- demo, quote, contact, web-request, mobile-request, ad-request, custom-request, ai-request
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  notify_email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO site_forms (slug, name, notify_email) VALUES
  ('demo', '15 Gün Demo Başvurusu', 'info@dijivexa.com'),
  ('live-demo', 'Canlı Demo Talebi', 'info@dijivexa.com'),
  ('quote', 'Teklif Al', 'info@dijivexa.com'),
  ('contact', 'İletişim', 'info@dijivexa.com'),
  ('web-request', 'Web Sitesi Talebi', 'info@dijivexa.com'),
  ('mobile-request', 'Mobil Uygulama Talebi', 'info@dijivexa.com'),
  ('ad-request', 'Reklam Yönetimi Talebi', 'info@dijivexa.com'),
  ('custom-request', 'Özel Yazılım Talebi', 'info@dijivexa.com'),
  ('ai-request', 'AI Çözüm Talebi', 'info@dijivexa.com');

-- Form gönderileri (lead kayıtları)
CREATE TABLE site_form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_slug TEXT NOT NULL REFERENCES site_forms(slug),

  -- Kişisel bilgiler
  full_name TEXT NOT NULL,
  business_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  country TEXT DEFAULT 'TR',
  city TEXT,

  -- İşletme bilgileri
  business_type TEXT,
  branch_count INT,
  staff_count INT,
  monthly_appointments INT,
  modules_interested JSONB DEFAULT '[]',
  needs_social_media BOOLEAN DEFAULT false,
  needs_website BOOLEAN DEFAULT false,
  message TEXT,
  language_preference TEXT DEFAULT 'tr',

  -- Kaynak takibi
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,

  -- Lead yönetimi
  status TEXT DEFAULT 'new', -- new, called, unreachable, demo_opened, demo_active, meeting_planned, offer_sent, converted, not_suitable, follow_up
  assigned_to UUID, -- satış personeli user_id
  tenant_id UUID REFERENCES tenants(id),
  notes TEXT,

  -- Meta
  ip_address INET,
  user_agent TEXT,
  terms_accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- RLS: Form Tabloları
-- ============================================================

ALTER TABLE site_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_form_submissions ENABLE ROW LEVEL SECURITY;

-- Form tanımları herkese açık
CREATE POLICY "Public read site_forms" ON site_forms FOR SELECT USING (is_active = true);

-- Form gönderimi: herkes ekleyebilir (demo kayıt)
CREATE POLICY "Anyone can submit form" ON site_form_submissions
  FOR INSERT WITH CHECK (true);

-- Sadece admin okuyabilir
CREATE POLICY "Admin reads submissions" ON site_form_submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('super_admin','sales_admin','support_admin'))
  );

-- Admin güncelleyebilir (lead status, assigned_to)
CREATE POLICY "Admin updates submissions" ON site_form_submissions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('super_admin','sales_admin'))
  );
