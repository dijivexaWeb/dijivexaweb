"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Fade-up reveals
      gsap.utils.toArray<HTMLElement>(".gsap-reveal", ref.current!).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Slide from left
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-left", ref.current!).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Slide from right
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-right", ref.current!).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Scale in
      gsap.utils.toArray<HTMLElement>(".gsap-scale-in", ref.current!).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Stagger children
      gsap.utils.toArray<HTMLElement>(".gsap-stagger", ref.current!).forEach((parent) => {
        const children = gsap.utils.toArray<HTMLElement>(".gsap-item", parent);
        gsap.from(children, {
          opacity: 0,
          y: 32,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: parent, start: "top 85%", once: true },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
