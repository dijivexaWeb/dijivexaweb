"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface Media { id: string; file_name: string; file_url: string; file_type: string; file_size: number; alt_text: string; created_at: string; }

export function MediaLibrary() {
  const [files, setFiles] = useState<Media[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    const { data } = await createClient().from("site_media").select("*").order("created_at", { ascending: false });
    setFiles(data ?? []);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const sb = createClient();
    const path = `media/${Date.now()}-${file.name}`;
    const { data, error } = await sb.storage.from("site-media").upload(path, file, { upsert: false });
    if (error) { toast.error("Yükleme hatası: " + error.message); setUploading(false); return; }
    const { data: { publicUrl } } = sb.storage.from("site-media").getPublicUrl(path);
    await sb.from("site_media").insert({
      file_name: file.name,
      file_url: publicUrl,
      file_type: file.type.startsWith("image") ? "image" : "file",
      mime_type: file.type,
      file_size: file.size,
    });
    toast.success("Yüklendi.");
    setUploading(false);
    load();
  }

  async function handleDelete(item: Media) {
    if (!confirm("Silinsin mi?")) return;
    await createClient().from("site_media").delete().eq("id", item.id);
    toast.success("Silindi.");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold">Medya Kütüphanesi</h2>
        <Button onClick={() => inputRef.current?.click()} disabled={uploading} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white gap-2">
          <Upload className="w-4 h-4" />
          {uploading ? "Yükleniyor..." : "Dosya Yükle"}
        </Button>
        <input ref={inputRef} type="file" className="hidden" accept="image/*,video/*,.pdf,.json,.glb" onChange={handleUpload} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {files.map((f) => (
          <div key={f.id} className="bg-[#0B172A] border border-[#1e2d45] rounded-lg overflow-hidden group relative">
            {f.file_type === "image" ? (
              <div className="aspect-square relative">
                <Image src={f.file_url} alt={f.alt_text || f.file_name} fill className="object-cover" />
              </div>
            ) : (
              <div className="aspect-square flex items-center justify-center text-[#64748B] text-xs p-2 text-center">
                {f.file_name}
              </div>
            )}
            <button
              onClick={() => handleDelete(f)}
              className="absolute top-1 right-1 bg-red-500/80 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <div className="p-2">
              <p className="text-[#64748B] text-xs truncate">{f.file_name}</p>
            </div>
          </div>
        ))}
        {files.length === 0 && <p className="text-[#64748B] text-sm col-span-5 py-8 text-center">Henüz medya yok.</p>}
      </div>
    </div>
  );
}
