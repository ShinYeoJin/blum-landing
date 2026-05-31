"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

const SERVICES = [
  {
    id: "plan",
    name: "계획 / 설계 지원",
    en: "PLANNING",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
    num: "01",
  },
  {
    id: "digital",
    name: "E-Services",
    en: "E-SERVICES",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결됩니다.",
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
    num: "02",
  },
  {
    id: "assembly",
    name: "조립 / 조정 지원",
    en: "ASSEMBLY",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 blum의 조립 장치로 작업을 단순화합니다.",
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
    num: "03",
  },
  {
    id: "marketing",
    name: "마케팅 / 판매 지원",
    en: "MARKETING",
    desc: "blum 제품을 판매하는 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 멀티미디어 자료를 제공합니다.",
    img: `${BASE}/images/560/258/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
    items: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
    num: "04",
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
      transform: inView ? "none" : "translateX(-16px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V3Services() {
  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "380px", paddingTop: "80px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`}
            alt="blum services"
            className="w-full h-full object-cover opacity-15"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 50%, rgba(0,0,0,0.2) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Services</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
            FULL<br /><span style={{ color: RED }}>SUPPORT.</span>
          </h1>
          <div style={{ width: "60px", height: "3px", backgroundColor: RED, marginBottom: "16px" }} />
          <p className="text-sm max-w-lg leading-relaxed" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            제품 선택, 설계 지원, 디지털 서비스, 조립 지원까지 — blum의 종합 서비스 생태계.
          </p>
        </div>
      </section>

      {/* Services list */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {SERVICES.map((svc, i) => (
          <BoldReveal key={svc.id}>
            <section id={svc.id} className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t scroll-mt-20"
              style={{ borderColor: "rgba(200,16,46,0.15)" }}>
              <div className={`${i % 2 === 1 ? "md:order-2" : ""} overflow-hidden`} style={{ maxHeight: "360px" }}>
                <img
                  src={svc.img}
                  alt={svc.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  style={{ minHeight: "280px", filter: "grayscale(20%)" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className={`${i % 2 === 1 ? "md:order-1" : ""} py-12 px-10 flex flex-col justify-center`}
                style={{ backgroundColor: i % 2 === 0 ? "#0a0a0a" : "#000" }}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-[9px] tracking-[0.3em] font-black" style={{ color: "rgba(200,16,46,0.5)" }}>{svc.num}</span>
                  <span className="text-[9px] tracking-[0.35em] font-black" style={{ color: RED }}>{svc.en}</span>
                </div>
                <h2 className="text-2xl font-black uppercase mb-5">{svc.name}</h2>
                <p className="text-sm leading-7 mb-6" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs"
                      style={{ color: "rgba(240,240,240,0.55)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                      <span style={{ width: "6px", height: "6px", backgroundColor: RED, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </BoldReveal>
        ))}
      </main>

      {/* E-Services */}
      <BoldReveal>
        <section className="py-20 border-t" style={{ borderColor: "rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Online Portal</p>
            <h2 className="text-4xl font-black uppercase mb-4">E-SERVICES</h2>
            <p className="text-sm mb-8" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>제품 구성, CAD 데이터, 주문 관리를 온라인으로 한 번에.</p>
            <a
              href="https://e-services.blum.com/main/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[11px] tracking-[0.3em] uppercase font-black px-10 py-4 transition-opacity hover:opacity-80"
              style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}
            >
              E-Services 접속
            </a>
          </div>
        </section>
      </BoldReveal>
    </div>
  );
}
