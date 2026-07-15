"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const NAVY  = "#0D1117";
export const GOLD  = "#D4AF37";
export const CREAM = "#F5F0E8";
export const GRAY  = "rgba(245,240,232,0.55)";
export const LINE  = "rgba(212,175,55,0.18)";

export function GCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN]   = useState(0);
  const ref          = useRef<HTMLSpanElement>(null);
  const started      = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();
      const t0 = performance.now(), dur = 2000;
      let raf: number;
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export function FadeIn({ children, delay = 0, y = 32 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref           = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.06 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity:    vis ? 1 : 0,
      transform:  vis ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

export function MaskReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref           = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} v4-mask-reveal${vis ? " v4-mask-go" : ""}`}
      style={{ animationDelay: vis ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
}

export function WipeBanner() {
  gsap.registerPlugin(ScrollTrigger);

  const ref      = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    if (!l1 || !l2 || !l3 || !ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start:   "top bottom",
          end:     "bottom top",
          scrub:   1.4,
        },
      });

      tl.fromTo(l1, { x: -320, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0)
        .fromTo(l2, { x:  320, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.03)
        .fromTo(l3, { x: -320, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.06)
        .to([l1, l2, l3], { x: 0, opacity: 1, duration: 0.3 }, 0.35)
        .to(l1, { x:  320, opacity: 0, ease: "power2.in", duration: 0.35 }, 0.65)
        .to(l2, { x: -320, opacity: 0, ease: "power2.in", duration: 0.35 }, 0.68)
        .to(l3, { x:  320, opacity: 0, ease: "power2.in", duration: 0.35 }, 0.71);
    }, ref);

    return () => ctx.revert();
  }, []);

  const lineStyle: React.CSSProperties = {
    display: "block", willChange: "transform",
    fontSize: "clamp(1.6rem,4vw,3.2rem)", fontWeight: 300,
    color: CREAM, fontStyle: "italic", lineHeight: 1.55,
  };

  return (
    <div ref={ref} style={{ backgroundColor: "#0A0E14", padding: "100px 2rem", textAlign: "center", overflow: "hidden" }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "28px" }}>Our Philosophy</p>
      <div className="v4-font-serif" style={{ maxWidth: "760px", margin: "0 auto 36px" }}>
        <div ref={line1Ref} style={lineStyle}>"가구의 열고 닫음을</div>
        <div ref={line2Ref} style={lineStyle}>매력적인 경험으로</div>
        <div ref={line3Ref} style={lineStyle}>만들어 드립니다."</div>
      </div>
      <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}66` }}>Julius Blum GmbH · Since 1952</span>
    </div>
  );
}
