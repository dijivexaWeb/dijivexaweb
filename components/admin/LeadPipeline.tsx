"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Submission {
  id: string; full_name: string; business_name: string; phone: string; email: string;
  form_slug: string; status: string; created_at: string;
}

const COLUMNS = [
  { key: "new", label: "Yeni", color: "border-[#2563EB]" },
  { key: "called", label: "Arandı", color: "border-[#38BDF8]" },
  { key: "demo_opened", label: "Demo Açıldı", color: "border-[#00C2A8]" },
  { key: "offer_sent", label: "Teklif Gönderildi", color: "border-[#F59E0B]" },
  { key: "converted", label: "Müşteri Oldu", color: "border-green-400" },
];

const NEXT_STATUS: Record<string, string> = {
  new: "called", called: "demo_opened", demo_opened: "offer_sent", offer_sent: "converted",
};

export function LeadPipeline() {
  const [rows, setRows] = useState<Submission[]>([]);

  async function load() {
    const { data } = await createClient()
      .from("site_form_submissions")
      .select("id,full_name,business_name,phone,email,form_slug,status,created_at")
      .in("status", COLUMNS.map((c) => c.key))
      .order("created_at", { ascending: false });
    setRows(data ?? []);
  }

  async function moveForward(row: Submission) {
    const next = NEXT_STATUS[row.status];
    if (!next) return;
    await createClient().from("site_form_submissions").update({ status: next }).eq("id", row.id);
    toast.success(`${row.full_name} → ${next}`);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        {COLUMNS.map((col) => {
          const cards = rows.filter((r) => r.status === col.key);
          return (
            <div key={col.key} className="w-64 flex-shrink-0">
              <div className={`mb-3 pb-2 border-b-2 ${col.color} flex items-center justify-between`}>
                <span className="text-white font-medium text-sm">{col.label}</span>
                <Badge className="bg-[#1e2d45] text-[#94a3b8]">{cards.length}</Badge>
              </div>
              <div className="space-y-2">
                {cards.map((card) => (
                  <div key={card.id} className="bg-[#0B172A] border border-[#1e2d45] rounded-lg p-3 space-y-1">
                    <p className="text-white text-sm font-medium">{card.full_name}</p>
                    <p className="text-[#64748B] text-xs">{card.business_name}</p>
                    <p className="text-[#64748B] text-xs">{card.phone}</p>
                    <p className="text-[#2563EB] text-xs">{card.form_slug}</p>
                    <p className="text-[#64748B] text-xs">{new Date(card.created_at).toLocaleDateString("tr")}</p>
                    {NEXT_STATUS[card.status] && (
                      <button
                        onClick={() => moveForward(card)}
                        className="mt-1 w-full text-xs bg-[#1e2d45] hover:bg-[#2563EB] text-[#94a3b8] hover:text-white rounded px-2 py-1 transition-colors"
                      >
                        İlerlet →
                      </button>
                    )}
                  </div>
                ))}
                {cards.length === 0 && (
                  <p className="text-[#64748B] text-xs text-center py-4">Boş</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
