"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const CREAM = "#faf7f2";
const BROWN = "#3b2a1a";
const AMBER = "#c68642";

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

const STATS = [
  { num: "2,441", unit: "백만 유로", label: "전 세계 매출액 (2024/25)" },
  { num: "9,850", unit: "명", label: "전 세계 임직원 수" },
  { num: "120+", unit: "개국", label: "수출 대상국" },
  { num: "34", unit: "개소", label: "전 세계 자회사 및 대리점" },
  { num: "8", unit: "개 공장", label: "포어알베르크 생산 시설" },
  { num: "1952", unit: "년", label: "브랜드 창립" },
];

export default function V2Company() {
  return (
    <div style={{ backgroundColor: CREAM, color: BROWN, fontFamily: "'Georgia', serif" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "560px", paddingTop: "80px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
            alt="blum company"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,30,15,0.92) 40%, rgba(44,30,15,0.1) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: AMBER }}>Company</p>
          <h1 className="text-4xl md:text-6xl leading-tight mb-5" style={{ color: CREAM, fontWeight: 300 }}>
            당사는 끊임없이<br />움직여 더 나은<br />아이디어를 만듭니다
          </h1>
          <p className="text-sm leading-7" style={{ color: "rgba(250,247,242,0.6)", maxWidth: "420px" }}>
            1952년 오스트리아 포어알베르크에서 시작한 blum. 70년이 넘는 역사 속에서 세계 최고의 가구 피팅 제조사로 성장했습니다.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: AMBER }}>About Blum</p>
              <h2 className="text-3xl md:text-4xl mb-6 leading-snug" style={{ fontWeight: 300 }}>
                편리함을 높이고<br />삶의 질을 향상시키는<br />가구 피팅 제조사
              </h2>
              <div style={{ width: "40px", height: "2px", backgroundColor: AMBER, marginBottom: "24px", borderRadius: "2px" }} />
              <p className="text-sm leading-8 mb-5" style={{ color: "#6b4c30" }}>
                Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
              </p>
              <p className="text-sm leading-8" style={{ color: "#6b4c30" }}>
                blum의 제품은 힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다. 기능성과 디자인, 내구성의 완벽한 균형을 추구하며, 매일 수백만 명의 일상을 더 편리하게 만듭니다.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={`${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
                  alt="blum workplace"
                  className="col-span-2 aspect-video object-cover rounded-2xl"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <img
                  src={`${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`}
                  alt="blum factory"
                  className="aspect-square object-cover rounded-xl"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <img
                  src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                  alt="blum leadership"
                  className="aspect-square object-cover rounded-xl"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="facts" className="py-20 scroll-mt-20" style={{ backgroundColor: "#f0e8dc" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-14 text-center">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: AMBER }}>Facts & Figures</p>
            <h2 className="text-3xl" style={{ fontWeight: 300 }}>숫자로 보는 blum</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: CREAM }}>
                  <div className="text-4xl mb-1" style={{ fontWeight: 300, color: BROWN }}>{s.num}</div>
                  <div className="text-xs mb-2" style={{ color: AMBER }}>{s.unit}</div>
                  <div className="text-[10px] leading-5" style={{ color: "#8a6a4a" }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: AMBER }}>Leadership</p>
            <h2 className="text-3xl mb-12" style={{ fontWeight: 300 }}>경영진</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Reveal>
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#f0e8dc" }}>
                <img
                  src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                  alt="Philipp & Martin Blum"
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="p-8">
                  <h3 className="text-lg mb-1" style={{ fontWeight: 400 }}>Philipp & Martin Blum</h3>
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ color: AMBER }}>공동 경영진</p>
                  <p className="text-sm leading-7" style={{ color: "#6b4c30" }}>
                    창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-col justify-center h-full py-8">
                <blockquote className="text-2xl md:text-3xl leading-snug italic mb-6" style={{ color: BROWN, fontWeight: 300 }}>
                  "우리는 단순히 피팅을 만드는 것이 아닙니다. 우리는 더 나은 삶을 위한 움직임을 만듭니다."
                </blockquote>
                <p className="text-xs tracking-widest mb-6" style={{ color: AMBER }}>— Philipp Blum, 공동 경영진</p>
                <p className="text-sm leading-7" style={{ color: "#6b4c30" }}>
                  blum은 1952년 창립 이래 단 한 번도 상장하지 않은 순수 가족 기업입니다. 이는 단기 이익보다 장기적 품질과 혁신에 집중할 수 있는 원동력이 됩니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-20 scroll-mt-20" style={{ backgroundColor: "#f0e8dc" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <Reveal>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: AMBER }}>Sustainability</p>
              <h2 className="text-3xl mb-6" style={{ fontWeight: 300 }}>지속가능한 미래를<br />함께 만듭니다</h2>
              <p className="text-sm leading-8 mb-6" style={{ color: "#6b4c30" }}>
                blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
              </p>
              <ul className="space-y-3">
                {["재생에너지 사용 확대", "친환경 포장재 전환", "탄소 발자국 감축 목표", "제품 수명 연장 정책"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#6b4c30" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: AMBER, flexShrink: 0, display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <img
                src={`${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`}
                alt="blum sustainability"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="py-20 px-6 text-center">
          <div className="max-w-md mx-auto p-10 rounded-3xl" style={{ backgroundColor: "#f0e8dc" }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: AMBER }}>쇼룸 방문</p>
            <h2 className="text-2xl mb-6" style={{ fontWeight: 300, color: BROWN }}>직접 경험해 보세요</h2>
            <Link href="/v2/contact"
              className="inline-block px-8 py-3 text-sm rounded-full transition-opacity hover:opacity-80"
              style={{ backgroundColor: BROWN, color: CREAM, textDecoration: "none" }}>
              쇼룸 방문 신청
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
