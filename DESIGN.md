# Dijivexa Design System

**Memorable thing:** "Batumi'deki tek ciddi teknoloji firması"
**Tone:** Stripe/Notion — ciddi ama erişilebilir, hem yazılımcıya hem işletme sahibine hitap eder
**Risk A:** Batumi kimliği birinci sırada — coğrafi konum bir özür değil, marka kimliğinin özü

---

## Renk Sistemi

```css
/* Backgrounds — dark-first */
--bg-base:      #080F24;   /* deep navy — hero, footer, dark sections */
--bg-surface:   #0D1B3E;   /* card surfaces on dark bg */
--bg-surface-2: #0F2553;   /* elevated: section-dark gradient start */
--bg-light:     #F8FAFC;   /* light sections (--gray-50 ile aynı) */

/* Borders */
--border:        rgba(59, 130, 246, 0.12);   /* subtle blue tint */
--border-strong: rgba(59, 130, 246, 0.25);   /* visible blue tint */

/* Text */
--text-primary:   #F1F5F9;   /* on dark bg */
--text-muted:     #94A3B8;   /* secondary on dark */
--text-subtle:    #64748B;   /* tertiary on dark */
--text-on-light:  #0F172A;   /* primary on light sections */
--text-muted-light: #475569; /* secondary on light sections */

/* Brand Accents */
--blue:      #3B82F6;   /* primary interactive */
--blue-dark: #2563EB;   /* CTA buttons, links */
--teal:      #14B8A6;   /* agency pillar accent */
--green:     #34D399;   /* success states, data viz */

/* Batumi accent — Black Sea cyan */
--batumi: #22D3EE;   /* coordinates, location badge, map elements */

/* Glow — hero sadece */
--glow-blue:  rgba(37, 99, 235, 0.18);
--glow-teal:  rgba(13, 148, 136, 0.12);
--glow-batumi: rgba(34, 211, 238, 0.10);
```

