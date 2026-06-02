"use client";

import BlumNav from "@/components/BlumNav";
import BlumFooter from "@/components/BlumFooter";

const BASE = "https://www.blum.com";

export default function CompanyPage() {
  return (
    <div style={{ backgroundColor: "#fff", color: "#18181b" }}>
      <BlumNav theme="light" forceTransparent forcedColor="#fff" />

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "520px", paddingTop: "86px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
            alt="blum company"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.1) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#c8102e" }}>Company</p>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4">
            당사는 끊임없이<br />
            움직여 더 나은<br />
            아이디어를 만듭니다
          </h1>
          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            1952년 오스트리아 포어알베르크에서 시작한 blum. 70년이 넘는 역사 속에서 세계 최고의 가구 피팅 제조사로 성장했습니다.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#c8102e" }}>About Blum</p>
              <h2 className="text-3xl md:text-4xl font-light mb-6 leading-snug">
                편리함을 높이고<br />삶의 질을 향상시키는<br />가구 피팅 제조사
              </h2>
              <p className="text-sm leading-8 mb-5" style={{ color: "#52525b" }}>
                Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
              </p>
              <p className="text-sm leading-8" style={{ color: "#52525b" }}>
                blum의 제품은 힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다. 기능성과 디자인, 내구성의 완벽한 균형을 추구하며, 매일 수백만 명의 일상을 더 편리하게 만듭니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={`${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
                alt="blum workplace"
                className="rounded-xl aspect-square object-cover col-span-2"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <img
                src={`${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`}
                alt="blum factory"
                className="rounded-xl aspect-square object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <img
                src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                alt="blum leadership"
                className="rounded-xl aspect-square object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section id="facts" className="py-16 md:py-24 scroll-mt-24" style={{ backgroundColor: "#18181b" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-center" style={{ color: "#c8102e" }}>Facts & Figures</p>
          <h2 className="text-3xl md:text-4xl font-light text-white text-center mb-14">숫자로 보는 blum</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "2,441", unit: "백만 유로", label: "전 세계 매출액 (2024/25)" },
              { num: "9,850", unit: "명", label: "전 세계 임직원 수" },
              { num: "120+", unit: "개국", label: "수출 대상국" },
              { num: "34", unit: "개소", label: "전 세계 자회사 및 대리점" },
              { num: "8", unit: "개 공장", label: "포어알베르크 생산 시설" },
              { num: "4", unit: "개 공장", label: "해외 생산 시설" },
              { num: "1952", unit: "년", label: "브랜드 창립" },
              { num: "100,000", unit: "회+", label: "개폐 테스트 기준" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-light text-white mb-1">{s.num}</div>
                <div className="text-xs font-medium mb-2" style={{ color: "#c8102e" }}>{s.unit}</div>
                <div className="text-xs leading-5" style={{ color: "rgba(240,240,240,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#c8102e" }}>Leadership</p>
          <h2 className="text-3xl font-light mb-10">경영진</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                alt="Philipp & Martin Blum"
                className="w-full aspect-[4/3] object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="p-6" style={{ backgroundColor: "#f9f9f9" }}>
                <h3 className="text-lg font-medium mb-1">Philipp & Martin Blum</h3>
                <p className="text-xs tracking-wider uppercase mb-3" style={{ color: "#c8102e" }}>공동 경영진</p>
                <p className="text-sm leading-7" style={{ color: "#52525b" }}>
                  창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 justify-center">
              <blockquote className="text-2xl md:text-3xl font-light leading-snug italic" style={{ color: "#18181b" }}>
                "우리는 단순히 피팅을 만드는 것이 아닙니다. 우리는 더 나은 삶을 위한 움직임을 만듭니다."
              </blockquote>
              <p className="text-xs tracking-wider" style={{ color: "#a1a1aa" }}>— Philipp Blum, 공동 경영진</p>
              <p className="text-sm leading-7" style={{ color: "#52525b" }}>
                blum은 1952년 창립 이래 단 한 번도 상장하지 않은 순수 가족 기업입니다. 이는 단기 이익보다 장기적 품질과 혁신에 집중할 수 있는 원동력이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-20 scroll-mt-24" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#c8102e" }}>Sustainability</p>
              <h2 className="text-3xl font-light mb-6">지속가능한 미래를<br />함께 만듭니다</h2>
              <p className="text-sm leading-8 mb-6" style={{ color: "#52525b" }}>
                blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다. 오래 쓸 수 있는 제품을 만드는 것 자체가 가장 큰 친환경 실천입니다.
              </p>
              <ul className="space-y-3">
                {["재생에너지 사용 확대", "친환경 포장재 전환", "탄소 발자국 감축 목표", "제품 수명 연장 정책"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#52525b" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#c8102e", flexShrink: 0, display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src={`${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`}
                alt="blum sustainability"
                className="w-full aspect-[4/3] object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          </div>
        </div>
      </section>

      <BlumFooter theme="light" />
    </div>
  );
}
