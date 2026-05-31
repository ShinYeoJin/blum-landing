"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "Hinge Systems",
    desc: "CLIP top BLUMOTION — 경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v1/products#hinge",
    imgs: [
      `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4174906/corporate/media/bilder/produkte/scharniersysteme/clip-top_blumotion_105/blum-clip-top-blumotion-105-cme151388_4:3.jpg`,
    ],
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "Box Systems",
    desc: "LEGRABOX / MERIVOBOX — 가장 까다로운 디자인 요구 사항에 적합한 서랍 시스템. 슬림한 서랍면(12.8mm), 최대 하중 40kg 및 70kg.",
    href: "/v1/products#box",
    imgs: [
      `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4173336/corporate/media/bilder/produkte/boxsysteme/BOX1856_AA_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
    ],
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "Lift Systems",
    desc: "AVENTOS — 높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 7가지 제품군 제공.",
    href: "/v1/products/aventos",
    imgs: [
      `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
      `${BASE}/images/560/258/4207901/corporate/media/bilder/produkte/klappensysteme/aventos-top/kla1119_mc_4:3.jpg`,
    ],
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "Runner Systems",
    desc: "MOVENTO — 일체형인 듯 매우 가볍게 미끄러지는 듯한 동작, 4차원 프런트 조정. 동적 하중 40kg 및 60kg.",
    href: "/v1/products#runner",
    imgs: [
      `${BASE}/images/560/258/4202352/corporate/media/bilder/produkte/fuehrungssysteme/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
      `${BASE}/images/560/258/4214071/corporate/media/bilder/produkte/fuehrungssysteme/ME14726240_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
    ],
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "Motion Technology",
    desc: "TIP-ON / BLUMOTION — 핸들 없는 가구를 원터치로 열 수 있는 기계식 열기 시스템. SERVO-DRIVE 전동 시스템도 제공.",
    href: "/v1/products#motion",
    imgs: [
      `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4207125/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1659_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4204524/corporate/media/bilder/produkte/bewegungstechnologien/blum_tip0163_aa_fot_fo_bau_-sall_-apr3_-v1_4:3.jpg`,
    ],
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "Pocket Systems",
    desc: "REVEGO — 다기능 공간을 만들 수 있는 완전히 새로운 기회. 독일 디자인상·Red Dot·iF Award 2022 수상.",
    href: "/v1/products#pocket",
    imgs: [
      `${BASE}/images/560/258/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg`,
      `${BASE}/images/560/258/4204148/corporate/media/bilder/produkte/schrankanwendungen/moebeltuer-nach-innen/me57420985_all_src_4:3.jpg`,
      `${BASE}/images/560/258/4214378/corporate/media/bilder/produkte/schrankanwendungen/spacestep0008_4:3.jpg`,
    ],
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
                {/* Main image */}
                <div className="overflow-hidden aspect-[4/3] bg-zinc-50">
                  <img
                    src={cat.imgs[0]}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                {/* Sub images */}
                <div className="grid grid-cols-2 gap-px bg-zinc-100">
                  {cat.imgs.slice(1).map((img, j) => (
                    <div key={j} className="overflow-hidden aspect-[4/3] bg-zinc-50">
                      <img
                        src={img}
                        alt={`${cat.name} ${j + 2}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  ))}
                </div>
                {/* Text */}
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
