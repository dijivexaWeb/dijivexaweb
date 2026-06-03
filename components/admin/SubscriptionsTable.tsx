"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "./AdminTable";
import { Badge } from "@/components/ui/badge";

interface Sub { id: string; tenant_id: string; plan_type: string; status: string; monthly_fee: number; currency: string; started_at: string; ends_at: string | null; }

const statusColors: Record<string, string> = {
  active: "bg-[#00C2A8]/10 text-[#00C2A8]",
  trial: "bg-[#F59E0B]/10 text-[#F59E0B]",
  past_due: "bg-red-500/10 text-red-400",
  suspended: "bg-red-500/10 text-red-400",
  cancelled: "bg-[#64748B]/10 text-[#64748B]",
};

export function SubscriptionsTable() {
  const [rows, setRows] = useState<Sub[]>([]);

  async function load() {
    const { data } = await createClient().from("subscriptions").select("*").order("started_at", { ascending: false });
    setRows(data ?? []);
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminTable
      title="Abonelikler"
      columns={[
        { key: "tenant_id", label: "Tenant", render: (r) => <span className="font-mono text-xs">{r.tenant_id.slice(0,12)}...</span> },
        { key: "plan_type", label: "Plan" },
        { key: "status", label: "Durum", render: (r) => <Badge className={statusColors[r.status] ?? ""}>{r.status}</Badge> },
        { key: "monthly_fee", label: "Aylık Ücret", render: (r) => r.monthly_fee ? `${r.monthly_fee} ${r.currency}` : "-" },
        { key: "started_at", label: "Başlangıç", render: (r) => new Date(r.started_at).toLocaleDateString("tr") },
        { key: "ends_at", label: "Bitiş", render: (r) => r.ends_at ? new Date(r.ends_at).toLocaleDateString("tr") : "-" },
      ]}
      rows={rows}
      emptyText="Henüz abonelik yok."
    />
  );
}
