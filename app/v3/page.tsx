"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Constants ── */
const NAVY  = "#0D1117";
const GOLD  = "#D4AF37";
const CREAM = "#F5F0E8";
const GRAY  = "rgba(245,240,232,0.55)";
const LINE  = "rgba(212,175,55,0.18)";

/* ──────────────────────────────────────────────────────────────────────────
   Blum official image URLs
   Source: crawled from https://www.blum.com/kr/ko/ and /products/product-world/
   ────────────────────────────────────────────────────────────────────────── */
const IMG = {
  /* hero */
  hero:       "https://www.blum.com/images/560/258/4215892/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg",

  /* Brand Story slides */
  slide1:     "https://www.blum.com/images/560/420/4215882/corporate/media/bilder/unternehmen/190523_ARNO_Blum_Interzum_0194_4:3.jpg",
  slide2:     "https://www.blum.com/images/560/258/4188512/corporate/media/bilder/unternehmen/IMG1146_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg",
  slide3:     "https://www.blum.com/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg",

  /* stats / company background */
  statsBg:    "https://www.blum.com/images/560/258/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg",

  /* AVENTOS – lift systems */
  aventos:    "https://www.blum.com/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
  aventos2:   "https://www.blum.com/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg",

  /* LEGRABOX – box systems */
  legrabox:   "https://www.blum.com/images/560/258/4215299/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
  legrabox2:  "https://www.blum.com/images/560/258/4173336/corporate/media/bilder/produkte/boxsysteme/BOX1856_AA_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",

  /* CLIP top – hinge systems */
  hinge:      "https://www.blum.com/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",
  hinge2:     "https://www.blum.com/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",

  /* TIP-ON – motion technologies */
  tipon:      "https://www.blum.com/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",
  tipon2:     "https://www.blum.com/images/560/258/4204524/corporate/media/bilder/produkte/bewegungstechnologien/blum_tip0163_aa_fot_fo_bau_-sall_-apr3_-v1_4:3.jpg",

  /* MOVENTO – runner systems */
  movento:    "https://www.blum.com/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg",
  movento2:   "https://www.blum.com/images/560/258/4214071/corporate/media/bilder/produkte/fuehrungssysteme/ME14726240_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg",
};

/* ── Brand Story slides data ── */
const SLIDES = [
  {
    label: "BRAND STORY · SINCE 1952",
    title: "moving ideas.",
    body:  "편리함을 높이고 삶의 질을 향상시키는 고품질 가구용 피팅. Julius Blum GmbH는 오스트리아 포어알베르크에서 시작해 세계 최고의 가구 피팅 제조업체 중 하나로 성장했습니다.",
    img:   IMG.slide1,
  },
  {
    label: "INNOVATION · BLUMOTION",
    title: "끊임없는 혁신",
    body:  "BLUMOTION, CLIP top, LEGRABOX, TIP-ON — 가구의 열고 닫음을 매력적인 경험으로 만들어 드립니다. blum의 moving ideas.",
    img:   IMG.slide2,
  },
  {
    label: "GLOBAL LEADERSHIP",
    title: "글로벌 리더십",
    body:  "€2,441M 매출, 9,850명 임직원, 120개국 수출, 34개 자회사·대리점. 3대째 가족 경영으로 신뢰와 혁신을 이어가고 있습니다.",
    img:   IMG.slide3,
  },
];

/* ── Products data (confirmed images from blum.com crawl) ── */
const PRODUCTS = [
  {
    num:  "01",
    name: "AVENTOS",
    cat:  "리프트 시스템",
    desc: "가구와 완벽하게 하나가 되어 고품질 가구 디자인을 완성. HKi · HF top · HS top · HL top · HK top · HK-S · HK-XS",
    img:  IMG.aventos,
    img2: IMG.aventos2,
  },
  {
    num:  "02",
    name: "LEGRABOX",
    cat:  "박스 시스템",
    desc: "슬림한 서랍면(12.8mm), 최대 하중 40kg 및 70kg 지지. pure · free · special edition · individual",
    img:  IMG.legrabox,
    img2: IMG.legrabox2,
  },
  {
    num:  "03",
    name: "CLIP top BLUMOTION",
    cat:  "경첩 시스템",
    desc: "댐핑 기능이 경첩 보스에 통합. 도어의 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    img:  IMG.hinge,
    img2: IMG.hinge2,
  },
  {
    num:  "04",
    name: "TIP-ON BLUMOTION",
    cat:  "모션 기술",
    desc: "기계식 열기 및 소프트 닫기. 도어, 리프트 시스템, 풀아웃에 사용 가능.",
    img:  IMG.tipon,
    img2: IMG.tipon2,
  },
  {
    num:  "05",
    name: "MOVENTO",
    cat:  "러너 시스템",
    desc: "가볍게 미끄러지는 듯한 동작 및 4차원 프런트 조정. 4가지 모션 기술 호환.",
    img:  IMG.movento,
    img2: IMG.movento2,
  },
];

