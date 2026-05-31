"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.15) {
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

function FadeIn({
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </section>
  );
}

const products = [
  {
    id: "01",
    name: "AVENTOS",
    category: "리프트 시스템",
    desc: "상부장을 우아하게 열다. 다양한 개폐 방식으로 공간의 가능성을 확장합니다.",
    sub: "HK · HL · HF · HS",
  },
  {
    id: "02",
    name: "LEGRABOX",
    category: "서랍 시스템",
    desc: "극도로 슬림한 프레임, 압도적인 내하중. 서랍의 새로운 기준을 제시합니다.",
    sub: "pure · free · F · C",
  },
  {
    id: "03",
    name: "CLIP top",
    category: "경첩 시스템",
    desc: "BLUMOTION 소프트 클로징 기술로 모든 도어가 부드럽게 닫힙니다.",
    sub: "BLUMOTION · INSERTA",
  },
  {
    id: "04",
    name: "TIP-ON",
    category: "모션 기술",
    desc: "손잡이 없는 공간. 살짝 밀면 스스로 열리는 혁신적인 터치 시스템.",
    sub: "BLUMOTION · 단일 도어",
  },
];

const values = [
  {
    num: "01",
    title: "Functional Beauty",
    body: "blum의 모든 피팅은 기능과 미감이 하나입니다. 작동하는 순간, 디자인이 완성됩니다.",
  },
  {
    num: "02",
    title: "Motion Quality",
    body: "5만 회 이상의 개폐 테스트. 첫날과 마지막 날의 움직임이 같아야 한다는 원칙.",
  },
  {
    num: "03",
    title: "Invisible Precision",
    body: "blum의 존재는 보이지 않습니다. 오직 완벽한 움직임으로만 느껴집니다.",
  },
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
      <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor:
            scrollY > 80 ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrollY > 80 ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <span
            className="text-xl tracking-[0.3em] uppercase font-medium"
            style={{ color: scrollY > 80 ? "#18181b" : "#fff" }}
          >
            blum
          </span>
          <div
            className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase"
            style={{
              color:
                scrollY > 80 ? "#71717a" : "rgba(255,255,255,0.7)",
            }}
          >
            <a href="#products" className="hover:opacity-100 transition-opacity">Products</a>
            <a href="#values" className="hover:opacity-100 transition-opacity">Philosophy</a>
            <a href="#cta" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrollY > 80 ? "#18181b" : "#fff" }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-100 px-8 py-4 flex flex-col gap-4 text-xs tracking-widest uppercase text-zinc-500">
            <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#values" onClick={() => setMenuOpen(false)}>Philosophy</a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-end bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="white" strokeWidth="0.5" />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-8 pb-24 w-full"
          style={{ transform: `translateY(${scrollY * -0.12}px)` }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-400 mb-8">
            Premium Furniture Fittings · Since 1952
          </p>
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-extralight text-white leading-[0.9] tracking-tight mb-8">
            moving<br />
            <em className="not-italic text-zinc-300">ideas.</em>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed mb-10">
            움직임이 달라지면 삶이 달라집니다.<br />
            blum이 만드는 정밀한 피팅의 세계.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-3 border border-white/20 text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
            >
              제품 살펴보기
            </a>
            <a
              href="#cta"
              className="text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              문의하기 →
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div
              className="w-full bg-white/60 absolute top-0"
              style={{ height: "40%", animation: "slideDown 2s ease infinite" }}
            />
          </div>
          <span
            className="text-[9px] tracking-widest uppercase text-white/30 mt-6"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* Brand */}
      <section className="py-32 md:py-48 max-w-7xl mx-auto px-8">
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-6">
              About Blum
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight text-zinc-900 mb-8">
              가구의 움직임을<br />
              <em className="not-italic font-normal">재정의합니다</em>
            </h2>
            <p className="text-zinc-400 leading-8 text-sm max-w-sm mb-6">
              1952년 오스트리아에서 시작된 blum은 현재 전 세계 120개국에서 사용되는 프리미엄 가구 피팅 제조사입니다. 힌지, 서랍, 리프트 시스템을 통해 매일 수백만 명의 일상을 더 편리하게 만듭니다.
            </p>
            <p className="text-zinc-400 leading-8 text-sm max-w-sm">
              단순히 문을 여닫는 것이 아닙니다. 열고 닫는 모든 순간이 품격 있는 경험이 되도록, blum은 오늘도 움직입니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Abstract geometric blocks representing precision */}
            <div className="bg-zinc-100 aspect-square flex items-center justify-center">
              <div className="w-12 h-12 border border-zinc-300" />
            </div>
            <div className="bg-zinc-200 aspect-[3/4] mt-8 flex items-end p-4">
              <div className="w-full h-px bg-zinc-400" />
            </div>
            <div className="bg-zinc-300 aspect-[3/4] -mt-8 flex items-center justify-center">
              <div className="w-6 h-16 bg-zinc-400 opacity-50" />
            </div>
            <div className="bg-zinc-100 aspect-square flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-zinc-300" />
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={200} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-100 pt-12">
          {[
            { num: "70년+", label: "브랜드 역사" },
            { num: "120개국", label: "글로벌 판매" },
            { num: "50,000회", label: "내구성 테스트" },
            { num: "6,500명+", label: "전 세계 임직원" },
          ].map((s) => (
            <div key={s.num}>
              <div className="text-2xl md:text-3xl font-extralight text-zinc-900 mb-1">{s.num}</div>
              <div className="text-xs text-zinc-400 tracking-wider">{s.label}</div>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* Products */}
      <section id="products" className="py-24 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-8">
          <FadeIn className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-4">
              Product Lines
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight">
              Signature Systems
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100">
            {products.map((p, i) => (
              <FadeIn
                key={p.id}
                delay={i * 80}
                className="bg-white p-10 md:p-14 group cursor-pointer hover:bg-zinc-50 transition-colors duration-500"
              >
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] tracking-widest uppercase text-zinc-300">{p.id}</span>
                  <span className="text-[10px] tracking-widest uppercase text-zinc-300">{p.category}</span>
                </div>
                {/* Product visual placeholder */}
                <div className="bg-zinc-100 w-full aspect-[4/3] mb-8 overflow-hidden group-hover:bg-zinc-200 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-[10px] tracking-widest uppercase text-zinc-300">{p.name}</span>
                </div>
                <h3 className="text-2xl font-light mb-2">{p.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{p.desc}</p>
                <span className="text-[10px] tracking-widest uppercase text-zinc-300">{p.sub}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-32 md:py-48 max-w-7xl mx-auto px-8">
        <FadeIn className="mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-4">Our Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-extralight">blum이 추구하는 것</h2>
        </FadeIn>
        <div>
          {values.map((v, i) => (
            <FadeIn
              key={v.num}
              delay={i * 100}
              className="border-t border-zinc-100 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-6 group"
            >
              <span className="text-xs text-zinc-300 tracking-widest">{v.num}</span>
              <h3 className="text-xl font-light group-hover:text-zinc-600 transition-colors">
                {v.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{v.body}</p>
            </FadeIn>
          ))}
          <div className="border-t border-zinc-100" />
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-zinc-950 py-32 md:py-48">
        <FadeIn className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-8">Contact Us</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 leading-tight">
            쇼룸에서<br />
            직접 경험하세요
          </h2>
          <p className="text-zinc-400 text-sm leading-8 mb-12 max-w-sm mx-auto">
            blum의 피팅 시스템을 직접 체험해보세요. 전문 상담사가 공간에 최적화된 솔루션을 제안해드립니다.
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
              방문 신청
            </button>
          </form>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xl tracking-[0.3em] uppercase text-white font-light">blum</span>
            <p className="text-xs text-zinc-600 mt-1">moving ideas</p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-8 text-xs text-zinc-600 tracking-widest uppercase">
            <a href="https://www.blum.com/kr/ko/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">공식 사이트</a>
            <a href="#products" className="hover:text-zinc-400 transition-colors">Products</a>
            <a href="#cta" className="hover:text-zinc-400 transition-colors">Contact</a>
          </div>
          <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-widest uppercase">
            ← Back
          </Link>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-xs text-zinc-700">
          © 2025 Blum Korea. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
