import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default async function KvkkPage({
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
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni</p>
          <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>Son güncelleme: 3 Haziran 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">

            <Section title="Veri Sorumlusu">
              <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("<strong>KVKK</strong>") uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla <strong>Dijivexa</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.</p>
            </Section>

            <Section title="İşlenen Kişisel Veriler">
              <table>
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    <th className="text-left p-3 text-xs font-semibold" style={{ color: "#64748B" }}>Veri Kategorisi</th>
                    <th className="text-left p-3 text-xs font-semibold" style={{ color: "#64748B" }}>Örnekler</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Kimlik", "Ad, soyad, unvan"],
                    ["İletişim", "E-posta, telefon, adres"],
                    ["Müşteri İşlem", "Talep ve form verileri"],
                    ["Teknik", "IP, cihaz, çerez bilgileri"],
                  ].map(([cat, ex]) => (
                    <tr key={cat} className="border-t" style={{ borderColor: "#F1F5F9" }}>
                      <td className="p-3 text-xs font-medium" style={{ color: "#0F172A" }}>{cat}</td>
                      <td className="p-3 text-xs" style={{ color: "#64748B" }}>{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title="İşleme Amaçları ve Hukuki Dayanakları">
              <ul>
                <li><strong>Sözleşmenin kurulması ve ifası:</strong> Demo ve abonelik süreçlerinin yürütülmesi</li>
                <li><strong>Hukuki yükümlülük:</strong> Yasal kayıt ve bildirim yükümlülükleri</li>
                <li><strong>Meşru menfaat:</strong> Hizmet kalitesinin artırılması, güvenlik</li>
                <li><strong>Açık rıza:</strong> Pazarlama ve kampanya bildirimleri</li>
              </ul>
            </Section>

            <Section title="Verilerin Aktarıldığı Taraflar">
              <p>Kişisel verileriniz; hizmet altyapısını oluşturan Supabase (ABD), analitik hizmet sağlayıcıları ve yasal zorunluluk halinde yetkili kamu kurumlarına aktarılabilir. Aktarımlar KVKK'nın 8. ve 9. maddeleri çerçevesinde gerçekleştirilir.</p>
            </Section>

            <Section title="Yurt Dışı Aktarım">
              <p>Hizmet altyapısı (Supabase) ABD'de barındırılmaktadır. Bu aktarım, Kişisel Verileri Koruma Kurulu'nun belirlediği standart sözleşme hükümleri ve güvenlik önlemleri çerçevesinde yapılmaktadır.</p>
            </Section>

            <Section title="Veri Saklama Süreleri">
              <ul>
                <li>Demo ve iletişim form verileri: 3 yıl</li>
                <li>Abonelik ve fatura verileri: 10 yıl (Türk Ticaret Kanunu)</li>
                <li>Log kayıtları: 1 yıl</li>
                <li>Pazarlama verisi: Rıza geri alınana kadar</li>
              </ul>
            </Section>

            <Section title="İlgili Kişi Hakları (KVKK Madde 11)">
              <ul>
                <li>Kişisel verilerinin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                <li>Kanunda öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
                <li>Yapılan işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Zararın giderilmesini talep etme</li>
              </ul>
              <div className="mt-4 p-4 rounded-xl" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#1D4ED8" }}>Başvuru Yöntemi</p>
                <p>Haklarınızı kullanmak için <a href="mailto:kvkk@dijivexa.com" style={{ color: "#2563EB" }}>kvkk@dijivexa.com</a> adresine yazılı başvuruda bulunabilirsiniz. Başvurular 30 gün içinde yanıtlanır.</p>
              </div>
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
