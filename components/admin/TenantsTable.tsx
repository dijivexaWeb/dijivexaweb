"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable, StatusBadge } from "./AdminTable";
import { Badge } from "@/components/ui/badge";

interface Tenant {
  id: string; name: string; business_type: string; country: string; city: string;
  plan_status: string; trial_ends_at: string | null; is_active: boolean; created_at: string;
}

const planColors: Record<string, string> = {
  trial: "bg-[#F59E0B]/10 text-[#F59E0B]",
  active: "bg-[#00C2A8]/10 text-[#00C2A8]",
  past_due: "bg-red-500/10 text-red-400",
  suspended: "bg-red-500/10 text-red-400",
  cancelled: "bg-[#64748B]/10 text-[#64748B]",
};

export function TenantsTable() {
  const [rows, setRows] = useState<Tenant[]>([]);

  async function load() {
    const { data } = await createClient()
      .from("tenants")
      .select("id,name,business_type,country,city,plan_status,trial_ends_at,is_active,created_at")
      .order("created_at", { ascending: false });
    setRows(data ?? []);
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminTable
      title="Tenantlar / Demo Hesaplar"
      columns={[
        { key: "name", label: "İşletme Adı" },
        { key: "business_type", label: "Tür" },
        { key: "country", label: "Ülke" },
        { key: "city", label: "Şehir" },
        { key: "plan_status", label: "Plan", render: (r) => (
          <Badge className={planColors[r.plan_status] ?? ""}>{r.plan_status}</Badge>
        )},
        { key: "trial_ends_at", label: "Demo Bitiş", render: (r) =>
          r.trial_ends_at ? new Date(r.trial_ends_at).toLocaleDateString("tr") : "-"
        },
        { key: "is_active", label: "Durum", render: (r) => <StatusBadge value={r.is_active} /> },
        { key: "created_at", label: "Kayıt", render: (r) => new Date(r.created_at).toLocaleDateString("tr") },
      ]}
      rows={rows}
      emptyText="Henüz tenant yok."
    />
  );
}
