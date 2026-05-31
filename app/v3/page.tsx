"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function BoldReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.7s cubic-bezier(0.25,1,0.5,1) ${delay}ms, transform 0.7s cubic-bezier(0.25,1,0.5,1) ${delay}ms`,
      }}
    >
      {children}
    </section>
  );
}

const systems = [
  {
    code: "AV",
    name: "AVENTOS",
    label: "리프트 시스템",
    headline: "위로 열다",
    desc: "상부장의 새로운 가능성. 접이식, 평행식, 위로 들어올리기 등 5가지 오픈 방식.",
    variants: "HK · HL · HF · HS · HK-S",
    col: "md:col-span-5",
    aspect: "aspect-[3/4]",
    bg: "#1a1a1a",
  },
  {
    code: "LB",
    name: "LEGRABOX",
    label: "서랍 시스템",
    headline: "안으로 담다",
    desc: "슬림한 금속 프레임이 만드는 경이로운 수납. 최대 70kg 하중을 지지합니다.",
    variants: "pure · free · F · C",
    col: "md:col-span-7",
    aspect: "aspect-[4/3]",
    bg: "#141414",
  },
  {
    code: "CT",
    name: "CLIP top",
    label: "경첩 시스템",
    headline: "닫히는 순간",
    desc: "BLUMOTION 소프트 클로징으로 도어가 마지막 수센티미터를 스스로 닫습니다.",
    variants: "BLUMOTION · INSERTA · 105°",
    col: "md:col-span-7",
    aspect: "aspect-[4/3]",
    bg: "#181818",
  },
  {
    code: "TO",
    name: "TIP-ON",
    label: "터치 오픈",
    headline: "터치 한 번",
    desc: "핸들이 없어도 됩니다. 살짝 밀면 스스로 열리는 미래형 시스템.",
    variants: "BLUMOTION · 단일 도어 · 더블 도어",
    col: "md:col-span-5",
    aspect: "aspect-[3/4]",
    bg: "#1a1a1a",
  },
];

