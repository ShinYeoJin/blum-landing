"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import BlumGSAP from "@/components/BlumGSAP";

const BASE = "https://www.blum.com";

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Fade-up reveal ─── */
function Reveal({
  children, delay = 0, className = "", y = 40, once = true,
}: {
  children: React.ReactNode; delay?: number; className?: string; y?: number; once?: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : `translateY(${y}px)`,
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Products ─── */
const PRODUCTS = [
  {
    id: "aventos",
    name: "AVENTOS",
    category: "리프트 시스템",
    desc: "높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 부드럽고 조용히 닫히고 가볍게 들어올려집니다.",
    href: "/v1/products/aventos",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    sub: `${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
  },
  {
    id: "legrabox",
    name: "LEGRABOX",
    category: "박스 시스템",
    desc: "가장 까다로운 디자인 요구 사항에 적합한 서랍 시스템. 슬림한 서랍면(12.8mm)으로 최대 하중 40kg 및 70kg을 지지합니다.",
    href: "/v1/products#box",
    img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    sub: `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "cliptop",
    name: "CLIP top BLUMOTION",
    category: "경첩 시스템",
    desc: "경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어의 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v1/products#hinge",
    img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
    sub: `${BASE}/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "tipon",
    name: "TIP-ON",
    category: "모션 기술",
    desc: "도어, 고정식 리프트 또는 풀아웃 시스템 등의 핸들 없는 가구를 원터치로 열 수 있는 기계식 열기 시스템.",
    href: "/v1/products#motion",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
    sub: `${BASE}/images/560/258/4207125/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1659_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`,
  },
];

const VALUES = [
  { num: "01", title: "삶의 질", body: "한결 더 쉽게 경험하는 편리함. blum은 편리함을 높이고 삶의 질을 향상시키는 고품질 주방 및 가구용 피팅을 제조합니다." },
  { num: "02", title: "영감", body: "고객의 질문이 혁신의 원동력입니다. blum은 끊임없이 움직여 더 나은 아이디어를 만들어 갑니다." },
  { num: "03", title: "신뢰", body: "사회, 환경, 직원에 대한 기업 책임. 자연 자원을 미래 세대를 위해 보존하는 것이 blum의 핵심 가치입니다." },
];

/* ─── Page ─── */
export default function V1() {
  const [scrollY, setScrollY] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [openValue, setOpenValue] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Auto-cycle product showcase */
  useEffect(() => {
    const id = setInterval(() => setActiveProduct(i => (i + 1) % PRODUCTS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const heroParallax = scrollY * 0.35;
  const heroOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <div className="bg-white text-zinc-900 overflow-x-hidden" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @keyframes v1-ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes v1-scrollbar { 0% { transform: translateY(-100%) } 100% { transform: translateY(300%) } }
        @keyframes v1-blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes v1-hero-in { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:translateY(0) } }
        .v1-ticker { animation: v1-ticker 28s linear infinite; }
        .v1-scrollbar { animation: v1-scrollbar 2.2s cubic-bezier(0.4,0,0.2,1) infinite; }
        .product-card { transition: transform 0.5s cubic-bezier(0.25,1,0.5,1), box-shadow 0.5s ease; }
        .product-card:hover { transform: scale(1.03); box-shadow: 0 24px 60px rgba(0,0,0,0.18); }
        .product-card:hover .product-img { transform: scale(1.06); }
        .product-card:hover .product-sub { opacity: 1; transform: translateY(0); }
        .value-row:hover .value-num { color: #18181b; }
        .v1-hero-badge { animation: v1-hero-in 1s cubic-bezier(0.16,1,0.3,1) 100ms both; }
        .v1-hero-title { animation: v1-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 260ms both; }
        .v1-hero-sub { animation: v1-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 430ms both; }
        .v1-hero-cta { animation: v1-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 560ms both; }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-zinc-950">
        {/* Parallax BG */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum kitchen"
            className="w-full h-full object-cover"
            style={{ transform: `scale(1.12) translateY(${heroParallax}px)`, opacity: 0.38 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          {/* Gradient layers */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #09090b 30%, rgba(9,9,11,0.55) 70%, rgba(9,9,11,0.2) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(9,9,11,0.6) 0%, transparent 60%)" }} />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "100px 100px"
          }} />
        </div>

        {/* Content */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full"
          style={{ opacity: heroOpacity, transform: `translateY(${scrollY * -0.08}px)` }}
        >
          {/* Brand badge */}
          <div className="v1-hero-badge flex items-center gap-3 mb-10">
            <div className="w-6 h-px bg-white/30" />
            <span className="text-[9px] tracking-[0.55em] uppercase text-white/40">Premium Furniture Fittings · Austria · Since 1952</span>
          </div>

          {/* Headline */}
          <h1 className="v1-hero-title text-white mb-6 leading-none select-none" style={{
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
          }}>
            moving<br />
            <span style={{ color: "rgba(161,161,170,0.85)", fontStyle: "italic" }}>ideas.</span>
          </h1>

          <div className="v1-hero-sub flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
            <p className="text-white/50 text-sm leading-8 max-w-xs" style={{ fontWeight: 300 }}>
              움직임이 달라지면 삶이 달라집니다.<br />
              blum이 만드는 정밀한 피팅의 세계.
            </p>
            <div className="flex flex-wrap gap-5 items-center">
              <Link
                href="/v1/products"
                className="group inline-flex items-center gap-3 border text-white text-[11px] tracking-[0.25em] uppercase px-7 py-3.5 transition-all duration-400 hover:bg-white hover:text-zinc-900"
                style={{ borderColor: "rgba(255,255,255,0.22)", textDecoration: "none" }}
              >
                제품 살펴보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/v1/company"
                className="text-[11px] tracking-[0.25em] uppercase text-white/35 hover:text-white/70 transition-colors"
                style={{ textDecoration: "none" }}
              >
                브랜드 스토리
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-3 z-10">
          <span className="text-[8px] tracking-[0.4em] uppercase text-white/25 rotate-90 origin-center mb-2" style={{ writingMode: "vertical-rl" }}>scroll</span>
          <div className="w-px h-14 bg-white/12 relative overflow-hidden">
            <div className="w-full bg-white/50 absolute top-0 v1-scrollbar" style={{ height: "45%" }} />
          </div>
        </div>

        {/* Bottom product ticker preview */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex gap-6">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProduct(i)}
                  className="text-[9px] tracking-[0.3em] uppercase transition-colors"
                  style={{ color: activeProduct === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)", background: "none", border: "none", cursor: "pointer" }}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <span className="text-[9px] tracking-wider text-white/20 hidden md:block">
              {String(activeProduct + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <div className="overflow-hidden border-b border-zinc-100 py-4 bg-white">
        <div className="v1-ticker flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[10px] tracking-[0.35em] uppercase text-zinc-300 pr-16">
              CLIP top · AVENTOS · LEGRABOX · TIP-ON · MOVENTO · REVEGO · BLUMOTION · SINCE 1952 ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════ BRAND STORY ══════════════════ */}
      <section className="py-28 md:py-40 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
          {/* Left */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-7">About Blum</p>
              <h2 className="text-3xl md:text-5xl font-extralight leading-[1.1] text-zinc-900 mb-8" style={{ letterSpacing: "-0.02em" }}>
                가구의 움직임을<br />재정의합니다
              </h2>
              <div className="w-10 h-px bg-zinc-200 mb-8" />
              <p className="text-zinc-400 leading-8 text-sm mb-5" style={{ fontWeight: 300 }}>
                1952년 오스트리아 포어알베르크에서 시작된 blum은 현재 전 세계 120개국에서 사용되는 프리미엄 가구 피팅 제조사입니다.
              </p>
              <p className="text-zinc-400 leading-8 text-sm mb-10" style={{ fontWeight: 300 }}>
                힌지, 서랍, 리프트 시스템을 통해 매일 수백만 명의 일상을 더 편리하고 아름답게 만들고 있습니다.
              </p>
              <Link
                href="/v1/company"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors group"
                style={{ textDecoration: "none" }}
              >
                브랜드 스토리
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          {/* Right: staggered image grid */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3">
              <Reveal delay={0} className="space-y-3">
                <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
                  <img
                    src={`${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
                    alt="blum factory"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#f4f4f5"; }}
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                  <img
                    src={`${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`}
                    alt="blum sustainability"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#e4e4e7"; }}
                  />
                </div>
              </Reveal>
              <Reveal delay={120} className="space-y-3 mt-10">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                  <img
                    src={`${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`}
                    alt="blum team"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#d4d4d8"; }}
                  />
                </div>
                <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
                  <img
                    src={`${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                    alt="blum leadership"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#a1a1aa"; }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <Reveal delay={100} className="mt-20 pt-14 border-t border-zinc-100 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { target: 2441, suffix: "M€", label: "전 세계 연매출" },
            { target: 120, suffix: "개국+", label: "글로벌 판매 국가" },
            { target: 34, suffix: "개소", label: "전 세계 자회사·대리점" },
            { target: 9850, suffix: "명", label: "전 세계 임직원" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-extralight text-zinc-900 mb-1 tabular-nums">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ══════════════════ DIVIDER IMAGE ══════════════════ */}
      <Reveal className="w-full overflow-hidden" y={20}>
        <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 600px)" }}>
          <img
            src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
            alt="blum workspace"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 50%)" }} />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">Since 1952</p>
              <p className="text-2xl md:text-4xl font-extralight text-zinc-900 leading-snug max-w-xs" style={{ letterSpacing: "-0.01em" }}>
                오스트리아 정밀<br />제조의 전통
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ══════════════════ PRODUCTS ══════════════════ */}
      <section id="products" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-4">Product Lines</p>
              <h2 className="text-3xl md:text-5xl font-extralight" style={{ letterSpacing: "-0.02em" }}>Signature Systems</h2>
            </div>
            <Link
              href="/v1/products"
              className="text-[11px] tracking-[0.25em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group inline-flex items-center gap-2 shrink-0"
              style={{ textDecoration: "none" }}
            >
              전체 제품 보기
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>

          {/* 2×2 product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <Link
                  href={p.href}
                  className="product-card group block bg-white transition-colors duration-500 hover:bg-zinc-50"
                  style={{ textDecoration: "none" }}
                >
                  {/* Image area */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-zinc-100">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="product-img w-full h-full object-cover transition-transform duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    {/* Sub image on hover */}
                    <div
                      className="product-sub absolute inset-0 transition-all duration-500"
                      style={{ opacity: 0, transform: "translateY(8px)" }}
                    >
                      <img
                        src={p.sub}
                        alt={`${p.name} detail`}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                    {/* Index badge */}
                    <div className="absolute top-5 left-5 text-[9px] tracking-[0.3em] text-white/60">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-5 right-5 text-[9px] tracking-[0.25em] uppercase text-white/60 bg-black/20 backdrop-blur-sm px-3 py-1">
                      {p.category}
                    </div>
                  </div>
                  {/* Text */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-light tracking-tight">{p.name}</h3>
                      <span className="text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all duration-300 inline-block">→</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-5" style={{ fontWeight: 300 }}>{p.desc}</p>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-300 group-hover:text-zinc-700 transition-colors">
                      자세히 보기
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FULL-BLEED FEATURE ══════════════════ */}
      <Reveal y={20}>
        <div className="relative overflow-hidden" style={{ height: "clamp(400px, 55vw, 720px)" }}>
          <img
            src={`${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`}
            alt="blum showcase"
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.src = `${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`;
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(9,9,11,0.72) 0%, rgba(9,9,11,0.2) 60%)" }} />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-8 pb-16 w-full">
              <p className="text-[9px] tracking-[0.45em] uppercase text-white/40 mb-4">Brand Showcase</p>
              <p className="text-white font-extralight leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.02em" }}>
                세계가 인정한<br />오스트리아의 기술
              </p>
              <div className="mt-6">
                <Link
                  href="/v1/company"
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors group"
                  style={{ textDecoration: "none" }}
                >
                  브랜드 알아보기
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ══════════════════ PHILOSOPHY ══════════════════ */}
      <section className="py-28 md:py-40 max-w-7xl mx-auto px-8">
        <Reveal className="mb-16">
          <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-4">Our Philosophy</p>
          <h2 className="text-3xl md:text-5xl font-extralight" style={{ letterSpacing: "-0.02em" }}>blum이 추구하는 것</h2>
        </Reveal>
        <div>
          {VALUES.map((v, i) => (
            <Reveal key={v.num} delay={i * 80}>
              <div
                className="value-row border-t border-zinc-100 group cursor-pointer"
                onClick={() => setOpenValue(openValue === i ? null : i)}
              >
                <div className="py-8 md:py-10 grid grid-cols-12 gap-6 items-start">
                  <span className="col-span-2 md:col-span-1 text-[9px] text-zinc-200 tracking-widest value-num transition-colors group-hover:text-zinc-500 mt-1">{v.num}</span>
                  <div className="col-span-8 md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-light group-hover:text-zinc-600 transition-colors">{v.title}</h3>
                  </div>
                  <div className="col-span-2 md:col-span-6 text-right md:text-left">
                    <p
                      className="text-sm text-zinc-400 leading-relaxed overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: openValue === i ? "200px" : "0px",
                        opacity: openValue === i ? 1 : 0,
                        fontWeight: 300,
                      }}
                    >
                      {v.body}
                    </p>
                    <span className="text-zinc-200 text-sm group-hover:text-zinc-500 transition-colors mt-2 inline-block">
                      {openValue === i ? "−" : "+"}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-zinc-100" />
        </div>
      </section>

      {/* ══════════════════ SERVICES STRIP ══════════════════ */}
      <Reveal>
        <section className="py-16 bg-zinc-50 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "계획 / 설계 지원",
                  body: "구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
                  href: "/v1/services",
                },
                {
                  title: "E-Services",
                  body: "CAD/CAM 데이터부터 주문 관리까지 디지털로 완결되는 온라인 서비스 포털.",
                  href: "/v1/services",
                },
                {
                  title: "조립 / 조정 지원",
                  body: "ECODRILL, EASYSTICK 등 blum 전용 조립 장치로 정밀한 설치를 지원합니다.",
                  href: "/v1/services",
                },
              ].map((s) => (
                <Link key={s.title} href={s.href} className="group block" style={{ textDecoration: "none" }}>
                  <div className="w-8 h-px bg-zinc-300 mb-5 group-hover:w-16 transition-all duration-300" />
                  <h3 className="text-base font-light text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors">{s.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4" style={{ fontWeight: 300 }}>{s.body}</p>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-300 group-hover:text-zinc-700 transition-colors">
                    더 알아보기 →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="relative bg-zinc-950 py-36 md:py-52 overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4214768/corporate/media/bilder/virtueller-schauraum/blum-virtueller-schauraum_2_4:3.png`}
            alt="blum showroom"
            className="w-full h-full object-cover opacity-15"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(9,9,11,0.5) 0%, rgba(9,9,11,0.95) 80%)" }} />
        </div>

        <Reveal className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 mb-8">Contact & Showroom</p>
          <h2 className="font-extralight text-white mb-8 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}>
            쇼룸에서<br />직접 경험하세요
          </h2>
          <p className="text-zinc-400 text-sm leading-8 mb-14 max-w-sm mx-auto" style={{ fontWeight: 300 }}>
            전문 컨설턴트가 공간에 최적화된<br />blum 솔루션을 제안해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/v1/contact"
              className="text-[11px] tracking-[0.25em] uppercase px-9 py-4 bg-white text-zinc-900 hover:bg-zinc-100 transition-colors"
              style={{ textDecoration: "none" }}
            >
              문의 / 방문 신청
            </Link>
            <Link
              href="/v1/products"
              className="text-[11px] tracking-[0.25em] uppercase px-9 py-4 border text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.18)", textDecoration: "none" }}
            >
              전체 제품 보기
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════ FOOTER CTA STRIP ══════════════════ */}
      <div className="border-t border-zinc-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 tracking-wider" style={{ fontWeight: 300 }}>
            Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria
          </p>
          <div className="flex gap-8">
            {[["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"]].map(([l, h]) => (
              <Link key={l} href={h}
                className="text-[9px] tracking-[0.3em] uppercase text-zinc-300 hover:text-zinc-700 transition-colors"
                style={{ textDecoration: "none" }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BlumGSAP version="v1" />
    </div>
  );
}
