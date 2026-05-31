"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "Hinge Systems",
    desc: "CLIP top BLUMOTION — 소프트클로징 내장 경첩으로 도어가 마지막 순간 스스로 부드럽게 닫힙니다.",
    img: `${BASE}/images/560/420/4200520/corporate/media/bilder/produkte/scharniersysteme/dummys/%C3%BCbersicht-header_4:3.png`,
    href: "/v1/products#hinge",
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "Box Systems",
    desc: "LEGRABOX — 얇고 우아한 금속 프레임 서랍. 주방 하부장을 세련되게 완성하는 프리미엄 솔루션.",
    img: `${BASE}/images/560/420/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    href: "/v1/products#box",
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "Lift Systems",
    desc: "AVENTOS — 상부장을 부드럽게 들어올리는 리프트 시스템. 5가지 오픈 방식으로 공간을 더 실용적으로.",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    href: "/v1/products/aventos",
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "Runner Systems",
    desc: "MOVENTO — 완전 인출이 가능한 서랍 러너. 묵직한 하중에서도 부드럽고 안정적인 움직임.",
    img: `${BASE}/images/560/420/4202352/corporate/media/bilder/produkte/auszugssysteme/movento/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    href: "/v1/products#runner",
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "Motion Technology",
    desc: "TIP-ON — 손잡이 없이 살짝 누르면 열리는 핸들프리 시스템. 미니멀 주방의 완성.",
    img: `${BASE}/images/560/420/4209640/corporate/media/bilder/produkte/bewegungstechnologien/tip-on/Blum-4-fuer-mehr-LBX0453_4:3.jpg`,
    href: "/v1/products#motion",
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "Pocket Systems",
    desc: "REVEGO — 도어가 캐비닛 안으로 완전히 숨어드는 포켓 시스템. 공간의 경계를 지웁니다.",
    img: `${BASE}/images/560/420/4210225/corporate/media/bilder/produkte/pocket-systems/revego/blum_me10479780_4:3.jpg`,
    href: "/v1/products#pocket",
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V1Products() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">Products</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-6">제품 카테고리</h1>
          <div style={{ width: "48px", height: "1px", backgroundColor: "#18181b", marginBottom: "24px" }} />
          <p className="text-base text-zinc-500 max-w-xl leading-relaxed">
            blum의 모든 피팅 솔루션은 기능성과 디자인의 균형을 최우선으로 설계됩니다. 주방과 가구를 더 아름답고 편리하게.
          </p>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 60}>
              <Link href={cat.href} className="group block bg-white" style={{ textDecoration: "none" }}>
                <div className="overflow-hidden aspect-[4/3] bg-zinc-50">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-2">{cat.en}</p>
                  <h2 className="text-xl font-light text-zinc-900 mb-3 group-hover:text-zinc-500 transition-colors">{cat.name}</h2>
                  <p className="text-sm text-zinc-500 leading-relaxed">{cat.desc}</p>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-xs tracking-[0.2em] uppercase text-zinc-900">자세히 보기</span>
                    <span className="text-zinc-300 group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