export default function V3() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveSystem((s) => (s + 1) % systems.length), 2400);
    return () => clearInterval(id);
  }, []);

  const tickerItems = ["BLUM", "MOVING IDEAS", "AVENTOS", "LEGRABOX", "CLIP top", "TIP-ON", "BLUMOTION", "SINCE 1952"];
  const tickerStr = tickerItems.join("  ·  ");

  return (
    <div
      className="overflow-x-hidden"
      style={{ backgroundColor: "#0a0a0a", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <style>{`
        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        .ticker { animation: marquee 24s linear infinite; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Ticker bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] overflow-hidden flex items-center"
        style={{ backgroundColor: "#ff3b00", height: "28px" }}
      >
        <div className="ticker flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{ color: "#fff", fontSize: "9px", letterSpacing: "0.3em", paddingRight: "60px" }}
            >
              {tickerStr}
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: "28px",
          backgroundColor: scrollY > 60 ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(10px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(240,240,240,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.02em", color: "#f0f0f0" }}>
            BLUM
          </span>
          <div
            className="hidden md:flex items-center gap-6"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(240,240,240,0.5)" }}
          >
            <a href="#systems" className="hover:opacity-100 transition-opacity uppercase">Systems</a>
            <a href="#manifesto" className="hover:opacity-100 transition-opacity uppercase">Manifesto</a>
            <a
              href="#cta"
              className="uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: "#ff3b00", color: "#fff", padding: "8px 20px" }}
            >
              문의하기
            </a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#f0f0f0" }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden px-6 py-4 flex flex-col gap-4 uppercase text-sm"
            style={{
              backgroundColor: "#0a0a0a",
              borderTop: "1px solid rgba(240,240,240,0.08)",
              color: "rgba(240,240,240,0.6)",
              letterSpacing: "0.15em",
            }}
          >
            <a href="#systems" onClick={() => setMenuOpen(false)}>Systems</a>
            <a href="#manifesto" onClick={() => setMenuOpen(false)}>Manifesto</a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>문의하기</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: "28px" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "#0a0a0a" }}>
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(240,240,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,240,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {/* Red shape */}
          <div
            className="absolute"
            style={{
              right: 0,
              top: "28px",
              width: "50%",
              height: "100%",
              backgroundColor: "#ff3b00",
              clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
              opacity: 0.05,
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
          {/* Rotating system name in BG */}
          <div
            className="absolute select-none transition-all duration-700"
            style={{
              right: "-2%",
              bottom: "10%",
              fontSize: "clamp(80px,18vw,200px)",
              fontWeight: 900,
              color: "rgba(255,59,0,0.04)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              transform: `translateY(${scrollY * -0.04}px)`,
            }}
          >
            {systems[activeSystem].code}
          </div>
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 w-full"
          style={{ paddingTop: "120px", paddingBottom: "80px" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ backgroundColor: "#ff3b00" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.5em", color: "#ff3b00" }}>
              BLUM · PREMIUM FURNITURE FITTINGS · SINCE 1952
            </span>
          </div>

          <h1
            className="leading-none mb-8"
            style={{
              fontSize: "clamp(3.5rem,13vw,12rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#f0f0f0",
              transform: `translateY(${scrollY * -0.06}px)`,
            }}
          >
            MOVING<br />
            <span
              style={{
                color: "#ff3b00",
                WebkitTextStroke: "2px #ff3b00",
                WebkitTextFillColor: "transparent",
              }}
            >
              IDEAS.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <p
              style={{
                fontSize: "14px",
                lineHeight: "2",
                color: "rgba(240,240,240,0.4)",
                maxWidth: "380px",
              }}
            >
              움직임이 달라지면 삶이 달라집니다. AVENTOS, LEGRABOX, CLIP top — blum의 기술이 가구를 다시 정의합니다.
            </p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a
                href="#systems"
                className="uppercase transition-all hover:scale-105"
                style={{ backgroundColor: "#ff3b00", color: "#fff", padding: "16px 32px", fontSize: "11px", letterSpacing: "0.2em", display: "inline-block" }}
              >
                시스템 보기
              </a>
              <a
                href="#cta"
                className="uppercase transition-all hover:scale-105"
                style={{ border: "1px solid rgba(240,240,240,0.2)", color: "#f0f0f0", padding: "16px 32px", fontSize: "11px", letterSpacing: "0.2em", display: "inline-block" }}
              >
                문의하기
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(240,240,240,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/10">
            {[
              { num: "120+", label: "국가 판매" },
              { num: "50,000", label: "내구성 테스트 횟수" },
              { num: "1952", label: "브랜드 창립" },
            ].map((s) => (
              <div key={s.num} className="py-6 px-4 text-center md:text-left">
                <div style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 900, color: "#f0f0f0", letterSpacing: "-0.03em" }}>
                  {s.num}
                </div>
                <div style={{ fontSize: "8px", letterSpacing: "0.4em", color: "rgba(240,240,240,0.3)", marginTop: "4px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand */}
      <section style={{ backgroundColor: "#111", padding: "80px 0 100px" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: "32px", height: "2px", backgroundColor: "#ff3b00" }} />
                <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#ff3b00" }}>ABOUT BLUM</span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem,5vw,4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "#f0f0f0",
                  marginBottom: "24px",
                }}
              >
                가구의<br />
                움직임을<br />
                <span style={{ color: "#ff3b00" }}>재발명.</span>
              </h2>
              <p style={{ fontSize: "13px", lineHeight: "2", color: "rgba(240,240,240,0.45)", maxWidth: "380px" }}>
                1952년 오스트리아에서 시작된 blum은 전 세계 가구 피팅 산업을 이끌어왔습니다. 힌지부터 서랍, 리프트 시스템까지 — 모든 제품이 정밀 공학과 사용자 경험의 교차점에 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["#1a1a1a", "#ff3b00", "#222", "#1a1a1a"].map((bg, i) => (
                <div
                  key={i}
                  className="rounded-sm flex items-center justify-center"
                  style={{
                    backgroundColor: bg,
                    aspectRatio: i === 1 ? "1/1.3" : "1/1",
                    marginTop: i === 1 ? "24px" : i === 3 ? "-24px" : 0,
                    opacity: bg === "#ff3b00" ? 0.15 : 1,
                  }}
                >
                  {i === 1 && (
                    <span style={{ fontSize: "8px", letterSpacing: "0.4em", color: "#ff3b00", opacity: 1 }}>
                      BLUM
                    </span>
                  )}
                </div>
              ))}
            </div>
          </BoldReveal>
        </div>
      </section>

      {/* Systems */}
      <section id="systems" style={{ padding: "80px 0 100px", backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#ff3b00" }}>
                SIGNATURE SYSTEMS
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem,6vw,5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#f0f0f0",
                  lineHeight: 1,
                  marginTop: "8px",
                }}
              >
                4 SYSTEMS.<br />1 PHILOSOPHY.
              </h2>
            </div>
            <a
              href="https://www.blum.com/kr/ko/products/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.4)", textDecoration: "underline", textUnderlineOffset: "4px" }}
            >
              ALL PRODUCTS →
            </a>
          </BoldReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {systems.map((s, i) => (
              <BoldReveal
                key={s.name}
                delay={i * 80}
                className={`group cursor-pointer ${s.col}`}
              >
                <div
                  className={`relative overflow-hidden ${s.aspect} mb-4`}
                  style={{ backgroundColor: s.bg }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "rgba(255,59,0,0.06)" }}
                  />
                  <div className="absolute top-5 left-5">
                    <span
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.4em",
                        color: "rgba(240,240,240,0.3)",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
                    <div>
                      <div
                        style={{
                          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                          fontWeight: 900,
                          letterSpacing: "-0.02em",
                          color: "#f0f0f0",
                          marginBottom: "4px",
                        }}
                      >
                        {s.name}
                      </div>
                      <div style={{ fontSize: "10px", color: "#ff3b00" }}>
                        {s.headline}
                      </div>
                    </div>
                    <div
                      className="w-8 h-8 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                      style={{ backgroundColor: "#ff3b00" }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: "11px", lineHeight: "1.8", color: "rgba(240,240,240,0.4)" }}>
                  {s.desc}
                </p>
                <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#ff3b00", marginTop: "6px" }}>
                  {s.variants}
                </p>
              </BoldReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section id="manifesto" style={{ backgroundColor: "#ff3b00", padding: "80px 0 100px" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
              OUR MANIFESTO
            </p>
            <blockquote
              style={{
                fontSize: "clamp(1.5rem,4vw,3.5rem)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                maxWidth: "900px",
                marginBottom: "48px",
              }}
            >
              "문을 열고 닫는 순간이<br />
              삶의 질을 결정합니다.<br />
              그래서 우리는 타협하지 않습니다."
            </blockquote>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              {[
                {
                  title: "FUNCTIONAL BEAUTY",
                  body: "기능이 아름다움입니다. blum의 피팅은 작동하는 순간 그 가치가 완성됩니다.",
                },
                {
                  title: "50,000 CYCLES",
                  body: "모든 제품은 5만 회 이상의 개폐 테스트를 통과합니다. 첫날과 마지막 날의 품질이 같습니다.",
                },
                {
                  title: "INVISIBLE PRECISION",
                  body: "최고의 디자인은 보이지 않습니다. blum은 가구 뒤에서 조용히 완벽함을 만듭니다.",
                },
              ].map((v, i) => (
                <BoldReveal key={v.title} delay={i * 100}>
                  <h3 style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", color: "#fff", marginBottom: "12px" }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: "12px", lineHeight: "1.8", color: "rgba(255,255,255,0.65)" }}>
                    {v.body}
                  </p>
                </BoldReveal>
              ))}
            </div>
          </BoldReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ backgroundColor: "#0a0a0a", padding: "100px 0" }}>
        <BoldReveal className="max-w-4xl mx-auto px-6 text-center">
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.5em",
              color: "#ff3b00",
              display: "block",
              marginBottom: "20px",
            }}
          >
            CONTACT & SHOWROOM
          </span>
          <h2
            style={{
              fontSize: "clamp(2.5rem,10vw,8rem)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#f0f0f0",
              lineHeight: 0.95,
              marginBottom: "32px",
            }}
          >
            EXPERIENCE<br />
            <span
              style={{ WebkitTextStroke: "2px #f0f0f0", WebkitTextFillColor: "transparent" }}
            >
              BLUM.
            </span>
          </h2>
          <p
            style={{
              fontSize: "13px",
              lineHeight: "2",
              color: "rgba(240,240,240,0.4)",
              maxWidth: "380px",
              margin: "0 auto 40px",
            }}
          >
            쇼룸에서 AVENTOS와 LEGRABOX를 직접 체험해보세요. 전문 컨설턴트가 최적의 솔루션을 제안합니다.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 outline-none"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(240,240,240,0.15)",
                borderRight: "none",
                color: "#f0f0f0",
                padding: "16px 20px",
                fontSize: "10px",
                letterSpacing: "0.2em",
              }}
            />
            <button
              type="submit"
              className="uppercase transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#ff3b00",
                color: "#fff",
                padding: "16px 28px",
                fontSize: "10px",
                letterSpacing: "0.2em",
                whiteSpace: "nowrap",
              }}
            >
              문의
            </button>
          </form>
        </BoldReveal>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#000",
          borderTop: "1px solid rgba(240,240,240,0.06)",
          padding: "48px 24px",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "-0.02em", color: "#f0f0f0" }}>
              BLUM
            </span>
            <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.3)", marginTop: "4px" }}>
              MOVING IDEAS
            </div>
          </div>
          <div className="flex gap-6" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.3)" }}>
            <a
              href="https://www.blum.com/kr/ko/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 uppercase transition-opacity"
            >
              공식 사이트
            </a>
            <a href="#systems" className="hover:opacity-80 uppercase transition-opacity">
              Systems
            </a>
            <a href="#cta" className="hover:opacity-80 uppercase transition-opacity">
              Contact
            </a>
          </div>
          <Link
            href="/"
            style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.3)" }}
          >
            ← VERSIONS
          </Link>
        </div>
        <div
          className="max-w-7xl mx-auto mt-8 pt-6 border-t flex flex-col md:flex-row justify-between gap-2"
          style={{ borderColor: "rgba(240,240,240,0.06)", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(240,240,240,0.2)" }}
        >
          <span>© 2025 BLUM KOREA. ALL RIGHTS RESERVED.</span>
          <span>PREMIUM FURNITURE FITTINGS · SINCE 1952</span>
        </div>
      </footer>
    </div>
  );
}
