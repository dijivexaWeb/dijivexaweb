"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable, StatusBadge } from "./AdminTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Submission {
  id: string; full_name: string; email: string; phone: string; business_name: string;
  business_type: string; form_slug: string; status: string; created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-[#2563EB]/10 text-[#2563EB]",
  called: "bg-[#00C2A8]/10 text-[#00C2A8]",
  demo_opened: "bg-[#38BDF8]/10 text-[#38BDF8]",
  converted: "bg-green-500/10 text-green-400",
  not_suitable: "bg-red-500/10 text-red-400",
};

const statusLabels: Record<string, string> = {
  new: "Yeni", called: "Arandı", unreachable: "Ulaşılamadı",
  demo_opened: "Demo Açıldı", demo_active: "Demo Aktif",
  meeting_planned: "Görüşme Planlandı", offer_sent: "Teklif Gönderildi",
  converted: "Müşteri Oldu", not_suitable: "Uygun Değil", follow_up: "Takipte",
};

export function FormsTable() {
  const [rows, setRows] = useState<Submission[]>([]);

  async function load() {
    const { data } = await createClient()
      .from("site_form_submissions")
      .select("id,full_name,email,phone,business_name,business_type,form_slug,status,created_at")
      .order("created_at", { ascending: false });
    setRows(data ?? []);
  }

  async function updateStatus(id: string, status: string) {
    await createClient().from("site_form_submissions").update({ status }).eq("id", id);
    toast.success("Durum güncellendi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminTable
      title="Form Başvuruları"
      columns={[
        { key: "full_name", label: "Ad Soyad" },
        { key: "business_name", label: "İşletme" },
        { key: "email", label: "E-posta" },
        { key: "phone", label: "Telefon" },
        { key: "form_slug", label: "Form Tipi" },
        { key: "business_type", label: "İşletme Tipi" },
        { key: "status", label: "Durum", render: (r) => (
          <Badge className={statusColors[r.status] ?? "bg-[#64748B]/10 text-[#64748B]"}>
            {statusLabels[r.status] ?? r.status}
          </Badge>
        )},
        { key: "created_at", label: "Tarih", render: (r) => new Date(r.created_at).toLocaleDateString("tr") },
      ]}
      rows={rows}
      emptyText="Henüz başvuru yok."
    />
  );
}
