"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

const VARIANTS = [
  {
    id: "hf",
    name: "AVENTOS HF",
    sub: "투파트 폴딩 도어",
    desc: "도어가 중앙에서 두 부분으로 접히며 열립니다. 대형 상부장에 이상적인 리프트 시스템.",
    detail: "양 파트가 함께 접히며 캐비닛 위 공간을 최소화합니다. 대형 도어에도 완벽한 밸런스 조절 가능.",
    img: `${BASE}/images/560/420/4199083/corporate/media/bilder/produkte/klappensysteme/aventos-hf/kla1117_mc_4:3.jpg`,
  },
  {
    id: "hl",
    name: "AVENTOS HL",
    sub: "평행 리프트 도어",
    desc: "캐비닛과 평행하게 들어 올리는 원파트 도어. 열린 상태에서도 공간이 깔끔하게 유지됩니다.",
    detail: "도어가 캐비닛 천장과 평행을 유지하며 올라가 방해 없이 내부 접근이 가능합니다.",
    img: `${BASE}/images/560/420/4207777/corporate/media/bilder/produkte/klappensysteme/aventos-hl/kla1091_mc_4:3.jpg`,
  },
  {
    id: "hs",
    name: "AVENTOS HS",
    sub: "상향 스윙 도어",
    desc: "원파트 도어가 캐비닛 위로 스윙합니다. 대형 도어의 가벼운 조작감을 실현.",
    detail: "BLUMOTION이 통합되어 열고 닫을 때 항상 부드럽고 조용한 움직임을 제공합니다.",
    img: `${BASE}/images/560/420/4207744/corporate/media/bilder/produkte/klappensysteme/aventos-hs/kla1106_mc_4:3.jpg`,
  },
  {
    id: "hk",
    name: "AVENTOS HK",
    sub: "고정 리프트",
    desc: "가장 널리 사용되는 리프트 시스템. 대소형 캐비닛 모두에 적합한 통합 솔루션.",
    detail: "내장된 기능들로 설치와 조정이 간편하며, 다양한 도어 크기에 완벽하게 대응합니다.",
    img: `${BASE}/images/560/420/4199081/corporate/media/bilder/produkte/klappensysteme/aventos-hk-top/kla1113_mc_4:3.jpg`,
  },
  {
    id: "hk-s",
    name: "AVENTOS HK-S",
    sub: "소형 고정 리프트",
    desc: "소형·경량 도어를 위한 강화된 사용 편의성. 컴팩트한 공간에 최적화.",
    detail: "작은 크기에도 AVENTOS의 모든 품질을 그대로 담았습니다.",
    img: `${BASE}/images/560/420/4199085/corporate/media/bilder/produkte/klappensysteme/aventos-hk-s/Blum_KLA0598_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
  },
  {
    id: "hki",
    name: "AVENTOS HKi",
    sub: "통합형 스테이 리프트",
    desc: "가구에 완전히 일체화된 스테이 리프트. 고품질 가구 디자인의 완성.",
    detail: "가구와 완벽하게 하나가 되어 외부에서 피팅이 전혀 보이지 않습니다.",
    img: `${BASE}/images/560/420/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
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
      transform: inView ? "none" : "translateY(20px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V1Aventos() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {/* Breadcrumb + Hero */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 text-xs text-zinc-400 tracking-wider mb-8">
            <Link href="/v1/products" style={{ textDecoration: "none", color: "inherit" }} className="hover:text-zinc-600 transition-colors">Products</Link>
            <span>/</span>
            <span>AVENTOS</span>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">Lift Systems</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-6">AVENTOS</h1>
          <div style={{ width: "48px", height: "1px", backgroundColor: "#18181b", marginBottom: "24px" }} />
          <p className="text-base text-zinc-500 max-w-2xl leading-relaxed">
            상부장을 위한 혁신적인 리프트 시스템. 5가지 다양한 오픈 방식으로 주방 공간의 사용성을 극대화합니다.
            BLUMOTION 소프트클로징이 기본 내장되어 어떤 상황에서도 부드럽고 조용한 움직임을 보장합니다.
          </p>
        </Reveal>
      </section>

      {/* Hero image */}
      <Reveal>
        <div className="w-full overflow-hidden" style={{ maxHeight: "480px" }}>
          <img
            src={`${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`}
            alt="AVENTOS overview"
            className="w-full object-cover"
            style={{ maxHeight: "480px" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </Reveal>

      {/* Variants */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-3">제품 라인업</p>
          <h2 className="text-3xl font-light text-zinc-900">6가지 AVENTOS 시스템</h2>
        </Reveal>

        <div className="space-y-px bg-zinc-100">
          {VARIANTS.map((v, i) => (
            <Reveal key={v.id} delay={i * 50}>
              <div className="group bg-white grid grid-cols-1 md:grid-cols-2">
                <div className="overflow-hidden aspect-[4/3] bg-zinc-50">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-2">{v.sub}</p>
                  <h3 className="text-2xl font-light text-zinc-900 mb-4">{v.name}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{v.desc}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{v.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="py-24 px-6 text-center border-t border-zinc-100">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">더 알아보기</p>
          <h2 className="text-3xl font-light text-zinc-900 mb-8">제품 상담 문의</h2>
          <Link href="/contact"
            className="inline-block px-10 py-4 text-xs tracking-[0.2em] uppercase border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
            style={{ textDecoration: "none" }}>
            문의하기
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
