"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.15) {
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

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </section>
  );
}

const collections = [
  { id: "01", name: "Blanc Series", category: "Living", desc: "순백의 정적 속에서 피어나는 선명함" },
  { id: "02", name: "Mono Edit", category: "Bedroom", desc: "흑과 백이 만드는 완벽한 균형" },
  { id: "03", name: "Grey Matter", category: "Kitchen", desc: "회색이 품은 깊이와 정제된 감각" },
  { id: "04", name: "Form Zero", category: "Office", desc: "군더더기 없는 형태가 말하는 아름다움" },
];

const values = [
  { num: "01", title: "Less is More", body: "불필요한 것을 걷어내고 본질만 남깁니다. 공간이 숨쉴 수 있도록." },
  { num: "02", title: "Material Truth", body: "소재 본연의 아름다움을 표현합니다. 가공보다 발견에 집중합니다." },
  { num: "03", title: "Timeless Form", body: "유행을 좇지 않습니다. 10년 후에도 아름다운 것을 만듭니다." },
];

export default function V1() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white text-zinc-900 font-light selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ backgroundColor: scrollY > 80 ? "rgba(255,255,255,0.95)" : "transparent", backdropFilter: scrollY > 80 ? "blur(12px)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <span className="text-xl tracking-[0.3em] uppercase font-medium" style={{ color: scrollY > 80 ? "#18181b" : "#fff" }}>blum</span>
          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase" style={{ color: scrollY > 80 ? "#71717a" : "rgba(255,255,255,0.7)" }}>
            <a href="#collection" className="hover:opacity-100 transition-opacity">Collection</a>
            <a href="#values" className="hover:opacity-100 transition-opacity">Philosophy</a>
            <a href="#cta" className="hover:opacity-100 transition-opacity">Open Soon</a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: scrollY > 80 ? "#18181b" : "#fff" }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-100 px-8 py-4 flex flex-col gap-4 text-xs tracking-widest uppercase text-zinc-500">
            <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
            <a href="#values" onClick={() => setMenuOpen(false)}>Philosophy</a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>Open Soon</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-end bg-zinc-950 overflow-hidden">
        {/* Abstract background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 70% 40%, rgba(255,255,255,0.05) 0%, transparent 60%)",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          {/* Geometric lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="white" strokeWidth="0.5" />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-24 w-full">
          <div
            className="overflow-hidden"
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-400 mb-8">Lifestyle · Interior · 2025</p>
            <h1 className="text-[clamp(3rem,10vw,9rem)] font-extralight text-white leading-[0.9] tracking-tight mb-8">
              Space<br />
              <span className="text-zinc-400">for</span><br />
              Living
            </h1>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
              당신의 공간을 다시 정의하는<br />
              라이프스타일 브랜드
            </p>
          </div>
          <div className="mt-16 flex items-center gap-4">
            <a href="#collection" className="inline-flex items-center gap-3 border border-white/20 text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-zinc-900 transition-all duration-300">
              Collection 보기
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="w-full bg-white/60 absolute top-0" style={{ height: "40%", animation: "slideDown 2s ease infinite" }} />
          </div>
          <span className="text-[9px] tracking-widest uppercase text-white/30 rotate-90 origin-center mt-6">Scroll</span>
        </div>

        <style>{`
          @keyframes slideDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
        `}</style>
      </section>

      {/* Brand */}
      <section id="brand" className="py-32 md:py-48 max-w-7xl mx-auto px-8">
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-6">About Blum</p>
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight text-zinc-900 mb-8">
              공간이 곧<br />
              <em className="not-italic font-normal">당신입니다</em>
            </h2>
            <p className="text-zinc-400 leading-8 text-sm max-w-sm">
              blum은 단순히 가구를 파는 곳이 아닙니다. 우리는 당신의 일상이 머무는 공간을 디자인합니다. 모든 제품은 그 자체로 완결된 형태를 지니며, 공간 속에서 조용히 존재합니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-100 aspect-square" />
            <div className="bg-zinc-200 aspect-[3/4] mt-8" />
            <div className="bg-zinc-300 aspect-[3/4] -mt-8" />
            <div className="bg-zinc-100 aspect-square" />
          </div>
        </FadeIn>
      </section>

      {/* Collection */}
      <section id="collection" className="py-24 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-8">
          <FadeIn className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-4">Our Collection</p>
            <h2 className="text-3xl md:text-4xl font-extralight">Selected Works</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100">
            {collections.map((c, i) => (
              <FadeIn
                key={c.id}
                delay={i * 80}
                className="bg-white p-10 md:p-14 group cursor-pointer hover:bg-zinc-50 transition-colors duration-500"
              >
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] tracking-widest uppercase text-zinc-300">{c.id}</span>
                  <span className="text-[10px] tracking-widest uppercase text-zinc-300">{c.category}</span>
                </div>
                <div className="bg-zinc-100 w-full aspect-[4/3] mb-8 overflow-hidden group-hover:bg-zinc-200 transition-colors duration-500" />
                <h3 className="text-xl font-light mb-2">{c.name}</h3>
                <p className="text-xs text-zinc-400">{c.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-32 md:py-48 max-w-7xl mx-auto px-8">
        <FadeIn className="mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-4">Our Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-extralight">우리가 믿는 것들</h2>
        </FadeIn>
        <div className="space-y-0">
          {values.map((v, i) => (
            <FadeIn
              key={v.num}
              delay={i * 100}
              className="border-t border-zinc-100 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-6 group"
            >
              <span className="text-xs text-zinc-300 tracking-widest">{v.num}</span>
              <h3 className="text-xl font-light group-hover:text-zinc-600 transition-colors">{v.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{v.body}</p>
            </FadeIn>
          ))}
          <div className="border-t border-zinc-100" />
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-zinc-950 py-32 md:py-48">
        <FadeIn className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-8">Coming Soon</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 leading-tight">
            2025년 가을,<br />
            blum이 옵니다
          </h2>
          <p className="text-zinc-400 text-sm leading-8 mb-12 max-w-sm mx-auto">
            오픈 전 사전 등록 시 첫 구매 혜택과 신규 컬렉션 선공개 소식을 먼저 받아보실 수 있습니다.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 bg-transparent border border-zinc-700 text-white placeholder:text-zinc-600 px-5 py-3 text-sm outline-none focus:border-zinc-400 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-zinc-900 px-8 py-3 text-xs tracking-widest uppercase hover:bg-zinc-100 transition-colors whitespace-nowrap"
            >
              사전 등록
            </button>
          </form>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xl tracking-[0.3em] uppercase text-white font-light">blum</span>
            <p className="text-xs text-zinc-600 mt-2">Lifestyle · Interior</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-xs text-zinc-600 tracking-widest uppercase">
            <a href="#" className="hover:text-zinc-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Pinterest</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Newsletter</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-widest uppercase">← Back</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-xs text-zinc-700">
          © 2025 Blum. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
