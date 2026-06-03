"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "Hinge Systems",
    desc: "CLIP top BLUMOTION — 도어 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v1/products#hinge",
    img: `${BASE}/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "Box Systems",
    desc: "LEGRABOX / MERIVOBOX — 슬림한 서랍면(12.8mm), 최대 하중 40kg 및 70kg.",
    href: "/v1/products#box",
    img: `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "Lift Systems",
    desc: "AVENTOS — 높이가 높은 캐비닛과 상부장을 위한 리프트 시스템. 7가지 제품군.",
    href: "/v1/products/aventos",
    img: `${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "Runner Systems",
    desc: "MOVENTO — 4차원 프런트 조정, 동적 하중 40kg 및 60kg.",
    href: "/v1/products#runner",
    img: `${BASE}/images/560/258/4202352/corporate/media/bilder/produkte/fuehrungssysteme/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "Motion Technology",
    desc: "TIP-ON / BLUMOTION — 원터치로 열 수 있는 기계식 열기 시스템.",
    href: "/v1/products#motion",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "Pocket Systems",
    desc: "REVEGO — Red Dot·iF Award 2022 수상. 완전히 새로운 공간 활용.",
    href: "/v1/products#pocket",
    img: `${BASE}/images/560/258/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg`,
  },
];

export default function V1Products() {
  /* Section 1: hero */
  const heroRef   = useRef<HTMLElement>(null);

  /* Section 2: pin container + layers */
  const pinRef    = useRef<HTMLDivElement>(null);
  const singleRef = useRef<HTMLDivElement>(null);
  const cellRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs  = useRef<(HTMLAnchorElement | null)[]>([]);

  /* ── Section 1: hero text reveal (plays on mount + on nav re-entry) ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const playHero = () => {
      const items = hero.querySelectorAll<HTMLElement>(".h-item");
      items.forEach((el) => {
        el.style.transition = "";
        el.style.opacity    = "0";
        el.style.transform  = "translateY(52px)";
      });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        items.forEach((el, i) => {
          el.style.transition = `opacity 0.9s ease ${i * 140}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 140}ms`;
          el.style.opacity    = "1";
          el.style.transform  = "translateY(0)";
        });
      }));
    };

    window.scrollTo(0, 0);
    playHero();
    window.addEventListener("v1-products-enter", playHero);
    return () => window.removeEventListener("v1-products-enter", playHero);
  }, []);

  /* ── Section 2: GSAP ScrollTrigger pin + scrub ── */
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const pin    = pinRef.current;
        const single = singleRef.current;
        if (!pin || !single) return;

        const cells = Array.from({ length: 6 }, (_, i) => cellRefs.current[i]).filter(Boolean) as HTMLDivElement[];
        const cards = Array.from({ length: 6 }, (_, i) => cardRefs.current[i]).filter(Boolean) as HTMLAnchorElement[];

        /* Initial hidden states */
        gsap.set(cells, { opacity: 0, scale: 1.1 });
        gsap.set(cards, { opacity: 0, y: 56 });

        /*
          end: "+=300%" = 3 viewport-heights of scroll.
          Timeline total = 3.0 so 1 unit = 1 screen:
            t 0-1  (screen 1) = Phase 1→2 transition
            t 1-2  (screen 2) = Phase 2 hold (grid fully visible)
            t 2-3  (screen 3) = Phase 2→3 transition (cards appear)
        */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:    pin,
            start:      "top top",
            end:        "+=300%",
            pin:        true,
            scrub:      1,
            pinSpacing: true,
          },
        });

        tl
          /* ── Phase 1 → 2 (screen 1, t 0-1)
             Box image shrinks to nothing while grid stagger-fades in.  */
          .to(single, { scale: 0, opacity: 0, duration: 0.7, ease: "power2.in" }, 0)
          .to(cells,  { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, 0)

          /* ── Phase 2 → 3 (screen 3, t 2-3)
             Grid fades while cards rise in.
             Absolute position "2" locks this to the third screen.
             stagger 0.15 × 5 = 0.75, dur 0.35 → last card ends at 3.1
             (slightly past 3 is fine — GSAP clamps at end)              */
          .to(cells, { opacity: 0, scale: 0.95, duration: 0.3 }, 2)
          .to(cards, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15, ease: "power3.out" }, 2)

          /* Pad to exactly 3.0 */
          .to({}, { duration: 0.01 }, 2.99);

        ScrollTrigger.refresh();
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  /* ── JSX ── */
  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* ════════════════════════════════════════════════
          SECTION 1 — Hero title (100 vh, white)
          Intersection Observer triggers sequential reveal.
      ════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "0 32px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 600 }}>
          <p className="h-item" style={{ fontSize: 11, letterSpacing: "0.45em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 24 }}>
            Products
          </p>
          <h1 className="h-item" style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#18181b", marginBottom: 28, lineHeight: 1.1 }}>
            제품 카테고리
          </h1>
          <div className="h-item" style={{ width: 40, height: 1, backgroundColor: "#d4d4d8", margin: "0 auto 28px" }} />
          <p className="h-item" style={{ fontSize: 15, color: "#71717a", lineHeight: 1.8 }}>
            blum의 모든 피팅 솔루션은 기능성과 디자인의 균형을 최우선으로 설계됩니다.
            <br />주방과 가구를 더 아름답고 편리하게.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 2 — Pin container (GSAP ScrollTrigger)
          One fixed screen, 3 phases driven by scrub.
      ════════════════════════════════════════════════ */}
      <div
        ref={pinRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >

        {/* ── Phase 1: Single box image ── */}
        <div
          ref={singleRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            pointerEvents: "none",
          }}
        >
          <div style={{ width: "60%", height: "60vh", overflow: "hidden", boxShadow: "0 16px 56px rgba(0,0,0,0.11)" }}>
            <img
              src={CATEGORIES[1].img}
              alt="박스 시스템"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>

        {/* ── Phase 2: 6-image grid (no text, wide gap) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            /* NO backgroundColor here — when cells fade out, Phase 3 cards show through */
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "3rem",
            padding: "3rem",
            boxSizing: "border-box",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              ref={(el) => { cellRefs.current[i] = el; }}
              style={{ overflow: "hidden" }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>

        {/* ── Phase 3: Product cards ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundColor: "#ffffff",
            padding: "36px 28px 28px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Label */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa" }}>
              All Products
            </p>
            <div style={{ width: 32, height: 1, backgroundColor: "#e4e4e7", margin: "10px auto 0" }} />
          </div>

          {/* 3 × 2 card grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              backgroundColor: "#f4f4f5",
              height: "calc(100% - 58px)",
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                href={cat.href}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group"
                style={{ textDecoration: "none", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", overflow: "hidden" }}
              >
                {/* Image */}
                <div style={{ flex: "0 0 44%", overflow: "hidden" }}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                {/* Text */}
                <div style={{ flex: "1 1 auto", padding: "12px 14px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 3 }}>
                      {cat.en}
                    </p>
                    <h2
                      className="transition-colors group-hover:text-zinc-400"
                      style={{ fontSize: 13, fontWeight: 300, color: "#18181b", marginBottom: 5, lineHeight: 1.3 }}
                    >
                      {cat.name}
                    </h2>
                    <p style={{ fontSize: 10, color: "#71717a", lineHeight: 1.5 }}>{cat.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#18181b" }}>
                      자세히 보기
                    </span>
                    <span className="inline-block transition-transform group-hover:translate-x-1" style={{ color: "#d4d4d8", fontSize: 11 }}>
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>{/* end pin container */}
    </div>
  );
}
