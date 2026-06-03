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

      // Fade-up
      gsap.utils.toArray<HTMLElement>(".gsap-reveal", ref.current!).forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Slide left
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-left", ref.current!).forEach((el) => {
        gsap.from(el, {
          opacity: 0, x: -36, duration: 0.9, ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Slide right
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-right", ref.current!).forEach((el) => {
        gsap.from(el, {
          opacity: 0, x: 36, duration: 0.9, ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Scale in
      gsap.utils.toArray<HTMLElement>(".gsap-scale-in", ref.current!).forEach((el) => {
        gsap.from(el, {
          opacity: 0, scale: 0.92, duration: 0.7, ease: "back.out(1.4)",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Stagger children
      gsap.utils.toArray<HTMLElement>(".gsap-stagger", ref.current!).forEach((parent) => {
        const children = gsap.utils.toArray<HTMLElement>(".gsap-item", parent);
        if (!children.length) return;
        gsap.from(children, {
          opacity: 0, y: 28, duration: 0.55, stagger: 0.08, ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: parent, start: "top 85%", once: true },
        });
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
