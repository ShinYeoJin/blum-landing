"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const CREAM = "#faf7f2";
const BROWN = "#3b2a1a";
const AMBER = "#c68642";

const VARIANTS = [
  {
    id: "hki",
    name: "AVENTOS HKi",
    sub: "통합형 스테이 리프트",
    desc: "가구에 완전히 일체화된 스테이 리프트. 피팅이 외부에 전혀 보이지 않아 고품질 가구 디자인을 완성합니다.",
    detail: "가구와 완벽하게 하나가 되어 도어를 닫으면 피팅이 보이지 않습니다.",
    img: `${BASE}/images/560/420/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
  },
  {
    id: "hf",
    name: "AVENTOS HF top",
    sub: "투파트 폴딩 리프트",
    desc: "도어가 두 부분으로 접히며 열립니다. 높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트.",
    detail: "양 파트가 함께 접히며 캐비닛 위 공간을 최소화합니다. 전면 조정 가능.",
    img: `${BASE}/images/560/420/4199083/corporate/media/bilder/produkte/klappensysteme/aventos-hf/kla1117_mc_4:3.jpg`,
  },
  {
    id: "hs",
    name: "AVENTOS HS top",
    sub: "원파트 상향 스윙 리프트",
    desc: "원파트 도어가 캐비닛 위로 스윙합니다. 사용자의 동선에 방해가 되지 않게 열립니다.",
    detail: "BLUMOTION이 통합되어 부드럽고 조용히 닫히고 가볍게 들어올려집니다.",
    img: `${BASE}/images/560/420/4207744/corporate/media/bilder/produkte/klappensysteme/aventos-hs/kla1106_mc_4:3.jpg`,
  },
  {
    id: "hl",
    name: "AVENTOS HL top",
    sub: "평행 리프트",
    desc: "캐비닛과 평행하게 들어 올리는 원파트 도어. 열린 상태에서도 공간이 깔끔하게 유지됩니다.",
    detail: "도어가 캐비닛 천장과 평행을 유지하며 올라가 방해 없이 내부 접근이 가능합니다.",
    img: `${BASE}/images/560/420/4207777/corporate/media/bilder/produkte/klappensysteme/aventos-hl/kla1091_mc_4:3.jpg`,
  },
  {
    id: "hk",
    name: "AVENTOS HK top",
    sub: "고정 리프트",
    desc: "원하는 위치에 정확하게 고정. 대소형 캐비닛 모두에 적합하며 설치와 조정이 간편합니다.",
    detail: "표준화된 고정 위치로 별도의 계산 없이 빠르고 쉽고 정확하게 설치할 수 있습니다.",
    img: `${BASE}/images/560/420/4199081/corporate/media/bilder/produkte/klappensysteme/aventos-hk-top/kla1113_mc_4:3.jpg`,
  },
  {
    id: "hk-s",
    name: "AVENTOS HK-S",
    sub: "소형 고정 리프트",
    desc: "소형·경량 도어를 위한 컴팩트한 리프트 시스템. 적은 공간만 차지하면서도 AVENTOS의 품질을 그대로.",
    detail: "작은 크기에도 내장 BLUMOTION 소프트 클로즈로 부드러운 움직임을 보장합니다.",
    img: `${BASE}/images/560/420/4199085/corporate/media/bilder/produkte/klappensysteme/aventos-hk-s/Blum_KLA0598_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
  },
  {
    id: "hk-xs",
    name: "AVENTOS HK-XS",
    sub: "초소형 고정 리프트",
    desc: "소형 가구를 위한 초소형 리프트. 컴팩트한 제품군으로 적은 공간만 차지합니다.",
    detail: "조화로운 미학을 창조하기 위해 다양한 커버 캡 색상을 제공합니다.",
    img: `${BASE}/images/560/420/4199085/corporate/media/bilder/produkte/klappensysteme/aventos-hk-s/Blum_KLA0598_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
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
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V2Aventos() {
  return (
    <div style={{ backgroundColor: CREAM, color: BROWN, fontFamily: "'Georgia', serif" }}>
      {/* Breadcrumb + Hero */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 text-xs mb-8" style={{ color: "#8a6a4a" }}>
            <Link href="/v2/products" style={{ textDecoration: "none", color: "inherit" }}
              className="hover:underline">Products</Link>
            <span>/</span>
            <span>AVENTOS</span>
          </div>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: AMBER }}>Lift Systems</p>
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>AVENTOS</h1>
          <div style={{ width: "40px", height: "2px", backgroundColor: AMBER, marginBottom: "20px", borderRadius: "2px" }} />
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#8a6a4a" }}>
            상부장을 위한 혁신적인 리프트 시스템. 따뜻한 감성과 탁월한 기능성이 만나
            일상의 주방을 특별한 공간으로 만듭니다.
          </p>
        </Reveal>
      </section>

      {/* Hero image */}
      <Reveal>
        <div className="w-full overflow-hidden rounded-2xl mx-auto px-6 max-w-7xl" style={{ maxHeight: "480px" }}>
          <img
            src={`${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`}
            alt="AVENTOS overview"
            className="w-full object-cover rounded-2xl"
            style={{ maxHeight: "480px" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </Reveal>

      {/* Variants */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: AMBER }}>제품 라인업</p>
          <h2 className="text-3xl" style={{ fontWeight: 300, color: BROWN }}>7가지 AVENTOS 시스템</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {VARIANTS.map((v, i) => (
            <Reveal key={v.id} delay={i * 60}>
              <div className="group rounded-2xl overflow-hidden" style={{ backgroundColor: "#f0e8dc" }}>
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-8">
                  <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: AMBER }}>{v.sub}</p>
                  <h3 className="text-xl mb-3" style={{ fontWeight: 400, color: BROWN }}>{v.name}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#6b4f35" }}>{v.desc}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#8a6a4a" }}>{v.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="py-24 px-6 text-center">
          <div className="max-w-xl mx-auto p-12 rounded-3xl" style={{ backgroundColor: "#f0e8dc" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: AMBER }}>쇼룸 방문</p>
            <h2 className="text-2xl mb-6" style={{ fontWeight: 300, color: BROWN }}>직접 경험해 보세요</h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#8a6a4a" }}>
              AVENTOS의 부드러운 움직임을 직접 느껴보실 수 있는 쇼룸을 방문해 보세요.
            </p>
            <Link href="/contact"
              className="inline-block px-8 py-3 text-sm rounded-full transition-opacity hover:opacity-80"
              style={{ backgroundColor: BROWN, color: "#faf7f2", textDecoration: "none" }}>
              쇼룸 방문 신청
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
