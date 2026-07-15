"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

const VARIANTS = [
  {
    id: "hki",
    name: "AVENTOS HKi",
    sub: "INTEGRATED",
    desc: "가구에 완전히 일체화된 스테이 리프트. 피팅이 외부에 전혀 보이지 않아 고품질 가구 디자인을 완성합니다.",
    img: `${BASE}/images/560/420/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
  },
  {
    id: "hf",
    name: "AVENTOS HF top",
    sub: "DOUBLE-PART FOLDING",
    desc: "도어가 두 부분으로 접히며 열립니다. 높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트.",
    img: `${BASE}/images/560/420/4199083/corporate/media/bilder/produkte/klappensysteme/aventos-hf/kla1117_mc_4:3.jpg`,
  },
  {
    id: "hs",
    name: "AVENTOS HS top",
    sub: "SWING UP",
    desc: "원파트 도어가 캐비닛 위로 스윙합니다. 사용자의 동선에 방해가 되지 않게 열립니다.",
    img: `${BASE}/images/560/420/4207744/corporate/media/bilder/produkte/klappensysteme/aventos-hs/kla1106_mc_4:3.jpg`,
  },
  {
    id: "hl",
    name: "AVENTOS HL top",
    sub: "PARALLEL LIFT",
    desc: "캐비닛과 평행하게 들어 올리는 원파트 도어. 열린 상태에서도 공간이 깔끔하게 유지됩니다.",
    img: `${BASE}/images/560/420/4207777/corporate/media/bilder/produkte/klappensysteme/aventos-hl/kla1091_mc_4:3.jpg`,
  },
  {
    id: "hk",
    name: "AVENTOS HK top",
    sub: "STAY LIFT",
    desc: "원하는 위치에 정확하게 고정. 표준화된 고정 위치로 빠르고 쉽고 정확하게 설치할 수 있습니다.",
    img: `${BASE}/images/560/420/4199081/corporate/media/bilder/produkte/klappensysteme/aventos-hk-top/kla1113_mc_4:3.jpg`,
  },
  {
    id: "hk-s",
    name: "AVENTOS HK-S",
    sub: "STAY LIFT SMALL",
    desc: "소형·경량 도어를 위한 컴팩트한 리프트. 내장 BLUMOTION 소프트 클로즈로 부드러운 움직임을 보장합니다.",
    img: `${BASE}/images/560/420/4199085/corporate/media/bilder/produkte/klappensysteme/aventos-hk-s/Blum_KLA0598_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
  },
  {
    id: "hk-xs",
    name: "AVENTOS HK-XS",
    sub: "STAY LIFT EXTRA SMALL",
    desc: "소형 가구를 위한 초소형 리프트. 컴팩트한 제품군으로 적은 공간만 차지합니다.",
    img: `${BASE}/images/560/420/4199085/corporate/media/bilder/produkte/klappensysteme/aventos-hk-s/Blum_KLA0598_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
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
      transform: inView ? "none" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V3Aventos() {
  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      {/* Breadcrumb + Hero */}
      <section className="pt-36 pb-12 px-6 max-w-7xl mx-auto">
        <BoldReveal>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase font-black mb-8"
            style={{ color: "rgba(240,240,240,0.3)" }}>
            <Link href="/v2/products" style={{ textDecoration: "none", color: "inherit" }}
              className="hover:opacity-70 transition-opacity">PRODUCTS</Link>
            <span style={{ color: RED }}>·</span>
            <span style={{ color: "rgba(240,240,240,0.5)" }}>AVENTOS</span>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Lift Systems</p>
          <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-none mb-6 uppercase">
            AVEN<br /><span style={{ color: RED }}>TOS</span>
          </h1>
          <div style={{ width: "60px", height: "3px", backgroundColor: RED, marginBottom: "24px" }} />
          <p className="text-sm max-w-lg leading-relaxed" style={{ color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            상부장 리프트 시스템의 절대 강자. 5가지 오픈 방식으로 어떤 공간에서도
            완벽한 기능성과 디자인을 동시에 실현합니다.
          </p>
        </BoldReveal>
      </section>

      {/* Hero image */}
      <BoldReveal>
        <div className="w-full" style={{ maxHeight: "520px", overflow: "hidden", borderTop: `1px solid rgba(200,16,46,0.2)`, borderBottom: `1px solid rgba(200,16,46,0.2)` }}>
          <img
            src={`${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`}
            alt="AVENTOS overview"
            className="w-full object-cover"
            style={{ maxHeight: "520px" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </BoldReveal>

      {/* Variants grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <BoldReveal className="mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-3" style={{ color: RED }}>라인업</p>
          <h2 className="text-4xl font-black uppercase">6 SYSTEMS</h2>
        </BoldReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(240,240,240,0.05)" }}>
          {VARIANTS.map((v, i) => (
            <BoldReveal key={v.id} delay={i * 50}>
              <div className="group" style={{ backgroundColor: "#0a0a0a", padding: "0" }}>
                <div className="overflow-hidden aspect-[4/3]" style={{ backgroundColor: "#111" }}>
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-6">
                  <p className="text-[9px] tracking-[0.35em] uppercase font-black mb-2" style={{ color: RED }}>{v.sub}</p>
                  <h3 className="text-lg font-black uppercase mb-3 group-hover:text-white transition-colors"
                    style={{ color: "rgba(240,240,240,0.8)" }}>{v.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>{v.desc}</p>
                </div>
              </div>
            </BoldReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <BoldReveal>
        <section className="py-20 px-6 text-center border-t" style={{ borderColor: "rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>GET IN TOUCH</p>
          <h2 className="text-3xl font-black uppercase mb-8">제품 문의</h2>
          <Link href="/contact"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-80"
            style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}>
            CONTACT US
          </Link>
        </section>
      </BoldReveal>
    </div>
  );
}
