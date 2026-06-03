import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default async function GizlilikPolitikasiPage({
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
            Gizlilik Politikası
          </h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>Son güncelleme: 3 Haziran 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-sm max-w-none" style={{ color: "#334155" }}>

            <Section title="1. Veri Sorumlusu">
              <p>
                Dijivexa ("<strong>Şirket</strong>", "<strong>biz</strong>") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("<strong>KVKK</strong>") kapsamında veri sorumlusu sıfatıyla aşağıdaki bilgileri sizinle paylaşıyoruz.
              </p>
            </Section>

            <Section title="2. Toplanan Veriler">
              <ul>
                <li><strong>Kimlik verileri:</strong> Ad, soyad, unvan</li>
                <li><strong>İletişim verileri:</strong> E-posta adresi, telefon numarası</li>
                <li><strong>İşlem verileri:</strong> Demo talep bilgileri, iletişim mesajları</li>
                <li><strong>Teknik veriler:</strong> IP adresi, tarayıcı bilgisi, çerez verileri</li>
              </ul>
            </Section>

            <Section title="3. Veri İşleme Amaçları">
              <ul>
                <li>Demo talep ve onboarding süreçlerinin yürütülmesi</li>
                <li>Müşteri hizmetleri ve teknik destek sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Hizmet kalitesinin iyileştirilmesi</li>
              </ul>
            </Section>

            <Section title="4. Hukuki Dayanak">
              <p>
                Kişisel verileriniz; sözleşmenin kurulması ve ifası, meşru menfaatlerimiz ve açık rızanız hukuki dayanakları kapsamında işlenmektedir.
              </p>
            </Section>

            <Section title="5. Veri Güvenliği">
              <p>
                Verileriniz Supabase altyapısında, Row Level Security (RLS) koruması altında depolanmaktadır. Tüm veri iletişimi SSL/TLS şifrelemesiyle korunmakta, günlük yedekleme yapılmaktadır.
              </p>
            </Section>

            <Section title="6. Veri Saklama Süresi">
              <p>
                Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal saklama yükümlülükleri çerçevesinde saklanır. Demo ve iletişim formlarından gelen veriler en fazla 3 yıl saklanır.
              </p>
            </Section>

            <Section title="7. Haklarınız">
              <ul>
                <li>Kişisel verilerinize erişim talep etme</li>
                <li>Düzeltme veya silme talep etme</li>
                <li>İşlemeye itiraz etme</li>
                <li>Veri taşınabilirliği talep etme</li>
              </ul>
              <p>
                Talepleriniz için: <a href="mailto:info@dijivexa.com" style={{ color: "#2563EB" }}>info@dijivexa.com</a>
              </p>
            </Section>

            <Section title="8. Çerezler">
              <p>
                Web sitemiz işlevsel, analitik ve pazarlama amaçlı çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
              </p>
            </Section>

            <Section title="9. Değişiklikler">
              <p>
                Bu politika güncellenerek yayımlanabilir. Önemli değişiklikler e-posta ile bildirilir.
              </p>
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
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-3" style={{ color: "#0F172A" }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: "#64748B" }}>
        {children}
      </div>
    </div>
  );
}
