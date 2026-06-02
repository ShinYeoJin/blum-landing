"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BlumGSAP from "@/components/BlumGSAP";

const BASE = "https://www.blum.com";

function BoldReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.7s cubic-bezier(0.25,1,0.5,1) ${delay}ms, transform 0.7s cubic-bezier(0.25,1,0.5,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const SYSTEMS = [
  { code: "AV", name: "AVENTOS", label: "리프트 시스템", headline: "위로 열다", desc: "높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려보세요.", variants: "HKi · HF top · HS top · HL top · HK top · HK-S · HK-XS", col: "md:col-span-5", aspect: "aspect-[3/4]", img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg` },
  { code: "LB", name: "LEGRABOX", label: "박스 시스템", headline: "안으로 담다", desc: "슬림한 서랍면(12.8mm), 최대 하중 40kg 및 70kg 지지.", variants: "pure · free · special edition · individual", col: "md:col-span-7", aspect: "aspect-[4/3]", img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg` },
  { code: "CT", name: "CLIP top", label: "경첩 시스템", headline: "닫히는 순간", desc: "경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 항상 부드럽게.", variants: "BLUMOTION · CLIP top · MODUL · 105°", col: "md:col-span-7", aspect: "aspect-[4/3]", img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg` },
  { code: "TO", name: "TIP-ON", label: "모션 기술", headline: "터치 한 번", desc: "핸들 없는 가구를 원터치로 열 수 있는 기계식 열기 시스템.", variants: "TIP-ON BLUMOTION · TIP-ON · SERVO-DRIVE", col: "md:col-span-5", aspect: "aspect-[3/4]", img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg` },
];

export default function V3() {
  const [scrollY, setScrollY] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % SYSTEMS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: "#0a0a0a", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @keyframes v3-ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes v3-hero-in{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes v3-hero-slide{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
        .v3-ticker{animation:v3-ticker 26s linear infinite;}
        .v3-hero-badge{animation:v3-hero-in 0.9s cubic-bezier(0.16,1,0.3,1) 80ms both;}
        .v3-hero-title{animation:v3-hero-slide 1s cubic-bezier(0.16,1,0.3,1) 200ms both;}
        .v3-hero-sub{animation:v3-hero-in 1s cubic-bezier(0.16,1,0.3,1) 400ms both;}
        .v3-hero-cta{animation:v3-hero-in 1s cubic-bezier(0.16,1,0.3,1) 540ms both;}
        .v3-product-card{transition:transform 0.4s cubic-bezier(0.25,1,0.5,1),box-shadow 0.4s ease;}
        .v3-product-card:hover{transform:scale(1.025);box-shadow:0 20px 60px rgba(0,0,0,0.5);}
        .v3-btn{transition:all 0.3s cubic-bezier(0.25,1,0.5,1);}
        .v3-btn:hover{transform:translateY(-2px);}
      `}</style>

      {/* ── Hero ── */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: "100vh", paddingTop: "86px" }}>
        {/* BG */}
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum hero"
            className="w-full h-full object-cover opacity-10"
            style={{ transform: `scale(1.06) translateY(${scrollY * 0.07}px)` }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0a0a 55%, rgba(10,10,10,0.4) 100%)" }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(240,240,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,240,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          {/* Red shape */}
          <div className="absolute" style={{ right: 0, top: "86px", width: "45%", height: "100%", backgroundColor: "#c8102e", clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)", opacity: 0.05, transform: `translateY(${scrollY * 0.12}px)` }} />
          {/* Rotating BG label */}
          <div className="absolute select-none transition-all duration-700" style={{ right: "-2%", bottom: "8%", fontSize: "clamp(80px,18vw,220px)", fontWeight: 900, color: "rgba(200,16,46,0.04)", letterSpacing: "-0.05em", lineHeight: 1, transform: `translateY(${scrollY * -0.04}px)` }}>
            {SYSTEMS[activeIdx].code}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          <div className="v3-hero-badge flex items-center gap-4 mb-8">
            <div style={{ width: "32px", height: "2px", backgroundColor: "#c8102e" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.45em", color: "#c8102e" }}>BLUM · PREMIUM FURNITURE FITTINGS · SINCE 1952</span>
          </div>
          <h1 className="v3-hero-title leading-none mb-8" style={{ fontSize: "clamp(3.5rem,12vw,11rem)", fontWeight: 900, letterSpacing: "-0.04em", transform: `translateY(${scrollY * -0.06}px)` }}>
            MOVING<br />
            <span style={{ WebkitTextStroke: "2px #c8102e", WebkitTextFillColor: "transparent", color: "#c8102e" }}>IDEAS.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <p className="v3-hero-sub" style={{ fontSize: "14px", lineHeight: "2", color: "rgba(240,240,240,0.4)", maxWidth: "380px" }}>
              편리함을 높이고 삶의 질을 향상시키는 고품질 가구용 피팅. AVENTOS, LEGRABOX, CLIP top — blum의 기술이 가구를 완성합니다.
            </p>
            <div className="v3-hero-cta flex flex-wrap gap-3 md:justify-end">
              <Link href="/v3/products" className="v3-btn" style={{ backgroundColor: "#c8102e", color: "#fff", textDecoration: "none", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "14px 28px", display: "inline-block" }}>
                시스템 보기
              </Link>
              <Link href="/v3/contact" className="v3-btn" style={{ border: "1px solid rgba(240,240,240,0.18)", color: "#f0f0f0", textDecoration: "none", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "14px 28px", display: "inline-block" }}>
                문의하기
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(240,240,240,0.07)" }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/10">
            {[
              { num: "120+", label: "국가 판매" },
              { num: "9,850명", label: "전 세계 임직원" },
              { num: "1952", label: "브랜드 창립" },
            ].map((s) => (
              <div key={s.num} className="py-5 px-4 text-center md:text-left">
                <div style={{ fontSize: "clamp(1.4rem,4vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>{s.num}</div>
                <div style={{ fontSize: "8px", letterSpacing: "0.4em", color: "rgba(240,240,240,0.3)", marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand ── */}
      <section style={{ backgroundColor: "#111", padding: "80px 0 90px" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: "28px", height: "2px", backgroundColor: "#c8102e" }} />
                <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#c8102e" }}>ABOUT BLUM</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "22px" }}>
                가구의<br />움직임을<br /><span style={{ color: "#c8102e" }}>완성합니다.</span>
              </h2>
              <p style={{ fontSize: "13px", lineHeight: "2", color: "rgba(240,240,240,0.45)", maxWidth: "380px" }}>
                1952년 오스트리아에서 시작된 blum은 전 세계 가구 피팅 산업을 이끌어왔습니다. 2,441백만 유로 매출, 9,850명의 임직원, 120개국 판매망 — 그 중심에 품질과 혁신이 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-sm overflow-hidden aspect-square">
                <img src={`${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`} alt="blum team" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#1a1a1a"; }} />
              </div>
              <div className="rounded-sm overflow-hidden mt-6" style={{ aspectRatio: "1/1.3" }}>
                <img src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`} alt="blum leadership" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#c8102e22"; }} />
              </div>
              <div className="rounded-sm overflow-hidden -mt-6" style={{ aspectRatio: "1/1.3" }}>
                <img src={`${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`} alt="blum sustainability" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#222"; }} />
              </div>
              <div className="rounded-sm overflow-hidden aspect-square">
                <img src={`${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`} alt="blum factory" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#1a1a1a"; }} />
              </div>
            </div>
          </BoldReveal>
        </div>
      </section>

      {/* ── Systems ── */}
      <section id="systems" style={{ padding: "80px 0 90px", backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#c8102e" }}>SIGNATURE SYSTEMS</span>
              <h2 style={{ fontSize: "clamp(2rem,6vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginTop: "8px" }}>
                4 SYSTEMS.<br />1 PHILOSOPHY.
              </h2>
            </div>
            <Link href="/v3/products" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(240,240,240,0.4)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              ALL PRODUCTS →
            </Link>
          </BoldReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {SYSTEMS.map((s, i) => (
              <BoldReveal key={s.name} delay={i * 80} className={`v3-product-card group cursor-pointer ${s.col}`}>
                <Link href="/v3/products" style={{ textDecoration: "none" }}>
                  <div className={`relative overflow-hidden ${s.aspect} mb-3`} style={{ backgroundColor: "#1a1a1a" }}>
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{ backgroundColor: "rgba(200,16,46,0.08)" }} />
                    <div className="absolute top-4 left-4">
                      <span style={{ fontSize: "8px", letterSpacing: "0.4em", color: "rgba(240,240,240,0.45)" }}>{s.label}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
                      <div>
                        <div style={{ fontSize: "clamp(1rem,2.5vw,1.4rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#f0f0f0", marginBottom: "2px" }}>{s.name}</div>
                        <div style={{ fontSize: "10px", color: "#c8102e" }}>{s.headline}</div>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0" style={{ backgroundColor: "#c8102e" }}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", lineHeight: "1.8", color: "rgba(240,240,240,0.4)" }}>{s.desc}</p>
                  <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#c8102e", marginTop: "4px" }}>{s.variants}</p>
                </Link>
              </BoldReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Banner ── */}
      <section style={{ backgroundColor: "#111", padding: "60px 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "계획 / 설계", href: "/v3/services", img: `${BASE}/images/196/180/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg` },
              { title: "E-Services", href: "/v3/services", img: `${BASE}/images/196/180/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png` },
              { title: "조립 지원", href: "/v3/services", img: `${BASE}/images/196/180/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg` },
              { title: "마케팅 자료", href: "/v3/services", img: `${BASE}/images/196/180/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg` },
            ].map((svc) => (
              <Link key={svc.title} href={svc.href} className="group block" style={{ textDecoration: "none" }}>
                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-3 bg-zinc-800">
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,240,240,0.6)" }}>{svc.title} →</p>
              </Link>
            ))}
          </BoldReveal>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section id="manifesto" style={{ backgroundColor: "#c8102e", padding: "80px 0 90px" }}>
        <div className="max-w-7xl mx-auto px-6">
          <BoldReveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(255,255,255,0.55)", marginBottom: "22px" }}>OUR MANIFESTO</p>
            <blockquote style={{ fontSize: "clamp(1.5rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: "900px", marginBottom: "48px" }}>
              "편리함을 높이고 삶의 질을 향상시킵니다.<br />blum의 moving ideas."
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              {[
                { title: "FUNCTIONAL BEAUTY", body: "기능이 아름다움입니다. blum의 피팅은 작동하는 순간 그 가치가 완성됩니다." },
                { title: "GLOBAL LEADERSHIP", body: "€2,441M 매출, 9,850명 임직원, 120개국 수출. 3대째 가족 경영으로 신뢰와 혁신을 이어가고 있습니다." },
                { title: "INVISIBLE PRECISION", body: "최고의 디자인은 보이지 않습니다. blum은 가구 뒤에서 조용히 완벽함을 만듭니다." },
              ].map((v, i) => (
                <BoldReveal key={v.title} delay={i * 100}>
                  <h3 style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", color: "#fff", marginBottom: "10px" }}>{v.title}</h3>
                  <p style={{ fontSize: "12px", lineHeight: "1.8", color: "rgba(255,255,255,0.65)" }}>{v.body}</p>
                </BoldReveal>
              ))}
            </div>
          </BoldReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" style={{ backgroundColor: "#0a0a0a", padding: "90px 0" }}>
        <BoldReveal className="max-w-4xl mx-auto px-6 text-center">
          <span style={{ fontSize: "9px", letterSpacing: "0.5em", color: "#c8102e", display: "block", marginBottom: "18px" }}>CONTACT & SHOWROOM</span>
          <h2 style={{ fontSize: "clamp(2.5rem,9vw,7.5rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.95, marginBottom: "28px" }}>
            EXPERIENCE<br />
            <span style={{ WebkitTextStroke: "2px #f0f0f0", WebkitTextFillColor: "transparent" }}>BLUM.</span>
          </h2>
          <p style={{ fontSize: "13px", lineHeight: "2", color: "rgba(240,240,240,0.4)", maxWidth: "380px", margin: "0 auto 36px" }}>
            쇼룸에서 AVENTOS와 LEGRABOX를 직접 체험해보세요. 전문 컨설턴트가 최적의 솔루션을 제안합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/v3/contact" style={{ backgroundColor: "#c8102e", color: "#fff", textDecoration: "none", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "16px 32px", display: "inline-block" }}>
              쇼룸 방문 신청
            </Link>
            <Link href="/v3/products" style={{ border: "1px solid rgba(240,240,240,0.15)", color: "#f0f0f0", textDecoration: "none", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "16px 32px", display: "inline-block" }}>
              제품 전체 보기
            </Link>
          </div>
        </BoldReveal>
      </section>
      <BlumGSAP version="v3" />
    </div>
  );
}