/* ── Stats (fills black gap between products and philosophy) ── */
const STATS = [
  { n: 1952, s: "",    l: "창립 연도",    sub: "오스트리아 포어알베르크" },
  { n: 2441, s: "M€",  l: "전 세계 매출", sub: "2024/25 회계연도" },
  { n: 9850, s: "명",   l: "전 세계 임직원", sub: "글로벌 네트워크" },
  { n: 120,  s: "+",   l: "수출 대상국",   sub: "34개 자회사·대리점" },
];


/* ── GCounter ── */
function GCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN]   = useState(0);
  const ref          = useRef<HTMLSpanElement>(null);
  const started      = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();
      const t0 = performance.now(), dur = 2000;
      let raf: number;
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ── FadeIn ── */
function FadeIn({ children, delay = 0, y = 32 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref          = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.06 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity:    vis ? 1 : 0,
      transform:  vis ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── MaskReveal — text clip-path wipe ── */
function MaskReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref           = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} v4-mask-reveal${vis ? " v4-mask-go" : ""}`}
      style={{ animationDelay: vis ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
}

/* ── WipeBanner
   항상 3문장 GSAP ScrollTrigger — 진입 시 모임, 이탈 시 흩어짐
── */
function WipeBanner() {
  gsap.registerPlugin(ScrollTrigger);

  const ref      = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    if (!l1 || !l2 || !l3 || !ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start:   "top bottom",
          end:     "bottom top",
          scrub:   1.4,
        },
      });

      /* ① 진입: 흩어진 상태 → 모임 (0~0.35) */
      tl.fromTo(l1, { x: -320, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0)
        .fromTo(l2, { x:  320, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.03)
        .fromTo(l3, { x: -320, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 }, 0.06)
        /* ② hold: 중앙 유지 (0.35~0.65) */
        .to([l1, l2, l3], { x: 0, opacity: 1, duration: 0.3 }, 0.35)
        /* ③ 이탈: 반대 방향으로 흩어짐 (0.65~1.0) */
        .to(l1, { x:  320, opacity: 0, ease: "power2.in", duration: 0.35 }, 0.65)
        .to(l2, { x: -320, opacity: 0, ease: "power2.in", duration: 0.35 }, 0.68)
        .to(l3, { x:  320, opacity: 0, ease: "power2.in", duration: 0.35 }, 0.71);
    }, ref);

    return () => ctx.revert();
  }, []);

  const lineStyle: React.CSSProperties = {
    display: "block", willChange: "transform",
    fontSize: "clamp(1.6rem,4vw,3.2rem)", fontWeight: 300,
    color: CREAM, fontStyle: "italic", lineHeight: 1.55,
  };

  return (
    <div ref={ref} style={{ backgroundColor: "#0A0E14", padding: "100px 2rem", textAlign: "center", overflow: "hidden" }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "28px" }}>Our Philosophy</p>
      <div className="v4-font-serif" style={{ maxWidth: "760px", margin: "0 auto 36px" }}>
        <div ref={line1Ref} style={lineStyle}>"가구의 열고 닫음을</div>
        <div ref={line2Ref} style={lineStyle}>매력적인 경험으로</div>
        <div ref={line3Ref} style={lineStyle}>만들어 드립니다."</div>
      </div>
      <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}66` }}>Julius Blum GmbH · Since 1952</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function V4() {
  /* Loading — sessionStorage로 첫 진입 시에만 표시 */
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem("v4seen") === "1";
  const [loaded,   setLoaded]   = useState(alreadySeen);
  const [loadOut,  setLoadOut]  = useState(alreadySeen);
  const [heroAnim, setHeroAnim] = useState(alreadySeen);

  /* Nav */
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [scrollY,     setScrollY]     = useState(0);

  /* ── FIX 1: Brand Story – pure React state slideshow, no scroll math ── */
  const [slideIdx,    setSlideIdx]    = useState(0);
  const slideTimer                    = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Products – drag carousel ── */
  const CARD_W = 560 + 24; // card width + gap
  const [prodIdx,     setProdIdx]     = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const carouselRef                   = useRef<HTMLDivElement>(null);
  const dragStart                     = useRef<{ x: number; scrollLeft: number } | null>(null);
  const touchStart                    = useRef<{ x: number; scrollLeft: number } | null>(null);
  const isDragging                    = useRef(false);
  const dragVelocity                  = useRef(0);
  const lastDragX                     = useRef(0);
  const dragRaf                       = useRef<number | null>(null);
  const prodTimer                     = useRef<ReturnType<typeof setInterval> | null>(null);

  /* closeMenu with exit animation */
  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 400);
  };

  /* Loading timers — 첫 진입 시에만 */
  useEffect(() => {
    if (alreadySeen) return;
    sessionStorage.setItem("v4seen", "1");
    const t1 = setTimeout(() => setLoaded(true),  2400);
    const t2 = setTimeout(() => setLoadOut(true), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Hero animation after loading screen */
  useEffect(() => {
    if (!loadOut) return;
    const t = setTimeout(() => setHeroAnim(true), 80);
    return () => clearTimeout(t);
  }, [loadOut]);

  /* Global scroll — nav + hero parallax only */
  useEffect(() => {
    const fn = () => { setScrollY(window.scrollY); setNavScrolled(window.scrollY > 60); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── FIX 1: Brand Story auto-advance every 5 s ── */
  const resetSlideTimer = useCallback(() => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => {
      setSlideIdx(i => (i + 1) % SLIDES.length);
    }, 2500);
  }, []);

  useEffect(() => {
    resetSlideTimer();
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, [resetSlideTimer]);

  const goToSlide = (idx: number) => {
    setSlideIdx(idx);
    resetSlideTimer();
  };

  /* ── Product carousel: auto-advance + scroll helper ── */
  const resetProdTimer = useCallback(() => {
    if (prodTimer.current) clearInterval(prodTimer.current);
    prodTimer.current = setInterval(() => {
      setProdIdx(prev => {
        const next = (prev + 1) % PRODUCTS.length;
        carouselRef.current?.scrollTo({ left: next * (560 + 24), behavior: "smooth" });
        return next;
      });
    }, 2000);
  }, []);

  useEffect(() => {
    resetProdTimer();
    return () => { if (prodTimer.current) clearInterval(prodTimer.current); };
  }, [resetProdTimer]);

  const scrollToCard = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(PRODUCTS.length - 1, idx));
    setProdIdx(clamped);
    carouselRef.current?.scrollTo({ left: clamped * (560 + 24), behavior: "smooth" });
    resetProdTimer();
  }, [resetProdTimer]);


  const heroParallax = scrollY * 0.26;
  const heroOpacity  = Math.max(0, 1 - scrollY / 700);

  /* ── CSS ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

    @keyframes v4-load-char { from{opacity:0;transform:translateY(40px) scaleY(1.15)} to{opacity:1;transform:none} }
    @keyframes v4-load-out  { to{transform:translateY(-100%);opacity:0} }
    @keyframes v4-load-up   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
    @keyframes v4-ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes v4-scrollbar { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
    @keyframes v4-wipe-in   { 0%{transform:scaleX(0);transform-origin:left} 50%{transform:scaleX(1);transform-origin:left} 51%{transform:scaleX(1);transform-origin:right} 100%{transform:scaleX(0);transform-origin:right} }
    @keyframes v4-progress  { from{width:0%} to{width:100%} }
    @keyframes v4-dot-pulse { 0%,100%{box-shadow:0 0 0 0 ${GOLD}55} 50%{box-shadow:0 0 0 6px ${GOLD}00} }
    @keyframes v4-word-in   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
    @keyframes v4-img-in    { from{opacity:0;transform:scale(1.04)} to{opacity:0.34;transform:scale(1)} }
    @keyframes v4-mask-in    { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
    @keyframes v4-line-grow  { from{transform:scaleX(0);transform-origin:left} to{transform:scaleX(1);transform-origin:left} }
    @keyframes v4-count-up   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
    @keyframes v4-slide-left { from{opacity:0;transform:translateX(-56px)} to{opacity:1;transform:none} }
    @keyframes v4-slide-right{ from{opacity:0;transform:translateX(56px)}  to{opacity:1;transform:none} }
    @keyframes v4-text-line  { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:none} }
    @keyframes v4-num-in     { from{opacity:0;transform:translateY(32px) scaleY(1.1)} to{opacity:1;transform:none} }

    .v4-font-serif { font-family:'Cormorant Garamond','Georgia',serif; }
    .v4-font-sans  { font-family:'Helvetica Neue',Arial,sans-serif; }

    .v4-load-char { display:inline-block; animation:v4-load-char 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4-load-sub  { animation:v4-load-up 1s cubic-bezier(0.16,1,0.3,1) 1.4s both; opacity:0; }
    .v4-load-out  { animation:v4-load-out 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
    .v4-progress  { animation:v4-progress 2.2s cubic-bezier(0.4,0,0.2,1) 0.5s forwards; width:0%; }
    .v4-ticker    { animation:v4-ticker 36s linear infinite; }
    .v4-scrollbar { animation:v4-scrollbar 2.5s cubic-bezier(0.4,0,0.2,1) infinite; }

    .v4-wipe-section { position:relative; overflow:hidden; }
    .v4-wipe-cover   { position:absolute;inset:0;background:${GOLD};z-index:20;transform:scaleX(0);pointer-events:none; }
    .v4-wipe-section.v4-wipe-go .v4-wipe-cover { animation:v4-wipe-in 1s cubic-bezier(0.77,0,0.18,1) both; }
    .v4-wipe-content { opacity:1; }

    .v4-btn { transition:all 0.35s cubic-bezier(0.25,1,0.5,1); display:inline-flex; align-items:center; }
    .v4-btn:hover { transform:translateY(-3px); }
    .v4-nav-link { transition:color 0.2s ease; }
    .v4-nav-link:hover { color:${GOLD} !important; }

    /* Slide image cross-fade */
    .v4-slide-img { position:absolute;inset:0;transition:opacity 0.45s ease; }
    .v4-slide-img.active { opacity:1; }
    .v4-slide-img.inactive { opacity:0; }
    .v4-slide-img img { width:100%;height:100%;object-fit:cover; }

    /* Slide text panel */
    .v4-slide-panel { position:absolute;left:8%;top:50%;max-width:600px;transition:all 0.4s cubic-bezier(0.16,1,0.3,1); }
    .v4-slide-panel.active { opacity:1;transform:translateY(-50%); }
    .v4-slide-panel.above  { opacity:0;transform:translateY(calc(-50% - 70px)); }
    .v4-slide-panel.below  { opacity:0;transform:translateY(calc(-50% + 70px)); }

    /* Chapter word animation */
    .v4-ch-word { display:inline-block;opacity:0; }
    .v4-ch-word.show { animation:v4-word-in 0.6s cubic-bezier(0.16,1,0.3,1) both; }

    /* Dot */
    .v4-dot-active { animation:v4-dot-pulse 2s ease infinite; }

    /* Drag carousel */
    .v4-carousel-track {
      display:flex; cursor:grab; user-select:none;
      -webkit-user-select:none; scrollbar-width:none;
    }
    .v4-carousel-track::-webkit-scrollbar { display:none; }
    .v4-carousel-track.dragging { cursor:grabbing; }
    .v4-carousel-card { flex-shrink:0; }

    /* Stats card hover */
    .v4-stat-card { transition:background 0.3s ease; }
    .v4-stat-card:hover { background:rgba(212,175,55,0.07) !important; }

    /* Values panel */
    .v4-val-panel { overflow:hidden; }
    .v4-val-img-wrap { overflow:hidden; transition:transform 0.6s ease; }
    .v4-val-panel:hover .v4-val-img { transform:scale(1.06) !important; }
    .v4-val-img { transition:transform 0.9s cubic-bezier(0.25,1,0.5,1); }
    .v4-val-text-block { transition:transform 0.5s cubic-bezier(0.25,1,0.5,1); }
    .v4-val-panel:hover .v4-val-text-block { transform:translateY(-6px); }

    /* Text mask reveal */
    .v4-mask-reveal { clip-path:inset(0 100% 0 0); }
    .v4-mask-reveal.v4-mask-go { animation:v4-mask-in 1s cubic-bezier(0.77,0,0.18,1) both; }

    /* Gold line grow */
    .v4-line-anim { transform:scaleX(0);transform-origin:left; }
    .v4-line-anim.v4-line-go { animation:v4-line-grow 0.9s cubic-bezier(0.77,0,0.18,1) both; }

    @keyframes v4-menu-in  { from{transform:translateY(-100%)} to{transform:translateY(0)} }
    @keyframes v4-menu-out { from{transform:translateY(0)} to{transform:translateY(-100%)} }
    @keyframes v4-menu-item-in { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

    .v4-hamburger { display:none; background:none; border:none; color:${CREAM}; font-size:22px; cursor:pointer; padding:4px 8px; line-height:1; }
    .v4-mobile-menu { position:fixed; inset:0; background:#0a0e1a; z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:36px; overflow:hidden; }
    .v4-mobile-menu.v4-menu-opening { animation:v4-menu-in 0.4s ease-out forwards; }
    .v4-mobile-menu.v4-menu-closing { animation:v4-menu-out 0.4s ease-in forwards; }
    .v4-mobile-menu-link { color:#c9a84c; text-decoration:none; font-size:28px; letter-spacing:0.2em; text-transform:uppercase; font-family:'Cormorant Garamond',Georgia,serif; font-weight:300; opacity:0; }
    .v4-mobile-menu.v4-menu-opening .v4-mobile-menu-link { animation:v4-menu-item-in 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    .v4-mobile-menu.v4-menu-opening .v4-mobile-menu-link:nth-child(2) { animation-delay:0.12s; }
    .v4-mobile-menu.v4-menu-opening .v4-mobile-menu-link:nth-child(3) { animation-delay:0.20s; }
    .v4-mobile-menu.v4-menu-opening .v4-mobile-menu-link:nth-child(4) { animation-delay:0.28s; }
    .v4-mobile-menu.v4-menu-opening .v4-mobile-menu-link:nth-child(5) { animation-delay:0.36s; }
    .v4-mobile-close { position:absolute; top:20px; right:24px; background:none; border:none; color:#c9a84c; font-size:28px; cursor:pointer; line-height:1; }

    @media (max-width:768px) {
      .v4-nav-desktop { display:none !important; }
      .v4-hamburger   { display:block !important; }
      .v4-prod-panel  { flex-direction:column !important; }
      .v4-prod-right  { width:100% !important; height:45vh !important; }
      .v4-prod-left   { width:100% !important; padding:24px !important; }
      .v4-stats-grid  { grid-template-columns:1fr !important; gap:16px !important; background:none !important; }
      .v4-stat-card   { border:1px solid #c9a84c !important; padding:24px !important; }
      .v4-stat-card .v4-font-serif { font-size:3rem !important; }
      .v4-slide-panel { left:5% !important; right:5% !important; max-width:none !important; }
      .v4-slide-body  { text-align:left; }
      .v4-carousel-card { width: calc(100vw - 48px) !important; }
      .v4-carousel-track { padding-left: 24px !important; padding-right: 24px !important; }
      .v4-prod-desc   { text-align:left !important; white-space:normal !important; overflow:visible !important; text-overflow:clip !important; }
    }
  `;

  /* ── RENDER ── */
  return (
    <div className="v4-font-sans" style={{ backgroundColor: NAVY, color: CREAM, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ LOADING ══════════════════════════════════════════════════════ */}
      {!loadOut && (
        <div className={loaded ? "v4-load-out" : ""} style={{
          position: "fixed", inset: 0, zIndex: 200, backgroundColor: NAVY,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px",
        }}>
          <div className="v4-font-serif" style={{ fontSize: "clamp(3.5rem,12vw,7rem)", fontWeight: 300, letterSpacing: "0.18em", color: GOLD }}>
            {"blum".split("").map((ch, i) => (
              <span key={i} className="v4-load-char" style={{ animationDelay: `${i * 120}ms` }}>{ch}</span>
            ))}
          </div>
          <div className="v4-load-sub" style={{ fontSize: "10px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${CREAM}55` }}>
            moving ideas · since 1952
          </div>
          <div style={{ width: "140px", height: "1px", backgroundColor: `${GOLD}22`, marginTop: "8px", overflow: "hidden" }}>
            <div className="v4-progress" style={{ height: "100%", backgroundColor: GOLD }} />
          </div>
        </div>
      )}

      {/* ══ NAV ═════════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "64px",
        backgroundColor: navScrolled ? "rgba(13,17,23,0.96)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? `1px solid ${LINE}` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/v3" className="v4-font-serif" style={{ color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>blum</Link>
          <div className="v4-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([["제품", "#products"], ["가치", "/v3/values"], ["서비스", "/v3/services"], ["Contact Us", "/v3/contact"]] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="v4-nav-link" style={{ color: GRAY, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</Link>
            ))}
          </div>
          <button className="v4-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="메뉴 열기">☰</button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ═════════════════════════════════════════════════ */}
      {menuOpen && (
        <div className={`v4-mobile-menu ${menuClosing ? "v4-menu-closing" : "v4-menu-opening"}`}>
          <button className="v4-mobile-close" onClick={closeMenu} aria-label="메뉴 닫기">✕</button>
          {([["제품", "#products"], ["가치", "/v3/values"], ["서비스", "/v3/services"], ["Contact Us", "/v3/contact"]] as [string, string][]).map(([label, href]) => (
            <Link key={label} href={href} className="v4-mobile-menu-link" onClick={closeMenu}>{label}</Link>
          ))}
        </div>
      )}

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", alignItems: "flex-end", overflow: "hidden", backgroundColor: NAVY }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.hero} alt="blum"
            style={{ width: "100%", height: "115%", objectFit: "cover", opacity: 0.38, transform: `translateY(${heroParallax}px)`, willChange: "transform" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${NAVY} 16%, rgba(13,17,23,0.5) 55%, rgba(13,17,23,0.1) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,17,23,0.82) 0%, transparent 65%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 7rem", width: "100%", opacity: heroOpacity, willChange: "opacity", transform: "translateZ(0)" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem",
            opacity: heroAnim ? 1 : 0, transition: "opacity 0.8s ease 0ms",
          }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: GOLD, opacity: 0.5 }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: GRAY }}>Premium Furniture Fittings · Austria · Since 1952</span>
          </div>

          <h1 className="v4-font-serif" style={{ marginBottom: "1.5rem", lineHeight: 0.88, fontWeight: 300, fontSize: "clamp(4.5rem,13vw,11rem)", letterSpacing: "-0.01em" }}>
            <span style={{
              color: CREAM, display: "block",
              opacity: heroAnim ? 1 : 0, transform: heroAnim ? "translateZ(0)" : "translateX(80px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 150ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 150ms",
              willChange: "transform, opacity", backfaceVisibility: "hidden",
            }}>moving</span>
            <span style={{
              color: GOLD, fontStyle: "italic", display: "block",
              opacity: heroAnim ? 1 : 0, transform: heroAnim ? "translateZ(0)" : "translateX(-80px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 320ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 320ms",
              willChange: "transform, opacity", backfaceVisibility: "hidden",
            }}>ideas.</span>
          </h1>

          <p style={{
            color: GRAY, fontSize: "14px", lineHeight: 2, fontWeight: 300, maxWidth: "380px", marginBottom: "2.5rem",
            opacity: heroAnim ? 1 : 0, transform: heroAnim ? "none" : "translateY(20px)",
            transition: "opacity 0.8s ease 500ms, transform 0.8s ease 500ms",
          }}>편리함을 높이고 삶의 질을 향상시키는<br />고품질 가구용 피팅</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { href: "#products",    label: "제품 살펴보기 →", filled: true,  delay: "680ms" },
              { href: "/v3/values",  label: "핵심 가치",       filled: false, delay: "800ms" },
            ].map(({ href, label, filled, delay }) => (
              <Link key={label} href={href} className="v4-btn" style={{
                color: filled ? NAVY : CREAM,
                backgroundColor: filled ? GOLD : "transparent",
                border: filled ? "none" : `1px solid ${LINE}`,
                textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 30px", gap: "8px",
                opacity: heroAnim ? 1 : 0, transform: heroAnim ? "none" : "translateY(16px)",
                transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
              }}>{label}</Link>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 10 }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: GRAY, writingMode: "vertical-rl" }}>scroll</span>
          <div style={{ width: "1px", height: "56px", backgroundColor: `${GOLD}22`, position: "relative", overflow: "hidden" }}>
            <div className="v4-scrollbar" style={{ width: "100%", height: "45%", backgroundColor: `${GOLD}aa`, position: "absolute", top: 0 }} />
          </div>
        </div>
      </section>

      {/* ══ TICKER ══════════════════════════════════════════════════════ */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, padding: "11px 0", backgroundColor: NAVY }}>
        <div className="v4-ticker" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: `${GOLD}55`, paddingRight: "64px" }}>
              CLIP top · AVENTOS · LEGRABOX · TIP-ON · MOVENTO · BLUMOTION · SINCE 1952 · AUSTRIA ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          FIX 1: BRAND STORY — pure React state slideshow
          도트 클릭 시 setSlideIdx() 직접 호출, 스크롤 계산 없음
          검은 화면 원인: offsetTop 기반 스크롤 오류 → 완전 제거
          ══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "640px", backgroundColor: NAVY, overflow: "hidden" }}>
        {/* Background images — cross-fade via opacity */}
        {SLIDES.map((sl, i) => (
          <div key={i} className={`v4-slide-img ${slideIdx === i ? "active" : "inactive"}`}
            style={{ zIndex: 0 }}>
            {/* dark overlay first so it's always readable */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${NAVY} 36%, transparent 100%)`, zIndex: 1 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${NAVY} 0%, transparent 55%)`, zIndex: 1 }} />
            <img src={sl.img} alt={sl.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.34 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
        ))}

        {/* Text panels — absolutely positioned, CSS class controls visibility */}
        {SLIDES.map((sl, i) => {
          const state = slideIdx === i ? "active" : slideIdx > i ? "above" : "below";
          return (
            <div key={i} className={`v4-slide-panel ${state}`} style={{ zIndex: 2 }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "22px" }}>{sl.label}</p>
              <h2 className="v4-font-serif" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 300, color: CREAM, lineHeight: 0.9, marginBottom: "28px", letterSpacing: "-0.01em" }}>
                {sl.title.split(" ").map((word, wi) => (
                  <span key={wi} className={`v4-ch-word${slideIdx === i ? " show" : ""}`}
                    style={{ animationDelay: slideIdx === i ? `${wi * 120 + 80}ms` : "0ms", marginRight: "0.22em" }}>
                    {word}
                  </span>
                ))}
              </h2>
              <p className="v4-slide-body" style={{ fontSize: "15px", color: GRAY, lineHeight: 1.95, fontWeight: 300, maxWidth: "480px" }}>{sl.body}</p>
            </div>
          );
        })}

        {/* FIX 1: Dot indicators — onClick → goToSlide(i) */}
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "16px", zIndex: 10 }}>
          {SLIDES.map((sl, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              onMouseEnter={() => goToSlide(i)}
              className={slideIdx === i ? "v4-dot-active" : ""}
              title={sl.label}
              style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background:    slideIdx === i ? GOLD : "transparent",
                border:        `1.5px solid ${slideIdx === i ? GOLD : `${GOLD}55`}`,
                cursor: "pointer", padding: 0,
                transition: "all 0.35s ease",
              }}
              aria-label={`슬라이드 ${i + 1}: ${sl.label}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div style={{ position: "absolute", bottom: "40px", left: "8%", zIndex: 10, display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.3em", color: `${GOLD}55` }}>
            {String(slideIdx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          {/* Progress bar across slides */}
          <div style={{ width: "120px", height: "1px", backgroundColor: `${GOLD}22`, position: "relative" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%", backgroundColor: GOLD,
              width: `${((slideIdx + 1) / SLIDES.length) * 100}%`,
              transition: "width 0.6s ease",
            }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PRODUCT WORLD — drag-to-scroll carousel
          ══════════════════════════════════════════════════════════════════ */}
      <section id="products" style={{ backgroundColor: "#0A0E14", paddingBottom: "80px" }}>
        {/* Section header */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 2rem 48px" }}>
          <FadeIn>
            <p style={{ color: GOLD, fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "12px" }}>PRODUCT WORLD</p>
            <MaskReveal delay={100}>
              <h2 className="v4-font-serif" style={{ color: CREAM, fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1 }}>제품 세계</h2>
            </MaskReveal>
          </FadeIn>
        </div>

        {/* Drag carousel */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Track */}
          <div
            ref={carouselRef}
            className="v4-carousel-track"
            style={{
              overflowX: "scroll",
              padding: "0 calc(50vw - 280px) 48px",
              gap: "24px",
            }}
            /* ── Mouse drag ── */
            onMouseDown={(e) => {
              const el = carouselRef.current; if (!el) return;
              isDragging.current   = false;
              dragStart.current    = { x: e.pageX, scrollLeft: el.scrollLeft };
              lastDragX.current    = e.pageX;
              dragVelocity.current = 0;
              if (dragRaf.current) cancelAnimationFrame(dragRaf.current);
              if (prodTimer.current) clearInterval(prodTimer.current); // pause auto
              el.classList.add("dragging");
            }}
            onMouseMove={(e) => {
              if (!dragStart.current) return;
              const el = carouselRef.current; if (!el) return;
              const dx = e.pageX - dragStart.current.x;
              if (Math.abs(dx) > 4) isDragging.current = true;
              dragVelocity.current = e.pageX - lastDragX.current;
              lastDragX.current    = e.pageX;
              el.scrollLeft = dragStart.current.scrollLeft - dx;
            }}
            onMouseUp={() => {
              const el = carouselRef.current; if (!el) return;
              el.classList.remove("dragging");
              const wasDragging = isDragging.current;
              dragStart.current = null;
              isDragging.current = false;
              if (!wasDragging) { resetProdTimer(); return; }
              /* momentum → snap → resume auto */
              let v = dragVelocity.current * 1.8;
              const momentum = () => {
                if (!carouselRef.current) return;
                carouselRef.current.scrollLeft -= v;
                v *= 0.88;
                if (Math.abs(v) > 0.5) dragRaf.current = requestAnimationFrame(momentum);
                else scrollToCard(Math.round(carouselRef.current.scrollLeft / CARD_W));
              };
              dragRaf.current = requestAnimationFrame(momentum);
            }}
            onMouseLeave={() => {
              if (!dragStart.current) return;
              const el = carouselRef.current; if (!el) return;
              el.classList.remove("dragging");
              dragStart.current  = null;
              isDragging.current = false;
              resetProdTimer();
            }}
            /* ── Touch events ── */
            onTouchStart={(e) => {
              const el = carouselRef.current; if (!el) return;
              if (prodTimer.current) clearInterval(prodTimer.current);
              if (dragRaf.current) cancelAnimationFrame(dragRaf.current);
              touchStart.current   = { x: e.touches[0].pageX, scrollLeft: el.scrollLeft };
              lastDragX.current    = e.touches[0].pageX;
              dragVelocity.current = 0;
            }}
            onTouchMove={(e) => {
              if (!touchStart.current) return;
              const el = carouselRef.current; if (!el) return;
              const dx = e.touches[0].pageX - touchStart.current.x;
              dragVelocity.current = e.touches[0].pageX - lastDragX.current;
              lastDragX.current    = e.touches[0].pageX;
              el.scrollLeft = touchStart.current.scrollLeft - dx;
            }}
            onTouchEnd={() => {
              if (!touchStart.current || !carouselRef.current) return;
              touchStart.current = null;
              let v = dragVelocity.current * 1.6;
              const el = carouselRef.current;
              const momentum = () => {
                el.scrollLeft -= v;
                v *= 0.88;
                if (Math.abs(v) > 0.5) dragRaf.current = requestAnimationFrame(momentum);
                else scrollToCard(Math.round(el.scrollLeft / CARD_W));
              };
              dragRaf.current = requestAnimationFrame(momentum);
            }}
          >
            {PRODUCTS.map((p, i) => {
              const isActive = hoveredCard === i || (hoveredCard === null && prodIdx === i);
              return (
                <div
                  key={p.name}
                  className={`v4-carousel-card${isActive ? " active-card" : ""}`}
                  style={{
                    width: "560px",
                    background: "#0D1117",
                    border: `1px solid ${isActive ? `${GOLD}55` : LINE}`,
                    overflow: "hidden",
                    flexShrink: 0,
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? "translateY(-10px)" : "translateY(8px)",
                    boxShadow: isActive ? `0 32px 80px rgba(212,175,55,0.18)` : "none",
                    cursor: "pointer",
                    transition: "transform 0.45s cubic-bezier(0.25,1,0.5,1), opacity 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease",
                  }}
                  onMouseEnter={() => {
                    setHoveredCard(i);
                    if (prodTimer.current) clearInterval(prodTimer.current);
                    carouselRef.current?.scrollTo({ left: i * (560 + 24), behavior: "smooth" });
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                    resetProdTimer();
                  }}
                  onClick={() => { if (!isDragging.current) scrollToCard(i); }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "340px", overflow: "hidden" }}>
                    <div style={{
                      position: "absolute", top: "20px", left: "22px", zIndex: 2,
                      fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase",
                      color: GOLD, fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    }}>N°{p.num}</div>
                    <img src={p.img} alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transition: "transform 0.9s cubic-bezier(0.25,1,0.5,1)",
                        transform: isActive ? "scale(1.06)" : "scale(1)",
                      }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${NAVY} 0%, transparent 55%)` }} />
                  </div>

                  {/* Text */}
                  <div style={{ padding: "28px 28px 32px" }}>
                    <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "10px" }}>{p.cat}</p>
                    <h3 className="v4-font-serif" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 300, color: CREAM, lineHeight: 1, marginBottom: "16px", letterSpacing: "-0.01em" }}>{p.name}</h3>
                    <div style={{ width: "32px", height: "1px", backgroundColor: `${GOLD}55`, marginBottom: "16px" }} />
                    <p className="v4-prod-desc" style={{ color: GRAY, fontSize: "13px", lineHeight: 1.85 }}>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / right fade edges */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to right, #0A0E14, transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to left, #0A0E14, transparent)", pointerEvents: "none" }} />
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "8px" }}>
          {PRODUCTS.map((p, i) => {
            const dotActive = hoveredCard === i || (hoveredCard === null && prodIdx === i);
            return (
              <button
                key={p.name}
                onClick={() => scrollToCard(i)}
                onMouseEnter={() => {
                  setHoveredCard(i);
                  if (prodTimer.current) clearInterval(prodTimer.current);
                  carouselRef.current?.scrollTo({ left: i * (560 + 24), behavior: "smooth" });
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  resetProdTimer();
                }}
                style={{
                  width: dotActive ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: dotActive ? GOLD : `${GOLD}33`,
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.35s cubic-bezier(0.25,1,0.5,1)",
                }}
                aria-label={p.name}
              />
            );
          })}
        </div>

        {/* Drag hint */}
        <p style={{ textAlign: "center", fontSize: "10px", letterSpacing: "0.25em", color: `${GOLD}44`, marginTop: "20px", textTransform: "uppercase" }}>
          drag to explore
        </p>

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FIX 3: STATS — fills black gap between products and philosophy
          blum 핵심 수치 + 카운팅 애니메이션 + 순차 등장
          ══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", backgroundColor: "#070B10", overflow: "hidden" }}>
        {/* Subtle background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.statsBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #070B10, transparent 30%, transparent 70%, #070B10)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "100px 2rem" }}>
          <FadeIn>
            <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}77`, marginBottom: "12px" }}>BLUM IN NUMBERS</p>
            <MaskReveal delay={100}>
              <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: CREAM, marginBottom: "64px" }}>
                숫자로 보는 <em style={{ color: GOLD }}>blum</em>
              </h2>
            </MaskReveal>
          </FadeIn>

          <div className="v4-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: LINE }}>
            {STATS.map((s, i) => (
              <FadeIn key={s.l} delay={i * 110}>
                <div className="v4-stat-card" style={{ padding: "52px 32px", backgroundColor: "#070B10" }}>
                  <div className="v4-font-serif" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", fontWeight: 300, color: GOLD, lineHeight: 1, marginBottom: "12px" }}>
                    <GCounter to={s.n} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: "14px", color: CREAM, marginBottom: "8px", fontWeight: 400 }}>{s.l}</div>
                  <div style={{ width: "24px", height: "1px", backgroundColor: `${GOLD}44`, marginBottom: "8px" }} />
                  <div style={{ fontSize: "12px", color: GRAY, lineHeight: 1.7 }}>{s.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY ══════════════════════════════════════════════════ */}
      <WipeBanner />

      {/* ══ CORE VALUES → /v3/values 페이지로 이동 ══════════════════════ */}

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "28px 2rem", backgroundColor: "#080B10" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span className="v4-font-serif" style={{ fontSize: "16px", fontWeight: 300, color: `${GOLD}66`, letterSpacing: "0.2em" }}>blum</span>
          <span style={{ fontSize: "11px", color: `${CREAM}33` }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</span>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {([["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"]] as [string, string][]).map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${CREAM}33`, textDecoration: "none" }}>{l}</Link>
            ))}
            <a
              href="https://blum-landing.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${GOLD}99`, border: `1px solid ${GOLD}33`, padding: "6px 12px", textDecoration: "none" }}
            >
              공식 사이트
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
