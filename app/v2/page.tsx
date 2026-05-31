"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.12) {
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

function Reveal({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
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

const collections = [
  { name: "Oat & Oak", category: "Living Room", tag: "NEW", desc: "자연의 결이 살아있는 오크 소재로 만든 소파 컬렉션" },
  { name: "Terra Cotta", category: "Dining", tag: "BEST", desc: "따뜻한 대지의 색감이 담긴 다이닝 시리즈" },
  { name: "Linen Days", category: "Bedroom", tag: "—", desc: "린넨 소재의 부드러운 침구와 침실 컬렉션" },
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
    <div className="overflow-x-hidden" style={{ backgroundColor: "#faf7f2", color: "#2c1e0f", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.015); } }
        @keyframes floatUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .hero-img { animation: breathe 8s ease-in-out infinite; }
        .reveal { animation: floatUp 0.8s ease forwards; }
        * { box-sizing: border-box; }
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
            className="text-xl tracking-[0.25em] uppercase"
            style={{ color: navScrolled ? "#2c1e0f" : "#faf7f2", fontFamily: "'Georgia', serif", letterSpacing: "0.3em" }}
          >
            blum
          </span>
          <div
            className="hidden md:flex items-center gap-8 text-xs tracking-wider"
            style={{ color: navScrolled ? "#8a6a4a" : "rgba(250,247,242,0.75)" }}
          >
            <a href="#story" className="hover:opacity-80 transition-opacity">Our Story</a>
            <a href="#collection" className="hover:opacity-80 transition-opacity">Collection</a>
            <a href="#cta" className="hover:opacity-80 transition-opacity" style={{ backgroundColor: navScrolled ? "#3b2a1a" : "rgba(250,247,242,0.15)", color: navScrolled ? "#faf7f2" : "#faf7f2", padding: "6px 16px", borderRadius: "100px" }}>오픈 예정</a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: navScrolled ? "#2c1e0f" : "#faf7f2" }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4 text-sm" style={{ backgroundColor: "#faf7f2", borderTop: "1px solid rgba(59,42,26,0.08)", color: "#8a6a4a" }}>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
            <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>오픈 예정</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#3b2a1a" }}>
        {/* Warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #5c3d2e 0%, #3b2a1a 40%, #2c1e0f 100%)",
            transform: `translateY(${scrollY * 0.25}px)`,
          }}
        />
        {/* Texture circles */}
        <div className="absolute top-20 right-10 md:right-32 w-64 md:w-96 h-64 md:h-96 rounded-full opacity-10" style={{ backgroundColor: "#c68642", transform: `translateY(${scrollY * -0.1}px)` }} />
        <div className="absolute bottom-20 left-0 w-48 md:w-64 h-48 md:h-64 rounded-full opacity-5" style={{ backgroundColor: "#f5ede0" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-32 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div style={{ color: "#faf7f2" }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-6 opacity-50">Warm · Natural · Handcrafted</p>
            <h1 className="leading-tight mb-8" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 300, fontFamily: "'Georgia', serif" }}>
              집은<br />
              당신이<br />
              <em style={{ fontStyle: "italic", color: "#d4a574" }}>쉬는 곳</em>
            </h1>
            <p className="text-sm leading-loose opacity-60 max-w-xs mb-10">
              자연에서 가져온 소재, 장인의 손길로 만든 가구. blum은 당신의 공간에 따뜻함을 더합니다.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#collection"
                className="inline-block text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#c68642", color: "#faf7f2", borderRadius: "2px" }}
              >
                컬렉션 보기
              </a>
              <a href="#story" className="text-xs tracking-wider opacity-50 hover:opacity-80 transition-opacity" style={{ color: "#faf7f2" }}>
                브랜드 스토리 →
              </a>
            </div>
          </div>

          {/* Placeholder image area */}
          <div className="hidden md:block">
            <div
              className="hero-img rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#5c3d2e", aspectRatio: "3/4", width: "100%", maxWidth: "400px", marginLeft: "auto" }}
            >
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <svg viewBox="0 0 200 260" className="w-32 h-40 text-amber-200 fill-current">
                  <rect x="20" y="160" width="160" height="20" rx="4" />
                  <rect x="40" y="100" width="120" height="60" rx="8" />
                  <rect x="60" y="60" width="80" height="40" rx="6" />
                  <circle cx="100" cy="40" r="15" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ color: "rgba(250,247,242,0.3)" }}>
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 overflow-hidden" style={{ backgroundColor: "rgba(250,247,242,0.15)" }}>
            <div className="w-full h-1/2" style={{ backgroundColor: "rgba(250,247,242,0.5)", animation: "slideDown 2s ease infinite" }} />
          </div>
        </div>
        <style>{`@keyframes slideDown { 0%{transform:translateY(-100%);} 100%{transform:translateY(200%);} }`}</style>
      </section>

      {/* Story */}
      <section id="story" className="py-24 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <div className="rounded-2xl w-full aspect-[3/4]" style={{ backgroundColor: "#e8d5be" }}>
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <svg viewBox="0 0 200 260" className="w-24 h-32" style={{ fill: "#8a6a4a" }}>
                    <rect x="30" y="180" width="140" height="15" rx="3" />
                    <rect x="50" y="110" width="100" height="70" rx="6" />
                    <rect x="70" y="70" width="60" height="40" rx="4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 md:pt-12">
              <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#c68642" }}>Our Story</p>
              <h2 className="text-3xl md:text-4xl font-light mb-8 leading-snug" style={{ color: "#2c1e0f" }}>
                자연이 가르쳐준<br />
                아름다움
              </h2>
              <p className="text-sm leading-8 mb-6" style={{ color: "#6b4c30" }}>
                blum은 숲 속 작은 작업실에서 시작했습니다. 나무의 결, 돌의 무게, 천의 부드러움 — 자연이 오래 걸쳐 만들어낸 것들에서 영감을 받아 가구와 소품을 만들어왔습니다.
              </p>
              <p className="text-sm leading-8 mb-10" style={{ color: "#6b4c30" }}>
                우리의 모든 제품은 국내 장인과 협업하여 제작됩니다. 빠르게 만들어 빠르게 버려지는 것이 아닌, 세대를 넘어 함께할 수 있는 물건을 만드는 것이 blum의 철학입니다.
              </p>
              <div className="flex flex-wrap gap-3">
                {["천연 소재", "국내 제작", "지속 가능", "오래된 기술"].map((tag) => (
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

      {/* Collection */}
      <section id="collection" className="py-16 md:py-32" style={{ backgroundColor: "#f0e8d8" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#c68642" }}>Collection</p>
              <h2 className="text-3xl md:text-4xl font-light" style={{ color: "#2c1e0f" }}>따뜻한 공간을<br />위한 컬렉션</h2>
            </div>
            <a href="#" className="text-xs tracking-wider underline underline-offset-4" style={{ color: "#8a6a4a" }}>전체 보기 →</a>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((c, i) => (
              <Reveal
                key={c.name}
                delay={i * 100}
                className="group cursor-pointer"
              >
                <div
                  className="rounded-2xl overflow-hidden mb-5 aspect-[4/5] relative"
                  style={{ backgroundColor: i === 0 ? "#d4a574" : i === 1 ? "#c8a882" : "#b8927a" }}
                >
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[9px] tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#faf7f2", color: "#6b4c30" }}
                    >
                      {c.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg viewBox="0 0 160 200" className="w-20 h-24" style={{ fill: "#faf7f2" }}>
                      <rect x="20" y="140" width="120" height="10" rx="2" />
                      <rect x="35" y="80" width="90" height="60" rx="5" />
                      <rect x="50" y="50" width="60" height="30" rx="3" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs tracking-wider mb-1" style={{ color: "#c68642" }}>{c.category}</p>
                <h3 className="text-xl font-light mb-2" style={{ color: "#2c1e0f" }}>{c.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#8a6a4a" }}>{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-40 max-w-6xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#c68642" }}>Our Values</p>
          <h2 className="text-3xl md:text-4xl font-light" style={{ color: "#2c1e0f" }}>우리가 소중히 여기는 것들</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#ddd0bc" }}>
          {[
            { icon: "🌿", title: "자연 소재", body: "플라스틱 없이. 오크, 월넛, 린넨, 울 — 시간이 지날수록 더 아름다워지는 소재만 사용합니다." },
            { icon: "🤝", title: "장인 정신", body: "국내 협력 장인들과 함께 손으로 만듭니다. 한 피스 한 피스에 사람의 온기가 담깁니다." },
            { icon: "♻️", title: "지속 가능성", body: "오래 쓸 수 있는 제품을 만드는 것이 최고의 친환경입니다. 수리 서비스도 제공합니다." },
          ].map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 120}
              className="p-10 md:p-14 text-center"
              style={{ backgroundColor: "#faf7f2" }}
            >
              <div className="text-4xl mb-6">{v.icon}</div>
              <h3 className="text-lg font-medium mb-4" style={{ color: "#2c1e0f" }}>{v.title}</h3>
              <p className="text-sm leading-7" style={{ color: "#8a6a4a" }}>{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 md:py-40 text-center" style={{ backgroundColor: "#3b2a1a" }}>
        <Reveal className="max-w-2xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#c68642" }}>Coming Soon</p>
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-snug" style={{ color: "#faf7f2", fontFamily: "'Georgia', serif" }}>
            따뜻한 봄,<br />
            blum이 찾아옵니다
          </h2>
          <p className="text-sm leading-8 mb-12" style={{ color: "#a0856a" }}>
            2025년 4월, blum의 첫 번째 컬렉션이 공개됩니다.<br />
            사전 등록하시면 얼리버드 혜택을 드립니다.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="이메일을 남겨주세요"
              className="flex-1 text-sm px-5 py-4 outline-none"
              style={{ backgroundColor: "rgba(250,247,242,0.08)", border: "1px solid rgba(198,134,66,0.3)", color: "#faf7f2", borderRadius: "8px" }}
            />
            <button
              type="submit"
              className="px-8 py-4 text-xs tracking-widest uppercase whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#c68642", color: "#faf7f2", borderRadius: "8px" }}
            >
              신청하기
            </button>
          </form>
          <p className="text-xs mt-6" style={{ color: "rgba(160,133,106,0.6)" }}>스팸 없이, 소중한 소식만 보내드립니다.</p>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#2c1e0f" }} className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xl tracking-[0.3em] uppercase" style={{ color: "#faf7f2", fontFamily: "'Georgia', serif" }}>blum</span>
            <p className="text-xs mt-2" style={{ color: "#6b4c30" }}>Warm · Natural · Handcrafted</p>
          </div>
          <div className="flex gap-6 text-xs tracking-wider" style={{ color: "#6b4c30" }}>
            <a href="#" className="hover:opacity-80 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Pinterest</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Newsletter</a>
          </div>
          <Link href="/" className="text-xs tracking-wider" style={{ color: "#6b4c30" }}>← 버전 선택으로</Link>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-8 border-t text-xs" style={{ borderColor: "rgba(107,76,48,0.2)", color: "#4a3020" }}>
          © 2025 Blum. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
