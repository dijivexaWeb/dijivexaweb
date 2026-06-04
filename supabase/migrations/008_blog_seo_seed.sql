-- ============================================================
-- 008_blog_seo_seed.sql — Blog yazıları + SEO meta seed
-- ============================================================

-- Write policies (IF NOT EXISTS yok, DO $$ bloğu ile güvenli)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth write site_blog_posts' AND tablename = 'site_blog_posts') THEN
    EXECUTE 'CREATE POLICY "Auth write site_blog_posts" ON site_blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth write site_blog_categories' AND tablename = 'site_blog_categories') THEN
    EXECUTE 'CREATE POLICY "Auth write site_blog_categories" ON site_blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth write site_seo_meta' AND tablename = 'site_seo_meta') THEN
    EXECUTE 'CREATE POLICY "Auth write site_seo_meta" ON site_seo_meta FOR ALL TO authenticated USING (true) WITH CHECK (true)';
  END IF;
END $$;

-- Örnek blog yazıları
INSERT INTO site_blog_posts (slug, locale, title, excerpt, content, author, is_published, published_at) VALUES
('klinik-yonetiminde-dijital-donusum', 'tr',
 'Klinik Yönetiminde Dijital Dönüşüm: Neden Şimdi?',
 'Geleneksel klinik yönetim yöntemleri artık yetersiz kalıyor. Dijital dönüşüm nasıl başlatılır ve neler kazandırır?',
 $body$Klinik yönetimi, son yıllarda köklü bir dönüşüm geçiriyor. Hasta beklentileri artarken, rekabet de her geçen gün yoğunlaşıyor.

## Neden Dijital Dönüşüm?

Geleneksel yöntemlerle yönetilen klinikler şu sorunlarla karşılaşıyor:

- Randevu takibinde hatalar ve çakışmalar
- Kağıt tabanlı hasta dosyaları
- Manuel kasa ve stok takibi
- WhatsApp üzerinden dağınık iletişim

## Dijivexa ile Ne Değişiyor?

Dijivexa Clinic, tüm bu süreçleri tek bir dijital platformda birleştiriyor. Randevu takvimi, hasta dosyası, kasa, stok ve WhatsApp bildirimleri — hepsi entegre çalışıyor.

## Sonuç

Dijital dönüşüm artık bir tercih değil, zorunluluk. 15 günlük ücretsiz demoyla kendiniz görün.$body$,
 'Dijivexa Ekibi', true, now() - interval '7 days'),

('whatsapp-ile-hasta-hatirlatma-sistemi', 'tr',
 'WhatsApp ile Otomatik Hasta Hatırlatma Sistemi Nasıl Kurulur?',
 'Meta WhatsApp Business API ile randevu hatırlatma, kontrol mesajları ve kampanya bildirimleri otomatik hale getirilebilir.',
 $body$WhatsApp, Türkiye''de en yaygın kullanılan iletişim platformu. Klinikler için hasta iletişimini otomatikleştirmenin en etkili yolu.

## WhatsApp Business API Nedir?

Meta''nın resmi API''si sayesinde onaylı şablon mesajlar otomatik gönderilebilir. Spam değil, gerçek değer katan mesajlar.

## Dijivexa ile Neler Otomatik Gönderilir?

- Randevu hatırlatma — 24 saat öncesinden otomatik
- 10. gün kontrolü — Saç ekimi sonrası takip
- Kampanya bildirimi — Yeni hizmet duyuruları
- Yorum daveti — Google yorumu için davet

## Kurulum Ne Kadar Sürer?

Dijivexa''da WhatsApp entegrasyonu birkaç adımda tamamlanıyor. Demo hesabınızda anında test edebilirsiniz.$body$,
 'Dijivexa Ekibi', true, now() - interval '3 days'),

('ai-klinik-asistan-nedir', 'tr',
 'AI Klinik Asistan Nedir? Kliniğinize Nasıl Katkı Sağlar?',
 'Dijivexa''nın AI klinik asistanı, muayene formlarını analiz ederek otomatik klinik özet ve tedavi önerisi taslağı oluşturuyor.',
 $body$Yapay zeka, sağlık sektöründe devrim yaratıyor. Ancak doğru kullanıldığında — doktorun yerini almadan, onu destekleyerek.

## Dijivexa AI Asistanı Ne Yapar?

Muayene formundaki verileri analiz ederek:

- Klinik özet oluşturur
- Risk faktörlerini vurgular
- Tedavi önerisi taslağı hazırlar
- Takip notları düzenler

## Güvenlik ve Şeffaflık

Nihai karar her zaman klinisyene aittir. AI yalnızca destek sağlar. Tüm analizler loglanır ve denetlenebilir.

## Gemini Pro ile Güçlü

Kliniğe özel API key ile çalışan sistem, klinik verinizin başka yerlerde kullanılmamasını garanti eder.$body$,
 'Dijivexa Ekibi', true, now() - interval '1 day')
