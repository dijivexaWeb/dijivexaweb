import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) return NextResponse.json({ success: false });

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ success: true }); // env yoksa geç

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
      signal: AbortSignal.timeout(5000),
    });

    const data = await res.json();
    return NextResponse.json({ success: data.success ?? false });
  } catch {
    return NextResponse.json({ success: true }); // hata durumunda bloklamayalım
  }
}
