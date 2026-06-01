"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BlumGSAP from "@/components/BlumGSAP";

const BASE = "https://www.blum.com";

function Reveal({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
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
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const PRODUCTS = [
  { name: "AVENTOS", cat: "리프트 시스템", tag: "BEST", desc: "상부장을 부드럽게 들어올리는 리프트 시스템. 5가지 오픈 방식으로 주방 공간을 더 실용적으로.", img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`, bg: "#c8a882" },
  { name: "LEGRABOX", cat: "서랍 시스템", tag: "NEW", desc: "얇고 우아한 금속 프레임 서랍. 주방 하부장을 세련되게 완성하는 프리미엄 솔루션.", img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`, bg: "#b8927a" },
  { name: "CLIP top BLUMOTION", cat: "경첩 시스템", tag: "—", desc: "소프트 클로징이 내장된 경첩. 도어가 마지막 순간 스스로 부드럽게 닫힙니다.", img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`, bg: "#d4a574" },
];

export default function V2() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: "#faf7f2", color: "#2c1e0f", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @keyframes v2-breathe{0%,100%{transform:scale(1);}50%{transform:scale(1.012);}}
        @keyframes v2-slide{0%{transform:translateY(-100%);}100%{transform:translateY(200%);}}
        @keyframes v2-hero-in{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .v2-hero-badge{animation:v2-hero-in 1s cubic-bezier(0.16,1,0.3,1) 100ms both;}
        .v2-hero-title{animation:v2-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 250ms both;}
        .v2-hero-sub{animation:v2-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 420ms both;}
        .v2-hero-cta{animation:v2-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 550ms both;}
        .v2-product-card{transition:transform 0.5s cubic-bezier(0.25,1,0.5,1),box-shadow 0.5s ease;}
        .v2-product-card:hover{transform:scale(1.03);box-shadow:0 24px 60px rgba(44,30,15,0.25);}
        .v2-btn{transition:all 0.35s cubic-bezier(0.25,1,0.5,1);}
        .v2-btn:hover{transform:translateY(-2px);}
      `}</style>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#2c1e0f" }}>
        {/* BG image */}
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum kitchen"
            className="w-full h-full object-cover opacity-20"
            style={{ transform: `scale(1.05) translateY(${scrollY * 0.06}px)` }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #5c3d2e44 0%, #2c1e0fdd 60%)" }} />
        </div>
        <div className="absolute top-20 right-16 w-80 h-80 rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: "#c68642", transform: `translateY(${scrollY * -0.06}px)` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-36 w-full grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div style={{ color: "#faf7f2" }}>
            <p className="v2-hero-badge text-xs tracking-[0.4em] uppercase mb-6 opacity-50">Premium Kitchen Fittings · Since 1952</p>
            <h1 className="v2-hero-title" style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: "28px" }}>
              움직임이<br /><em style={{ color: "#d4a574" }}>삶을</em><br />바꿉니다
            </h1>
            <p className="v2-hero-sub text-sm leading-8 opacity-60 max-w-xs mb-10">
              blum의 피팅 시스템은 편리함을 높이고 삶의 질을 향상시킵니다. 열고 닫는 매 순간의 품질이 일상을 바꿉니다.
            </p>
            <div className="v2-hero-cta flex flex-wrap gap-4 items-center">
              <Link href="/v2/products" className="v2-btn" style={{ backgroundColor: "#c68642", color: "#faf7f2", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 28px", display: "inline-block" }}>
                제품 보기
              </Link>
              <Link href="/v2/company" style={{ color: "#faf7f2", textDecoration: "none", fontSize: "11px", opacity: 0.5 }}>
                브랜드 스토리 →
              </Link>
            </div>
          </div>

          {/* Hero images */}
          <div className="hidden md:flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden" style={{ height: "280px", animation: "v2-breathe 8s ease-in-out infinite" }}>
              <img src={`${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`} alt="AVENTOS" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#5c3d2e"; }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden" style={{ height: "120px" }}>
                <img src={`${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`} alt="LEGRABOX" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#4a3020"; }} />
              </div>
              <div className="rounded-xl overflow-hidden" style={{ height: "120px" }}>
                <img src={`${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`} alt="CLIP top" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#3b2a1a"; }} />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(250,247,242,0.3)" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.4em" }}>SCROLL</span>
          <div className="w-px h-10 overflow-hidden" style={{ backgroundColor: "rgba(250,247,242,0.12)" }}>
            <div className="w-full h-1/2" style={{ backgroundColor: "rgba(250,247,242,0.5)", animation: "v2-slide 2s ease infinite" }} />
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-24 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2 rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
                alt="blum story"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#e8d5be"; }}
              />
            </div>
            <div className="md:col-span-3 md:pt-10">
              <p className="text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "#c68642" }}>Our Story</p>
              <h2 className="text-3xl md:text-4xl font-light mb-7 leading-snug" style={{ color: "#2c1e0f" }}>
                오스트리아에서 시작된<br />움직임의 철학
              </h2>
              <p className="text-sm leading-8 mb-5" style={{ color: "#6b4c30" }}>
                1952년, Julius Blum은 오스트리아 포어알베르크의 작은 마을에서 금속 부품 공장을 시작했습니다. 그의 목표는 단순했습니다 — 더 잘 작동하는 가구를 만드는 것.
              </p>
              <p className="text-sm leading-8 mb-8" style={{ color: "#6b4c30" }}>
                70년이 지난 지금, blum은 전 세계 120개국의 주방과 가정에서 조용히 일하고 있습니다. 서랍이 부드럽게 닫힐 때, 상부장이 가볍게 열릴 때 — 그 품질의 차이가 삶의 질의 차이입니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {["오스트리아 제조", "전 세계 120개국", "70년 기술", "9,850명 임직원"].map((tag) => (
                  <span key={tag} className="text-xs px-4 py-2 rounded-full" style={{ backgroundColor: "#ede0cf", color: "#6b4c30" }}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-16 md:py-28" style={{ backgroundColor: "#f0e8d8" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#c68642" }}>Product Lines</p>
              <h2 className="text-3xl md:text-4xl font-light" style={{ color: "#2c1e0f" }}>주방을 완성하는<br />blum 시스템</h2>
            </div>
            <Link href="/v2/products" className="text-xs tracking-wider underline underline-offset-4" style={{ color: "#8a6a4a", textDecoration: "underline" }}>
              전체 제품 보기 →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100} className="v2-product-card group cursor-pointer rounded-2xl">
                <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/5] relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = p.bg; }} />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: "#faf7f2", color: "#6b4c30" }}>{p.tag}</span>
                  </div>
                </div>
                <p className="text-xs tracking-wider mb-1" style={{ color: "#c68642" }}>{p.cat}</p>
                <h3 className="text-xl font-light mb-2" style={{ color: "#2c1e0f" }}>{p.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#8a6a4a" }}>{p.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* Additional products */}
          <Reveal delay={300} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "TIP-ON BLUMOTION", cat: "터치 오픈 시스템", desc: "핸들 없이 살짝 터치만으로 열리는 혁신 기술.", img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg` },
              { name: "MOVENTO", cat: "러너 시스템", desc: "공중에 뜨는 듯 가벼운 서랍 움직임. BLUMOTION 소프트 클로징 내장.", img: `${BASE}/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg` },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl overflow-hidden flex" style={{ backgroundColor: "#e8d5be", minHeight: "160px" }}>
                <div className="flex-1 p-7">
                  <p className="text-xs tracking-wider mb-2" style={{ color: "#c68642" }}>{p.cat}</p>
                  <h3 className="text-lg font-light mb-2" style={{ color: "#2c1e0f" }}>{p.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#8a6a4a" }}>{p.desc}</p>
                </div>
                <div className="w-28 md:w-36 overflow-hidden flex-shrink-0">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#c68642" }}>Our Values</p>
          <h2 className="text-3xl md:text-4xl font-light" style={{ color: "#2c1e0f" }}>blum이 만드는 차이</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "#ddd0bc" }}>
          {[
            { emoji: "⚙️", title: "정밀한 기술", body: "50,000회 이상 반복 테스트. 첫날과 마지막 날의 품질이 동일한 피팅을 만듭니다." },
            { emoji: "🏡", title: "공간을 위한 설계", body: "주방, 침실, 홈 오피스 — 모든 공간에서 최적의 편의성을 제공합니다." },
            { emoji: "🌿", title: "지속 가능한 생산", body: "오스트리아 공장의 친환경 생산 시스템. 품질과 환경 모두를 생각합니다." },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 120} className="p-10 md:p-12 text-center" style={{ backgroundColor: "#faf7f2" }}>
              <div className="text-4xl mb-5">{v.emoji}</div>
              <h3 className="text-lg font-medium mb-3" style={{ color: "#2c1e0f" }}>{v.title}</h3>
              <p className="text-xs leading-7" style={{ color: "#8a6a4a" }}>{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Brand image showcase ── */}
      <Reveal className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-3 gap-3">
          {[
            `${BASE}/images/560/258/4207125/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1659_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`,
            `${BASE}/images/560/258/4209534/corporate/media/bilder/produkte/inneneinteilungssysteme/ambia-line_anpassungen2021/Blum_AMB0001_4:3.jpg`,
            `${BASE}/images/560/258/4210654/corporate/media/bilder/produkte/schrankanwendungen/ME4718144_all_src_4:3.jpg`,
          ].map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden aspect-square">
              <img src={src} alt={`blum ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#e8d5be"; }} />
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── CTA ── */}
      <section className="py-24 md:py-36 text-center" style={{ backgroundColor: "#3b2a1a" }}>
        <Reveal className="max-w-2xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "#c68642" }}>Showroom Visit</p>
          <h2 className="text-4xl md:text-5xl font-light mb-5 leading-snug" style={{ color: "#faf7f2" }}>
            blum을<br />직접 느껴보세요
          </h2>
          <p className="text-sm leading-8 mb-10" style={{ color: "#a0856a" }}>
            쇼룸에서 AVENTOS, LEGRABOX, CLIP top을 직접 체험하세요.<br />전문 컨설턴트가 최적의 솔루션을 제안합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/v2/contact" style={{ backgroundColor: "#c68642", color: "#faf7f2", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", borderRadius: "6px", display: "inline-block" }}>
              쇼룸 방문 신청
            </Link>
            <Link href="/v2/products" style={{ border: "1px solid rgba(198,134,66,0.35)", color: "#faf7f2", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", borderRadius: "6px", display: "inline-block" }}>
              제품 전체 보기
            </Link>
          </div>
        </Reveal>
      </section>
      <BlumGSAP version="v2" />
    </div>
  );
}