ON CONFLICT (slug, locale) DO NOTHING;

-- SEO Meta kayıtları
INSERT INTO site_seo_meta (page_slug, locale, meta_title, meta_description, og_title, og_description, robots, sitemap_priority) VALUES
('/', 'tr', 'Dijivexa — Klinik & Güzellik Merkezleri İçin Dijital Yönetim Yazılımı', 'Randevu, hasta, kasa, stok, operasyon ve WhatsApp takibini tek platformda birleştiren klinik yönetim yazılımı. 15 gün ücretsiz deneyin.', 'Dijivexa — Klinik Yönetim Yazılımı', 'Saç ekimi, estetik ve güzellik merkezleri için kapsamlı dijital yönetim platformu.', 'index,follow', 1.0),
('dijivexa-clinic', 'tr', 'Dijivexa Clinic — Klinik Yönetim Yazılımı | Hasta, Randevu, Kasa', 'Saç ekimi ve estetik klinikleri için hasta yönetimi, randevu takvimi, kasa, stok, operasyon modülü ve WhatsApp entegrasyonu.', 'Dijivexa Clinic', 'Klinikler için en kapsamlı dijital yönetim yazılımı.', 'index,follow', 0.9),
('fiyatlandirma', 'tr', 'Fiyatlandırma — Dijivexa Clinic', 'Dijivexa Clinic fiyatlandırma bilgileri. Şube sayısı ve kullanıcıya göre özel teklif alın. 15 gün ücretsiz demo.', 'Dijivexa Fiyatlandırma', 'Klinik büyüklüğünüze göre esnek fiyatlandırma.', 'index,follow', 0.8),
('demo', 'tr', '15 Gün Ücretsiz Demo — Dijivexa Clinic', 'Dijivexa Clinic''i 15 gün ücretsiz deneyin. Kredi kartı gerekmez, anında erişim, kurulum desteği dahil.', '15 Gün Ücretsiz Demo', 'Hemen başlayın, kredi kartı gerekmez.', 'index,follow', 0.9),
('iletisim', 'tr', 'İletişim — Dijivexa', 'Dijivexa ekibiyle iletişime geçin. Demo talebi, teknik destek veya satış için bize ulaşın.', 'İletişim — Dijivexa', 'Sorularınız için bize ulaşın.', 'index,follow', 0.7),
('blog', 'tr', 'Blog — Dijivexa | Klinik Yönetimi ve Dijital Dönüşüm', 'Klinik yönetimi, dijital dönüşüm, WhatsApp pazarlama ve AI sağlık teknolojisi hakkında içerikler.', 'Dijivexa Blog', 'Klinikler için dijital dönüşüm rehberi.', 'index,follow', 0.8),
('whatsapp-takip', 'tr', 'WhatsApp Takip Sistemi — Dijivexa', 'Meta WhatsApp Business API ile randevu hatırlatma, kontrol mesajları ve kampanya bildirimleri otomatik.', 'Dijivexa WhatsApp Takip', 'Otomatik hasta iletişimi.', 'index,follow', 0.8),
('ai-klinik-asistani', 'tr', 'AI Klinik Asistanı — Dijivexa', 'Muayene formlarını analiz eden, klinik özet ve tedavi önerisi taslağı hazırlayan AI asistanı.', 'AI Klinik Asistanı', 'Muayene sürecinizi yapay zeka ile güçlendirin.', 'index,follow', 0.8),
('sac-ekimi-merkezleri', 'tr', 'Saç Ekimi Merkezleri İçin Yazılım — Dijivexa Clinic', 'Greft takibi, FUE/DHI operasyon modülü, 12 aylık takip planı ile saç ekimi operasyonlarını dijitalleştirin.', 'Saç Ekimi Merkezi Yazılımı', 'FUE/DHI operasyon yönetimi tek platformda.', 'index,follow', 0.8)
ON CONFLICT (page_slug, locale) DO NOTHING;
