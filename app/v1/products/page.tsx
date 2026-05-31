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
    desc: "LEGRABOX / MERIVOBOX — 얇고 우아한 금속 프레임 서랍. 주방 하부장을 세련되게 완성하는 프리미엄 솔루션.",
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
    desc: "AVENTOS — 상부장을 부드럽게 들어올리는 리프트 시스템. 5가지 오픈 방식으로 공간을 더 실용적으로.",
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
    desc: "MOVENTO — 완전 인출이 가능한 서랍 러너. 묵직한 하중에서도 부드럽고 안정적인 움직임.",
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
    desc: "TIP-ON / BLUMOTION — 손잡이 없이 살짝 누르면 열리는 핸들프리 시스템. 미니멀 주방의 완성.",
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
    desc: "REVEGO — 도어가 캐비닛 안으로 완전히 숨어드는 포켓 시스템. 공간의 경계를 지웁니다.",
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
