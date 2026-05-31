"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "HINGE SYSTEMS",
    desc: "CLIP top BLUMOTION — 소프트클로징 내장 경첩. 도어가 마지막 순간 스스로 닫힌다.",
    img: `${BASE}/images/560/420/4200520/corporate/media/bilder/produkte/scharniersysteme/dummys/%C3%BCbersicht-header_4:3.png`,
    href: "/v3/products#hinge",
    num: "01",
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "BOX SYSTEMS",
    desc: "LEGRABOX — 얇고 우아한 금속 프레임 서랍. 프리미엄 주방의 새로운 기준.",
    img: `${BASE}/images/560/420/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    href: "/v3/products#box",
    num: "02",
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "LIFT SYSTEMS",
    desc: "AVENTOS — 상부장을 위한 혁신적 리프트. 5가지 오픈 방식으로 공간을 지배한다.",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    href: "/v3/products/aventos",
    num: "03",
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "RUNNER SYSTEMS",
    desc: "MOVENTO — 완전 인출. 묵직한 하중에서도 부드럽고 정확한 움직임.",
    img: `${BASE}/images/560/420/4202352/corporate/media/bilder/produkte/auszugssysteme/movento/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    href: "/v3/products#runner",
    num: "04",
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "MOTION TECHNOLOGY",
    desc: "TIP-ON — 핸들 없이 터치 한 번. 미니멀 디자인의 극한.",
    img: `${BASE}/images/560/420/4209640/corporate/media/bilder/produkte/bewegungstechnologien/tip-on/Blum-4-fuer-mehr-LBX0453_4:3.jpg`,
    href: "/v3/products#motion",
    num: "05",
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "POCKET SYSTEMS",
    desc: "REVEGO — 도어가 완전히 사라진다. 공간의 경계를 무너뜨리는 포켓 시스템.",
    img: `${BASE}/images/560/420/4210225/corporate/media/bilder/produkte/pocket-systems/revego/blum_me10479780_4:3.jpg`,
    href: "/v3/products#pocket",
    num: "06",
  },
];

function BoldReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateX(-20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V3Products() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @keyframes v3-scan { 0%{background-position:0 0;} 100%{background-position:0 100px;} }
      `}</style>

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <BoldReveal>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4 font-black" style={{ color: RED }}>Products</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6 uppercase">
            제품<br />
            <span style={{ color: RED }}>라인업</span>
          </h1>
          <div style={{ width: "60px", height: "3px", backgroundColor: RED, marginBottom: "24px" }} />
          <p className="text-sm max-w-lg leading-relaxed" style={{ color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            blum의 피팅 시스템은 단순한 하드웨어가 아닙니다.
            120개국에서 검증된 혁신 기술로 가구의 가능성을 다시 정의합니다.
          </p>
        </BoldReveal>
      </section>

      {/* Product list */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="divide-y" style={{ borderColor: "rgba(240,240,240,0.08)" }}>
          {CATEGORIES.map((cat, i) => (
            <BoldReveal key={cat.id} delay={i * 50}>
              <Link href={cat.href}
                className="group flex items-center gap-6 py-8 transition-all"
                style={{ textDecoration: "none", color: "inherit" }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}>
                <span className="text-[10px] tracking-[0.3em] font-black w-10 shrink-0"
                  style={{ color: hovered === cat.id ? RED : "rgba(240,240,240,0.2)" }}>
                  {cat.num}
                </span>

                <div className="w-24 h-16 shrink-0 overflow-hidden" style={{ backgroundColor: "#111" }}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[9px] tracking-[0.35em] font-black mb-1"
                    style={{ color: hovered === cat.id ? RED : "rgba(240,240,240,0.3)" }}>
                    {cat.en}
                  </p>
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight transition-colors"
                    style={{ color: hovered === cat.id ? "#ffffff" : "rgba(240,240,240,0.7)" }}>
                    {cat.name}
                  </h2>
                  <p className="text-xs mt-1 hidden md:block" style={{ color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                    {cat.desc}
                  </p>
                </div>

                <span className="text-2xl font-black transition-all"
                  style={{ color: hovered === cat.id ? RED : "rgba(240,240,240,0.15)", transform: hovered === cat.id ? "translateX(4px)" : "none" }}>
                  →
                </span>
              </Link>
            </BoldReveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <BoldReveal>
        <section className="py-20 px-6 text-center border-t" style={{ borderColor: "rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>CONTACT US</p>
          <h2 className="text-3xl font-black uppercase mb-8">제품 상담 문의</h2>
          <Link href="/contact"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-80"
            style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}>
            지금 문의하기
          </Link>
        </section>
      </BoldReveal>
    </div>
  );
}
