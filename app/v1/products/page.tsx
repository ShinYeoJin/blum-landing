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
  const introRef  = useRef<HTMLDivElement>(null);
  const singleRef = useRef<HTMLDivElement>(null);
  const cellRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs  = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const intro  = introRef.current;
        const single = singleRef.current;
        if (!intro || !single) return;

        const cells = Array.from({ length: 6 }, (_, i) => cellRefs.current[i]).filter(Boolean) as HTMLDivElement[];
        const cards = Array.from({ length: 6 }, (_, i) => cardRefs.current[i]).filter(Boolean) as HTMLAnchorElement[];

        /* ── Initial states ── */
        gsap.set(cells, { opacity: 0, scale: 1.12 });
        gsap.set(cards, { opacity: 0, y: 56 });

        /*
          Timeline total ≈ 3.2 units.
          Pin end: "+=300%" → each unit ≈ 1 screen of scroll.
          Phase 1 hold   : 0   → 1.0  (first screen, box image stays)
          Phase 1→2 trans: 1.0 → 1.9  (box shrinks, grid appears)
          Phase 2 hold   : 1.9 → 2.2
          Phase 2→3 trans: 2.2 → 3.2  (grid fades, cards rise)
        */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start:   "top top",
            end:     "+=300%",
            pin:     true,
            scrub:   1,
            pinSpacing: true,
          },
        });

        tl
          /* Phase 1→2 */
          .to(single, { scale: 0.35, opacity: 0, duration: 0.7, ease: "power2.in" }, 1.0)
          .to(cells,  { opacity: 1, scale: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" }, 1.1)

          /* Phase 2→3 */
          .to(cells, { opacity: 0, scale: 0.94, duration: 0.35 }, 2.2)
          .to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: "power3.out" }, 2.3);

        ScrollTrigger.refresh();
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* ═══════════════════════════════════════════════════
          Pinned intro — all 3 phases happen inside this div.
          GSAP ScrollTrigger pins it and scrubs the timeline
          over 300% of scroll distance.
      ═══════════════════════════════════════════════════ */}
      <div
        ref={introRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >

        {/* ── PHASE 1: Single box image ─────────────────── */}
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
          }}
        >
          <div
            style={{
              width: "60%",
              height: "60vh",
              overflow: "hidden",
              boxShadow: "0 16px 56px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src={CATEGORIES[1].img}
              alt="박스 시스템"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>

        {/* ── PHASE 2: 6-image grid ─────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            backgroundColor: "#ffffff",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "8vh 10vw",
            padding: "5vh 5vw",
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

        {/* ── PHASE 3: Product cards ────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundColor: "#ffffff",
            overflowY: "hidden",
            padding: "40px 32px 32px",
            boxSizing: "border-box",
          }}
        >
          {/* Label */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa" }}>
              All Products
            </p>
            <div style={{ width: 32, height: 1, backgroundColor: "#e4e4e7", margin: "10px auto 0" }} />
          </div>

          {/* Card grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              backgroundColor: "#f4f4f5",
              height: "calc(100% - 68px)",
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                href={cat.href}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group"
                style={{
                  textDecoration: "none",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div style={{ flex: "0 0 auto", overflow: "hidden", height: "42%" }}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                {/* Text */}
                <div style={{ flex: "1 1 auto", padding: "14px 16px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 4 }}>
                      {cat.en}
                    </p>
                    <h2
                      className="transition-colors group-hover:text-zinc-400"
                      style={{ fontSize: 14, fontWeight: 300, color: "#18181b", marginBottom: 6 }}
                    >
                      {cat.name}
                    </h2>
                    <p style={{ fontSize: 10, color: "#71717a", lineHeight: 1.55 }}>{cat.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#18181b" }}>
                      자세히 보기
                    </span>
                    <span
                      className="inline-block transition-transform group-hover:translate-x-1"
                      style={{ color: "#d4d4d8", fontSize: 11 }}
                    >
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
