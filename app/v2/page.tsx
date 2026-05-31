"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.12) {
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

function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.99)",
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

const products = [
  {
    name: "AVENTOS",
    category: "리프트 시스템",
    tag: "BEST",
    desc: "상부장을 부드럽게 들어올리는 리프트 시스템. 다양한 오픈 방식으로 주방 공간을 더 실용적으로.",
    color: "#d4a574",
  },
  {
    name: "LEGRABOX",
    category: "서랍 시스템",
    tag: "NEW",
    desc: "얇고 우아한 금속 프레임 서랍. 주방 하부장을 세련되게 완성하는 프리미엄 솔루션.",
    color: "#c8a882",
  },
  {
    name: "CLIP top BLUMOTION",
    category: "경첩 시스템",
    tag: "—",
    desc: "소프트 클로징이 내장된 경첩. 도어가 마지막 순간 스스로 부드럽게 닫힙니다.",
    color: "#b8927a",
  },
];

export default function V2() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navScrolled = scrollY > 60;

  return (
    <div
      className="overflow-x-hidden"
      style={{ backgroundColor: "#faf7f2", color: "#2c1e0f", fontFamily: "'Georgia', serif" }}
    >
      <style>{`
        @keyframes breathe { 0%,100%{transform:scale(1);} 50%{transform:scale(1.015);} }
        @keyframes slideDown { 0%{transform:translateY(-100%);} 100%{transform:translateY(200%);} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: navScrolled ? "rgba(250,247,242,0.95)" : "transparent",
          backdropFilter: navScrolled ? "blur(12px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(59,42,26,0.08)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "'Georgia', serif",
              color: navScrolled ? "#2c1e0f" : "#faf7f2",
            }}
          >
            blum
          </span>
          <div
            className="hidden md:flex items-center gap-8 text-xs tracking-wider"
            style={{ color: navScrolled ? "#8a6a4a" : "rgba(250,247,242,0.75)" }}
          >
            <a href="#story" className="hover:opacity-80 transition-opacity">Our Story</a>
            <a href="#products" className="hover:opacity-80 transition-opacity">Products</a>
            <a
              href="#cta"
              style={{
                backgroundColor: navScrolled ? "#3b2a1a" : "rgba(250,247,242,0.15)",
                color: "#faf7f2",
                padding: "6px 16px",
                borderRadius: "100px",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              쇼룸 방문
            </a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: navScrolled ? "#2c1e0f" : "#faf7f2" }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden px-6 py-4 flex flex-col gap-4 text-sm"
            style={{ backgroundColor: "#faf7f2", borderTop: "1px solid rgba(59,42,26,0.08)", color: "#8a6a4a" }}
          >
            <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
            <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>쇼룸 방문</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#3b2a1a" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #5c3d2e 0%, #3b2a1a 45%, #2c1e0f 100%)",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute top-20 right-10 md:right-32 w-64 md:w-96 h-64 md:h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#c68642", transform: `translateY(${scrollY * -0.08}px)` }}
        />
        <div
          className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-5"
          style={{ backgroundColor: "#f5ede0" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-32 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div style={{ color: "#faf7f2" }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-6 opacity-50">
              Premium Kitchen Fittings · Since 1952
            </p>
            <h1
              className="leading-tight mb-8"
              style={{
                fontSize: "clamp(2.5rem,7vw,5.5rem)",
                fontWeight: 300,
                fontFamily: "'Georgia', serif",
              }}
            >
              주방이<br />
              <em style={{ fontStyle: "italic", color: "#d4a574" }}>숨쉬게</em><br />
              됩니다
            </h1>
            <p className="text-sm leading-loose opacity-60 max-w-xs mb-10">
              blum의 피팅 시스템이 당신의 주방에 조용한 품격을 더합니다. 열고 닫는 매 순간이 달라집니다.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#products"
                className="inline-block text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#c68642", color: "#faf7f2", borderRadius: "2px" }}
              >
                제품 보기
              </a>
              <a
                href="#story"
                className="text-xs tracking-wider opacity-50 hover:opacity-80 transition-opacity"
                style={{ color: "#faf7f2" }}
              >
                브랜드 스토리 →
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden md:flex flex-col gap-3">
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#5c3d2e", height: "260px", animation: "breathe 8s ease-in-out infinite" }}
            >
              <div className="text-center opacity-30" style={{ color: "#f5ede0" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.4em" }}>AVENTOS</div>
                <div style={{ fontSize: "9px", letterSpacing: "0.3em", marginTop: "6px", opacity: 0.6 }}>LIFT SYSTEM</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["LEGRABOX", "CLIP top"].map((name) => (
                <div
                  key={name}
                  className="rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(250,247,242,0.06)", height: "100px" }}
                >
                  <span style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(250,247,242,0.3)" }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ color: "rgba(250,247,242,0.3)" }}>
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 overflow-hidden" style={{ backgroundColor: "rgba(250,247,242,0.15)" }}>
            <div className="w-full h-1/2" style={{ backgroundColor: "rgba(250,247,242,0.5)", animation: "slideDown 2s ease infinite" }} />
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-24 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <div
                className="rounded-2xl w-full aspect-[3/4] flex items-center justify-center"
                style={{ backgroundColor: "#e8d5be" }}
              >
                <div className="text-center opacity-40">
                  <div style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#6b4c30" }}>BLUM</div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#8a6a4a", marginTop: "6px" }}>SINCE 1952</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 md:pt-12">
              <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#c68642" }}>
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-light mb-8 leading-snug" style={{ color: "#2c1e0f" }}>
                오스트리아에서 시작된<br />
                움직임의 철학
              </h2>
              <p className="text-sm leading-8 mb-6" style={{ color: "#6b4c30" }}>
                1952년, 율리우스 블룸은 오스트리아 작은 마을에서 금속 부품 공장을 시작했습니다. 그의 목표는 단순했습니다 — 더 잘 작동하는 가구를 만드는 것. 70년이 지난 지금, blum은 전 세계 120개국의 주방과 가정에서 조용히 일하고 있습니다.
              </p>
              <p className="text-sm leading-8 mb-10" style={{ color: "#6b4c30" }}>
                blum의 피팅은 보이지 않습니다. 하지만 그 존재는 매일 느껴집니다. 서랍이 부드럽게 닫힐 때, 상부장이 가볍게 열릴 때 — 그 품질의 차이가 삶의 질의 차이입니다.
              </p>
              <div className="flex flex-wrap gap-3">
                {["오스트리아 제조", "전 세계 120개국", "70년 기술", "친환경 인증"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#ede0cf", color: "#6b4c30" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 md:py-32" style={{ backgroundColor: "#f0e8d8" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#c68642" }}>
                Product Lines
              </p>
              <h2 className="text-3xl md:text-4xl font-light" style={{ color: "#2c1e0f" }}>
                주방을 완성하는<br />
                blum 시스템
              </h2>
            </div>
            <a
              href="https://www.blum.com/kr/ko/products/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wider underline underline-offset-4"
              style={{ color: "#8a6a4a" }}
            >
              전체 제품 보기 →
            </a>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 100} className="group cursor-pointer">
                <div
                  className="rounded-2xl overflow-hidden mb-5 aspect-[4/5] relative flex items-center justify-center"
                  style={{ backgroundColor: p.color }}
                >
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[9px] tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#faf7f2", color: "#6b4c30" }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <div className="text-center opacity-30">
                    <div style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#faf7f2" }}>
                      {p.name}
                    </div>
                  </div>
                </div>
                <p className="text-xs tracking-wider mb-1" style={{ color: "#c68642" }}>
                  {p.category}
                </p>
                <h3 className="text-xl font-light mb-2" style={{ color: "#2c1e0f" }}>
                  {p.name}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#8a6a4a" }}>
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Extra product row */}
          <Reveal delay={300} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "TIP-ON BLUMOTION",
                category: "터치 오픈 시스템",
                desc: "핸들 없이 살짝 터치만으로 열리는 혁신 기술. 미니멀한 주방 디자인의 완성.",
              },
              {
                name: "MOVENTO",
                category: "서랍 러너 시스템",
                desc: "공중에 뜨는 듯 가벼운 서랍 움직임. BLUMOTION 소프트 클로징 내장.",
              },
            ].map((p, i) => (
              <div
                key={p.name}
                className="rounded-2xl p-8 flex flex-col justify-between"
                style={{ backgroundColor: "#e8d5be", minHeight: "180px" }}
              >
                <div>
                  <p className="text-xs tracking-wider mb-2" style={{ color: "#c68642" }}>
                    {p.category}
                  </p>
                  <h3 className="text-lg font-light mb-3" style={{ color: "#2c1e0f" }}>
                    {p.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#8a6a4a" }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-40 max-w-6xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#c68642" }}>
            Our Values
          </p>
          <h2 className="text-3xl md:text-4xl font-light" style={{ color: "#2c1e0f" }}>
            blum이 만드는 차이
          </h2>
        </Reveal>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ backgroundColor: "#ddd0bc" }}
        >
          {[
            {
              icon: "⚙️",
              title: "정밀한 기술",
              body: "50,000회 이상 반복 테스트. 첫날과 마지막 날의 품질이 동일한 피팅을 만듭니다.",
            },
            {
              icon: "🏡",
              title: "공간을 위한 설계",
              body: "주방, 침실, 홈 오피스 — 모든 공간에서 최적의 편의성을 제공하도록 설계됩니다.",
            },
            {
              icon: "🌿",
              title: "지속 가능한 생산",
              body: "오스트리아 공장의 친환경 생산 시스템. 품질과 환경 모두를 생각합니다.",
            },
          ].map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 120}
              className="p-10 md:p-14 text-center"
              style={{ backgroundColor: "#faf7f2" }}
            >
              <div className="text-4xl mb-6">{v.icon}</div>
              <h3 className="text-lg font-medium mb-4" style={{ color: "#2c1e0f" }}>
                {v.title}
              </h3>
              <p className="text-sm leading-7" style={{ color: "#8a6a4a" }}>
                {v.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 md:py-40 text-center" style={{ backgroundColor: "#3b2a1a" }}>
        <Reveal className="max-w-2xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#c68642" }}>
            Showroom Visit
          </p>
          <h2
            className="text-4xl md:text-5xl font-light mb-6 leading-snug"
            style={{ color: "#faf7f2", fontFamily: "'Georgia', serif" }}
          >
            blum을<br />
            직접 느껴보세요
          </h2>
          <p className="text-sm leading-8 mb-12" style={{ color: "#a0856a" }}>
            쇼룸에서 AVENTOS, LEGRABOX, CLIP top을 직접 체험하세요.<br />
            전문 컨설턴트가 공간에 맞는 최적의 솔루션을 제안합니다.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="이메일을 남겨주세요"
              className="flex-1 text-sm px-5 py-4 outline-none"
              style={{
                backgroundColor: "rgba(250,247,242,0.08)",
                border: "1px solid rgba(198,134,66,0.3)",
                color: "#faf7f2",
                borderRadius: "8px",
              }}
            />
            <button
              type="submit"
              className="px-8 py-4 text-xs tracking-widest uppercase whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#c68642", color: "#faf7f2", borderRadius: "8px" }}
            >
              방문 신청
            </button>
          </form>
          <p className="text-xs mt-6" style={{ color: "rgba(160,133,106,0.5)" }}>
            담당자가 2영업일 내 연락드립니다.
          </p>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#2c1e0f" }} className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span
              className="text-xl tracking-[0.3em] uppercase"
              style={{ color: "#faf7f2", fontFamily: "'Georgia', serif" }}
            >
              blum
            </span>
            <p className="text-xs mt-2" style={{ color: "#6b4c30" }}>
              moving ideas · Since 1952
            </p>
          </div>
          <div className="flex gap-6 text-xs tracking-wider" style={{ color: "#6b4c30" }}>
            <a
              href="https://www.blum.com/kr/ko/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              공식 사이트
            </a>
            <a href="#products" className="hover:opacity-80 transition-opacity">Products</a>
            <a href="#cta" className="hover:opacity-80 transition-opacity">Contact</a>
          </div>
          <Link href="/" className="text-xs tracking-wider" style={{ color: "#6b4c30" }}>
            ← 버전 선택으로
          </Link>
        </div>
        <div
          className="max-w-6xl mx-auto mt-10 pt-8 border-t text-xs"
          style={{ borderColor: "rgba(107,76,48,0.2)", color: "#4a3020" }}
        >
          © 2025 Blum Korea. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
