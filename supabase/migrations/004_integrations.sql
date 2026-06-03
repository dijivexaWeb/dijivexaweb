-- ============================================================
-- 004_integrations.sql — AI / WhatsApp / Bildirim Tabloları
-- ============================================================

-- AI sağlayıcı ayarları (tenant bazlı)
CREATE TABLE ai_provider_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'gemini', -- gemini, openai
  api_key_encrypted TEXT, -- şifrelenmiş key
  model TEXT DEFAULT 'gemini-pro',
  is_active BOOLEAN DEFAULT true,
  monthly_limit INT DEFAULT 1000,
  usage_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- AI prompt şablonları
CREATE TABLE ai_prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  variables JSONB DEFAULT '[]', -- kullanılabilecek değişkenler
  output_format TEXT DEFAULT 'text', -- text, json, markdown
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- AI kullanım logları
CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID,
  prompt_template_id UUID REFERENCES ai_prompt_templates(id),
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  input_tokens INT,
  output_tokens INT,
  cost_estimate DECIMAL(10,6),
  status TEXT DEFAULT 'success', -- success, error, timeout
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp mesaj şablonları
CREATE TABLE whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL, -- Meta onaylı şablon adı
  category TEXT, -- MARKETING, UTILITY, AUTHENTICATION
  language TEXT DEFAULT 'tr',
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_approved BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp mesaj logları
CREATE TABLE whatsapp_message_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  template_id UUID REFERENCES whatsapp_templates(id),
  recipient_phone TEXT NOT NULL,
  message_body TEXT,
  status TEXT DEFAULT 'sent', -- sent, delivered, read, failed
  error_code TEXT,
  wa_message_id TEXT, -- Meta'dan gelen ID
  triggered_by TEXT, -- appointment_reminder, followup, campaign, manual
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Bildirim olayları (e-posta + WhatsApp tetikleyiciler)
CREATE TABLE notification_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- trial_created, trial_day3, trial_day7, trial_day12, trial_expired, appointment_reminder, followup_10day, ...
  channel TEXT NOT NULL, -- email, whatsapp
  recipient TEXT NOT NULL,
  subject TEXT,
  body TEXT,
  status TEXT DEFAULT 'pending', -- pending, sent, failed
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- RLS: Entegrasyon Tabloları
-- ============================================================

ALTER TABLE ai_provider_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompt_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_message_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_events ENABLE ROW LEVEL SECURITY;

-- Tenant kendi AI ayarlarını okuyabilir
CREATE POLICY "Tenant reads own ai settings" ON ai_provider_settings
  FOR ALL USING (
    tenant_id IN (SELECT id FROM tenants WHERE owner_user_id = auth.uid())
  );

-- Admin tüm AI ayarlarını okuyabilir
CREATE POLICY "Admin reads all ai settings" ON ai_provider_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('super_admin','developer_admin'))
  );

-- AI kullanım logları sadece admin + tenant
CREATE POLICY "Admin reads ai logs" ON ai_usage_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('super_admin','developer_admin'))
    OR tenant_id IN (SELECT id FROM tenants WHERE owner_user_id = auth.uid())
  );

-- WhatsApp logları sadece admin + tenant
CREATE POLICY "Tenant reads own whatsapp logs" ON whatsapp_message_logs
  FOR SELECT USING (
    tenant_id IN (SELECT id FROM tenants WHERE owner_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('super_admin','support_admin'))
  );
