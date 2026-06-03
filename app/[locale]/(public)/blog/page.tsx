import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  category: string | null;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("site_blog_posts")
    .select("id, title, slug, excerpt, cover_image_url, published_at, category")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(24);

  const blogPosts: BlogPost[] = posts ?? [];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "#EFF6FF", color: "#1D4ED8" }}>Blog</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: "#0F172A" }}>
            Klinik yönetimi &amp; dijital büyüme
          </h1>
          <p style={{ color: "#64748B" }}>
            Klinik operasyonu, dijital pazarlama ve sektör haberleri hakkında güncel içerikler.
          </p>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: "#64748B" }}>Henüz blog yazısı yok.</p>
              <p className="text-sm mt-2" style={{ color: "#94A3B8" }}>Yakında yeni içerikler yayınlanacak.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-all"
                  style={{ borderColor: "#F1F5F9" }}
                >
                  {/* Cover */}
                  <div className="h-48 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #0F2553, #1A3A6B)" }}>
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl opacity-20">📝</div>
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(37,99,235,0.85)", color: "white", backdropFilter: "blur(8px)" }}>
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: "#94A3B8" }}>
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.published_at)}
                    </div>
                    <h2 className="font-semibold text-base mb-2 leading-snug group-hover:text-blue-600 transition-colors"
                      style={{ color: "#0F172A" }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "#64748B" }}>
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#2563EB" }}>
                      Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
