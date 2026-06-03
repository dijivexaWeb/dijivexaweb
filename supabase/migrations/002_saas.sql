-- ============================================================
-- 002_saas.sql — Demo / SaaS Tabloları
-- ============================================================

-- Tenant (işletme/klinik)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  business_type TEXT, -- sac_ekimi, estetik, guzellik, lazer, trikoloji, dis, medikal, yerel, diger
  country TEXT DEFAULT 'TR',
  city TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  owner_user_id UUID, -- auth.users referansı
  plan_status TEXT DEFAULT 'trial', -- trial, active, past_due, suspended, cancelled, lifetime
  trial_started_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Klinik profili
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  working_hours JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Şubeler
CREATE TABLE clinic_branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Kullanıcı rolleri (site admin rolleri)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL, -- super_admin, content_admin, sales_admin, support_admin, finance_admin, developer_admin
  tenant_id UUID REFERENCES tenants(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Abonelikler
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL DEFAULT 'trial',
  status TEXT DEFAULT 'active', -- active, past_due, suspended, cancelled, lifetime
  started_at TIMESTAMPTZ DEFAULT now(),
  ends_at TIMESTAMPTZ,
  monthly_fee DECIMAL(10,2),
  currency TEXT DEFAULT 'TRY',
  payment_method TEXT,
  last_payment_at TIMESTAMPTZ,
  is_overdue BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trial event log
CREATE TABLE trial_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  event TEXT NOT NULL, -- created, day3_email, day7_email, day12_email, expired, converted
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Onboarding adım tanımları
CREATE TABLE onboarding_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_key TEXT NOT NULL UNIQUE, -- complete_clinic, add_staff, add_service, add_patient, create_appointment, set_cashier, check_whatsapp, try_ai
  locale TEXT NOT NULL DEFAULT 'tr',
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Kullanıcı onboarding ilerlemesi
CREATE TABLE onboarding_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  step_key TEXT NOT NULL,
  completed_at TIMESTAMPTZ,
  UNIQUE(tenant_id, user_id, step_key)
);

-- UTM ve lead kaynak takibi
CREATE TABLE lead_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,
  landing_page TEXT,
  first_touch_at TIMESTAMPTZ DEFAULT now(),
  last_touch_at TIMESTAMPTZ DEFAULT now()
);

-- Satış notları
CREATE TABLE sales_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  form_submission_id UUID,
  author_user_id UUID,
  note TEXT NOT NULL,
  next_follow_up TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin işlem audit log
CREATE TABLE admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action TEXT NOT NULL, -- create, update, delete, publish, unpublish, extend_trial, ...
  resource_type TEXT NOT NULL, -- site_page, tenant, subscription, blog_post, ...
  resource_id TEXT,
  old_value JSONB,
  new_value JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- RLS: SaaS Tabloları
-- ============================================================

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Tenant kendi verisini okuyabilir
CREATE POLICY "Tenant reads own data" ON tenants
  FOR SELECT USING (owner_user_id = auth.uid());

-- Admin tüm tenant'ları okuyabilir
CREATE POLICY "Admin reads all tenants" ON tenants
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('super_admin','sales_admin','support_admin'))
  );

-- Onboarding steps herkese açık
CREATE POLICY "Public read onboarding_steps" ON onboarding_steps FOR SELECT USING (is_active = true);

-- Kullanıcı kendi onboarding'ini okuyabilir
CREATE POLICY "User reads own onboarding" ON onboarding_progress
  FOR ALL USING (user_id = auth.uid());

-- Audit log sadece super_admin okuyabilir
CREATE POLICY "Super admin reads audit log" ON admin_audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'super_admin')
  );