**Kural:** `--amber` (#F59E0B) sadece uyarı/highlight için. Asla primary CTA değil.

---

## Tipografi

```bash
# next/font ile yükle (layout.tsx'e ekle)
# Plus Jakarta Sans — heading
# Inter — body (mevcut)
```

```tsx
// app/[locale]/layout.tsx
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
```

```css
/* globals.css'e ekle */
@theme inline {
  --font-display: var(--font-jakarta);  /* headings */
  --font-sans:    var(--font-inter);    /* body */
  --font-mono:    'Geist Mono', monospace; /* coordinates, code, badges */
}

h1, h2, h3, .font-display {
  font-family: var(--font-display), system-ui, sans-serif;
  letter-spacing: -0.02em;
}
```

### Tipografik Ölçek

| Kullanım | Boyut | Ağırlık | Font |
|---------|-------|---------|------|
| Hero H1 | clamp(2.5rem, 5vw, 4rem) | 800 | Jakarta |
| Section H2 | clamp(2rem, 3.5vw, 3rem) | 700 | Jakarta |
| Card H3 | 1.5rem | 600 | Jakarta |
| Coordinates | 0.75rem | 400 | Geist Mono |
| Body | 1rem | 400 | Inter |
| Small / Label | 0.875rem | 500 | Inter |

---

## Spacing

Base unit: **8px**. Her boşluk bu sistemin katıdır.

```
4px  — inline elements arası
8px  — card içi küçük boşluk
16px — card padding
24px — section içi boşluk
32px — component grupları arası
48px — section padding mobil
64px — section padding desktop
96px — büyük section break'leri
```

---

## Layout Mantığı

### Sayfa Yapısı — Alternating Sections (Stripe gibi)

```
[1] Hero           → DARK (#080F24) — Batumi kimliği öne
[2] İki Kol        → LIGHT (#F8FAFC) — Software vs Agency, net ayrım
[3] Software       → DARK (#0F2553 gradient) — feature cards
[4] Agency         → LIGHT (#F8FAFC) — service cards, warmer feel
[5] Neden Batumi?  → DARK (#080F24) — Georgia'nın avantajları
[6] Stats          → LIGHT (#F8FAFC) — numbers, social proof
[7] CTA            → DARK (#080F24) — final push
```

**Grid:** 12 kolon, max-width `1280px`, gutter `24px`.

---

## Hero Bileşeni — Risk A: Batumi First

### Konsept

Dashboard yok. Sol taraf: güçlü tipografik statement + Batumi koordinatları.
Sağ taraf: Three.js ile Batumi şehir grid'i (soyut, geometric) VEYA CSS-only grid animasyonu.

### Floating Cards (güncellendi — iki pillar)

```tsx
const floatingCards = [
  { icon: "💻", text: "Web projesi teslim edildi", sub: "Tbilisi • dün", color: "#3B82F6" },
  { icon: "📊", text: "Dijivexa Clinic: 128 hasta", sub: "Batumi Kliniği", color: "#14B8A6" },
  { icon: "📱", text: "Instagram +2.4K takipçi", sub: "Sosyal Medya", color: "#22D3EE" },
  { icon: "🎨", text: "Logo onaylandı", sub: "Grafik Tasarım", color: "#34D399" },
]
```

### Hero Badge (yeni format)

```tsx
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
  style={{ background: "rgba(34,211,238,0.08)", borderColor: "rgba(34,211,238,0.25)", color: "#67E8F9" }}>
  <span className="font-mono text-xs">41.6168° N, 41.6367° E</span>
  <span className="w-px h-3" style={{ background: "rgba(34,211,238,0.3)" }} />
  <span className="text-xs font-medium">Batumi, Gürcistan</span>
</div>
```

### Hero H1

```
Üretiyoruz.
Tasarlarız.
Batumi'den.
```

Gradient: `#60A5FA → #22D3EE` (blue to batumi cyan) on the word "Batumi'den".

### Hero Subheading

```
Yazılım geliştirmeden sosyal medya yönetimine, grafik tasarımdan SaaS ürünlere —
Kafkasya'nın dijital teknoloji ortağı.
```

### Hero CTAs

- Primary: "Hizmetleri Keşfet" → `/[locale]/hizmetler`
- Secondary: "Dijivexa Clinic'i Dene" → `/[locale]/demo`

---

## İki Kol Bölümü (NEW)

Light section. İki kolon, net vizüel ayrım:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ◆ YAZILIM ÜRÜNLERİ        ◆ AJANS HİZMETLERİ        │
│                              │                         │
│   Dijivexa Clinic            │  Sosyal Medya           │
│   Web & Mobil Geliştirme     │  Grafik Tasarım         │
│   SaaS & API                 │  Web Yapımı             │
│   AI Entegrasyonları         │  Dijital Reklam         │
│                              │                         │
│   Accent: --blue             │  Accent: --teal         │
│   [Ürünleri İncele →]        │  [Hizmetleri Gör →]     │
│                              │                         │
└─────────────────────────────────────────────────────────┘
```

Ayırıcı: Dikey çizgi (`1px rgba(0,0,0,0.08)`) veya kolon gap.
Sol: mavi icon + blue CTA. Sağ: teal icon + teal CTA.

---

## Motion Sistemi

### Prensipler

1. **Amaca hizmet eder** — dekoratif animasyon yok
2. **Hızlı giriş** — 300-800ms, yavaş değil
3. **Spring physics** — Framer Motion spring (stiffness: 80, damping: 20)
4. **ScrollTrigger** — GSAP, `start: "top 80%"`, bir kez tetiklenir
5. **Reduced motion** — globals.css'teki `@media (prefers-reduced-motion: reduce)` aktif kalır

### Standart Variant'lar

```tsx
// Sayfa giriş (hero)
const fadeUp = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

// Scroll reveal (section cards)
const scrollReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

// Floating cards (hero'daki)
const floatLoop = {
  y: [0, -8, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
}
```

### GSAP ScrollTrigger (section reveal)

```js
gsap.from(".section-card", {
  scrollTrigger: { trigger: ".section-card", start: "top 80%", once: true },
  y: 32,
  opacity: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: "power2.out"
})
```

---

## Bileşen Stilleri

### Butonlar

```tsx
// Primary CTA
<button style={{
  background: "linear-gradient(135deg, #2563EB, #3B82F6)",
  boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
  color: "white",
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  borderRadius: "12px",
  padding: "14px 24px",
  fontSize: "0.9375rem",
}}>

// Secondary (dark section)
<button style={{
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(148,163,184,0.2)",
  color: "#CBD5E1",
  borderRadius: "12px",
  padding: "14px 24px",
  fontWeight: 500,
}}>

// Teal CTA (agency sections)
<button style={{
  background: "linear-gradient(135deg, #0D9488, #14B8A6)",
  boxShadow: "0 8px 24px rgba(13,148,136,0.3)",
  color: "white",
  borderRadius: "12px",
  padding: "14px 24px",
  fontWeight: 600,
}}>
```

### Kartlar (dark bg üzerinde)

```tsx
<div style={{
  background: "linear-gradient(135deg, rgba(13,27,62,0.95), rgba(8,15,36,0.98))",
  border: "1px solid rgba(59,130,246,0.15)",
  borderRadius: "16px",
  boxShadow: "0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
  padding: "24px",
}}>
```

### Kartlar (light bg üzerinde)

```tsx
<div style={{
  background: "white",
  border: "1px solid #E2E8F0",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  padding: "24px",
}}>
```

### Badge / Chip

```tsx
// Lokasyon / Tech badge
<span style={{
  background: "rgba(34,211,238,0.08)",
  border: "1px solid rgba(34,211,238,0.2)",
  color: "#67E8F9",
  borderRadius: "9999px",
  padding: "4px 12px",
  fontSize: "0.75rem",
  fontFamily: "var(--font-mono)",
}}>
  41.6168° N — Batumi
</span>
```

---

## Navigation

- Sticky, `backdropFilter: "blur(16px)"`, border-bottom `rgba(59,130,246,0.1)`
- Background dark: `rgba(8,15,36,0.85)` → on light sections: `rgba(255,255,255,0.9)`
- Logo: "D" mark (mevcut gradient) + "dijivexa" text (Jakarta 700)
- Lokasyon badge: `📍 Batumi` küçük format, nav'ın sağ köşesinde dil seçicinin yanında
- CTA: "Demo Başlat" (blue) — daima görünür

---

## Anasayfa Section Sıralaması

| # | Section | Arkaplan | İçerik |
|---|---------|----------|--------|
| 1 | Hero | #080F24 dark | Batumi koordinatları, başlık, 2 CTA, floating cards |
| 2 | İki Kol | #F8FAFC light | Software vs Agency split |
| 3 | Yazılım Ürünleri | #0F2553 dark gradient | Dijivexa Clinic, web/mobil, AI |
| 4 | Ajans Hizmetleri | #F8FAFC light | Sosyal medya, grafik, web yapımı, reklam |
| 5 | Neden Batumi? | #080F24 dark | Gürcistan avantajları, vergi, bölge |
| 6 | Stats | #F8FAFC light | Müşteri sayısı, proje, dil, şehir |
| 7 | Referanslar | #F8FAFC light | Testimonials (varsa) |
| 8 | Final CTA | #080F24 dark | "Projenizi konuşalım" |

---

## Batumi Kimliği Tasarım Elementleri

Hero sağ tarafı için önerilen Three.js city grid (opsiyonel, CSS fallback var):

```tsx
// CSS-only fallback (Three.js yokken)
// Katmanlar:
// 1. Düşey/yatay çizgilerden şehir grid'i (SVG veya border-based)
// 2. Birkaç nokta yanıp sönüyor (şehir ışıkları efekti)
// 3. "Batumi" koordinatları overlay

const CityGrid = () => (
  <div className="relative w-full h-full" style={{ minHeight: 400 }}>
    {/* Grid arka plan */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `
        linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }} />
    {/* Koordinat overlay */}
    <div style={{
      position: "absolute", bottom: 24, right: 24,
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      color: "rgba(34,211,238,0.5)",
      letterSpacing: "0.05em",
    }}>
      41.6168° N<br />
      41.6367° E<br />
      Batumi, GE
    </div>
    {/* Glow nokta — şehir merkezi */}
    <div style={{
      position: "absolute", top: "40%", left: "55%",
      width: 8, height: 8,
      borderRadius: "50%",
      background: "#22D3EE",
      boxShadow: "0 0 20px 6px rgba(34,211,238,0.4)",
    }} />
  </div>
)
```

---

## DO / DON'T

**DO:**
- Her section'da tutarlı 8px spacing grid
- Hero badge'de koordinat formatı (`41.6168° N, 41.6367° E`)
- Dark section'larda mavi vurgu, light section'larda teal vurgu
- `font-display` heading'lerde zorunlu
- Floating card'larda her iki pillar'dan örnek
- `--batumi` rengini lokasyon elemanlarında kullan

**DON'T:**
- Emoji dekorasyon olarak (sadece içerik olarak)
- `--amber` primary CTA olarak
- Purple/violet tonlar — themaradi'ye ait, orada kalmalı
- Merkeze yaslanmış uzun metin blokları
- `Inter` heading'ler için
- Generic SaaS template görünümü

---

## i18n Notları

- Tüm copy `messages/tr.json`, `en.json`, `ka.json`, `ru.json` üzerinden gelir
- Lokasyon badge: TR `"Batumi, Gürcistan"`, EN `"Batumi, Georgia"`, KA `"ბათუმი, საქართველო"`, RU `"Батуми, Грузия"`
- Koordinatlar evrensel — çeviri gerekmez

---

_Bu DESIGN.md anasayfa yeniden yapılandırması için kaynak gerçeği._
_Değiştirmeden önce burayı güncelle._
