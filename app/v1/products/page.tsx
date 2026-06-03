"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

/* ── Per-category data ──────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "Hinge Systems",
    desc: "CLIP top BLUMOTION — 경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v1/products#hinge",
    /* 2nd image */
    img: `${BASE}/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "Box Systems",
    desc: "LEGRABOX / MERIVOBOX — 가장 까다로운 디자인 요구 사항에 적합한 서랍 시스템. 슬림한 서랍면(12.8mm), 최대 하중 40kg 및 70kg.",
    href: "/v1/products#box",
    /* 2nd image — also used as the hero single image */
    img: `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "Lift Systems",
    desc: "AVENTOS — 높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 7가지 제품군 제공.",
    href: "/v1/products/aventos",
    /* 2nd image */
    img: `${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "Runner Systems",
    desc: "MOVENTO — 일체형인 듯 매우 가볍게 미끄러지는 듯한 동작, 4차원 프런트 조정. 동적 하중 40kg 및 60kg.",
    href: "/v1/products#runner",
    /* 1st image */
    img: `${BASE}/images/560/258/4202352/corporate/media/bilder/produkte/fuehrungssysteme/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "Motion Technology",
    desc: "TIP-ON / BLUMOTION — 핸들 없는 가구를 원터치로 열 수 있는 기계식 열기 시스템. SERVO-DRIVE 전동 시스템도 제공.",
    href: "/v1/products#motion",
    /* 1st image */
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "Pocket Systems",
    desc: "REVEGO — 다기능 공간을 만들 수 있는 완전히 새로운 기회. 독일 디자인상·Red Dot·iF Award 2022 수상.",
    href: "/v1/products#pocket",
    /* 1st image */
    img: `${BASE}/images/560/258/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg`,
  },
];

/* Stagger order from center outward: box(1) first, then hinge(0)/lift(2), then motion(4)/runner(3), pocket(5) */
const STAGGER_ORDER = [1, 0, 2, 4, 3, 5];

