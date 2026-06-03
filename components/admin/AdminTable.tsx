"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  title: string;
  addLabel?: string;
  onAdd?: () => void;
  columns: Column<T>[];
  rows: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyText?: string;
}

export function AdminTable<T extends { id: string }>({
  title, addLabel, onAdd, columns, rows, onEdit, onDelete, emptyText,
}: AdminTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-base">{title}</h2>
        {onAdd && (
          <Button onClick={onAdd} size="sm" className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white gap-2">
            <Plus className="w-4 h-4" />
            {addLabel ?? "Ekle"}
          </Button>
        )}
      </div>

      <div className="rounded-xl border border-[#1e2d45] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0B172A] border-b border-[#1e2d45]">
              {columns.map((col) => (
                <th key={String(col.key)} className="text-left px-4 py-3 text-[#64748B] font-medium">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right px-4 py-3 text-[#64748B] font-medium">İşlem</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-[#64748B]">
                  {emptyText ?? "Kayıt bulunamadı."}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-[#1e2d45] hover:bg-[#0B172A]/50 transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-[#94a3b8]">
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button onClick={() => onEdit(row)} className="text-[#64748B] hover:text-[#2563EB] transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(row)} className="text-[#64748B] hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusBadge({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return (
      <Badge className={value ? "bg-[#00C2A8]/10 text-[#00C2A8] border-[#00C2A8]/20" : "bg-red-500/10 text-red-400 border-red-500/20"}>
        {value ? "Aktif" : "Pasif"}
      </Badge>
    );
  }
  return <Badge className="bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20">{value}</Badge>;
}
