"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

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
      transform: inView ? "none" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
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

export default function V3Company() {
  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "580px", paddingTop: "80px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
            alt="blum company"
            className="w-full h-full object-cover opacity-25"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 50%, rgba(0,0,0,0.3) 100%)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(200,16,46,0.08) 0%, transparent 60%)` }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Company</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
            MOVING<br /><span style={{ color: RED }}>IDEAS.</span>
          </h1>
          <div style={{ width: "60px", height: "3px", backgroundColor: RED, marginBottom: "20px" }} />
          <p className="text-sm max-w-lg leading-relaxed" style={{ color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            1952년 오스트리아 포어알베르크에서 시작한 blum. 70년이 넘는 역사 속에서 세계 최고의 가구 피팅 제조사로 성장했습니다.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 border-t" style={{ borderColor: "rgba(200,16,46,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <BoldReveal>
              <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>About Blum</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 leading-tight">
                편리함을 높이고<br />삶의 질을 향상시키는
              </h2>
              <p className="text-sm leading-8 mb-5" style={{ color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
              </p>
              <p className="text-sm leading-8" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                blum의 제품은 힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다. 기능성과 디자인, 내구성의 완벽한 균형을 추구하며, 매일 수백만 명의 일상을 더 편리하게 만듭니다.
              </p>
            </BoldReveal>
            <BoldReveal delay={100}>
              <div className="grid grid-cols-2 gap-2">
                <img
                  src={`${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
                  alt="blum workplace"
                  className="col-span-2 aspect-video object-cover"
                  style={{ filter: "grayscale(30%)" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <img
                  src={`${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`}
                  alt="blum factory"
                  className="aspect-square object-cover"
                  style={{ filter: "grayscale(30%)" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <img
                  src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                  alt="blum leadership"
                  className="aspect-square object-cover"
                  style={{ filter: "grayscale(30%)" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </BoldReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="facts" className="py-20 border-t border-b" style={{ borderColor: "rgba(200,16,46,0.15)", backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal className="mb-14 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Facts & Figures</p>
            <h2 className="text-4xl font-black uppercase">숫자로 보는 BLUM</h2>
          </BoldReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(240,240,240,0.05)" }}>
            {STATS.map((s, i) => (
              <BoldReveal key={s.label} delay={i * 40}>
                <div className="p-8 text-center" style={{ backgroundColor: "#000" }}>
                  <div className="text-4xl font-black mb-1" style={{ color: "#f0f0f0" }}>{s.num}</div>
                  <div className="text-xs font-black mb-2" style={{ color: RED }}>{s.unit}</div>
                  <div className="text-[9px] leading-5" style={{ color: "rgba(240,240,240,0.3)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>{s.label}</div>
                </div>
              </BoldReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal>
            <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Leadership</p>
            <h2 className="text-4xl font-black uppercase mb-12">경영진</h2>
          </BoldReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BoldReveal>
              <img
                src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                alt="Philipp & Martin Blum"
                className="w-full aspect-[4/3] object-cover"
                style={{ filter: "grayscale(20%)" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="p-6 border border-t-0" style={{ borderColor: "rgba(200,16,46,0.2)" }}>
                <h3 className="text-base font-black uppercase mb-1">Philipp & Martin Blum</h3>
                <p className="text-[9px] tracking-[0.35em] font-black uppercase mb-3" style={{ color: RED }}>공동 경영진</p>
                <p className="text-sm leading-7" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                  창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
                </p>
              </div>
            </BoldReveal>
            <BoldReveal delay={80}>
              <div className="flex flex-col justify-center h-full py-4">
                <div style={{ width: "32px", height: "3px", backgroundColor: RED, marginBottom: "24px" }} />
                <blockquote className="text-2xl font-black uppercase leading-tight mb-6" style={{ color: "#f0f0f0" }}>
                  "당사는 끊임없이 움직여 더 나은 아이디어를 만듭니다."
                </blockquote>
                <p className="text-[9px] tracking-[0.3em] font-black uppercase mb-6" style={{ color: RED }}>— Blum의 움직이는 아이디어 (Moving Ideas)</p>
                <p className="text-sm leading-7" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                  Julius Blum GmbH는 Martin Blum과 Philipp Blum이 이끄는 가족 소유 기업입니다. 경제적 효율성과 환경적 책임을 함께 추구합니다.
                </p>
              </div>
            </BoldReveal>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-20 border-t" style={{ borderColor: "rgba(200,16,46,0.15)", backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <BoldReveal>
              <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Sustainability</p>
              <h2 className="text-3xl font-black uppercase mb-6">지속가능한<br />미래</h2>
              <p className="text-sm leading-8 mb-6" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
              </p>
              <ul className="space-y-3">
                {["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "rgba(240,240,240,0.6)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                    <span style={{ width: "6px", height: "6px", backgroundColor: RED, flexShrink: 0, display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </BoldReveal>
            <BoldReveal delay={80}>
              <img
                src={`${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`}
                alt="blum sustainability"
                className="w-full aspect-[4/3] object-cover"
                style={{ filter: "grayscale(20%)", borderLeft: `3px solid ${RED}` }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </BoldReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <BoldReveal>
        <section className="py-20 px-6 text-center border-t" style={{ borderColor: "rgba(200,16,46,0.2)" }}>
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>GET IN TOUCH</p>
          <h2 className="text-3xl font-black uppercase mb-8">문의하기</h2>
          <Link href="/v3/contact"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-80"
            style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}>
            CONTACT US
          </Link>
        </section>
      </BoldReveal>
    </div>
  );
}
