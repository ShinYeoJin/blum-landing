"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

/* Card image: one per category (user-specified) */
const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "Hinge Systems",
    desc: "CLIP top BLUMOTION — 경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v1/products#hinge",
    img: `${BASE}/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "Box Systems",
    desc: "LEGRABOX / MERIVOBOX — 가장 까다로운 디자인 요구 사항에 적합한 서랍 시스템. 슬림한 서랍면(12.8mm), 최대 하중 40kg 및 70kg.",
    href: "/v1/products#box",
    img: `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "Lift Systems",
    desc: "AVENTOS — 높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 7가지 제품군 제공.",
    href: "/v1/products/aventos",
    img: `${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "Runner Systems",
    desc: "MOVENTO — 일체형인 듯 매우 가볍게 미끄러지는 듯한 동작, 4차원 프런트 조정. 동적 하중 40kg 및 60kg.",
    href: "/v1/products#runner",
    img: `${BASE}/images/560/258/4202352/corporate/media/bilder/produkte/fuehrungssysteme/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "Motion Technology",
    desc: "TIP-ON / BLUMOTION — 핸들 없는 가구를 원터치로 열 수 있는 기계식 열기 시스템. SERVO-DRIVE 전동 시스템도 제공.",
    href: "/v1/products#motion",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "Pocket Systems",
    desc: "REVEGO — 다기능 공간을 만들 수 있는 완전히 새로운 기회. 독일 디자인상·Red Dot·iF Award 2022 수상.",
    href: "/v1/products#pocket",
    img: `${BASE}/images/560/258/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg`,
  },
];

/* Box system 2nd photo — the single hero image */
const HERO_IMG = `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`;

/* Stagger order from center outward: box(1), hinge(0), lift(2), motion(4), runner(3), pocket(5) */
const STAGGER_ORDER = [1, 0, 2, 4, 3, 5];

export default function V1Products() {
  const heroRef     = useRef<HTMLDivElement>(null);
  const pinOuterRef = useRef<HTMLDivElement>(null);
  const phaseBRef   = useRef<HTMLDivElement>(null);
  const phaseCRef   = useRef<HTMLDivElement>(null);
  const cellRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const cardSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }         = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const hero   = heroRef.current;
      const outer  = pinOuterRef.current;
      const phB    = phaseBRef.current;
      const phC    = phaseCRef.current;
      const cards  = cardSectionRef.current;
      if (!outer || !phB || !phC) return;

      ctx = gsap.context(() => {

        /* ── Phase A: hero text slides up from bottom on load ── */
        if (hero) {
          const items = hero.querySelectorAll<HTMLElement>(".hero-item");
          gsap.from(items, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
          });
        }

        /* ── Pin: Phase B → C scrub ── */
        gsap.set(phB, { opacity: 1 });
        gsap.set(phC, { opacity: 0 });

        /* Each grid cell: start slightly large + invisible (spread-from-center feel) */
        const cells = cellRefs.current.filter(Boolean) as HTMLDivElement[];
        const orderedCells = STAGGER_ORDER.map((i) => cells[i]);

        gsap.set(cells, { scale: 1.35, opacity: 0, transformOrigin: "center center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.4,
          },
        });

        tl
          /* Hold Phase B */
          .to({}, { duration: 0.3 })

          /* Fade out single image */
          .to(phB, { opacity: 0, duration: 0.25, ease: "power2.in" })

          /* Fade in gallery wrapper */
          .to(phC, { opacity: 1, duration: 0.1 }, "<")

          /* Each cell: scale down + fade in, staggered from center outward */
          .to(
            orderedCells,
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.06,
            },
            "<0.05",
          )

          /* Hold Phase C */
          .to({}, { duration: 0.4 });

        /* ── Card section: slide up as it enters viewport ── */
        if (cards) {
          gsap.from(cards.querySelectorAll<HTMLElement>(".card-item"), {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cards,
              start: "top 85%",
            },
          });
        }

        ScrollTrigger.refresh();
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#18181b",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ── Phase A: Hero text ─────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "0 48px 80px",
        }}
      >
        <div style={{ maxWidth: 700 }}>
          <p className="hero-item" style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>
            Products
          </p>
          <h1
            className="hero-item"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#18181b", marginBottom: 28, lineHeight: 1.1 }}
          >
            제품 카테고리
          </h1>
          <div className="hero-item" style={{ width: 48, height: 1, backgroundColor: "#18181b", marginBottom: 28 }} />
          <p className="hero-item" style={{ fontSize: 15, color: "#71717a", lineHeight: 1.75, maxWidth: 520 }}>
            blum의 모든 피팅 솔루션은 기능성과 디자인의 균형을 최우선으로 설계됩니다.
            <br />주방과 가구를 더 아름답고 편리하게.
          </p>
          <div className="hero-item" style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 12, color: "#d4d4d8" }}>
            <span style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase" }}>스크롤</span>
            <div style={{ width: 32, height: 1, backgroundColor: "currentColor" }} />
          </div>
        </div>
      </section>

      {/* ── Phase B + C: Pinned scroll animation ───────────────── */}
      <div ref={pinOuterRef} style={{ height: "300vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#09090b",
          }}
        >
          {/* Phase B: Single box image full-screen */}
          <div ref={phaseBRef} style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            <img
              src={HERO_IMG}
              alt="박스 시스템"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 48, left: 48 }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 8 }}>
                Box Systems
              </p>
              <p style={{ color: "#ffffff", fontSize: 28, fontWeight: 300 }}>박스 시스템</p>
            </div>
          </div>

          {/* Phase C: 6-image gallery grid */}
          <div ref={phaseCRef} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 50vh)",
                width: "100%",
                height: "100%",
                gap: 2,
                backgroundColor: "#09090b",
              }}
            >
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat.id}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>
                      {cat.en}
                    </p>
                    <p style={{ color: "#ffffff", fontSize: 15, fontWeight: 300 }}>{cat.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Phase D: Product cards (normal flow after pin) ──────── */}
      <section
        ref={cardSectionRef}
        style={{
          backgroundColor: "#ffffff",
          padding: "80px 24px 120px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              backgroundColor: "#f4f4f5",
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="card-item group"
                style={{
                  textDecoration: "none",
                  backgroundColor: "#ffffff",
                  display: "block",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    overflow: "hidden",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                {/* Text */}
                <div style={{ padding: "32px" }}>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#a1a1aa",
                      marginBottom: 8,
                    }}
                  >
                    {cat.en}
                  </p>
                  <h2
                    className="transition-colors group-hover:text-zinc-400"
                    style={{ fontSize: 20, fontWeight: 300, color: "#18181b", marginBottom: 12 }}
                  >
                    {cat.name}
                  </h2>
                  <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.65 }}>{cat.desc}</p>
                  <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#18181b",
                      }}
                    >
                      자세히 보기
                    </span>
                    <span
                      className="inline-block transition-transform group-hover:translate-x-1"
                      style={{ color: "#d4d4d8" }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
