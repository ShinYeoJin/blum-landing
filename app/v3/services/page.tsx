"use client";

import { useRef, useEffect } from "react";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

const SERVICES = [
  {
    id: "plan",
    name: "계획 / 설계 지원",
    en: "PLANNING",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
    num: "01",
  },
  {
    id: "digital",
    name: "E-Services",
    en: "E-SERVICES",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결됩니다.",
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
    num: "02",
  },
  {
    id: "assembly",
    name: "조립 / 조정 지원",
    en: "ASSEMBLY",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 blum의 조립 장치로 작업을 단순화합니다.",
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
    num: "03",
  },
  {
    id: "marketing",
    name: "마케팅 / 판매 지원",
    en: "MARKETING",
    desc: "blum 제품을 판매하는 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 멀티미디어 자료를 제공합니다.",
    img: `${BASE}/images/560/258/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
    items: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
    num: "04",
  },
];

/* "FULL SUPPORT." split into spans with letter-flip */
const HEADLINE = "FULL SUPPORT.";

export default function V3Services() {
  /* refs: [0]=hero, [1..4]=service sections */
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  /* ── Hero text animations on mount ── */
  const tagRef  = useRef<HTMLParagraphElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    /* "SERVICES" tag */
    const tag = tagRef.current;
    if (tag) {
      tag.style.opacity   = "0";
      tag.style.transform = "translateY(40px)";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        tag.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        tag.style.opacity    = "1";
        tag.style.transform  = "translateY(0)";
      }));
    }
    /* subtitle */
    const sub = subRef.current;
    if (sub) {
      sub.style.opacity   = "0";
      sub.style.transform = "translateY(40px)";
      setTimeout(() => {
        sub!.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        sub!.style.opacity    = "1";
        sub!.style.transform  = "translateY(0)";
      }, 200);
    }
  }, []);

  /* ── Scroll-driven stack ── */
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const y  = window.scrollY;
      const vh = window.innerHeight;
      /* sections 1-4 (service panels), hero stays put */
      sectionRefs.current.forEach((el, i) => {
        if (!el || i === 0) return;
        const progress = Math.max(0, Math.min(1, (y - (i - 1) * vh) / vh));
        el.style.transform = `translateY(${(1 - progress) * 100}vh)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update(); /* set initial transform */
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  /* shared fixed section style */
  const fixed = (zIdx: number): React.CSSProperties => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: zIdx,
    overflow: "hidden",
    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
  });

  return (
    <>
      <style>{`
        @keyframes v3LetterFlip {
          from { opacity: 0; transform: rotateY(-180deg); }
          to   { opacity: 1; transform: rotateY(0deg);    }
        }
      `}</style>

      {/* ─────────────────────────────────────────
          HERO — z-index 1, always behind services
      ───────────────────────────────────────── */}
      <section
        ref={setRef(0)}
        style={{
          ...fixed(1),
          backgroundColor: "#000000",
          color: "#f0f0f0",
          display: "flex",
          alignItems: "flex-end",
          padding: "0 48px 80px",
        }}
      >
        {/* dim bg image */}
        <img
          src={`${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 40%, rgba(0,0,0,0.15) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, width: "100%" }}>
          <p ref={tagRef} style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 20 }}>
            Services
          </p>

          {/* Letter-flip headline */}
          <h1 style={{ fontSize: "clamp(44px, 9vw, 110px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, marginBottom: 24, display: "flex", flexWrap: "wrap" }}>
            {HEADLINE.split("").map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color: i >= "FULL ".length ? RED : "#f0f0f0",
                  width: ch === " " ? "0.3em" : undefined,
                  animation: ch !== " "
                    ? `v3LetterFlip 0.45s cubic-bezier(0.4,0,0.2,1) ${i * 50}ms both`
                    : "none",
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h1>

          <div style={{ width: 60, height: 3, backgroundColor: RED, marginBottom: 20 }} />

          <p ref={subRef} style={{ fontSize: 14, maxWidth: 520, lineHeight: 1.75, color: "rgba(240,240,240,0.45)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            제품 선택, 설계 지원, 디지털 서비스, 조립 지원까지 — blum의 종합 서비스 생태계.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SERVICE SECTIONS — z-index 2,3,4,5
          start at translateY(100vh), stacks over hero
      ───────────────────────────────────────── */}
      {SERVICES.map((svc, i) => {
        const imgLeft = i % 2 === 0;
        return (
          <section
            key={svc.id}
            ref={setRef(i + 1)}
            id={svc.id}
            style={{
              ...fixed(i + 2),
              backgroundColor: i % 2 === 0 ? "#0a0a0a" : "#050505",
              color: "#f0f0f0",
              display: "flex",
            }}
          >
            {/* Image side */}
            <div style={{ flex: "0 0 52%", order: imgLeft ? 1 : 2, overflow: "hidden", position: "relative" }}>
              <img
                src={svc.img}
                alt={svc.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(15%)" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {/* red overlay strip */}
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 4, backgroundColor: RED }} />
            </div>

            {/* Text side */}
            <div
              style={{
                flex: "1 1 0",
                order: imgLeft ? 2 : 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 64px",
                backgroundColor: i % 2 === 0 ? "#0a0a0a" : "#050505",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
                <span style={{ fontSize: 9, letterSpacing: "0.3em", fontWeight: 900, color: "rgba(200,16,46,0.45)" }}>{svc.num}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.35em", fontWeight: 900, color: RED }}>{svc.en}</span>
              </div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 900, textTransform: "uppercase", color: "#f0f0f0", lineHeight: 1.1, marginBottom: 20 }}>
                {svc.name}
              </h2>
              <div style={{ width: 40, height: 3, backgroundColor: RED, marginBottom: 20 }} />
              <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(240,240,240,0.45)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 28, maxWidth: 400 }}>
                {svc.desc}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {svc.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "rgba(240,240,240,0.55)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                    <span style={{ width: 6, height: 6, backgroundColor: RED, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ─────────────────────────────────────────
          SCROLL SPACE: 5 sections × 100vh
          (1 hero + 4 transitions = 400vh scroll + 100vh viewport = 500vh)
      ───────────────────────────────────────── */}
      <div style={{ height: `${(SERVICES.length + 1) * 100}vh` }} aria-hidden="true" />

      {/* ─────────────────────────────────────────
          CTA — normal flow, appears after stack
          z-index above all fixed sections
      ───────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "80px 48px",
          textAlign: "center",
          borderTop: "1px solid rgba(200,16,46,0.2)",
          backgroundColor: "#0a0a0a",
          fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
          color: "#f0f0f0",
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>
          Online Portal
        </p>
        <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>
          E-SERVICES
        </h2>
        <p style={{ fontSize: 13, marginBottom: 32, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
          제품 구성, CAD 데이터, 주문 관리를 온라인으로 한 번에.
        </p>
        <a
          href="https://e-services.blum.com/main/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 900,
            padding: "16px 40px",
            backgroundColor: RED,
            color: "#fff",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          E-Services 접속
        </a>
      </section>
    </>
  );
}
