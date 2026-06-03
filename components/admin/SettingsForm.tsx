"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Setting { key: string; value: unknown; }

const DEFAULT_SETTINGS = [
  { key: "brand_name", label: "Marka Adı", type: "text" },
  { key: "tagline", label: "Ana Slogan", type: "text" },
  { key: "phone", label: "Telefon", type: "text" },
  { key: "whatsapp", label: "WhatsApp", type: "text" },
  { key: "email", label: "E-posta", type: "email" },
  { key: "ga_id", label: "Google Analytics ID", type: "text" },
  { key: "meta_pixel_id", label: "Meta Pixel ID", type: "text" },
  { key: "gtm_id", label: "Google Tag Manager ID", type: "text" },
];

export function AdminSettingsForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await createClient().from("site_settings").select("key,value");
    const map: Record<string, string> = {};
    (data ?? []).forEach((s: Setting) => { map[s.key] = String(s.value ?? ""); });
    setValues(map);
  }

  async function handleSave() {
    setSaving(true);
    const sb = createClient();
    for (const [key, value] of Object.entries(values)) {
      await sb.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    }
    setSaving(false);
    toast.success("Ayarlar kaydedildi.");
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-2xl space-y-6">
      {[
        { title: "Marka Bilgileri", keys: ["brand_name", "tagline"] },
        { title: "İletişim", keys: ["phone", "whatsapp", "email"] },
        { title: "Analytics & Pixel", keys: ["ga_id", "meta_pixel_id", "gtm_id"] },
      ].map((group) => (
        <Card key={group.title} className="bg-[#0B172A] border-[#1e2d45]">
          <CardHeader>
            <CardTitle className="text-white text-sm">{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {DEFAULT_SETTINGS.filter((s) => group.keys.includes(s.key)).map((setting) => (
              <div key={setting.key} className="space-y-1">
                <Label className="text-[#94a3b8] text-sm">{setting.label}</Label>
                <Input
                  type={setting.type}
                  value={values[setting.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [setting.key]: e.target.value }))}
                  className="bg-[#07111F] border-[#1e2d45] text-white"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSave} disabled={saving} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
        {saving ? "Kaydediliyor..." : "Ayarları Kaydet"}
      </Button>
    </div>
  );
}
