import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default async function KullanimSartlariPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Yasal</span>
          <h1 className="text-4xl font-bold mb-4 leading-tight" style={{ color: "#0F172A" }}>
            Kullanım Şartları
          </h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>Son güncelleme: 3 Haziran 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8" style={{ color: "#334155" }}>

            <Section title="1. Taraflar ve Kabul">
              <p>Bu Kullanım Şartları, Dijivexa ("Platform") ile Platform'u kullanan gerçek veya tüzel kişiler ("Kullanıcı") arasındaki ilişkiyi düzenlemektedir. Platformu kullanarak bu şartları kabul etmiş olursunuz.</p>
            </Section>

            <Section title="2. Hizmet Kapsamı">
              <p>Dijivexa Clinic, klinik yönetim yazılımı olarak sunulmaktadır. Platform; randevu, hasta takibi, kasa, stok, AI asistan ve WhatsApp entegrasyonu modüllerini kapsar. Hizmetler SaaS (Yazılım as a Service) modelde sunulur.</p>
            </Section>

            <Section title="3. Demo ve Abonelik">
              <ul>
                <li>Demo süresi 15 takvim günü olup bu süre içinde tüm modüller kullanılabilir.</li>
                <li>Demo bitiminde hesap otomatik kısıtlanır; veriler 30 gün korunur.</li>
                <li>Abonelik aylık veya yıllık olarak sunulur, önceden bildirimle sonlandırılabilir.</li>
              </ul>
            </Section>

            <Section title="4. Kullanıcı Yükümlülükleri">
              <ul>
                <li>Gerçek ve doğru bilgi sağlamak</li>
                <li>Hesap güvenliğini korumak (şifre paylaşımı yasaktır)</li>
                <li>Platformu yasal olmayan amaçlarla kullanmamak</li>
                <li>Üçüncü kişilerin verilerini hukuka aykırı şekilde işlememek</li>
                <li>KVKK ve ilgili mevzuata uymak</li>
              </ul>
            </Section>

            <Section title="5. Fikri Mülkiyet">
              <p>Platformun tüm yazılım, tasarım, içerik ve marka unsurları Dijivexa'ya aittir. Kullanıcıya yalnızca sınırlı, devredilemez, münhasır olmayan kullanım lisansı verilmektedir.</p>
            </Section>

            <Section title="6. Sorumluluk Sınırlaması">
              <p>Platform "olduğu gibi" sunulmaktadır. Dijivexa; veri kaybı, iş sürekliliği kesintisi veya dolaylı zararlardan sorumlu tutulamaz. Toplam sorumluluk, son 3 aylık abonelik bedeli ile sınırlıdır.</p>
            </Section>

            <Section title="7. AI Özelliklerine İlişkin Uyarı">
              <p>AI Klinik Asistanı tıbbi tanı veya tedavi kararı vermez. AI tarafından üretilen tüm çıktılar bilgi amaçlıdır ve klinik ekibin sorumluluğunda değerlendirilmelidir. Kullanıcılar bu sınırlamayı kabul eder.</p>
            </Section>

            <Section title="8. Fesih">
              <p>Her iki taraf da 30 gün önceden yazılı bildirimle aboneliği sonlandırabilir. Şartlara aykırılık halinde Dijivexa, derhal hesabı askıya alma hakkını saklı tutar.</p>
            </Section>

            <Section title="9. Uygulanacak Hukuk">
              <p>Bu şartlar Türk Hukuku'na tabidir. Uyuşmazlıklar İstanbul Mahkemeleri'nde çözülür.</p>
            </Section>

            <Section title="10. İletişim">
              <p>Sorularınız için: <a href="mailto:info@dijivexa.com" style={{ color: "#2563EB" }}>info@dijivexa.com</a></p>
            </Section>

          </div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-3" style={{ color: "#0F172A" }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: "#64748B" }}>
        {children}
      </div>
    </div>
  );
}
