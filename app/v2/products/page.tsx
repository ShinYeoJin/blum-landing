"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const CREAM = "#faf7f2";
const BROWN = "#3b2a1a";
const AMBER = "#c68642";

const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "Hinge Systems",
    desc: "CLIP top BLUMOTION — 경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v2/products#hinge",
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
    href: "/v2/products#box",
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
    href: "/v2/products/aventos",
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
    href: "/v2/products#runner",
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
    href: "/v2/products#motion",
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
    href: "/v2/products#pocket",
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
      transform: inView ? "none" : "translateY(28px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function V2Products() {
  return (
    <div style={{ backgroundColor: CREAM, color: BROWN, fontFamily: "'Georgia', serif" }}>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: AMBER }}>Products</p>
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 300, letterSpacing: "-0.02em", color: BROWN }}>
            제품 컬렉션
          </h1>
          <div style={{ width: "40px", height: "2px", backgroundColor: AMBER, marginBottom: "20px", borderRadius: "2px" }} />
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "#8a6a4a" }}>
            blum의 피팅 솔루션은 주방과 가구에 따뜻한 기능미를 더합니다.
            매일의 생활을 더 편리하고 아름답게 만드는 것이 저희의 약속입니다.
          </p>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <Link href={cat.href} className="group block" style={{ textDecoration: "none" }}>
                {/* Main image */}
                <div className="overflow-hidden rounded-t-2xl aspect-[4/3]" style={{ backgroundColor: "#e8ddd0" }}>
                  <img
                    src={cat.imgs[0]}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                {/* Sub images */}
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {cat.imgs.slice(1).map((img, j) => (
                    <div key={j} className={`overflow-hidden aspect-[4/3] ${j === 0 ? "rounded-bl-none" : "rounded-br-none"}`}
                      style={{ backgroundColor: "#e8ddd0" }}>
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
                <div className="px-1 pt-5 pb-2">
                  <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: AMBER }}>{cat.en}</p>
                  <h2 className="text-xl mb-3 transition-colors" style={{ color: BROWN, fontWeight: 400 }}
                    onMouseEnter={e => (e.currentTarget.style.color = AMBER)}
                    onMouseLeave={e => (e.currentTarget.style.color = BROWN)}>
                    {cat.name}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#8a6a4a" }}>{cat.desc}</p>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="text-sm" style={{ color: AMBER }}>더 알아보기 →</span>
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
