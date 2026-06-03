# Dijivexa.com — Geliştirme Planı

> Tamamlananlar ✅, devam edenler 🔄, bekleyenler ⬜

---

## FAZ 1 — Kurulum & Altyapı

- ✅ GitHub bağlantısı
- ✅ Vercel bağlantısı
- ✅ Supabase bağlantısı (`lib/supabase/client.ts`, `lib/supabase/server.ts`)
- ✅ `.env.local` kurulumu (SUPABASE_URL + ANON_KEY)
- ✅ Vercel env vars eklendi
- ✅ Paket kurulumu (`next-intl`, `framer-motion`, `gsap`, `@splinetool/react-spline`, `react-hook-form`, `zod`, `@tanstack/react-query`)
- ✅ next-intl dil altyapısı (`/[locale]/` route yapısı, TR/EN/KA/RU)
- ✅ `i18n/routing.ts` + `i18n/request.ts`
- ✅ `middleware.ts` (locale detection + admin auth guard)
- ✅ `messages/tr.json`, `en.json`, `ka.json`, `ru.json`
- ✅ `next.config.ts` (next-intl plugin + Supabase image domain)
- ✅ `app/[locale]/layout.tsx` (locale layout, Inter font)
- ⬜ Design system (CSS custom properties, Tailwind tokens)

---

## FAZ 2 — Supabase Veritabanı

- ✅ `migrations/001_cms.sql` — CMS tabloları
  - site_settings, site_languages, site_menus, site_menu_items
  - site_pages, site_sections, site_section_blocks, site_translations
  - site_media, site_modules, site_services
  - site_faqs, site_blog_posts, site_blog_categories
  - site_testimonials, site_pricing_blocks, site_seo_meta, site_redirects
- ✅ `migrations/002_saas.sql` — Demo/SaaS tabloları
  - tenants, clinics, clinic_branches, user_roles
  - subscriptions, trial_logs, onboarding_steps, onboarding_progress
  - lead_sources, sales_notes, admin_audit_log
- ✅ `migrations/003_forms.sql` — Form/Lead tabloları
  - site_forms, site_form_submissions
- ✅ `migrations/004_integrations.sql` — AI/WhatsApp tabloları
  - ai_provider_settings, ai_prompt_templates, ai_usage_logs
  - whatsapp_templates, whatsapp_message_logs, notification_events
- ✅ RLS politikaları (public okuma, admin tam erişim, tenant izolasyonu)
- ✅ Migration'ları Supabase'e uygula

---

## FAZ 3 — Admin Panel (`/admin`)

- ⬜ Admin auth (Supabase Auth, email/şifre)
- ⬜ `app/[locale]/(admin)/admin/layout.tsx` (sidebar + topbar)
- ⬜ Admin dashboard (`/admin`) — istatistikler
- ⬜ Site Ayarları (`/admin/settings`)
- ⬜ Menü Yönetimi (`/admin/menus`)
- ⬜ Sayfa Listesi (`/admin/pages`)
- ⬜ Sayfa Düzenleme + Section Builder (`/admin/pages/[id]`)
- ⬜ Medya Kütüphanesi (`/admin/media`)
- ⬜ Modül Yönetimi (`/admin/modules`)
- ⬜ Hizmet Yönetimi (`/admin/services`)
- ⬜ SSS Yönetimi (`/admin/faqs`)
- ⬜ Blog Listesi (`/admin/blog`)
- ⬜ Blog Düzenleme (`/admin/blog/[id]`)
- ⬜ Form Kayıtları / Lead Listesi (`/admin/forms`)
- ⬜ Lead Pipeline - Kanban (`/admin/leads`)
- ⬜ Tenant/Demo Listesi (`/admin/tenants`)
- ⬜ Tenant Detay (`/admin/tenants/[id]`)
- ⬜ Global SEO Ayarları (`/admin/seo`)

---

## FAZ 4 — Public Site