export default function V1Products() {
  /* refs ─────────────────────────────────────────── */
  const step1Ref     = useRef<HTMLElement>(null);
  const pinOuterRef  = useRef<HTMLDivElement>(null);

  /* layer A: white bg + centered box image (Step 2) */
  const layerARef    = useRef<HTMLDivElement>(null);
  const boxImgRef    = useRef<HTMLDivElement>(null); // the centered image wrapper

  /* layer B: dark bg + 6-image grid (Step 3) */
  const layerBRef    = useRef<HTMLDivElement>(null);
  const boxOverRef   = useRef<HTMLDivElement>(null); // full-screen box overlay inside B
  const cellRefs     = useRef<(HTMLDivElement | null)[]>([]);

  /* Step 4 cards */
  const cardsRef     = useRef<HTMLDivElement>(null);

  /* ── GSAP ──────────────────────────────────────── */
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        /* ── STEP 1: title / desc slide up on page load ── */
        const step1 = step1Ref.current;
        if (step1) {
          gsap.from(step1.querySelectorAll<HTMLElement>(".s1-item"), {
            y: 64, opacity: 0,
            duration: 1.1, ease: "power3.out",
            stagger: 0.13,
          });
        }

        /* ── STEP 2 & 3: pinned scrub ── */
        const pinOuter = pinOuterRef.current;
        const layerA   = layerARef.current;
        const layerB   = layerBRef.current;
        const boxImg   = boxImgRef.current;
        const boxOver  = boxOverRef.current;
        if (!pinOuter || !layerA || !layerB || !boxImg || !boxOver) return;

        const cells = STAGGER_ORDER.map((i) => cellRefs.current[i]).filter(Boolean) as HTMLDivElement[];

        /* Initial states */
        gsap.set(layerA,  { opacity: 1 });
        gsap.set(boxImg,  { opacity: 0, scale: 1.1 });
        gsap.set(layerB,  { opacity: 0 });
        gsap.set(boxOver, { scale: 1, opacity: 1 });
        gsap.set(cells,   { opacity: 0, scale: 1.12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinOuter,
            start:   "top top",
            end:     "bottom bottom",
            scrub:   1.2,
          },
        });

        tl
          /* ─ Phase A: box image fades in (Step 2) ─ */
          .to(boxImg, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0)

          /* ─ Hold ─ */
          .to({}, { duration: 0.5 })

          /* ─ A → B cross-fade ─ */
          .to(layerA, { opacity: 0, duration: 0.5, ease: "power1.in" }, 1.3)
          .to(layerB, { opacity: 1, duration: 0.3, ease: "power1.out" }, 1.3)

          /* ─ Phase B: box overlay shrinks, 6 cells appear (Step 3) ─ */
          .to(boxOver, {
            scale: 0.52,
            opacity: 0,
            duration: 0.7,
            ease: "power2.in",
            transformOrigin: "center center",
          }, 1.7)
          .to(cells, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.1,
          }, 1.75)

          /* ─ Hold ─ */
          .to({}, { duration: 0.6 });

        /* ── STEP 4: cards slide up as they enter viewport ── */
        const cardsEl = cardsRef.current;
        if (cardsEl) {
          gsap.from(cardsEl.querySelectorAll<HTMLElement>(".card-item"), {
            y: 56, opacity: 0,
            duration: 0.9, ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: cardsEl, start: "top 85%" },
          });
        }

        ScrollTrigger.refresh();
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  /* ── JSX ───────────────────────────────────────── */
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* ══ STEP 1: Hero title (100vh) ════════════════════════════ */}
      <section
        ref={step1Ref}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "0 48px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 640 }}>
          <p
            className="s1-item"
            style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 24 }}
          >
            Products
          </p>
          <h1
            className="s1-item"
            style={{
              fontSize: "clamp(38px, 6vw, 80px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#18181b",
              marginBottom: 28,
              lineHeight: 1.1,
            }}
          >
            제품 카테고리
          </h1>
          <div className="s1-item" style={{ width: 40, height: 1, backgroundColor: "#d4d4d8", margin: "0 auto 28px" }} />
          <p
            className="s1-item"
            style={{ fontSize: 15, color: "#71717a", lineHeight: 1.8 }}
          >
            blum의 모든 피팅 솔루션은 기능성과 디자인의 균형을 최우선으로 설계됩니다.
            <br />주방과 가구를 더 아름답고 편리하게.
          </p>
        </div>
      </section>

      {/* ══ STEP 2 + 3: Pinned scroll animation (400vh) ═══════════ */}
      <div ref={pinOuterRef} style={{ height: "400vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >

          {/* ─ Layer A: white bg, centered box image (Step 2) ─ */}
          <div
            ref={layerARef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={boxImgRef}
              style={{
                width: "80%",
                height: "80vh",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
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

          {/* ─ Layer B: dark bg, 6 grid images (Step 3) ─ */}
          <div
            ref={layerBRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              backgroundColor: "#09090b",
            }}
          >
            {/* Box full-screen overlay — shrinks during step 3 */}
            <div
              ref={boxOverRef}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 3,
                transformOrigin: "center center",
              }}
            >
              <img
                src={CATEGORIES[1].img}
                alt="박스 시스템"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>

            {/* 6-image grid (behind overlay, revealed as overlay shrinks) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 50vh)",
                gap: 2,
                backgroundColor: "#09090b",
              }}
            >
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat.id}
                  ref={(el) => { cellRefs.current[i] = el; }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 16, left: 18 }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>
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

      {/* ══ STEP 4: Product cards (normal flow) ════════════════════ */}
      <section
        ref={cardsRef}
        style={{
          backgroundColor: "#ffffff",
          padding: "96px 24px 128px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Section label */}
          <div className="card-item" style={{ marginBottom: 56, textAlign: "center" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 12 }}>
              All Products
            </p>
            <div style={{ width: 40, height: 1, backgroundColor: "#d4d4d8", margin: "0 auto" }} />
          </div>

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
                style={{ textDecoration: "none", backgroundColor: "#ffffff", display: "block" }}
              >
                {/* Image */}
                <div style={{ overflow: "hidden", aspectRatio: "4 / 3", backgroundColor: "#fafafa" }}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                {/* Text */}
                <div style={{ padding: "32px" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 8 }}>
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
                    <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#18181b" }}>
                      자세히 보기
                    </span>
                    <span className="inline-block transition-transform group-hover:translate-x-1" style={{ color: "#d4d4d8" }}>
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
