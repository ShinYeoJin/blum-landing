"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import BlumGSAP from "@/components/BlumGSAP";

const BASE = "https://www.blum.com";

/* ── Intersection observer ──────────────────────────────────────── */
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

function Reveal({ children, delay = 0, className = "", y = 40 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
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

function SlideLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateX(-52px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function ExpandLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className} style={{
      transformOrigin: "left",
      transform: inView ? "scaleX(1)" : "scaleX(0)",
      transition: inView ? `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms` : "none",
    }} />
  );
}

function ScaleIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <div style={{
        transform: inView ? "scale(1)" : "scale(1.08)",
        transition: `transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "transform",
      }}>{children}</div>
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();
      const t0 = performance.now(), dur = 1800;
      let raf: number;
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Data ───────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "aventos",
    name: "AVENTOS",
    category: "리프트 시스템",
    desc: "높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 부드럽고 조용히 닫히고 가볍게 들어올려집니다.",
    href: "/v1/products/aventos",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "legrabox",
    name: "LEGRABOX",
    category: "박스 시스템",
    desc: "가장 까다로운 디자인 요구 사항에 적합한 서랍 시스템. 슬림한 서랍면(12.8mm)으로 최대 하중 40kg 및 70kg을 지지합니다.",
    href: "/v1/products#box",
    img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "cliptop",
    name: "CLIP top BLUMOTION",
    category: "경첩 시스템",
    desc: "경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어의 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v1/products#hinge",
    img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "tipon",
    name: "TIP-ON",
    category: "모션 기술",
    desc: "도어, 고정식 리프트 또는 풀아웃 시스템 등의 핸들 없는 가구를 원터치로 열 수 있는 기계식 열기 시스템.",
    href: "/v1/products#motion",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
];

const VALUES = [
  { num: "01", title: "삶의 질", body: "편리함을 높이고 삶의 질을 향상시키는 고품질 가구용 피팅을 제조합니다." },
  { num: "02", title: "영감", body: "고객의 질문이 혁신의 원동력입니다. blum은 끊임없이 움직여 더 나은 아이디어를 만들어 갑니다." },
  { num: "03", title: "신뢰", body: "사회, 환경, 직원에 대한 기업 책임. 자연 자원을 미래 세대를 위해 보존하는 것이 blum의 핵심 가치입니다." },
];

const SERVICES = [
  {
    title: "계획 / 설계 지원",
    body: "구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
    href: "/v1/services",
    img: `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`,
  },
  {
    title: "E-Services",
    body: "CAD/CAM 데이터부터 주문 관리까지 디지털로 완결되는 온라인 서비스 포털.",
    href: "/v1/services",
    img: `${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`,
  },
];

/* ══════════════════════════════════════════════════════════════════ */
export default function V1() {
  const [openValue, setOpenValue] = useState<number | null>(null);

  /* ── Brand (About) refs for GSAP animations ─────────────────── */
  const aboutRef     = useRef<HTMLElement>(null);
  const aboutImgRef  = useRef<HTMLImageElement>(null);
  const aboutOverRef = useRef<HTMLDivElement>(null);
  const aboutLblRef  = useRef<HTMLParagraphElement>(null);
  const aboutH2Ref   = useRef<HTMLHeadingElement>(null);
  const aboutLineRef = useRef<HTMLDivElement>(null);
  const aboutB1Ref   = useRef<HTMLParagraphElement>(null);
  const aboutB2Ref   = useRef<HTMLParagraphElement>(null);
  const aboutLinkRef = useRef<HTMLAnchorElement>(null);

  /* ── Pre-hide before first paint ────────────────────────────── */
  useLayoutEffect(() => {
    /* Prevent BlumGSAP from re-wrapping the brand h2 */
    if (aboutH2Ref.current) aboutH2Ref.current.dataset.gsapMask = "1";

    /* Pre-hide product cards so BlumGSAP grid-stagger skips them
       (BlumGSAP bails early when el.style.opacity === "0") */
    document.querySelectorAll<HTMLElement>("#products .product-card").forEach((el) => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(100px)";
      el.style.transition = "none";
    });
  }, []);

  /* ── GSAP: brand entry + product stagger ────────────────────── */
  useEffect(() => {
    const kills: Array<() => void> = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ═══════════════════════════════════════════════════════════
         BRAND SECTION
         Triggered by scroll position: fires when the user has
         scrolled 60 % of one viewport height — i.e. when the
         brand panel is already 40 % visible from the bottom.
         GSAP ScrollTrigger is NOT used here because sticky
         elements have unreliable trigger positions.
         ═══════════════════════════════════════════════════════════ */
      const aboutImg = aboutImgRef.current;
      if (aboutImg) {
        /* Set initial hidden state for every text element */
        const textEls = [
          aboutLblRef.current,
          aboutH2Ref.current,
          aboutB1Ref.current,
          aboutB2Ref.current,
          aboutLinkRef.current,
        ];
        textEls.forEach((el) => { if (el) gsap.set(el, { opacity: 0, y: 44 }); });
        if (aboutLineRef.current) gsap.set(aboutLineRef.current, { scaleX: 0, transformOrigin: "left" });
        if (aboutOverRef.current) gsap.set(aboutOverRef.current, { opacity: 0.1 });
        /* Image starts zoomed-in */
        gsap.set(aboutImg, { scale: 1.1 });

        let triggered = false;
        const threshold = window.innerHeight * 0.6;

        const onScroll = () => {
          if (triggered || window.scrollY < threshold) return;
          triggered = true;
          window.removeEventListener("scroll", onScroll);

          /* Image shrinks to natural size */
          gsap.to(aboutImg, { scale: 1, duration: 1.5, ease: "power2.out" });

          /* Overlay deepens */
          if (aboutOverRef.current)
            gsap.to(aboutOverRef.current, { opacity: 0.65, duration: 1.2, ease: "power2.out" });

          /* Text sequential fade-in */
          const E = 0.85;
          const base = 0.3;
          if (aboutLblRef.current)  gsap.to(aboutLblRef.current,  { opacity: 1, y: 0, duration: E, ease: "power2.out", delay: base });
          if (aboutH2Ref.current)   gsap.to(aboutH2Ref.current,   { opacity: 1, y: 0, duration: E, ease: "power2.out", delay: base + 0.15 });
          if (aboutLineRef.current) gsap.to(aboutLineRef.current,  { scaleX: 1,        duration: 0.6, ease: "power3.inOut", delay: base + 0.35 });
          if (aboutB1Ref.current)   gsap.to(aboutB1Ref.current,   { opacity: 1, y: 0, duration: E, ease: "power2.out", delay: base + 0.46 });
          if (aboutB2Ref.current)   gsap.to(aboutB2Ref.current,   { opacity: 1, y: 0, duration: E, ease: "power2.out", delay: base + 0.59 });
          if (aboutLinkRef.current) gsap.to(aboutLinkRef.current,  { opacity: 1, y: 0, duration: E, ease: "power2.out", delay: base + 0.72 });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        kills.push(() => window.removeEventListener("scroll", onScroll));
      }

      /* ═══════════════════════════════════════════════════════════
         PRODUCT CARDS — stagger 100px → 0
         ═══════════════════════════════════════════════════════════ */
      const cards = document.querySelectorAll<HTMLElement>("#products .product-card");
      if (cards.length > 0) {
        /* Clear the "transition:none" we set in useLayoutEffect */
        cards.forEach((c) => { c.style.transition = ""; });

        const cardsTween = gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#products",
            start: "top 68%",
            once: true,
          },
        });
        kills.push(() => cardsTween.kill());
      }

      await new Promise<void>((r) => setTimeout(r, 100));
      ScrollTrigger.refresh();
    };

    init();
    return () => kills.forEach((fn) => fn());
  }, []);

  return (
    /*
      IMPORTANT: Do NOT add overflow-x: hidden here.
      `overflow-x: hidden` implicitly sets `overflow-y: auto` which
      creates a new scroll container and BREAKS position: sticky.
      Overflow clipping is applied per-section instead.
    */
    <div className="bg-white text-zinc-900" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @keyframes v1-ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes v1-scrollbar { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
        @keyframes v1-word-in   { from{opacity:0;transform:translateY(110%)} to{opacity:1;transform:translateY(0)} }
        @keyframes v1-bounce    { 0%,100%{transform:translateY(0) rotate(90deg)} 50%{transform:translateY(5px) rotate(90deg)} }

        .v1-ticker    { animation: v1-ticker 28s linear infinite; }
        .v1-scrollbar { animation: v1-scrollbar 2.2s cubic-bezier(0.4,0,0.2,1) infinite; }
        .v1-bounce-txt { animation: v1-bounce 1.8s ease-in-out infinite; display:inline-block; }
        .v1-word { display:inline-block; animation: v1-word-in 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        .product-card { transition: box-shadow 0.55s ease; }
        .product-card:hover { box-shadow: 0 28px 64px rgba(0,0,0,0.12); }
        .product-card:hover .product-img { transform: scale(1.06); }
        .product-card .card-text { transition: transform 0.5s cubic-bezier(0.25,1,0.5,1); }
        .product-card:hover .card-text { transform: translateY(-4px); }

        .value-row:hover .value-num { color: #18181b; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 1 — HERO
          position: sticky keeps it pinned at the top; every subsequent
          section with a higher z-index and solid background will slide
          up over it as the user scrolls.
          overflow: hidden is scoped to this element only (does NOT
          break the parent's sticky behaviour).
      ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "sticky", top: 0,
          height: "100vh", minHeight: 600,
          zIndex: 10,
          overflow: "hidden",
          backgroundColor: "#09090b",
          display: "flex", alignItems: "flex-end",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum hero"
            className="w-full h-full object-cover"
            style={{ opacity: 0.42 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #09090b 32%, rgba(9,9,11,0.55) 65%, rgba(9,9,11,0.15) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(9,9,11,0.65) 0%, transparent 55%)" }} />
        </div>

        {/* "moving / ideas." — word-by-word CSS entry animation */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full">
          <h1 className="text-white leading-none select-none" style={{
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
          }}>
            <span style={{ display: "inline-block", overflow: "hidden" }}>
              <span className="v1-word" style={{ animationDelay: "220ms" }}>moving</span>
            </span>
            <br />
            <span style={{ display: "inline-block", overflow: "hidden" }}>
              <span className="v1-word" style={{ color: "rgba(161,161,170,0.85)", fontStyle: "italic", animationDelay: "380ms" }}>ideas.</span>
            </span>
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-3 z-10">
          <span className="v1-bounce-txt text-[8px] tracking-[0.4em] uppercase text-white/25 origin-center mb-2" style={{ writingMode: "vertical-rl" }}>scroll</span>
          <div className="w-px h-14 relative overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
            <div className="w-full bg-white/50 absolute top-0 v1-scrollbar" style={{ height: "45%" }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2 — BRAND (ABOUT)
          z-index: 20 > hero's 10 → slides up and covers the hero.
          GSAP animates image scale(1.1→1) + sequential text reveals
          once the user has scrolled 60 % of one viewport height.
      ══════════════════════════════════════════════════════════════ */}
      <section
        ref={aboutRef}
        style={{
          position: "sticky", top: 0,
          height: "100vh",
          zIndex: 20,
          overflow: "hidden",
          backgroundColor: "#09090b",
        }}
      >
        {/* Full-screen background image — hover:scale-100 tells BlumGSAP to skip parallax */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            ref={aboutImgRef}
            src={`${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
            alt="blum factory"
            className="w-full h-full object-cover hover:scale-100"
            style={{ willChange: "transform" }}
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#1a1a1a"; }}
          />
          {/* Overlay — GSAP animates opacity 0.1 → 0.65 */}
          <div ref={aboutOverRef} style={{ position: "absolute", inset: 0, backgroundColor: "#000000" }} />
        </div>

        {/* Text overlay — all hidden; GSAP reveals on scroll */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div className="max-w-7xl mx-auto px-8 w-full">
            <p ref={aboutLblRef} style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>
              About Blum
            </p>
            <h2
              ref={aboutH2Ref}
              style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 200, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#ffffff", marginBottom: "1.5rem" }}
            >
              가구의 움직임을<br />재정의합니다
            </h2>
            <div ref={aboutLineRef} style={{ width: "2.5rem", height: "1px", backgroundColor: "rgba(255,255,255,0.25)", marginBottom: "2rem" }} />
            <p ref={aboutB1Ref} style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 2, fontWeight: 300, maxWidth: "28rem", marginBottom: "1rem" }}>
              1952년 오스트리아 포어알베르크에서 시작된 blum은 현재 전 세계 120개국에서 사용되는 프리미엄 가구 피팅 제조사입니다.
            </p>
            <p ref={aboutB2Ref} style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 2, fontWeight: 300, maxWidth: "28rem", marginBottom: "3rem" }}>
              힌지, 서랍, 리프트 시스템을 통해 매일 수백만 명의 일상을 더 편리하고 아름답게 만들고 있습니다.
            </p>
            <Link
              ref={aboutLinkRef}
              href="/v1/company"
              className="group"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
            >
              브랜드 스토리
              <span style={{ display: "inline-block", transition: "transform 0.3s" }} className="group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — ALL REMAINING CONTENT
          position: relative + z-index: 30 ensures this block renders
          on top of both sticky sections as it scrolls into view.
          overflow-x: hidden is safe here (not an ancestor of sticky).
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 30, backgroundColor: "#ffffff" }} className="overflow-x-hidden">

        {/* ── MARQUEE ── */}
        <div className="overflow-hidden border-b border-zinc-100 py-4 bg-white">
          <div className="v1-ticker flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[10px] tracking-[0.35em] uppercase text-zinc-300 pr-16">
                CLIP top · AVENTOS · LEGRABOX · TIP-ON · MOVENTO · REVEGO · BLUMOTION · SINCE 1952 ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <section className="py-16 md:py-20 border-b border-zinc-100">
          <Reveal className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { target: 2441, suffix: "M€",  label: "전 세계 연매출" },
              { target: 120,  suffix: "개국+", label: "글로벌 판매 국가" },
              { target: 34,   suffix: "개소", label: "전 세계 자회사·대리점" },
              { target: 9850, suffix: "명",  label: "전 세계 임직원" },
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

        {/* ── DIVIDER IMAGE ── */}
        <ScaleIn>
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
        </ScaleIn>

        {/* ── PRODUCTS ── */}
        {/*
          Outer layout uses flexbox (not CSS "grid" class) so
          BlumGSAP's "section .grid > div" selector doesn't
          accidentally grab the left-column sticky header.
        */}
        <section id="products" className="py-28 md:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

              {/* Left — sticky header */}
              <div className="md:w-80 shrink-0">
                <div className="md:sticky" style={{ top: "88px" }}>
                  <SlideLeft>
                    <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-4">Product Lines</p>
                    <h2 className="text-3xl md:text-4xl font-extralight mb-4" style={{ letterSpacing: "-0.02em" }}>
                      Signature<br />Systems
                    </h2>
                  </SlideLeft>
                  <ExpandLine delay={80} className="w-8 h-px bg-zinc-200 my-6" />
                  <Reveal delay={120}>
                    <p className="text-sm text-zinc-400 leading-8 mb-8" style={{ fontWeight: 300 }}>
                      blum의 대표 제품 라인. 힌지부터 리프트 시스템까지, 모든 움직임에는 blum의 정밀함이 담겨 있습니다.
                    </p>
                    <Link
                      href="/v1/products"
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group"
                      style={{ textDecoration: "none" }}
                    >
                      전체 제품 보기
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </Reveal>
                </div>
              </div>

              {/* Right — asymmetric grid; GSAP stagger handles entry */}
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-2 gap-3">

                  <Link href={PRODUCTS[0].href} className="product-card col-span-2 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/7" }}>
                      <img src={PRODUCTS[0].img} alt={PRODUCTS[0].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                    <div className="card-text p-6">
                      <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[0].category}</span>
                      <h3 className="text-xl font-light text-zinc-900 mb-2">{PRODUCTS[0].name}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-md">{PRODUCTS[0].desc}</p>
                    </div>
                  </Link>

                  <Link href={PRODUCTS[1].href} className="product-card col-span-1 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                      <img src={PRODUCTS[1].img} alt={PRODUCTS[1].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                    <div className="card-text p-6">
                      <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[1].category}</span>
                      <h3 className="text-lg font-light text-zinc-900 mb-2">{PRODUCTS[1].name}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{PRODUCTS[1].desc}</p>
                    </div>
                  </Link>

                  <Link href={PRODUCTS[2].href} className="product-card col-span-1 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                      <img src={PRODUCTS[2].img} alt={PRODUCTS[2].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                    <div className="card-text p-6">
                      <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[2].category}</span>
                      <h3 className="text-lg font-light text-zinc-900 mb-2">{PRODUCTS[2].name}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{PRODUCTS[2].desc}</p>
                    </div>
                  </Link>

                  <Link href={PRODUCTS[3].href} className="product-card col-span-2 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/7" }}>
                      <img src={PRODUCTS[3].img} alt={PRODUCTS[3].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                    <div className="card-text p-6">
                      <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[3].category}</span>
                      <h3 className="text-xl font-light text-zinc-900 mb-2">{PRODUCTS[3].name}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-md">{PRODUCTS[3].desc}</p>
                    </div>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL-BLEED FEATURE ── */}
        <ScaleIn>
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
                  <Link href="/v1/company" className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors group" style={{ textDecoration: "none" }}>
                    브랜드 알아보기
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* ── PHILOSOPHY ── */}
        <section className="py-28 md:py-40 max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <SlideLeft>
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-4">Our Philosophy</p>
                <h2 className="text-3xl md:text-5xl font-extralight mb-6" style={{ letterSpacing: "-0.02em" }}>blum이 추구하는 것</h2>
              </SlideLeft>
              <ExpandLine delay={80} className="w-10 h-px bg-zinc-200 mb-8" />
              <Reveal delay={120}>
                <p className="text-sm text-zinc-400 leading-8" style={{ fontWeight: 300 }}>
                  삶의 질, 영감, 그리고 신뢰 — blum의 세 가지 핵심 가치. 고객의 질문이 혁신의 원동력이 되고, 자연 자원을 미래 세대를 위해 보존합니다.
                </p>
              </Reveal>
            </div>
            <div>
              {VALUES.map((v, i) => (
                <Reveal key={v.num} delay={i * 80}>
                  <div className="value-row border-t border-zinc-100 group cursor-pointer" onClick={() => setOpenValue(openValue === i ? null : i)}>
                    <div className="py-8 md:py-10 grid grid-cols-12 gap-6 items-start">
                      <span className="col-span-2 md:col-span-1 text-[9px] text-zinc-200 tracking-widest value-num transition-colors group-hover:text-zinc-500 mt-1">{v.num}</span>
                      <div className="col-span-8 md:col-span-7">
                        <h3 className="text-xl md:text-2xl font-light group-hover:text-zinc-600 transition-colors">{v.title}</h3>
                      </div>
                      <div className="col-span-2 md:col-span-4 text-right">
                        <span className="text-zinc-200 text-sm group-hover:text-zinc-500 transition-colors inline-block">{openValue === i ? "−" : "+"}</span>
                      </div>
                    </div>
                    <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: openValue === i ? "200px" : "0px", opacity: openValue === i ? 1 : 0 }}>
                      <p className="text-sm text-zinc-400 leading-relaxed pb-8 pl-8" style={{ fontWeight: 300 }}>{v.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-zinc-100" />
            </div>
          </div>
        </section>

        {/* ── SERVICES STRIP ── */}
        <section className="py-16 bg-zinc-50 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-8">
            <SlideLeft>
              <div className="mb-12">
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-3">Services</p>
                <h2 className="text-2xl md:text-3xl font-extralight" style={{ letterSpacing: "-0.02em" }}>전문 서비스 지원</h2>
              </div>
            </SlideLeft>
            <div className="flex flex-col gap-px bg-zinc-200">
              {SERVICES.map((s, i) => {
                const isEven = i % 2 === 0;
                return (
                  <Link key={s.title} href={s.href} className="group grid grid-cols-1 md:grid-cols-2 bg-zinc-50 hover:bg-white transition-colors duration-300" style={{ textDecoration: "none", minHeight: "280px" }}>
                    {isEven ? (
                      <>
                        <div className="flex flex-col justify-center px-10 md:px-14 py-12 order-2 md:order-1">
                          <div className="w-8 h-px bg-zinc-300 mb-5 group-hover:w-16 transition-all duration-300" />
                          <h3 className="text-lg font-light text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors">{s.title}</h3>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-5" style={{ fontWeight: 300 }}>{s.body}</p>
                          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-zinc-700 transition-colors">더 알아보기 →</span>
                        </div>
                        <div className="relative overflow-hidden bg-zinc-100 order-1 md:order-2" style={{ minHeight: "280px" }}>
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative overflow-hidden bg-zinc-100 order-1" style={{ minHeight: "280px" }}>
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                        <div className="flex flex-col justify-center px-10 md:px-14 py-12 order-2">
                          <div className="w-8 h-px bg-zinc-300 mb-5 group-hover:w-16 transition-all duration-300" />
                          <h3 className="text-lg font-light text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors">{s.title}</h3>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-5" style={{ fontWeight: 300 }}>{s.body}</p>
                          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-zinc-700 transition-colors">더 알아보기 →</span>
                        </div>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative bg-zinc-950 py-36 md:py-52 overflow-hidden">
          <div className="absolute inset-0">
            <img src={`${BASE}/images/560/258/4214768/corporate/media/bilder/virtueller-schauraum/blum-virtueller-schauraum_2_4:3.png`} alt="blum showroom" className="w-full h-full object-cover opacity-15" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(9,9,11,0.5) 0%, rgba(9,9,11,0.95) 80%)" }} />
          </div>
          <Reveal className="relative z-10 max-w-3xl mx-auto px-8 text-center">
            <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 mb-8">Contact &amp; Showroom</p>
            <h2 className="font-extralight text-white mb-8 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}>
              쇼룸에서<br />직접 경험하세요
            </h2>
            <p className="text-zinc-400 text-sm leading-8 mb-14 max-w-sm mx-auto" style={{ fontWeight: 300 }}>
              전문 컨설턴트가 공간에 최적화된<br />blum 솔루션을 제안해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/v1/contact" className="text-[11px] tracking-[0.25em] uppercase px-9 py-4 bg-white text-zinc-900 hover:bg-zinc-100 transition-colors" style={{ textDecoration: "none" }}>문의 / 방문 신청</Link>
              <Link href="/v1/products" className="text-[11px] tracking-[0.25em] uppercase px-9 py-4 border text-white hover:bg-white/10 transition-colors" style={{ borderColor: "rgba(255,255,255,0.18)", textDecoration: "none" }}>전체 제품 보기</Link>
            </div>
          </Reveal>
        </section>

        {/* ── FOOTER STRIP ── */}
        <div className="border-t border-zinc-100 bg-white py-8">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400 tracking-wider" style={{ fontWeight: 300 }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</p>
            <div className="flex gap-8">
              {[["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"]].map(([l, h]) => (
                <Link key={l} href={h} className="text-[9px] tracking-[0.3em] uppercase text-zinc-300 hover:text-zinc-700 transition-colors" style={{ textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>

      </div>{/* end z-30 wrapper */}

      <BlumGSAP version="v1" />
    </div>
  );
}