### Layout & Navigasyon
- ⬜ `components/layout/Header.tsx` (sticky, blur backdrop, dropdown menüler, dil seçici)
- ⬜ `components/layout/Footer.tsx`
- ⬜ `components/layout/MobileMenu.tsx` (slide-out + sticky bottom CTA)
- ⬜ `app/[locale]/(public)/layout.tsx`

### Anasayfa (15 Section)
- ⬜ Section 1: **Hero** — Spline 3D dashboard, başlık, 2 CTA, güven metni, floating kartlar (Framer Motion)
- ⬜ Section 2: **Trust Bar** — hedef kitle kartları
- ⬜ Section 3: **Problem** — 8 problem kartı (GSAP scroll reveal)
- ⬜ Section 4: **Solution Grid** — 10 modül kartı (Framer Motion)
- ⬜ Section 5: **Clinic Highlight** — Dijivexa Clinic öne çıkan ürün
- ⬜ Section 6: **AI** — 3D AI analiz kartı + Spline, 5 özellik
- ⬜ Section 7: **WhatsApp** — telefon mockup + örnek mesajlar
- ⬜ Section 8: **Hair Transplant** — saç ekimi merkezleri özel bölüm
- ⬜ Section 9: **Cash & Stock** — kasa ve stok bölümü
- ⬜ Section 10: **Growth** — Dijivexa Growth
- ⬜ Section 11: **Services Grid** — 6 hizmet kartı
- ⬜ Section 12: **Demo Process** — 3 adım (GSAP timeline)
- ⬜ Section 13: **Security** — güvenlik kartları, koyu zemin
- ⬜ Section 14: **FAQ** — accordion, DB'den
- ⬜ Section 15: **Final CTA** — büyük CTA banner

### Ürün Sayfaları
- ⬜ `/[locale]/dijivexa-clinic`
- ⬜ `/[locale]/ozellikler`
- ⬜ `/[locale]/ai-klinik-asistani`
- ⬜ `/[locale]/whatsapp-takip`
- ⬜ `/[locale]/fiyatlandirma`

### Çözüm Sayfaları
- ⬜ `/[locale]/sac-ekimi-merkezleri`
- ⬜ `/[locale]/estetik-klinikleri`
- ⬜ `/[locale]/guzellik-merkezleri`
- ⬜ `/[locale]/lazer-epilasyon-merkezleri`
- ⬜ `/[locale]/trikoloji-merkezleri`

### Hizmet Sayfaları
- ⬜ `/[locale]/dijivexa-growth`
- ⬜ `/[locale]/dijivexa-web`
- ⬜ `/[locale]/dijivexa-mobile`
- ⬜ `/[locale]/dijivexa-studio`
- ⬜ `/[locale]/dijivexa-ai`

### Sistem Sayfaları
- ⬜ `/[locale]/demo` — 15 gün demo kayıt formu (React Hook Form + Zod)
- ⬜ `/[locale]/iletisim`
- ⬜ `/[locale]/giris`
- ⬜ `/[locale]/blog` + `/[locale]/blog/[slug]`
- ⬜ `/[locale]/gizlilik-politikasi`
- ⬜ `/[locale]/kullanim-sartlari`
- ⬜ `/[locale]/kvkk`

### Demo Kayıt Backend
- ⬜ Supabase Edge Function: tenant + user otomatik oluşturma
- ⬜ trial_started_at / trial_ends_at kaydı (15 gün)
- ⬜ Hoş geldin e-postası
- ⬜ `app.dijivexa.com/onboarding` yönlendirmesi

---

## FAZ 5 — SEO & Teknik

