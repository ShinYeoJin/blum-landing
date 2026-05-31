"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const PRODUCTS = [
  {
    id: "aventos",
    name: "AVENTOS",
    category: "리프트 시스템",
    desc: "상부장을 우아하게 열다. 접이식, 수직, 평행 등 5가지 오픈 방식으로 공간의 가능성을 확장합니다.",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "legrabox",
    name: "LEGRABOX",
    category: "서랍 시스템",
    desc: "극도로 슬림한 프레임, 최대 70kg 하중 지지. 서랍의 새로운 기준을 제시하는 프리미엄 박스 시스템.",
    img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "cliptop",
    name: "CLIP top",
    category: "경첩 시스템",
    desc: "BLUMOTION 소프트 클로징이 내장된 경첩. 모든 도어가 마지막 수 센티미터를 스스로 부드럽게 닫습니다.",
    img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "tipon",
    name: "TIP-ON",
    category: "모션 기술",
    desc: "핸들 없이 살짝 밀면 스스로 열리는 터치 시스템. 미니멀한 가구 디자인의 완성.",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
];

export default function V1() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="bg-white text-zinc-900 overflow-x-hidden selection:bg-zinc-900 selection:text-white">
      <style>{`@keyframes v1-slide{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>


      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-zinc-950">
        {/* Hero BG image */}
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum hero"
            className="w-full h-full object-cover opacity-30"
            style={{ transform: `scale(1.05) translateY(${scrollY * 0.08}px)` }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #09090b 45%, rgba(9,9,11,0.5) 100%)" }} />
          {/* Geometric accent */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="white" strokeWidth="0.5" />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-24 w-full" style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
          <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-400 mb-8">Premium Furniture Fittings · Since 1952</p>
          <h1 style={{ fontSize: "clamp(3rem,10vw,9rem)", fontWeight: 200, lineHeight: 0.92, letterSpacing: "-0.02em" }} className="text-white mb-8">
            moving<br /><em style={{ fontStyle: "normal", color: "#a1a1aa" }}>ideas.</em>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed mb-10">
            움직임이 달라지면 삶이 달라집니다.<br />blum이 만드는 정밀한 피팅의 세계.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/v1/products" className="inline-flex items-center gap-2 border text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-zinc-900 transition-all duration-300" style={{ borderColor: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
              제품 살펴보기
            </Link>
            <Link href="/v1/contact" className="text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-300 transition-colors self-center" style={{ textDecoration: "none" }}>
              문의하기 →
            </Link>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/15 relative overflow-hidden">
            <div className="w-full bg-white/50 absolute top-0" style={{ height: "40%", animation: "v1-slide 2s ease infinite" }} />
          </div>
        </div>
      </section>

      {/* ── Brand ── */}
      <section className="py-32 md:py-48 max-w-7xl mx-auto px-8">
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-6">About Blum</p>
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight text-zinc-900 mb-8">
              가구의 움직임을<br />재정의합니다
            </h2>
            <p className="text-zinc-400 leading-8 text-sm max-w-sm mb-5">
              1952년 오스트리아에서 시작된 blum은 현재 전 세계 120개국에서 사용되는 프리미엄 가구 피팅 제조사입니다.
            </p>
            <p className="text-zinc-400 leading-8 text-sm max-w-sm">
              힌지, 서랍, 리프트 시스템을 통해 매일 수백만 명의 일상을 더 편리하게 만들고 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square overflow-hidden rounded-xl">
              <img src={`${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`} alt="blum factory" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#e4e4e7"; }} />
            </div>
            <div className="aspect-[3/4] mt-8 overflow-hidden rounded-xl">
              <img src={`${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`} alt="blum team" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#d4d4d8"; }} />
            </div>
            <div className="aspect-[3/4] -mt-8 overflow-hidden rounded-xl">
              <img src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`} alt="blum leadership" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#a1a1aa"; }} />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl">
              <img src={`${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`} alt="blum sustainability" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#e4e4e7"; }} />
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={200} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-100 pt-14">
          {[
            { num: "2,441M€", label: "전 세계 매출액" },
            { num: "120개국", label: "글로벌 판매" },
            { num: "50,000회+", label: "내구성 테스트" },
            { num: "9,850명", label: "전 세계 임직원" },
          ].map((s) => (
            <div key={s.num}>
              <div className="text-2xl md:text-3xl font-extralight text-zinc-900 mb-1">{s.num}</div>
              <div className="text-xs text-zinc-400 tracking-wider">{s.label}</div>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-24 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-8">
          <FadeIn className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-4">Product Lines</p>
            <h2 className="text-3xl md:text-4xl font-extralight">Signature Systems</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100">
            {PRODUCTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 80} className="bg-white p-8 md:p-12 group hover:bg-zinc-50 transition-colors duration-500">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] tracking-widest uppercase text-zinc-300">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[10px] tracking-widest uppercase text-zinc-300">{p.category}</span>
                </div>
                <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-lg bg-zinc-100">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <h3 className="text-2xl font-light mb-2">{p.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">{p.desc}</p>
                <Link href="/v1/products" className="text-xs text-zinc-300 hover:text-zinc-900 transition-colors tracking-widest uppercase" style={{ textDecoration: "none" }}>
                  자세히 보기 →
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={200} className="mt-8 text-center">
            <Link href="/v1/products" className="inline-block text-xs tracking-widest uppercase px-8 py-4 border border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all" style={{ textDecoration: "none" }}>
              전체 제품 보기
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-32 md:py-48 max-w-7xl mx-auto px-8">
        <FadeIn className="mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 mb-4">Our Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-extralight">blum이 추구하는 것</h2>
        </FadeIn>
        <div>
          {[
            { num: "01", title: "Functional Beauty", body: "기능이 곧 아름다움입니다. blum의 피팅은 작동하는 순간 그 가치가 완성됩니다." },
            { num: "02", title: "Motion Quality", body: "50,000회 이상의 개폐 테스트. 첫날과 마지막 날의 움직임이 같아야 한다는 원칙." },
            { num: "03", title: "Invisible Precision", body: "blum의 존재는 보이지 않습니다. 오직 완벽한 움직임으로만 느껴집니다." },
          ].map((v, i) => (
            <FadeIn key={v.num} delay={i * 100} className="border-t border-zinc-100 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-6 group">
              <span className="text-xs text-zinc-300 tracking-widest">{v.num}</span>
              <h3 className="text-xl font-light group-hover:text-zinc-600 transition-colors">{v.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{v.body}</p>
            </FadeIn>
          ))}
          <div className="border-t border-zinc-100" />
        </div>
      </section>

      {/* ── Featured Image ── */}
      <FadeIn className="max-w-7xl mx-auto px-8 pb-24">
        <div className="rounded-2xl overflow-hidden aspect-[16/7] relative">
          <img
            src={`${BASE}/images/560/420/4214671/corporate/media/bilder/unternehmen/190523_ARNO_Blum_Interzum_0194_4:3.jpg`}
            alt="blum interzum"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.35)" }}>
            <div className="text-center text-white">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3 opacity-70">Brand Showcase</p>
              <p className="text-3xl md:text-4xl font-light">세계가 인정한<br />오스트리아의 기술</p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── CTA ── */}
      <section id="cta" className="bg-zinc-950 py-32 md:py-40">
        <FadeIn className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-8">Contact & Showroom</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 leading-tight">
            쇼룸에서<br />직접 경험하세요
          </h2>
          <p className="text-zinc-400 text-sm leading-8 mb-12 max-w-sm mx-auto">
            전문 컨설턴트가 공간에 최적화된 blum 솔루션을 제안해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/v1/contact" className="text-xs tracking-widest uppercase px-8 py-4 bg-white text-zinc-900 hover:bg-zinc-100 transition-colors" style={{ textDecoration: "none" }}>
              문의 / 방문 신청
            </Link>
            <Link href="/v1/products" className="text-xs tracking-widest uppercase px-8 py-4 border text-white hover:bg-white/10 transition-colors" style={{ borderColor: "rgba(255,255,255,0.2)", textDecoration: "none" }}>
              전체 제품 보기
            </Link>
          </div>
        </FadeIn>
      </section>


    </div>
  );
}
