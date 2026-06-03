"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

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

/* ── Scroll-parallax section card ── */
function ParallaxSection({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el  = ref.current;
    const img = imgRef.current;
    const txt = txtRef.current;
    if (!el || !img || !txt) return;

    const update = () => {
      const rect   = el.getBoundingClientRect();
      const vh     = window.innerHeight;
      /* progress: 0 when bottom of section enters viewport, 1 when top at viewport top */
      const raw    = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));
      /* ease: start from 0.2 (20% visible) to 0.8 (80% through) */
      const eased  = Math.max(0, Math.min(1, (clamped - 0.15) / 0.55));

      const ty  = (1 - eased) * 60;
      const op  = eased;

      img.style.opacity   = String(op);
      img.style.transform = `translateY(${ty}px)`;
      txt.style.opacity   = String(op);
      txt.style.transform = `translateY(${ty}px)`;
    };

    /* set initial state immediately */
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isOdd = index % 2 === 1;

  return (
    <section
      ref={ref}
      id={svc.id}
      style={{
        borderTop: `1px solid rgba(200,16,46,0.15)`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        scrollMarginTop: "80px",
      }}
    >
      {/* Image */}
      <div
        ref={imgRef}
        style={{
          order: isOdd ? 2 : 1,
          overflow: "hidden",
          maxHeight: 360,
          willChange: "transform, opacity",
        }}
      >
        <img
          src={svc.img}
          alt={svc.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            minHeight: 280,
            filter: "grayscale(20%)",
            transition: "transform 0.7s ease",
            display: "block",
          }}
          className="hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Text */}
      <div
        ref={txtRef}
        style={{
          order: isOdd ? 1 : 2,
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: isOdd ? "#000" : "#0a0a0a",
          willChange: "transform, opacity",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", fontWeight: 900, color: "rgba(200,16,46,0.5)" }}>{svc.num}</span>
          <span style={{ fontSize: 9, letterSpacing: "0.35em", fontWeight: 900, color: RED }}>{svc.en}</span>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", marginBottom: 20, color: "#f0f0f0" }}>{svc.name}</h2>
        <p style={{ fontSize: 13, lineHeight: 1.75, marginBottom: 24, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>{svc.desc}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
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
}

/* ── "FULL SUPPORT" letter flip ── */
const FULL_SUPPORT = "FULL SUPPORT.".split("");

function HeroLetters() {
  const letters = FULL_SUPPORT;
  return (
    <h1
      style={{
        fontSize: "clamp(40px, 8vw, 96px)",
        fontWeight: 900,
        textTransform: "uppercase",
        lineHeight: 1,
        marginBottom: 24,
        display: "flex",
        flexWrap: "wrap",
        gap: 0,
      }}
    >
      {letters.map((ch, i) => {
        const isRed = i >= "FULL ".length; /* "SUPPORT." is red */
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: isRed ? RED : "#f0f0f0",
              animation: ch === " " ? "none" : `letterFlip 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms both`,
              /* space becomes actual gap */
              width: ch === " " ? "0.35em" : undefined,
            }}
          >
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </h1>
  );
}

/* ── Page ── */
export default function V3Services() {
  const subRef  = useRef<HTMLParagraphElement>(null);
  const tagRef  = useRef<HTMLParagraphElement>(null);

  /* Slide-up for "SERVICES" tag + subtitle */
  useEffect(() => {
    [tagRef.current, subRef.current].forEach((el, i) => {
      if (!el) return;
      el.style.opacity   = "0";
      el.style.transform = "translateY(40px)";
      setTimeout(() => {
        el!.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)";
        el!.style.opacity    = "1";
        el!.style.transform  = "translateY(0)";
      }, i * 120);
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes letterFlip {
          from {
            opacity: 0;
            transform: rotateY(-90deg) scaleX(0.5);
          }
          to {
            opacity: 1;
            transform: rotateY(0deg) scaleX(1);
          }
        }
      `}</style>

      <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>

        {/* ── Hero ── */}
        <section className="relative flex items-end overflow-hidden" style={{ minHeight: 380, paddingTop: 80 }}>
          <div className="absolute inset-0">
            <img
              src={`${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`}
              alt="blum services"
              className="w-full h-full object-cover"
              style={{ opacity: 0.15 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 50%, rgba(0,0,0,0.2) 100%)" }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
            <p
              ref={tagRef}
              style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}
            >
              Services
            </p>

            {/* Letter-flip headline */}
            <HeroLetters />

            <div style={{ width: 60, height: 3, backgroundColor: RED, marginBottom: 16 }} />

            <p
              ref={subRef}
              style={{ fontSize: 13, maxWidth: 480, lineHeight: 1.7, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}
            >
              제품 선택, 설계 지원, 디지털 서비스, 조립 지원까지 — blum의 종합 서비스 생태계.
            </p>
          </div>
        </section>

        {/* ── Services list — scroll parallax ── */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          {SERVICES.map((svc, i) => (
            <ParallaxSection key={svc.id} svc={svc} index={i} />
          ))}
        </main>

        {/* ── E-Services CTA ── */}
        <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a", textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>Online Portal</p>
          <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>E-SERVICES</h2>
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

      </div>
    </>
  );
}