- ⬜ `generateMetadata()` her sayfa için (DB'den)
- ⬜ `app/sitemap.ts` — otomatik sitemap
- ⬜ `app/robots.ts` — /admin noindex
- ⬜ hreflang etiketleri (root layout)
- ⬜ Organization schema (root layout)
- ⬜ SoftwareApplication schema (Clinic sayfası)
- ⬜ FAQ schema (SSS section'ları)
- ⬜ Article schema (blog)
- ⬜ BreadcrumbList (alt sayfalar)

---

## FAZ 6 — Animasyon Sistemi

- ⬜ GSAP ScrollTrigger kurulumu
- ⬜ Problem section scroll reveal (kartlar soldan/sağdan)
- ⬜ Demo Process timeline animasyonu
- ⬜ Stats counter (scroll'da sayar)
- ⬜ Section başlıkları fade-up
- ⬜ Framer Motion hero floating kartlar (sürekli yüzer)
- ⬜ Modül grid hover efektleri
- ⬜ Dropdown menü smooth açılma
- ⬜ Mobil menü slide-in

---

## Deploy & Test

- ✅ GitHub → Vercel otomatik deploy aktif
- ⬜ Her faz sonrası `npm run dev` testi
- ⬜ Admin CRUD testleri
- ⬜ i18n URL testleri (/tr, /en, /ka, /ru)
- ⬜ Demo form → Supabase tenant testi
- ⬜ Spline 3D hero testi
- ⬜ GSAP scroll animasyon testleri
- ⬜ Lighthouse skoru (hedef: Performance 90+, SEO 95+)
- ⬜ Production deploy

---

---

## Modüler Yapı Kuralları

Her özellik kendi klasöründe, bağımsız modül olarak geliştirilir:

```
app/[locale]/
  (public)/          ← public site modülleri
  (admin)/admin/
    settings/        ← ayrı modül
    menus/           ← ayrı modül
    pages/           ← ayrı modül
    blog/            ← ayrı modül
    leads/           ← ayrı modül
    tenants/         ← ayrı modül
    ...
components/
  sections/          ← her section ayrı dosya
  admin/             ← admin bileşenleri ayrı
  ui/                ← shadcn bileşenleri
```

Kurallar:
- Her admin sayfası kendi `page.tsx` dosyası — tek sayfaya sıkıştırılmaz
- Her anasayfa section'ı kendi `components/sections/XxxSection.tsx` dosyası
- Shared logic `lib/` altında, UI `components/` altında

---

## Güvenlik Kuralları

### Kod Güvenliği
- ⬜ Tüm API route'larında input validation (Zod)
- ⬜ SQL injection: Supabase parametrik sorgular kullanılır (ham string interpolasyon yasak)
- ⬜ XSS: `dangerouslySetInnerHTML` kullanılmaz, içerik sanitize edilir
- ⬜ CSRF: Next.js server actions + Supabase Auth token koruması
- ⬜ Rate limiting: form gönderimi ve auth endpoint'leri
- ⬜ Cloudflare Turnstile: demo kayıt formuna spam koruması
- ⬜ File upload kısıtları: tip + boyut kontrolü (Supabase Storage)
- ⬜ Environment variables: `NEXT_PUBLIC_` prefix sadece gerçekten public olanlar için
- ⬜ Admin route'ları `middleware.ts` ile korunur (auth check)

### DB Güvenliği (Supabase RLS)
- ⬜ Her tablo için Row Level Security (RLS) aktif edilir
- ⬜ Public okuma: sadece `is_published = true` olan kayıtlar
- ⬜ Admin işlemleri: `user_roles.role = 'super_admin'` kontrolü
- ⬜ Tenant izolasyonu: `tenant_id = auth.uid()` veya join ile
- ⬜ Anon key ile write işlemi yapılamaz (sadece demo form submit için özel RLS)
- ⬜ Service role key sadece Edge Functions içinde kullanılır, frontend'e verilmez
- ⬜ Audit log: admin işlemlerinin tamamı `admin_audit_log` tablosuna yazılır
- ⬜ Soft delete: kayıtlar fiziksel silinmez, `deleted_at` ile işaretlenir

*Son güncelleme: 2026-06-03*
