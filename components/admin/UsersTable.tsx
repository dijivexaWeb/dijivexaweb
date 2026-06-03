"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminTable, StatusBadge } from "./AdminTable";

interface UserRole { id: string; user_id: string; role: string; created_at: string; }

export function UsersTable() {
  const [rows, setRows] = useState<UserRole[]>([]);

  async function load() {
    const { data } = await createClient().from("user_roles").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminTable
      title="Admin Kullanıcıları"
      columns={[
        { key: "user_id", label: "Kullanıcı ID", render: (r) => <span className="font-mono text-xs">{r.user_id.slice(0,12)}...</span> },
        { key: "role", label: "Rol", render: (r) => <StatusBadge value={r.role} /> },
        { key: "created_at", label: "Eklenme", render: (r) => new Date(r.created_at).toLocaleDateString("tr") },
      ]}
      rows={rows}
      emptyText="Henüz kullanıcı yok."
    />
  );
}
