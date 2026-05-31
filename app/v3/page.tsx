"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function BoldReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export default function V3() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTicker((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  const tickerItems = ["BLUM", "LIFESTYLE", "INTERIOR", "2025 AW", "NEW COLLECTION", "BOLD · MODERN", "BLUM"];
  const tickerStr = tickerItems.join("  ·  ");

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif" }} className="overflow-x-hidden">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes flash { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .ticker { animation: marquee 20s linear infinite; }
        .cursor-blink { animation: flash 1.2s ease infinite; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Ticker */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
        style={{ backgroundColor: "#ff3b00", height: "28px", display: "flex", alignItems: "center" }}
      >
        <div className="ticker flex gap-0 whitespace-nowrap" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ color: "#fff", paddingRight: "60px" }}>{tickerStr}</span>
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
          <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.02em", color: "#f0f0f0" }}>BLUM</span>
          <div className="hidden md:flex items-center gap-6" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(240,240,240,0.5)" }}>
            <a href="#collection" className="hover:opacity-100 transition-opacity uppercase">Collection</a>
            <a href="#values" className="hover:opacity-100 transition-opacity uppercase">Manifesto</a>
            <a
              href="#cta"
              className="uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: "#ff3b00", color: "#fff", padding: "8px 20px", letterSpacing: "0.15em", fontSize: "10px" }}
            >
              Pre-order
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#f0f0f0" }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4 uppercase text-sm" style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(240,240,240,0.08)", color: "rgba(240,240,240,0.6)", letterSpacing: "0.15em" }}>
            <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
            <a href="#values" onClick={() => setMenuOpen(false)}>Manifesto</a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>Pre-order</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: "28px" }}
      >
        {/* BG */}
        <div className="absolute inset-0" style={{ backgroundColor: "#0a0a0a" }}>
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(rgba(240,240,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,240,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
          {/* Red accent shape */}
          <div
            className="absolute"
            style={{
              right: 0,
              top: "28px",
              width: "50%",
              height: "100%",
              backgroundColor: "#ff3b00",
              clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
              opacity: 0.06,
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
          {/* Large number bg */}
          <div
            className="absolute select-none"
            style={{
              right: "-2%",
              bottom: "5%",
              fontSize: "clamp(120px, 25vw, 280px)",
              fontWeight: 900,
              color: "rgba(255,59,0,0.04)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            25
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full" style={{ paddingTop: "120px" }}>
          {/* Label row */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ backgroundColor: "#ff3b00" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.5em", color: "#ff3b00" }}>BLUM 2025 AW COLLECTION</span>
          </div>

          {/* Big headline */}
          <h1
            className="leading-none mb-8"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 12rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#f0f0f0",
              transform: `translateY(${scrollY * -0.08}px)`,
            }}
          >
            LIVE<br />
            <span style={{ color: "#ff3b00", WebkitTextStroke: "2px #ff3b00", WebkitTextFillColor: "transparent" }}>BOLD.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <p style={{ fontSize: "14px", lineHeight: "2", color: "rgba(240,240,240,0.4)", maxWidth: "360px" }}>
              당신의 공간에 대담함을 더하세요. blum의 새 컬렉션은 트렌드를 선도합니다.
            </p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a
                href="#collection"
                className="uppercase transition-all hover:scale-105"
                style={{ backgroundColor: "#ff3b00", color: "#fff", padding: "16px 32px", fontSize: "11px", letterSpacing: "0.2em", display: "inline-block" }}
              >
                컬렉션 보기
              </a>
              <a
                href="#cta"
                className="uppercase transition-all hover:scale-105"
                style={{ border: "1px solid rgba(240,240,240,0.2)", color: "#f0f0f0", padding: "16px 32px", fontSize: "11px", letterSpacing: "0.2em", display: "inline-block" }}
              >
                Pre-order
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(240,240,240,0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/10">
            {[
              { num: "200+", label: "PRODUCTS" },
              { num: "12", label: "COLLECTIONS" },
              { num: "2025", label: "LAUNCH" },
            ].map((s) => (
              <div key={s.num} className="py-6 px-4 text-center md:text-left">
                <div style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, color: "#f0f0f0", letterSpacing: "-0.03em" }}>{s.num}</div>
                <div style={{ fontSize: "8px", letterSpacing: "0.4em", color: "rgba(240,240,240,0.3)", marginTop: "4px" }}>{s.label}</div>
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
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#f0f0f0", marginBottom: "24px" }}>
                DESIGN<br />
                FOR THE<br />
                <span style={{ color: "#ff3b00" }}>FUTURE.</span>
              </h2>
              <p style={{ fontSize: "13px", lineHeight: "2", color: "rgba(240,240,240,0.45)", maxWidth: "380px" }}>
                blum은 현재의 인테리어 트렌드를 선도합니다. 과감한 선택, 강렬한 형태, 타협 없는 품질. 우리는 평범함을 거부합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["#1a1a1a", "#ff3b00", "#222", "#1a1a1a"].map((bg, i) => (
                <div
                  key={i}
                  className="rounded-sm overflow-hidden"
                  style={{ backgroundColor: bg, aspectRatio: i === 1 ? "1/1.3" : "1/1", marginTop: i === 1 ? "24px" : i === 3 ? "-24px" : 0 }}
                />
              ))}
            </div>
          </BoldReveal>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" style={{ padding: "80px 0 100px", backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#ff3b00" }}>COLLECTION 2025</span>
              <h2 style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f0f0f0", lineHeight: 1, marginTop: "8px" }}>
                SELECTED<br />WORKS.
              </h2>
            </div>
            <a href="#" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.4)", textDecoration: "underline", textUnderlineOffset: "4px" }}>VIEW ALL →</a>
          </BoldReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {[
              { title: "MONO CHAIR", cat: "SEATING", span: "md:col-span-5", aspect: "aspect-[3/4]", bg: "#1a1a1a" },
              { title: "FLUX TABLE", cat: "DINING", span: "md:col-span-7", aspect: "aspect-[4/3]", bg: "#222" },
              { title: "VOID SHELF", cat: "STORAGE", span: "md:col-span-7", aspect: "aspect-[4/3]", bg: "#181818" },
              { title: "EDGE BED", cat: "BEDROOM", span: "md:col-span-5", aspect: "aspect-[3/4]", bg: "#1a1a1a" },
            ].map((item, i) => (
              <BoldReveal
                key={item.title}
                delay={i * 80}
                className={`group cursor-pointer ${item.span}`}
              >
                <div
                  className={`relative overflow-hidden ${item.aspect} mb-4`}
                  style={{ backgroundColor: item.bg }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "rgba(255,59,0,0.06)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
                    <div>
                      <div style={{ fontSize: "8px", letterSpacing: "0.4em", color: "rgba(240,240,240,0.3)", marginBottom: "4px" }}>{item.cat}</div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.02em", color: "#f0f0f0" }}>{item.title}</h3>
                    </div>
                    <div
                      className="w-8 h-8 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                      style={{ backgroundColor: "#ff3b00" }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </BoldReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section id="values" style={{ backgroundColor: "#ff3b00", padding: "80px 0 100px", overflow: "hidden" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>OUR MANIFESTO</p>
            <blockquote style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: "900px", marginBottom: "48px" }}>
              "우리는 평범한 공간을<br />거부합니다. 당신의 집은<br />당신의 선언입니다."
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              {[
                { title: "NO COMPROMISE", body: "품질에서 타협하지 않습니다. 모든 소재, 모든 공정, 모든 디테일에 최선을 다합니다." },
                { title: "BOLD DESIGN", body: "눈에 띄는 것을 두려워하지 않습니다. 공간을 압도하는 디자인을 추구합니다." },
                { title: "FUTURE FORWARD", body: "트렌드를 따라가지 않습니다. 우리가 트렌드를 만듭니다." },
              ].map((v, i) => (
                <BoldReveal key={v.title} delay={i * 100}>
                  <h3 style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", color: "#fff", marginBottom: "12px" }}>{v.title}</h3>
                  <p style={{ fontSize: "12px", lineHeight: "1.8", color: "rgba(255,255,255,0.65)" }}>{v.body}</p>
                </BoldReveal>
              ))}
            </div>
          </BoldReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ backgroundColor: "#0a0a0a", padding: "100px 0" }}>
        <BoldReveal className="max-w-4xl mx-auto px-6 text-center">
          <span style={{ fontSize: "9px", letterSpacing: "0.5em", color: "#ff3b00", display: "block", marginBottom: "20px" }}>PRE-ORDER NOW</span>
          <h2 style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)", fontWeight: 900, letterSpacing: "-0.05em", color: "#f0f0f0", lineHeight: 0.95, marginBottom: "32px" }}>
            BE THE<br />
            <span style={{ WebkitTextStroke: "2px #f0f0f0", WebkitTextFillColor: "transparent" }}>FIRST.</span>
          </h2>
          <p style={{ fontSize: "13px", lineHeight: "2", color: "rgba(240,240,240,0.4)", marginBottom: "40px", maxWidth: "380px", margin: "0 auto 40px" }}>
            2025년 런칭 전 사전 신청 시 15% 할인과 한정판 아트북을 드립니다.
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
              신청
            </button>
          </form>
        </BoldReveal>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#000", borderTop: "1px solid rgba(240,240,240,0.06)", padding: "48px 24px" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "-0.02em", color: "#f0f0f0" }}>BLUM</span>
          <div className="flex gap-6" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.3)" }}>
            <a href="#" className="hover:opacity-80 uppercase transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-80 uppercase transition-opacity">Pinterest</a>
            <a href="#" className="hover:opacity-80 uppercase transition-opacity">Newsletter</a>
          </div>
          <Link href="/" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.3)" }}>← VERSIONS</Link>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t flex flex-col md:flex-row justify-between gap-2" style={{ borderColor: "rgba(240,240,240,0.06)", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(240,240,240,0.2)" }}>
          <span>© 2025 BLUM. ALL RIGHTS RESERVED.</span>
          <span>LIFESTYLE · INTERIOR · DESIGN</span>
        </div>
      </footer>
    </div>
  );
}
