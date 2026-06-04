import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("site_blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("is_published", true)
    .single();

  if (!post) notFound();

  return (
    <>
      <article className="pt-24 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm mb-8 hover:-translate-x-1 transition-transform"
            style={{ color: "#64748B" }}>
            <ArrowLeft className="w-4 h-4" /> Bloga Dön
          </Link>

          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{ color: "#0F172A" }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b" style={{ borderColor: "#F1F5F9" }}>
            <div className="flex items-center gap-1.5 text-sm" style={{ color: "#64748B" }}>
              <User className="w-3.5 h-3.5" /> {post.author}
            </div>
            {post.published_at && (
              <div className="flex items-center gap-1.5 text-sm" style={{ color: "#64748B" }}>
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.published_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            )}
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img src={post.cover_image} alt={post.title} className="w-full h-64 object-cover" />
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg leading-relaxed mb-8 p-5 rounded-2xl border-l-4 font-medium"
              style={{ color: "#334155", background: "#F8FAFC", borderColor: "#2563EB" }}>
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          {post.content && (
            <div className="prose prose-slate max-w-none" style={{ color: "#334155", lineHeight: "1.8" }}>
              {post.content.split("\n").map((line: string, i: number) => {
                if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold mt-8 mb-4" style={{ color: "#0F172A" }}>{line.slice(3)}</h2>;
                if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-bold mt-6 mb-3" style={{ color: "#0F172A" }}>{line.slice(4)}</h3>;
                if (line.startsWith("- ")) return <li key={i} className="ml-5 mb-1 list-disc">{line.slice(2)}</li>;
                if (line.startsWith("**") && line.endsWith("**")) return <strong key={i} className="block font-semibold mt-4">{line.slice(2, -2)}</strong>;
                if (line === "") return <br key={i} />;
                return <p key={i} className="mb-4">{line}</p>;
              })}
            </div>
          )}
        </div>
      </article>

      <FinalCTASection locale={locale} />
    </>
  );
}
