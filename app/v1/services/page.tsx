"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

const SERVICES = [
  {
    id: "plan",
    name: "계획 / 설계 지원",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
  },
  {
    id: "digital",
    name: "E-Services",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결됩니다.",
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
  },
  {
    id: "assembly",
    name: "조립 / 조정 지원",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 blum의 조립 장치로 작업을 단순화합니다.",
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
  },
  {
    id: "marketing",
    name: "마케팅 / 판매 지원",
    desc: "blum 제품을 판매하는 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 멀티미디어 자료를 제공합니다.",
    img: `${BASE}/images/560/258/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
    items: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
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
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V1Services() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "360px", paddingTop: "80px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`}
            alt="blum services"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.1) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <p className="text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Services</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-3">설계부터 설치까지<br />blum이 함께합니다</h1>
          <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "400px" }}>
            제품 선택, 설계 지원, 디지털 서비스, 조립 지원까지 — blum의 종합 서비스 생태계를 경험하세요.
          </p>
        </div>
      </section>

      {/* Services */}
      <main className="max-w-7xl mx-auto px-6 py-20 space-y-20">
        {SERVICES.map((svc, i) => (
          <Reveal key={svc.id}>
            <section id={svc.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center scroll-mt-20">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="overflow-hidden aspect-[4/3] bg-zinc-100">
                  <img
                    src={svc.img}
                    alt={svc.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: "#a1a1aa" }}>Service</p>
                <h2 className="text-2xl font-light mb-4">{svc.name}</h2>
                <div style={{ width: "32px", height: "1px", backgroundColor: "#18181b", marginBottom: "20px" }} />
                <p className="text-sm leading-8 mb-6" style={{ color: "#52525b" }}>{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#52525b" }}>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#18181b", flexShrink: 0, display: "inline-block" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>
        ))}
      </main>

      {/* E-Services */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(24,24,27,0.06)", backgroundColor: "#fafafa" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: "#a1a1aa" }}>Online Portal</p>
          <h2 className="text-3xl font-light mb-4">E-Services 바로가기</h2>
          <p className="text-sm mb-8" style={{ color: "#71717a" }}>제품 구성, CAD 데이터, 주문 관리를 온라인으로 한 번에.</p>
          <a
            href="https://e-services.blum.com/main/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs tracking-[0.2em] uppercase px-8 py-4 border border-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
            style={{ color: "#18181b", textDecoration: "none" }}
          >
            E-Services 접속
          </a>
        </div>
      </section>
    </div>
  );
}
