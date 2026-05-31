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
    href: "/v3/products#hinge",
    num: "01",
    imgs: [
      `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4174906/corporate/media/bilder/produkte/scharniersysteme/clip-top_blumotion_105/blum-clip-top-blumotion-105-cme151388_4:3.jpg`,
    ],
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "BOX SYSTEMS",
    desc: "LEGRABOX / MERIVOBOX — 얇고 우아한 금속 프레임 서랍. 프리미엄 주방의 새로운 기준.",
    href: "/v3/products#box",
    num: "02",
    imgs: [
      `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4173336/corporate/media/bilder/produkte/boxsysteme/BOX1856_AA_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
    ],
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "LIFT SYSTEMS",
    desc: "AVENTOS — 상부장을 위한 혁신적 리프트. 5가지 오픈 방식으로 공간을 지배한다.",
    href: "/v3/products/aventos",
    num: "03",
    imgs: [
      `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
      `${BASE}/images/560/258/4207901/corporate/media/bilder/produkte/klappensysteme/aventos-top/kla1119_mc_4:3.jpg`,
    ],
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "RUNNER SYSTEMS",
    desc: "MOVENTO — 완전 인출. 묵직한 하중에서도 부드럽고 정확한 움직임.",
    href: "/v3/products#runner",
    num: "04",
    imgs: [
      `${BASE}/images/560/258/4202352/corporate/media/bilder/produkte/fuehrungssysteme/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
      `${BASE}/images/560/258/4214071/corporate/media/bilder/produkte/fuehrungssysteme/ME14726240_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
    ],
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "MOTION TECHNOLOGY",
    desc: "TIP-ON / BLUMOTION — 핸들 없이 터치 한 번. 미니멀 디자인의 극한.",
    href: "/v3/products#motion",
    num: "05",
    imgs: [
      `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4207125/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1659_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4204524/corporate/media/bilder/produkte/bewegungstechnologien/blum_tip0163_aa_fot_fo_bau_-sall_-apr3_-v1_4:3.jpg`,
    ],
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "POCKET SYSTEMS",
    desc: "REVEGO — 도어가 완전히 사라진다. 공간의 경계를 무너뜨리는 포켓 시스템.",
    href: "/v3/products#pocket",
    num: "06",
    imgs: [
      `${BASE}/images/560/258/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg`,
      `${BASE}/images/560/258/4204148/corporate/media/bilder/produkte/schrankanwendungen/moebeltuer-nach-innen/me57420985_all_src_4:3.jpg`,
      `${BASE}/images/560/258/4214378/corporate/media/bilder/produkte/schrankanwendungen/spacestep0008_4:3.jpg`,
    ],
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

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(240,240,240,0.04)" }}>
          {CATEGORIES.map((cat, i) => (
            <BoldReveal key={cat.id} delay={i * 50}>
              <Link
                href={cat.href}
                className="group block"
                style={{ textDecoration: "none", backgroundColor: "#0a0a0a" }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Main image */}
                <div className="overflow-hidden aspect-[4/3]" style={{ backgroundColor: "#111" }}>
                  <img
                    src={cat.imgs[0]}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                {/* Sub images */}
                <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: "rgba(200,16,46,0.08)" }}>
                  {cat.imgs.slice(1).map((img, j) => (
                    <div key={j} className="overflow-hidden aspect-[4/3]" style={{ backgroundColor: "#111" }}>
                      <img
                        src={img}
                        alt={`${cat.name} ${j + 2}`}
                        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  ))}
                </div>
                {/* Text */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] tracking-[0.3em] font-black"
                      style={{ color: hovered === cat.id ? RED : "rgba(200,16,46,0.4)" }}>{cat.num}</span>
                    <span className="text-[9px] tracking-[0.35em] font-black"
                      style={{ color: hovered === cat.id ? RED : "rgba(240,240,240,0.25)" }}>{cat.en}</span>
                  </div>
                  <h2 className="text-lg font-black uppercase mb-2 transition-colors"
                    style={{ color: hovered === cat.id ? "#fff" : "rgba(240,240,240,0.7)" }}>
                    {cat.name}
                  </h2>
                  <p className="text-xs leading-relaxed"
                    style={{ color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                    {cat.desc}
                  </p>
                  <div className="mt-4">
                    <span className="text-[10px] tracking-[0.2em] font-black transition-colors"
                      style={{ color: hovered === cat.id ? RED : "rgba(240,240,240,0.2)" }}>
                      VIEW →
                    </span>
                  </div>
                </div>
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
          <Link href="/v3/contact"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-80"
            style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}>
            지금 문의하기
          </Link>
        </section>
      </BoldReveal>
    </div>
  );
}
