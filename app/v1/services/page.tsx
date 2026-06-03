"use client";

import { useRef, useState, useEffect } from "react";

const BASE = "https://www.blum.com";

const SERVICES = [
  {
    id: "plan",
    num: "01",
    name: "계획 / 설계 지원",
    en: "Plan & Design",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계하고, 정확한 도면 데이터를 받아보세요.",
    features: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    id: "digital",
    num: "02",
    name: "E-Services",
    en: "E-Services",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결됩니다.",
    features: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
  },
  {
    id: "assembly",
    num: "03",
    name: "조립 / 조정 지원",
    en: "Assembly & Fitting",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 blum의 조립 장치로 작업을 단순화합니다.",
    features: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    id: "marketing",
    num: "04",
    name: "마케팅 / 판매 지원",
    en: "Trade Marketing",
    desc: "blum 제품을 판매하는 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 멀티미디어 자료와 제품 이미지를 제공합니다.",
    features: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
    img: `${BASE}/images/560/258/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
  },
];

/* Hero text items — sequential slide-up via IO */
function HeroText() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".hero-item");
    items.forEach((item) => {
      item.style.opacity   = "0";
      item.style.transform = "translateY(48px)";
      item.style.transition = "";
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        items.forEach((item, i) => {
          item.style.transition = `opacity 0.9s ease ${i * 150}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`;
          item.style.opacity    = "1";
          item.style.transform  = "translateY(0)";
        });
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", zIndex: 10, maxWidth: 680 }}>
      <p className="hero-item" style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
        Services
      </p>
      <h1
        className="hero-item"
        style={{ fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 300, color: "#ffffff", lineHeight: 1.2, marginBottom: 24 }}
      >
        설계부터 설치까지<br />blum이 함께합니다
      </h1>
      <div className="hero-item" style={{ width: 40, height: 1, backgroundColor: "rgba(255,255,255,0.4)", marginBottom: 20 }} />
      <p
        className="hero-item"
        style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 480 }}
      >
        제품 선택, 설계 지원, 디지털 서비스, 조립 지원까지 —<br />blum의 종합 서비스 생태계를 경험하세요.
      </p>
    </div>
  );
}

/* Horizontal accordion item */
function ServicePanel({
  svc,
  isActive,
  hasActive,
  onEnter,
  onLeave,
}: {
  svc: (typeof SERVICES)[0];
  isActive: boolean;
  hasActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        flex: isActive ? "2 0 0" : hasActive ? "0.6 0 0" : "1 0 0",
        transition: "flex 0.5s ease",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        minWidth: 0,
      }}
    >
      {/* Background image */}
      <img
        src={svc.img}
        alt={svc.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.6s ease",
          transform: isActive ? "scale(1.04)" : "scale(1)",
        }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* Dark overlay — lightens on active */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "32px 28px",
        }}
      >
        {/* Number */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.45)",
            marginBottom: 10,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {svc.num}
        </p>

        {/* Name */}
        <h3
          style={{
            fontSize: isActive ? 22 : 16,
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1.3,
            marginBottom: isActive ? 18 : 0,
            transition: "font-size 0.4s ease, margin-bottom 0.4s ease",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            whiteSpace: isActive ? "normal" : "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {svc.name}
        </h3>

        {/* Expanded content — only visible when active */}
        <div
          style={{
            maxHeight: isActive ? "260px" : "0",
            opacity: isActive ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.5s ease, opacity 0.4s ease",
          }}
        >
          <div style={{ width: 32, height: 1, backgroundColor: "rgba(255,255,255,0.5)", marginBottom: 16 }} />
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.75,
              marginBottom: 20,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            {svc.desc}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {svc.features.map((f) => (
              <li
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}
              >
                <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.6)", flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow indicator */}
        <div
          style={{
            marginTop: isActive ? 20 : 8,
            opacity: isActive ? 1 : 0.4,
            transition: "opacity 0.4s ease, margin-top 0.4s ease",
          }}
        >
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>→</span>
        </div>
      </div>
    </div>
  );
}

export default function V1Services() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* ══════════════════════════════════════════
          HERO SECTION
          - Gradient top: semi-white so dark nav text is readable
          - Gradient bottom: dark for hero text legibility
      ══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <img
          src={`${BASE}/images/560/258/4215892/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
          alt="blum services"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />

        {/*
          Two-layer gradient:
          TOP → transparent to white: ensures dark nav text (#18181b) is readable
          BOTTOM → transparent to dark: ensures white hero text is readable
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 28%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          }}
        />

        {/* Hero text */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 48px 80px" }}>
          <HeroText />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HORIZONTAL ACCORDION — 4 services
      ══════════════════════════════════════════ */}
      <section
        style={{
          marginTop: "35vh",
          height: "75vh",
          minHeight: 480,
          display: "flex",
          overflow: "hidden",
          paddingLeft: "12%",
          paddingRight: "12%",
        }}
      >
        {SERVICES.map((svc) => (
          <ServicePanel
            key={svc.id}
            svc={svc}
            isActive={activeId === svc.id}
            hasActive={activeId !== null}
            onEnter={() => setActiveId(svc.id)}
            onLeave={() => setActiveId(null)}
          />
        ))}
      </section>

      {/* ══════════════════════════════════════════
          E-SERVICES CTA
      ══════════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 48px",
          borderTop: "1px solid rgba(24,24,27,0.06)",
          backgroundColor: "#fafafa",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 16 }}>
          Online Portal
        </p>
        <h2 style={{ fontSize: 28, fontWeight: 300, color: "#18181b", marginBottom: 12 }}>
          E-Services 바로가기
        </h2>
        <p style={{ fontSize: 14, color: "#71717a", marginBottom: 32 }}>
          제품 구성, CAD 데이터, 주문 관리를 온라인으로 한 번에.
        </p>
        <a
          href="https://e-services.blum.com/main/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "14px 36px",
            border: "1px solid #18181b",
            color: "#18181b",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#18181b";
            (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#18181b";
          }}
        >
          E-Services 접속
        </a>
      </section>
    </div>
  );
}
