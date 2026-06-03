"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  /* ── Divider ("SINCE 1952") refs ────────────────────────────── */
  const dividerWrapRef = useRef<HTMLDivElement>(null);
  const dividerImgRef  = useRef<HTMLDivElement>(null);   // scaling wrapper
  const dividerLblRef  = useRef<HTMLParagraphElement>(null);
  const dividerTxtRef  = useRef<HTMLParagraphElement>(null);

  /* ── Hero → Brand transition refs ───────────────────────────── */
  const transitionOuterRef = useRef<HTMLDivElement>(null);
  const heroLayerRef       = useRef<HTMLDivElement>(null);
  const heroTextRef        = useRef<HTMLDivElement>(null);
  const scrollIndicRef     = useRef<HTMLDivElement>(null);
  const gridLayerRef       = useRef<HTMLDivElement>(null);
  const g1Ref              = useRef<HTMLImageElement>(null);
  const g2Ref              = useRef<HTMLImageElement>(null);
  const g3Ref              = useRef<HTMLImageElement>(null);
  const g4Ref              = useRef<HTMLImageElement>(null);
  const g5Ref              = useRef<HTMLImageElement>(null);
  const g6Ref              = useRef<HTMLImageElement>(null);
  const g7Ref              = useRef<HTMLImageElement>(null);
  const g8Ref              = useRef<HTMLImageElement>(null);
  const g9Ref              = useRef<HTMLImageElement>(null);
  const heroPinRef         = useRef<HTMLElement>(null);
  const spotlightRef       = useRef<HTMLDivElement>(null);
  const spotlightOverRef   = useRef<HTMLDivElement>(null);
  const aboutLayerRef      = useRef<HTMLDivElement>(null);
  const aboutLblRef        = useRef<HTMLParagraphElement>(null);
  const aboutH2Ref         = useRef<HTMLHeadingElement>(null);
  const aboutLineRef       = useRef<HTMLDivElement>(null);
  const aboutB1Ref         = useRef<HTMLParagraphElement>(null);
  const aboutB2Ref         = useRef<HTMLParagraphElement>(null);
  const aboutLinkRef       = useRef<HTMLAnchorElement>(null);

  /* ── Brand snap-sequence refs ───────────────────────────────── */
  const snapRef           = useRef<HTMLDivElement>(null); // scroll-snap container
  const snapStep1TextRef  = useRef<HTMLDivElement>(null); // step 1 text block
  const snapBeigePanelRef = useRef<HTMLDivElement>(null); // step 2 beige panel
  const snapServicesRef   = useRef<HTMLElement>(null);    // exit target

  /* ── Services snap refs ──────────────────────────────────────── */
  const svcTitleRef       = useRef<HTMLDivElement>(null); // snap 1 title
  const svcPlanRef        = useRef<HTMLDivElement>(null); // snap 3 left content
  const svcEsvcRef        = useRef<HTMLDivElement>(null); // snap 5 left content

  /* ── Pre-hide before first paint ────────────────────────────── */
  useLayoutEffect(() => {
    if (aboutH2Ref.current) aboutH2Ref.current.dataset.gsapMask = "1";
    document.querySelectorAll<HTMLElement>("#products .product-card").forEach((el) => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(100px)";
      el.style.transition = "none";
    });
  }, []);

  /* ── GSAP: hero→brand ScrollTrigger + product stagger ────────── */
  useEffect(() => {
    const kills: Array<() => void> = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ═══════════════════════════════════════════════════════════
         HERO → BRAND TRANSITION  (ScrollTrigger scrub)

         STEP 1 (0→1):  Hero scale 1→0.7 + fade, grid appears
         STEP 2 (1→2):  Spotlight appears at g1 position, expands
                        to fullscreen; other grid images fade out
         STEP 3 (2→3):  Text overlay appears

         Spotlight = g1 image cloned as position:absolute inside
         sticky section. getBoundingClientRect() gives the grid
         cell's viewport coords → used as GSAP from-values so the
         expansion starts exactly from the grid cell.
         ═══════════════════════════════════════════════════════════ */
      const outer   = transitionOuterRef.current;
      const pinEl   = heroPinRef.current;
      const g1El    = g1Ref.current;
      const spl     = spotlightRef.current;
      const splOver = spotlightOverRef.current;

      if (outer && pinEl && g1El && spl) {
        /* ── Measure g1 position relative to sticky section ── */
        const pinRect = pinEl.getBoundingClientRect();
        const g1Rect  = g1El.getBoundingClientRect();
        const startTop    = g1Rect.top    - pinRect.top;
        const startLeft   = g1Rect.left   - pinRect.left;
        const startWidth  = g1Rect.width;
        const startHeight = g1Rect.height;

        /* ── Initial hidden states ── */
        gsap.set(gridLayerRef.current, { opacity: 0 });
        gsap.set(
          [g1Ref.current, g2Ref.current, g3Ref.current, g4Ref.current,
           g5Ref.current, g6Ref.current, g7Ref.current, g8Ref.current, g9Ref.current],
          { opacity: 0, scale: 0.94 }
        );
        /* Spotlight starts at the g1 grid-cell position, invisible */
        gsap.set(spl, {
          top: startTop, left: startLeft,
          width: startWidth, height: startHeight,
          opacity: 0,
        });
        if (splOver) gsap.set(splOver, { opacity: 0 });

        gsap.set(aboutLayerRef.current, { opacity: 0 });
        ([aboutLblRef, aboutH2Ref, aboutB1Ref, aboutB2Ref, aboutLinkRef] as React.RefObject<HTMLElement>[]).forEach(
          (r) => { if (r.current) gsap.set(r.current, { opacity: 0, y: 40 }); }
        );
        if (aboutLineRef.current) gsap.set(aboutLineRef.current, { scaleX: 0, transformOrigin: "left" });

        const allImgs   = [g1Ref.current, g2Ref.current, g3Ref.current, g4Ref.current,
                           g5Ref.current, g6Ref.current, g7Ref.current, g8Ref.current, g9Ref.current];
        const otherImgs = [g2Ref.current, g3Ref.current, g4Ref.current,
                           g5Ref.current, g6Ref.current, g7Ref.current, g8Ref.current, g9Ref.current];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        /* ── STEP 1: Hero shrinks, grid appears ── */
        tl
          .to(heroLayerRef.current,   { scale: 0.7, opacity: 0, duration: 1 }, 0)
          .to(heroTextRef.current,    { opacity: 0, y: -24, duration: 0.55 }, 0)
          .to(scrollIndicRef.current, { opacity: 0, duration: 0.35 }, 0)
          .to(gridLayerRef.current,   { opacity: 1, duration: 0.5 }, 0.25)
          .to(allImgs, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.7 }, 0.35)

        /* ── STEP 2: Feature image (g1) expands to fullscreen ── */
          /* 2a — spotlight appears flush over g1's grid cell */
          .to(spl, { opacity: 1, duration: 0.12 }, 1.35)
          /* 2b — other grid images fade; g1 fades under spotlight */
          .to(otherImgs, { opacity: 0, stagger: 0.06, duration: 0.45 }, 1.4)
          .to(g1Ref.current, { opacity: 0, duration: 0.25 }, 1.48)
          /* 2c — spotlight expands from g1 cell → full viewport */
          .to(spl, {
            top: 0, left: 0, width: "100%", height: "100%",
            duration: 1.15, ease: "power2.inOut",
          }, 1.4)
          .to(gridLayerRef.current, { opacity: 0, duration: 0.3 }, 1.65)
          /* 2d — dark overlay fades in during expansion */
          .to(splOver, { opacity: 0.62, duration: 0.9 }, 1.75)

        /* ── STEP 3: Text overlay ── */
          .to(aboutLayerRef.current, { opacity: 1, duration: 0.45 }, 2.25)
          .to(aboutLblRef.current,   { opacity: 1, y: 0, duration: 0.55 }, 2.35)
          .to(aboutH2Ref.current,    { opacity: 1, y: 0, duration: 0.65 }, 2.5)
          .to(aboutLineRef.current,  { scaleX: 1,        duration: 0.45 }, 2.7)
          .to(aboutB1Ref.current,    { opacity: 1, y: 0, duration: 0.55 }, 2.75)
          .to(aboutB2Ref.current,    { opacity: 1, y: 0, duration: 0.55 }, 2.9)
          .to(aboutLinkRef.current,  { opacity: 1, y: 0, duration: 0.55 }, 3.05);

        kills.push(() => { tl.scrollTrigger?.kill(); tl.kill(); });
      }

      /* ═══════════════════════════════════════════════════════════
         DIVIDER IMAGE — scale 0.6 → 1.0 (scrub), then text reveal
         ═══════════════════════════════════════════════════════════ */
      const divWrap = dividerWrapRef.current;
      if (divWrap && dividerImgRef.current && dividerLblRef.current && dividerTxtRef.current) {
        gsap.set(dividerImgRef.current, { scale: 0.6, transformOrigin: "center" });
        gsap.set(dividerLblRef.current, { opacity: 0 });
        gsap.set(dividerTxtRef.current, { opacity: 0, y: 50 });

        const divTl = gsap.timeline({
          scrollTrigger: {
            trigger: divWrap,
            start: "top 78%",
            end: "center 25%",
            scrub: 0.9,
          },
        });
        /* image scale first, then text sequentially */
        divTl
          .to(dividerImgRef.current, { scale: 1.0, duration: 1, ease: "none" })
          .to(dividerLblRef.current, { opacity: 1, duration: 0.35 }, 0.88)
          .to(dividerTxtRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.08);

        kills.push(() => { divTl.scrollTrigger?.kill(); divTl.kill(); });
      }

      /* ═══════════════════════════════════════════════════════════
         PRODUCT CARDS — individual ScrollTrigger per card
         Cards pre-hidden by useLayoutEffect (opacity:0, y:100px).
         Each card animates translateY 100px→0 + fade as it enters.
         ═══════════════════════════════════════════════════════════ */
      const cards = document.querySelectorAll<HTMLElement>("#products .product-card");
      if (cards.length > 0) {
        cards.forEach((c) => {
          c.style.transition = "";
          const tw = gsap.to(c, {
            y: 0, opacity: 1,
            duration: 0.85, ease: "power2.out",
            scrollTrigger: { trigger: c, start: "top 88%", once: true },
          });
          kills.push(() => tw.kill());
        });
      }

      await new Promise<void>((r) => setTimeout(r, 100));
      ScrollTrigger.refresh();
    };

    init();
    return () => kills.forEach((fn) => fn());
  }, []);

  /* ── Brand snap-sequence: IO animations + exit handler ──────────── */
  useEffect(() => {
    const snap       = snapRef.current;
    const step1Text  = snapStep1TextRef.current;
    const beigePanel = snapBeigePanelRef.current;
    const svcEl      = snapServicesRef.current;
    if (!snap || !step1Text || !beigePanel) return;

    /* ── Step 1 text: hidden initially, fades in via IO ── */
    step1Text.style.opacity    = "0";
    step1Text.style.transform  = "translateY(30px)";
    step1Text.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)";

    /* ── Step 2 beige panel: starts off-screen right ── */
    beigePanel.style.transform  = "translateX(100%)";
    beigePanel.style.transition = "transform 0.8s cubic-bezier(0.76,0,0.24,1)";

    /* ── Step 2 philosophy items: hidden initially ── */
    const philItems = beigePanel.querySelectorAll<HTMLElement>(".snap-phil-item");
    philItems.forEach((el) => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(24px)";
    });

    /* ── IO: Step 1 text ── */
    const io1 = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      step1Text.style.opacity   = "1";
      step1Text.style.transform = "translateY(0)";
      io1.disconnect();
    }, { threshold: 0.3 });
    io1.observe(step1Text);

    /* ── IO: Step 2 — trigger beige slide-in + staggered items ── */
    const step2El = beigePanel.parentElement;
    if (step2El) {
      const io2 = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        /* slide panel in */
        beigePanel.style.transform = "translateX(0)";
        /* stagger philosophy items after panel starts sliding */
        philItems.forEach((el, i) => {
          el.style.transition = `opacity 0.6s ease ${350 + i * 150}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${350 + i * 150}ms`;
          el.style.opacity    = "1";
          el.style.transform  = "translateY(0)";
        });
        io2.disconnect();
      }, { threshold: 0.35 });
      io2.observe(step2El);
    }

    /* ── Exit: wheel-down at last snap step → services ── */
    const onWheel = (e: WheelEvent) => {
      if (!svcEl || e.deltaY <= 30) return;
      const atEnd = snap.scrollTop >= snap.scrollHeight - snap.clientHeight - 8;
      if (!atEnd) return;
      e.preventDefault();
      const top = svcEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    };
    snap.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      io1.disconnect();
      snap.removeEventListener("wheel", onWheel);
    };
  }, []);

  /* ── Services snap: IO animations ───────────────────────────── */
  useEffect(() => {
    const animTargets: [React.RefObject<HTMLDivElement | null>, string, string][] = [
      [svcTitleRef,  "translateY(40px)", "translateY(0)"],
      [svcPlanRef,   "translateY(40px)", "translateY(0)"],
      [svcEsvcRef,   "translateY(-40px)", "translateY(0)"],
    ];
    const observers: IntersectionObserver[] = [];
    animTargets.forEach(([ref, fromTrans, toTrans]) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity    = "0";
      el.style.transform  = fromTrans;
      el.style.transition = "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity   = "1";
        el.style.transform = toTrans;
        io.disconnect();
      }, { threshold: 0.25 });
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
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
        @keyframes v1-scrollbar { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
        @keyframes v1-word-in   { from{opacity:0;transform:translateY(110%)} to{opacity:1;transform:translateY(0)} }
        @keyframes v1-bounce    { 0%,100%{transform:translateY(0) rotate(90deg)} 50%{transform:translateY(5px) rotate(90deg)} }

        .v1-scrollbar  { animation: v1-scrollbar 2.2s cubic-bezier(0.4,0,0.2,1) infinite; }
        .v1-bounce-txt { animation: v1-bounce 1.8s ease-in-out infinite; display:inline-block; }
        .v1-word       { display:inline-block; animation: v1-word-in 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        .product-card { transition: box-shadow 0.55s ease; }
        .product-card:hover { box-shadow: 0 28px 64px rgba(0,0,0,0.12); }
        .product-card:hover .product-img { transform: scale(1.06); }
        .product-card .card-text { transition: transform 0.5s cubic-bezier(0.25,1,0.5,1); }
        .product-card:hover .card-text { transform: translateY(-4px); }

        .value-row:hover .value-num { color: #18181b; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          HERO + BRAND TRANSITION
          Outer 400vh container provides scroll space.
          Inner 100vh sticky section holds all animation layers.
          ScrollTrigger scrubs the GSAP timeline through 3 phases.
      ══════════════════════════════════════════════════════════════ */}
      <div ref={transitionOuterRef} style={{ position: "relative", zIndex: 10 }}>
        <div style={{ height: "400vh" }}>
          <section
            ref={heroPinRef}
            style={{
              position: "sticky", top: 0,
              height: "100vh", minHeight: 600,
              overflow: "hidden",
              backgroundColor: "#09090b",
            }}
          >
            {/* ── Layer A: Hero background image (scale 1 → 0.85) ── */}
            <div
              ref={heroLayerRef}
              style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "center" }}
            >
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

            {/* ── Layer B: Masonry grid of 9 images (phase 1) ── */}
            <div
              ref={gridLayerRef}
              style={{ position: "absolute", inset: 0, zIndex: 2 }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.9fr 0.95fr",
                gridTemplateRows: "repeat(10, 1fr)",
                height: "100%",
                gap: "22px",
                padding: "22px",
              }}>
                {/* col 1, rows 1-5 — tall portrait */}
                <img ref={g1Ref} src={`${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`} alt="blum 01" style={{ gridColumn: "1", gridRow: "1 / 6", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 2, rows 1-3 — medium portrait */}
                <img ref={g2Ref} src={`${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`} alt="blum 02" style={{ gridColumn: "2", gridRow: "1 / 4", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, rows 1-4 — taller portrait */}
                <img ref={g3Ref} src={`${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`} alt="blum 03" style={{ gridColumn: "3", gridRow: "1 / 5", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 2, rows 4-7 — medium */}
                <img ref={g4Ref} src={`${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`} alt="blum 04" style={{ gridColumn: "2", gridRow: "4 / 8", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, rows 5-7 — medium */}
                <img ref={g5Ref} src={`${BASE}/images/560/258/4207901/corporate/media/bilder/produkte/klappensysteme/aventos-top/kla1119_mc_4:3.jpg`} alt="blum 05" style={{ gridColumn: "3", gridRow: "5 / 8", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 1, rows 6-10 — tall portrait */}
                <img ref={g6Ref} src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`} alt="blum 06" style={{ gridColumn: "1", gridRow: "6 / 11", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 2, rows 8-10 — bottom middle */}
                <img ref={g7Ref} src={`${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`} alt="blum 07" style={{ gridColumn: "2", gridRow: "8 / 11", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, rows 8-9 — small */}
                <img ref={g8Ref} src={`${BASE}/images/560/258/4207766/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96565125_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`} alt="blum 08" style={{ gridColumn: "3", gridRow: "8 / 10", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, row 10 — small */}
                <img ref={g9Ref} src={`${BASE}/images/560/258/4215892/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`} alt="blum 09" style={{ gridColumn: "3", gridRow: "10 / 11", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>

            {/* ── Layer C: Spotlight — g1 image, expands from grid cell → fullscreen ── */}
            {/* GSAP animates top/left/width/height from g1's bounding rect to 0/0/100%/100% */}
            <div
              ref={spotlightRef}
              style={{ position: "absolute", zIndex: 3, overflow: "hidden" }}
            >
              <img
                src={`${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
                alt="blum factory"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#1a1a1a"; }}
              />
              {/* Dark overlay fades in as spotlight expands */}
              <div ref={spotlightOverRef} style={{ position: "absolute", inset: 0, backgroundColor: "#000000" }} />
            </div>

            {/* ── Layer D: Text overlay (phase 3) ── */}
            <div
              ref={aboutLayerRef}
              style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", alignItems: "center" }}
            >
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

            {/* ── "moving / ideas." hero text (fades out in phase 1) ── */}
            <div
              ref={heroTextRef}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5 }}
              className="max-w-7xl mx-auto px-8 pb-20 w-full"
            >
              <h1 className="text-white select-none" style={{
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                fontWeight: 200,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}>
                <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}>
                  <span className="v1-word" style={{ animationDelay: "220ms" }}>moving</span>
                </span>
                <br />
                <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}>
                  <span className="v1-word" style={{ color: "rgba(161,161,170,0.85)", fontStyle: "italic", animationDelay: "380ms" }}>ideas.</span>
                </span>
              </h1>
            </div>

            {/* ── Scroll indicator ── */}
            <div ref={scrollIndicRef} className="absolute bottom-8 right-8 flex flex-col items-center gap-3" style={{ zIndex: 5 }}>
              <span className="v1-bounce-txt text-[8px] tracking-[0.4em] uppercase text-white/25 origin-center mb-2" style={{ writingMode: "vertical-rl" }}>scroll</span>
              <div className="w-px h-14 relative overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                <div className="w-full bg-white/50 absolute top-0 v1-scrollbar" style={{ height: "45%" }} />
              </div>
            </div>

          </section>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — ALL REMAINING CONTENT
          position: relative + z-index: 30 ensures this block renders
          on top of both sticky sections as it scrolls into view.
          overflow-x: hidden is safe here (not an ancestor of sticky).
      ══════════════════════════════════════════════════════════════ */}
      {/*
        overflow-x: hidden을 이 wrapper에 두면 overflow-y가 auto로 강제되어
        새 스크롤 컨테이너가 생성되고 position: sticky 가 동작하지 않는다.
        대신 overflow-x 클리핑이 필요한 각 섹션에 직접 적용한다.
      */}
      <div style={{ position: "relative", zIndex: 30, backgroundColor: "#ffffff" }}>

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
        {/* GSAP: dividerImgRef (scaling wrapper) scale 0.6→1, then text reveal */}
        <div ref={dividerWrapRef}>
          <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 600px)", overflow: "hidden" }}>
            {/* Scaling wrapper — image + gradient scale together */}
            <div ref={dividerImgRef} style={{ position: "absolute", inset: 0, transformOrigin: "center", willChange: "transform" }}>
              <img
                src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
                alt="blum workspace"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 50%)" }} />
            </div>
            {/* Text layer — NOT scaled, reveals after image */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-8 w-full">
                <p ref={dividerLblRef} className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">Since 1952</p>
                <p ref={dividerTxtRef} className="text-2xl md:text-4xl font-extralight text-zinc-900 leading-snug max-w-xs" style={{ letterSpacing: "-0.01em" }}>
                  오스트리아 정밀<br />제조의 전통
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── PRODUCTS ── */}
        {/*
          Outer layout uses flexbox (not CSS "grid" class) so
          BlumGSAP's "section .grid > div" selector doesn't
          accidentally grab the left-column sticky header.
        */}
        <section id="products" className="py-28 md:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            {/*
              Mobile: flex-col (normal flow)
              Desktop: flex-row with sticky left sidebar
              부모에 overflow 없음 → position: sticky 정상 동작
            */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "4rem" }}
                 className="flex-col md:flex-row">

              {/* Left — sticky sidebar: 스크롤 내려도 화면에 고정 */}
              <div
                className="hidden md:block"
                style={{
                  width: "35%",
                  flexShrink: 0,
                  position: "sticky",
                  top: "30vh",
                  height: "fit-content",
                  alignSelf: "flex-start",
                }}
              >
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

              {/* Mobile only: left header (normal flow) */}
              <div className="block md:hidden mb-12">
                <SlideLeft>
                  <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-4">Product Lines</p>
                  <h2 className="text-3xl font-extralight mb-4" style={{ letterSpacing: "-0.02em" }}>
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

              {/* Right — product cards (일반 스크롤, GSAP 개별 애니메이션) */}
              <div style={{ width: "65%", minWidth: 0 }} className="w-full md:w-auto">
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

        {/* ══════════════════════════════════════════════════════════════
            BRAND SNAP SEQUENCE  (CSS scroll-snap, 2 × 100vh)
            Step 1: fullscreen image + text overlay (IO fade-in)
            Step 2: image left 50% + beige panel right 50% slides in
            Exit:   wheel-down at last snap → services section
        ══════════════════════════════════════════════════════════════ */}
        <div
          ref={snapRef}
          style={{
            height: "100vh",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            scrollbarWidth: "none",
          } as React.CSSProperties}
          className="[&::-webkit-scrollbar]:hidden"
        >

          {/* ── Step 1: fullscreen image + text overlay ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <img
              src={`${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`}
              alt="blum showcase"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9,9,11,0.68) 0%, rgba(9,9,11,0.18) 65%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
              <div ref={snapStep1TextRef} className="max-w-7xl mx-auto px-8 pb-16 w-full">
                <p className="text-[9px] tracking-[0.45em] uppercase text-white/40 mb-4">Brand Showcase</p>
                <p className="text-white font-extralight leading-tight" style={{ fontSize: "clamp(2rem,5vw,4.5rem)", letterSpacing: "-0.02em" }}>
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

          {/* ── Step 2: fullscreen beige panel slides in from right ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", position: "relative", overflow: "hidden", flexShrink: 0 }}>
            {/* Beige panel: covers full screen, slides in from right */}
            <div
              ref={snapBeigePanelRef}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#F5F0E8",
                overflowY: "auto",
                scrollbarWidth: "none",
              } as React.CSSProperties}
              className="[&::-webkit-scrollbar]:hidden"
            >
              <div className="px-12 py-20">
                <p className="snap-phil-item text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">Our Philosophy</p>
                <h2 className="snap-phil-item text-3xl md:text-4xl font-extralight mb-5" style={{ letterSpacing: "-0.02em" }}>
                  blum이 추구하는 것
                </h2>
                <div className="snap-phil-item w-10 h-px bg-zinc-300 mb-6" />
                {VALUES.map((v, i) => (
                  <div
                    key={v.num}
                    className="snap-phil-item value-row border-t border-zinc-200 group cursor-pointer"
                    onClick={() => setOpenValue(openValue === i ? null : i)}
                  >
                    <div className="py-6 grid grid-cols-12 gap-4 items-start">
                      <span className="col-span-2 text-[9px] text-zinc-300 tracking-widest transition-colors group-hover:text-zinc-500 mt-1">{v.num}</span>
                      <div className="col-span-8">
                        <h3 className="text-lg md:text-xl font-light text-zinc-700 group-hover:text-zinc-500 transition-colors">{v.title}</h3>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-zinc-300 text-sm group-hover:text-zinc-500 transition-colors inline-block">{openValue === i ? "−" : "+"}</span>
                      </div>
                    </div>
                    <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: openValue === i ? "200px" : "0px", opacity: openValue === i ? 1 : 0 }}>
                      <p className="text-sm text-zinc-500 leading-relaxed pb-6 pl-8" style={{ fontWeight: 300 }}>{v.body}</p>
                    </div>
                  </div>
                ))}
                <div className="snap-phil-item border-t border-zinc-200" />
              </div>
            </div>
          </div>

        </div>{/* end snap container */}

        {/* ══════════════════════════════════════════════════════════════
            SERVICES SNAP SEQUENCE  (CSS scroll-snap, 5 × 100vh)
            Snap 1: 서비스 제목 (흰 배경, IO 슬라이드 인)
            Snap 2: 계획/설계 이미지 풀스크린
            Snap 3: 계획/설계 콘텐츠 (좌: 텍스트 IO, 우: 이미지)
            Snap 4: E-Services 이미지 풀스크린
            Snap 5: E-Services 콘텐츠 (좌: 텍스트 IO, 우: 이미지)
        ══════════════════════════════════════════════════════════════ */}
        <section
          ref={snapServicesRef}
          style={{
            height: "100vh",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            scrollbarWidth: "none",
          } as React.CSSProperties}
          className="[&::-webkit-scrollbar]:hidden"
        >

          {/* ── Snap 1: 서비스 제목 ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", display: "flex", alignItems: "center", backgroundColor: "#ffffff" }}>
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div ref={svcTitleRef}>
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-5">Services</p>
                <h2 className="font-extralight text-zinc-900 leading-tight" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.03em" }}>
                  전문 서비스<br />지원
                </h2>
                <div className="w-12 h-px bg-zinc-200 mt-8 mb-6" />
                <p className="text-sm text-zinc-400 max-w-md leading-7" style={{ fontWeight: 300 }}>
                  계획·설계부터 디지털 서비스까지,<br />blum의 전문 서비스가 함께합니다.
                </p>
              </div>
            </div>
          </div>

          {/* ── Snap 2: 계획/설계 이미지 풀스크린 ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", position: "relative", overflow: "hidden" }}>
            <img
              src={`${BASE}/images/560/336/4207488/corporate/media/bilder/services/services-overview/persoenliche-services_5:3.jpg`}
              alt="계획/설계 지원"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(9,9,11,0.08) 0%, rgba(9,9,11,0.25) 100%)" }} />
          </div>

          {/* ── Snap 3: 계획/설계 콘텐츠 ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "#ffffff" }}>
            {/* 좌: 텍스트 */}
            <div style={{ display: "flex", alignItems: "center", padding: "0 5vw" }}>
              <div ref={svcPlanRef}>
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">Plan &amp; Design</p>
                <h3 className="text-3xl md:text-4xl font-extralight text-zinc-900 mb-6" style={{ letterSpacing: "-0.02em" }}>
                  계획/설계<br />지원
                </h3>
                <div className="w-8 h-px bg-zinc-300 mb-6" />
                <p className="text-sm text-zinc-500 leading-7 mb-8 max-w-sm" style={{ fontWeight: 300 }}>
                  공간에 최적화된 blum 솔루션을 함께 설계합니다. 전문 컨설턴트가 처음부터 끝까지 함께합니다.
                </p>
                <ul className="flex flex-col gap-3">
                  {["3D 계획 도구 지원", "맞춤형 공간 설계", "전문 컨설팅 서비스", "설치 전 시뮬레이션"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-zinc-500 tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/v1/services" className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group" style={{ textDecoration: "none" }}>
                    자세히 보기
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* 우: 이미지 */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={`${BASE}/images/560/336/4207488/corporate/media/bilder/services/services-overview/persoenliche-services_5:3.jpg`}
                alt="계획/설계 지원"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`; }}
              />
            </div>
          </div>

          {/* ── Snap 4: E-Services 이미지 풀스크린 ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", position: "relative", overflow: "hidden" }}>
            <img
              src={`${BASE}/images/560/336/4214419/corporate/media/bilder/services/services-overview/digitale-services_5:3.jpg`}
              alt="E-Services"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(9,9,11,0.08) 0%, rgba(9,9,11,0.25) 100%)" }} />
          </div>

          {/* ── Snap 5: E-Services 콘텐츠 ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "#ffffff" }}>
            {/* 좌: 텍스트 */}
            <div style={{ display: "flex", alignItems: "center", padding: "0 5vw" }}>
              <div ref={svcEsvcRef}>
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">E-Services</p>
                <h3 className="text-3xl md:text-4xl font-extralight text-zinc-900 mb-6" style={{ letterSpacing: "-0.02em" }}>
                  디지털<br />서비스
                </h3>
                <div className="w-8 h-px bg-zinc-300 mb-6" />
                <p className="text-sm text-zinc-500 leading-7 mb-8 max-w-sm" style={{ fontWeight: 300 }}>
                  언제 어디서든 접근 가능한 blum의 디지털 플랫폼. 제품 선택부터 주문까지 한 곳에서 해결합니다.
                </p>
                <ul className="flex flex-col gap-3">
                  {["온라인 주문 시스템", "제품 카탈로그 다운로드", "CAD 데이터 제공", "기술 지원 채널"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-zinc-500 tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/v1/services" className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group" style={{ textDecoration: "none" }}>
                    자세히 보기
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* 우: 이미지 */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={`${BASE}/images/560/336/4214419/corporate/media/bilder/services/services-overview/digitale-services_5:3.jpg`}
                alt="E-Services"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`; }}
              />
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
