"use client";

import React, { useRef, useEffect } from "react";

const BASE = "https://www.blum.com";

export default function CompanyHero() {
  const pinRef  = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const pin  = pinRef.current;
        const text = textRef.current;
        if (!pin || !text) return;

        gsap.set(text, { opacity: 0, y: 52 });

        gsap.timeline({
          scrollTrigger: {
            trigger:    pin,
            start:      "top top",
            end:        "+=80%",
            pin:        true,
            scrub:      0.8,
            pinSpacing: true,
          },
        })
          .to(text, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0);
      });
    };

    const pin = pinRef.current;
    if (!pin) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) return; io.disconnect(); init(); },
      { rootMargin: "0px 0px 300px 0px", threshold: 0 },
    );
    io.observe(pin);
    return () => { io.disconnect(); ctx?.revert(); };
  }, []);

  return (
    <div ref={pinRef} style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <img
        src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
        alt="blum company"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 28%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          textAlign: "center",
          padding: "0 32px",
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
          Company
        </p>
        <p
          style={{
            fontSize: "clamp(14px, 1.6vw, 20px)",
            fontWeight: 300,
            color: "#ffffff",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            marginBottom: 20,
          }}
        >
          blum은 끊임없이 움직여 더 나은 아이디어를 만듭니다.
        </p>
        <div style={{ width: 40, height: 1, backgroundColor: "rgba(255,255,255,0.4)" }} />
      </div>
    </div>
  );
}
