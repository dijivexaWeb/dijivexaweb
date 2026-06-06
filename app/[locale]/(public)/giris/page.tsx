"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TURNSTILE_SITE_KEY = "0x4AAAAAADf1E2WjppMBxAjQ";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!turnstileToken) {
      setError("Lütfen robot doğrulamasını tamamlayın.");
      return;
    }

    setLoading(true);

    try {
      // Turnstile token'ı server'da doğrula
      const verifyRes = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
        signal: AbortSignal.timeout(8000),
      });

      const { success } = await verifyRes.json();

      if (!success) {
        setError("Doğrulama başarısız. Lütfen tekrar deneyin.");
        setLoading(false);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError("E-posta veya şifre hatalı.");
        setLoading(false);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      router.push("/tr/admin");
    } catch (err) {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      setLoading(false);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07111F]">
      <Card className="w-full max-w-md border-[#1e2d45] bg-[#0B172A]">
        <CardHeader className="text-center">
          <div className="text-2xl font-bold text-white mb-1">Dijivexa</div>
          <CardTitle className="text-white">Admin Girişi</CardTitle>
          <CardDescription className="text-[#64748B]">
            Devam etmek için giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@dijivexa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#07111F] border-[#1e2d45] text-white placeholder:text-[#64748B]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Şifre</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#07111F] border-[#1e2d45] text-white placeholder:text-[#64748B]"
              />
            </div>

            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "dark" }}
            />

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
              disabled={loading || !turnstileToken}
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
