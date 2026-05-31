"use client";

import BlumNav from "@/components/BlumNav";
import BlumFooter from "@/components/BlumFooter";
import Link from "next/link";

const BASE = "https://www.blum.com";

const CATEGORIES = [
  {
    id: "lift",
    name: "AVENTOS",
    subtitle: "리프트 시스템",
    desc: "높이가 높은 캐비닛과 상부장을 우아하게 열 수 있는 리프트 시스템. 접이식, 수직, 수평 등 다양한 오픈 방식을 제공합니다.",
    img: `${BASE}/images/560/420/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    variants: ["AVENTOS HK", "AVENTOS HL", "AVENTOS HF", "AVENTOS HS", "AVENTOS HK-S", "AVENTOS HKi"],
    feature: "다양한 오픈 방식 · 내장형 댐핑 · 하중 보상 시스템",
  },
  {
    id: "hinge",
    name: "CLIP top",
    subtitle: "경첩 시스템",
    desc: "BLUMOTION 소프트 클로징 기술이 내장된 고품질 경첩 시스템. 부드럽고 조용하게 닫히는 도어 경험을 제공합니다.",
    img: `${BASE}/images/560/420/4200520/corporate/media/bilder/produkte/scharniersysteme/scharniersysteme-dummys/%C3%BCbersicht-header_4:3.png`,
    variants: ["CLIP top BLUMOTION", "CLIP top INSERTA", "MODUL", "M BLUMOTION 105°", "CLIP top 170°"],
    feature: "통합 소프트 클로징 · 클릭-온 장착 · 무공구 조정",
  },
  {
    id: "box",
    name: "LEGRABOX",
    subtitle: "박스 / 서랍 시스템",
    desc: "극도로 슬림한 금속 프레임과 압도적인 수납 공간. 최대 70kg 하중을 지지하며 완벽한 서랍 경험을 선사합니다.",
    img: `${BASE}/images/560/420/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    variants: ["LEGRABOX pure", "LEGRABOX free", "TANDEMBOX antaro", "TANDEMBOX intivo", "METABOX"],
    feature: "슬림 프레임 · 최대 70kg · BLUMOTION 통합",
  },
  {
    id: "runner",
    name: "MOVENTO",
    subtitle: "러너 시스템",
    desc: "공중에 뜨는 듯 가벼운 서랍 움직임. 목재 및 금속 서랍 모두 지원하며 BLUMOTION이 내장되어 있습니다.",
    img: `${BASE}/images/560/420/4202352/corporate/media/bilder/produkte/fuehrungssysteme/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    variants: ["MOVENTO", "MOVENTO 전체 인출", "TANDEM", "TANDEM 부분 인출"],
    feature: "내장형 BLUMOTION · 전체 인출 · 쉬운 장착",
  },
  {
    id: "motion",
    name: "TIP-ON",
    subtitle: "모션 기술",
    desc: "핸들 없이 가볍게 터치하면 스스로 열리는 혁신적인 모션 기술. BLUMOTION, SERVO-DRIVE 등 4가지 기술로 가구의 편의성을 극대화합니다.",
    img: `${BASE}/images/560/420/4209640/corporate/media/bilder/produkte/bewegungstechnologien/4-fuer-mehr/Blum-4-fuer-mehr-LBX0453_4:3.jpg`,
    variants: ["TIP-ON BLUMOTION", "BLUMOTION", "SERVO-DRIVE", "SERVO-DRIVE HINGE"],
    feature: "터치 오픈 · 전동 구동 · 소프트 클로징",
  },
  {
    id: "pocket",
    name: "REVEGO",
    subtitle: "포켓 시스템",
    desc: "완전히 새로운 공간 활용의 가능성. 도어가 캐비닛 내부로 사라지며 열리는 포켓 시스템으로 다기능 공간을 만들 수 있습니다.",
    img: `${BASE}/images/560/420/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg`,
    variants: ["REVEGO duo", "REVEGO uno"],
    feature: "내장형 포켓 · 완전 개방 · 다기능 공간",
  },
];


export default function ProductsPage() {
  return (
    <div style={{ backgroundColor: "#fff", color: "#18181b" }}>
      <BlumNav theme="light" forceTransparent forcedColor="#fff" />

      {/* Hero */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "480px", paddingTop: "86px" }}
      >
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#c8102e" }}>Product Lines</p>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-3">
            모든 움직임을<br />완벽하게
          </h1>
          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            리프트부터 힌지, 서랍, 러너까지 — blum의 종합 피팅 시스템이 가구의 모든 움직임을 정의합니다.
          </p>
        </div>
      </section>

      {/* Category Nav */}
      <nav className="sticky z-40 border-b" style={{ top: "86px", backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto scrollbar-none py-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="whitespace-nowrap text-[10px] tracking-wider uppercase px-4 py-2 rounded-full transition-colors hover:bg-zinc-100"
              style={{ color: "#52525b", textDecoration: "none" }}
            >
              {c.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {CATEGORIES.map((cat, i) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
              <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 shadow-sm">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      el.parentElement!.style.backgroundColor = "#f4f4f5";
                    }}
                  />
                </div>
              </div>
              <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: "#c8102e" }}>{cat.subtitle}</p>
                <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ color: "#18181b" }}>{cat.name}</h2>
                <p className="text-sm leading-8 mb-6" style={{ color: "#52525b" }}>{cat.desc}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: "#71717a" }}>제품 라인업</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.variants.map((v) => (
                    <span key={v} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: "rgba(0,0,0,0.12)", color: "#52525b" }}>
                      {v}
                    </span>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#a1a1aa" }}>{cat.feature}</p>
                <a
                  href={`https://www.blum.com/kr/ko/products/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 text-xs tracking-wider uppercase px-5 py-2.5 rounded-md transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#c8102e", color: "#fff", textDecoration: "none" }}
                >
                  공식 제품 페이지 →
                </a>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* CTA */}
      <section className="py-20 text-center" style={{ backgroundColor: "#18181b" }}>
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#c8102e" }}>Experience Blum</p>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">직접 체험해보세요</h2>
          <p className="text-sm text-white/50 mb-10 leading-8">
            쇼룸에서 blum의 모든 제품을 직접 만져보고 경험할 수 있습니다.
          </p>
          <Link
            href="/contact#showroom"
            className="inline-block text-xs tracking-wider uppercase px-8 py-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c8102e", color: "#fff", textDecoration: "none" }}
          >
            쇼룸 방문 신청
          </Link>
        </div>
      </section>

      <BlumFooter theme="dark" />
    </div>
  );
}
