"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PageHeroProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  dark?: boolean;
  children?: React.ReactNode;
}

export function PageHero({
  badge,
  badgeColor = "#2563EB",
  title,
  titleHighlight,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  dark = false,
  children,
}: PageHeroProps) {
  const hasBadgeBg = badgeColor;

  return (
    <section
      className="relative pt-28 pb-20 overflow-hidden"
      style={
        dark
          ? { background: "linear-gradient(150deg, #0F2553 0%, #1A3A6B 55%, #112B60 100%)" }
          : { background: "#FFFFFF" }
      }
    >
      {/* Grid overlay for dark */}
      {dark && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.2) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      )}

      {/* Light mode blue accent orbs */}
      {!dark && (
        <>
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(13,148,136,0.04) 0%, transparent 70%)" }}
          />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid ${children ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-3xl"} gap-12 items-center ${!children ? "mx-auto text-center" : ""}`}>
          {/* Left / Content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={
                  dark
                    ? {
                        background: "rgba(59,130,246,0.1)",
                        borderColor: "rgba(59,130,246,0.25)",
                        color: "#93C5FD",
                      }
                    : {
                        background: `${badgeColor}10`,
                        borderColor: `${badgeColor}25`,
                        color: badgeColor,
                      }
                }
              >
                {badge}
              </motion.div>
            )}

            <h1
              className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: dark ? "#FFFFFF" : "#0F172A" }}
            >
              {titleHighlight ? (
                <>
                  {title}{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #3B82F6, #2DD4BF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {titleHighlight}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            <p
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: dark ? "#94A3B8" : "#64748B" }}
            >
              {subtitle}
            </p>

            {(ctaPrimary || ctaSecondary) && (
              <div className="flex flex-col sm:flex-row gap-3">
                {ctaPrimary && (
                  <Link
                    href={ctaPrimary.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #2563EB, #3B82F6)",
                      boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
                    }}
                  >
                    {ctaPrimary.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border transition-all hover:-translate-y-0.5"
                    style={
                      dark
                        ? {
                            color: "#CBD5E1",
                            borderColor: "rgba(148,163,184,0.2)",
                            background: "rgba(255,255,255,0.04)",
                          }
                        : {
                            color: "#2563EB",
                            borderColor: "#BFDBFE",
                            background: "rgba(37,99,235,0.04)",
                          }
                    }
                  >
                    {ctaSecondary.label}
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Right side — visual */}
          {children && (
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
