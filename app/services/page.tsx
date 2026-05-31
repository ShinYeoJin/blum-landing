"use client";

import BlumNav from "@/components/BlumNav";
import BlumFooter from "@/components/BlumFooter";

const BASE = "https://www.blum.com";

const SERVICES = [
  {
    id: "plan",
    icon: "✏️",
    name: "계획 / 설계 지원",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
  },
  {
    id: "digital",
    icon: "💻",
    name: "E-Services",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결됩니다.",
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
  },
  {
    id: "assembly",
    icon: "🔧",
    name: "조립 / 조정 지원",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 blum의 조립 장치로 작업을 단순화합니다.",
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
  },
  {
    id: "marketing",
    icon: "📦",
    name: "마케팅 / 판매 지원",
    desc: "blum 제품을 판매하는 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 효과적인 제품 홍보를 위한 멀티미디어 자료를 제공합니다.",
    img: `${BASE}/images/560/258/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
    items: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
  },
];


export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#fff", color: "#18181b" }}>
      <BlumNav theme="light" forceTransparent forcedColor="#fff" />

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "400px", paddingTop: "86px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`}
            alt="blum services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#c8102e" }}>Services</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-3">설계부터 설치까지<br />blum이 함께합니다</h1>
          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            제품 선택, 설계 지원, 디지털 서비스, 조립 지원까지 — blum의 종합 서비스 생태계를 경험하세요.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {SERVICES.map((svc, i) => (
          <section key={svc.id} id={svc.id} className="scroll-mt-32">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
              <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 shadow-sm">
                  <img
                    src={svc.img}
                    alt={svc.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </div>
              <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                <div className="text-3xl mb-4">{svc.icon}</div>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: "#c8102e" }}>Service</p>
                <h2 className="text-2xl md:text-3xl font-light mb-4">{svc.name}</h2>
                <p className="text-sm leading-8 mb-6" style={{ color: "#52525b" }}>{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#52525b" }}>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#c8102e", flexShrink: 0, display: "inline-block" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* E-Services Banner */}
      <section className="py-16" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#c8102e" }}>Online Portal</p>
          <h2 className="text-3xl font-light mb-4">E-Services 바로가기</h2>
          <p className="text-sm mb-8" style={{ color: "#71717a" }}>
            제품 구성, CAD 데이터, 주문 관리를 온라인으로 한 번에.
          </p>
          <a
            href="https://e-services.blum.com/main/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs tracking-wider uppercase px-8 py-4 rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c8102e", color: "#fff", textDecoration: "none" }}
          >
            E-Services 접속
          </a>
        </div>
      </section>

      <BlumFooter theme="light" />
    </div>
  );
}
