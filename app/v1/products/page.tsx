"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

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

export default function V1Products() {
  const snapRef    = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const boxWrapRef = useRef<HTMLDivElement>(null);
  const cellRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs   = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const container = snapRef.current;
    const boxWrap   = boxWrapRef.current;
    const hero      = heroRef.current;
    if (!container) return;

    const cells = Array.from({ length: 6 }, (_, i) => cellRefs.current[i]).filter(Boolean) as HTMLDivElement[];
    const cards = Array.from({ length: 6 }, (_, i) => cardRefs.current[i]).filter(Boolean) as HTMLAnchorElement[];

    /* ── Transition helpers ──────────────────────────────── */
    const T = "0.75s cubic-bezier(0.16,1,0.3,1)";

    const showBox = () => {
      if (!boxWrap) return;
      boxWrap.style.transition = `opacity ${T}, transform ${T}`;
      boxWrap.style.opacity    = "1";
      boxWrap.style.transform  = "scale(1)";
    };
    const hideBox = (shrink = false) => {
      if (!boxWrap) return;
      boxWrap.style.transition = `opacity ${T}, transform ${T}`;
      boxWrap.style.opacity    = "0";
      boxWrap.style.transform  = shrink ? "scale(0.88)" : "scale(1.08)";
    };

    const showCells = () => {
      cells.forEach((cell, i) => {
        cell.style.transition     = `opacity 0.7s ease ${i * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`;
        cell.style.opacity        = "1";
        cell.style.transform      = "scale(1)";
      });
    };
    const hideCells = (shrink = false) => {
      cells.forEach((cell) => {
        cell.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        cell.style.opacity    = "0";
        cell.style.transform  = shrink ? "scale(0.94)" : "scale(1.06)";
      });
    };

    const showCards = () => {
      cards.forEach((card, i) => {
        card.style.transition = `opacity 0.8s ease ${i * 120}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`;
        card.style.opacity    = "1";
        card.style.transform  = "translateY(0)";
      });
    };
    const hideCards = (up = false) => {
      cards.forEach((card) => {
        card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        card.style.opacity    = "0";
        card.style.transform  = up ? "translateY(-32px)" : "translateY(40px)";
      });
    };

    /* ── Initial states ─────────────────────────────────── */
    if (boxWrap) { boxWrap.style.opacity = "0"; boxWrap.style.transform = "scale(1.08)"; }
    cells.forEach(cell  => { cell.style.opacity  = "0"; cell.style.transform  = "scale(1.06)"; });
    cards.forEach(card  => { card.style.opacity  = "0"; card.style.transform  = "translateY(40px)"; });

    /* ── Hero text: animate in on mount ─────────────────── */
    if (hero) {
      const items = hero.querySelectorAll<HTMLElement>(".h-item");
      items.forEach((el, i) => {
        el.style.opacity   = "0";
        el.style.transform = "translateY(48px)";
        el.style.transition = `opacity 0.9s ease ${i * 130}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 130}ms`;
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          items.forEach((el) => {
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
          });
        });
      });
    }

    /* ── Scroll-snap tracker ────────────────────────────── */
    let currentSnap = 0;

    const applySnap = (snap: number, prev: number) => {
      const goingDown = snap > prev;

      if (snap === 0) {
        hideBox();
        hideCells();
        hideCards();
      } else if (snap === 1) {
        showBox();
        hideCells(/* shrink when coming back */ !goingDown);
        hideCards();
      } else if (snap === 2) {
        hideBox(/* shrink */ goingDown);
        showCells();
        hideCards(/* slide up */ !goingDown);
      } else if (snap >= 3) {
        hideBox(true);
        hideCells(true);
        showCards();
      }
    };

    const onScroll = () => {
      const vh   = container.clientHeight;
      const raw  = container.scrollTop / vh;
      const snap = Math.round(raw);
      if (snap !== currentSnap) {
        const prev  = currentSnap;
        currentSnap = snap;
        applySnap(snap, prev);
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  /* ── JSX ──────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        .prod-snap::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Outer snap container — 100vh viewport, inner sections snap */}
      <div
        ref={snapRef}
        className="prod-snap"
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
        }}
      >

        {/* ═══ Section 0: Hero title ════════════════════════ */}
        <section
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div ref={heroRef} style={{ textAlign: "center", maxWidth: 600, padding: "0 32px" }}>
            <p className="h-item" style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 24, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
              Products
            </p>
            <h1 className="h-item" style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#18181b", marginBottom: 28, lineHeight: 1.1, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
              제품 카테고리
            </h1>
            <div className="h-item" style={{ width: 40, height: 1, backgroundColor: "#d4d4d8", margin: "0 auto 28px" }} />
            <p className="h-item" style={{ fontSize: 15, color: "#71717a", lineHeight: 1.8, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
              blum의 모든 피팅 솔루션은 기능성과 디자인의 균형을 최우선으로 설계됩니다.
              <br />주방과 가구를 더 아름답고 편리하게.
            </p>
          </div>
        </section>

        {/* ═══ Section 1 (STEP 1): Single box image ════════ */}
        <section
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={boxWrapRef}
            style={{
              width: "60%",
              height: "60vh",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
            }}
          >
            <img
              src={CATEGORIES[1].img}
              alt="박스 시스템"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </section>

        {/* ═══ Section 2 (STEP 2): 6-image grid ═══════════ */}
        <section
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            backgroundColor: "#09090b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/*
            Gap calculation for ~40% gap/cell ratio:
            Inner width = 94vw, gap = 10vw
            Cell = (94vw - 2×10vw) / 3 = 24.7vw
            gap/cell = 10/24.7 ≈ 40.5% ✓
          */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "8vh 10vw",
              padding: "4vh 3vw",
              width: "100%",
              height: "100%",
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
        </section>

        {/* ═══ Section 3 (STEP 3): Product cards ══════════ */}
        <section
          style={{
            minHeight: "100vh",
            scrollSnapAlign: "start",
            backgroundColor: "#ffffff",
            padding: "80px 24px 80px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Label */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 12 }}>
                All Products
              </p>
              <div style={{ width: 40, height: 1, backgroundColor: "#e4e4e7", margin: "0 auto" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                backgroundColor: "#f4f4f5",
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
                    display: "block",
                  }}
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
                  <div style={{ padding: "28px 28px 32px" }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 8 }}>
                      {cat.en}
                    </p>
                    <h2
                      className="transition-colors group-hover:text-zinc-400"
                      style={{ fontSize: 18, fontWeight: 300, color: "#18181b", marginBottom: 10 }}
                    >
                      {cat.name}
                    </h2>
                    <p style={{ fontSize: 12, color: "#71717a", lineHeight: 1.65 }}>{cat.desc}</p>
                    <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#18181b" }}>
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
    </>
  );
}
