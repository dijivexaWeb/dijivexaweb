import { createClient } from "@/lib/supabase/server";
import { SecurityClient } from "./SecurityClient";

const DEFAULT = {
  badge: "Güvenlik",
  heading: "Veriniz güvenli, erişiminiz kontrollü.",
  subheading: "Bulut tabanlı mimari, yetki kontrolü, veri izolasyonu ve günlük yedekleme.",
  items: [
    { icon: "Shield", label: "Yetki Yönetimi", desc: "Rol bazlı erişim kontrolü. Her kullanıcı sadece yetkili alana girer.", color: "#3B82F6" },
    { icon: "Lock", label: "Veri İzolasyonu", desc: "Her klinik kendi güvenli alanında. Veriler karışmaz.", color: "#0D9488" },
    { icon: "Eye", label: "Güvenli Oturum", desc: "JWT token doğrulama, oturum yönetimi.", color: "#8B5CF6" },
    { icon: "FileCheck", label: "Audit Log", desc: "Tüm işlemler kayıt altında. Kimin ne yaptığı izlenir.", color: "#F59E0B" },
    { icon: "RotateCcw", label: "Günlük Yedekleme", desc: "Otomatik günlük yedekleme, veri kaybı yok.", color: "#10B981" },
    { icon: "Database", label: "Soft Delete", desc: "Veriler fiziksel silinmez. İstediğinizde geri alınabilir.", color: "#6366F1" },
  ],
};

export async function SecuritySection() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "section_security").single();
  const content = (data?.value as typeof DEFAULT) ?? DEFAULT;
  return <SecurityClient content={content} />;
}
