"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

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
    body:  "BLUMOTION, CLIP top, LEGRABOX, TIP-ON — blum은 끊임없이 움직여 더 나은 아이디어를 만들어갑니다. 가구 제조업체의 질문이 혁신의 원동력입니다.",
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

const TIMELINE = [
  { y: "1952",  t: "창립",        b: "Julius Blum GmbH 설립. 오스트리아 포어알베르크 회흐스트에서 정밀 금속 가공 기술로 가구 피팅 산업의 기반을 다짐." },
  { y: "1990s", t: "CLIP 시스템", b: "CLIP 경첩 시스템 출시. 공구 없이 탈착 가능한 구조로 전 세계 가구 제조업체에 채택." },
  { y: "2000s", t: "BLUMOTION",   b: "통합 댐핑 기술 BLUMOTION 개발. 도어와 서랍이 마지막 순간 스스로 부드럽게 닫히는 경험을 선보임." },
  { y: "2010s", t: "LEGRABOX",    b: "슬림 서랍면 12.8mm의 LEGRABOX 출시. 최대 70kg 하중 지지, 디자인과 기능의 완벽한 조화." },
  { y: "현재",  t: "글로벌 리더십", b: "€2,441M 매출, 9,850명 임직원, 120개국 수출. 34개 자회사·대리점. 3대째 가족 경영." },
];

/* ── GCounter ── */
function GCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN]   = useState(0);
  const ref          = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!on) return;
    const start = performance.now(), dur = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [on, to]);
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

/* ── WipeBanner ── */
function WipeBanner() {
  const ref           = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`v4-wipe-section${active ? " v4-wipe-go" : ""}`}
      style={{ backgroundColor: "#0A0E14", padding: "100px 2rem", textAlign: "center" }}>
      <div className="v4-wipe-cover" />
      <div className="v4-wipe-content" style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "18px" }}>Our Philosophy</p>
        <blockquote className="v4-font-serif"
          style={{ fontSize: "clamp(1.6rem,4vw,3.2rem)", fontWeight: 300, color: CREAM, lineHeight: 1.55, maxWidth: "760px", margin: "0 auto 36px", fontStyle: "italic" }}>
          "가구의 열고 닫음을<br />매력적인 경험으로<br />만들어 드립니다."
        </blockquote>
        <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}66` }}>Julius Blum GmbH · Since 1952</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function V4() {
  /* Loading */
  const [loaded,   setLoaded]   = useState(false);
  const [loadOut,  setLoadOut]  = useState(false);
  const [heroAnim, setHeroAnim] = useState(false);

  /* Nav */
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollY,     setScrollY]     = useState(0);

  /* ── FIX 1: Brand Story – pure React state slideshow, no scroll math ── */
  const [slideIdx,    setSlideIdx]    = useState(0);
  const slideTimer                    = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── FIX 2: Products – pure React state, click-driven ── */
  const [prodIdx,     setProdIdx]     = useState(0);

  /* Timeline */
  const tlRefs                       = useRef<Array<HTMLDivElement | null>>([]);
  const [tlVisible, setTlVisible]    = useState<boolean[]>(TIMELINE.map(() => false));

  /* Loading timers */
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true),  2400);
    const t2 = setTimeout(() => setLoadOut(true), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
    }, 5000);
  }, []);

  useEffect(() => {
    resetSlideTimer();
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, [resetSlideTimer]);

  const goToSlide = (idx: number) => {
    setSlideIdx(idx);
    resetSlideTimer();
  };

  /* Timeline observer */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    tlRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setTlVisible(p => { const n = [...p]; n[i] = true; return n; });
      }, { threshold: 0 });
      io.observe(el); observers.push(io);
    });
    return () => observers.forEach(io => io.disconnect());
  }, []);

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
    .v4-slide-img { position:absolute;inset:0;transition:opacity 0.9s ease; }
    .v4-slide-img.active { opacity:1; }
    .v4-slide-img.inactive { opacity:0; }
    .v4-slide-img img { width:100%;height:100%;object-fit:cover; }

    /* Slide text panel */
    .v4-slide-panel { position:absolute;left:8%;top:50%;max-width:600px;transition:all 0.8s cubic-bezier(0.16,1,0.3,1); }
    .v4-slide-panel.active { opacity:1;transform:translateY(-50%); }
    .v4-slide-panel.above  { opacity:0;transform:translateY(calc(-50% - 70px)); }
    .v4-slide-panel.below  { opacity:0;transform:translateY(calc(-50% + 70px)); }

    /* Chapter word animation */
    .v4-ch-word { display:inline-block;opacity:0; }
    .v4-ch-word.show { animation:v4-word-in 0.6s cubic-bezier(0.16,1,0.3,1) both; }

    /* Dot */
    .v4-dot-active { animation:v4-dot-pulse 2s ease infinite; }

    /* Product slide */
    .v4-prod-panel { position:absolute;inset:0;display:flex;transition:opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
    .v4-prod-panel.active { opacity:1;transform:none; }
    .v4-prod-panel.above  { opacity:0;transform:translateY(-30px); pointer-events:none; }
    .v4-prod-panel.below  { opacity:0;transform:translateY(30px);  pointer-events:none; }

    /* Product bar */
    .v4-prod-bar { cursor:pointer;transition:all 0.3s ease; }
    .v4-prod-bar:hover { background:${GOLD}66 !important; }

    /* Stats card hover */
    .v4-stat-card { transition:background 0.3s ease; }
    .v4-stat-card:hover { background:rgba(212,175,55,0.07) !important; }

    @media (max-width:768px) {
      .v4-prod-panel { flex-direction:column !important; }
      .v4-prod-right { width:100% !important; height:45vh !important; }
      .v4-prod-left  { width:100% !important; padding:24px !important; }
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
          <Link href="/v4" className="v4-font-serif" style={{ color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>blum</Link>
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([["제품", "#products"], ["타임라인", "#timeline"], ["서비스", "/v4/services"], ["연락처", "/v4/contact"]] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="v4-nav-link" style={{ color: GRAY, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", alignItems: "flex-end", overflow: "hidden", backgroundColor: NAVY }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.hero} alt="blum"
            style={{ width: "100%", height: "115%", objectFit: "cover", opacity: 0.38, transform: `translateY(${heroParallax}px)` }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${NAVY} 16%, rgba(13,17,23,0.5) 55%, rgba(13,17,23,0.1) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,17,23,0.82) 0%, transparent 65%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 7rem", width: "100%", opacity: heroOpacity }}>
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
              opacity: heroAnim ? 1 : 0, transform: heroAnim ? "none" : "translateX(80px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 150ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 150ms",
            }}>moving</span>
            <span style={{
              color: GOLD, fontStyle: "italic", display: "block",
              opacity: heroAnim ? 1 : 0, transform: heroAnim ? "none" : "translateX(-80px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 320ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 320ms",
            }}>ideas.</span>
          </h1>

          <p style={{
            color: GRAY, fontSize: "14px", lineHeight: 2, fontWeight: 300, maxWidth: "380px", marginBottom: "2.5rem",
            opacity: heroAnim ? 1 : 0, transform: heroAnim ? "none" : "translateY(20px)",
            transition: "opacity 0.8s ease 500ms, transform 0.8s ease 500ms",
          }}>편리함을 높이고 삶의 질을 향상시키는<br />고품질 가구용 피팅</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { href: "#products", label: "제품 살펴보기 →", filled: true,  delay: "680ms" },
              { href: "#timeline", label: "브랜드 스토리",   filled: false, delay: "800ms" },
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
              <p style={{ fontSize: "15px", color: GRAY, lineHeight: 1.95, fontWeight: 300, maxWidth: "480px" }}>{sl.body}</p>
            </div>
          );
        })}

        {/* FIX 1: Dot indicators — onClick → goToSlide(i) */}
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "16px", zIndex: 10 }}>
          {SLIDES.map((sl, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
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
          FIX 2 & 3: PRODUCT WORLD — click-based, no scroll wrapper
          No 500vh sticky = no black gap after section ends
          ══════════════════════════════════════════════════════════════════ */}
      <section id="products" style={{ backgroundColor: "#0A0E14" }}>
        {/* Section header */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 2rem 48px" }}>
          <FadeIn>
            <p style={{ color: GOLD, fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "12px" }}>PRODUCT WORLD</p>
            <h2 className="v4-font-serif" style={{ color: CREAM, fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1 }}>제품 세계</h2>
          </FadeIn>
        </div>

        {/* Full-height product viewer (no sticky, no scroll trap) */}
        <div style={{ position: "relative", height: "85vh", minHeight: "600px", overflow: "hidden" }}>
          {PRODUCTS.map((p, i) => {
            const state = prodIdx === i ? "active" : prodIdx > i ? "above" : "below";
            return (
              <div key={p.name} className={`v4-prod-panel ${state}`}>
                {/* Left — text */}
                <div className="v4-prod-left" style={{
                  width: "45%", flexShrink: 0, display: "flex", flexDirection: "column",
                  justifyContent: "center", padding: "0 5% 0 8%", backgroundColor: "#0A0E14", zIndex: 2,
                }}>
                  <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "18px" }}>
                    {p.num} — {p.cat}
                  </p>
                  <h3 className="v4-font-serif" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", fontWeight: 300, color: CREAM, lineHeight: 0.92, marginBottom: "24px", letterSpacing: "-0.02em" }}>
                    {p.name}
                  </h3>
                  <div style={{ width: "40px", height: "1px", backgroundColor: `${GOLD}55`, marginBottom: "22px" }} />
                  <p style={{ color: GRAY, fontSize: "14px", lineHeight: 1.95, maxWidth: "340px", marginBottom: "32px" }}>{p.desc}</p>
                  <div style={{ width: "96px", height: "64px", overflow: "hidden", border: `1px solid ${LINE}` }}>
                    <img src={p.img2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, display: "block" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                </div>

                {/* Right — image */}
                <div className="v4-prod-right" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                  <img src={p.img} alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.88, display: "block",
                      transition: "transform 1.2s cubic-bezier(0.25,1,0.5,1)",
                      transform: prodIdx === i ? "scale(1.03)" : "scale(1)",
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0A0E14 0%, transparent 15%)" }} />
                </div>
              </div>
            );
          })}

          {/* FIX 2: Bottom bars — onClick → setProdIdx(i), fully working */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", zIndex: 10 }}>
            {PRODUCTS.map((p, i) => (
              <button
                key={p.name}
                className="v4-prod-bar"
                onClick={() => setProdIdx(i)}
                style={{
                  flex: 1, height: "48px", border: "none", cursor: "pointer",
                  backgroundColor: prodIdx === i ? GOLD : `${GOLD}18`,
                  borderTop: `2px solid ${prodIdx === i ? GOLD : `${GOLD}33`}`,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "all 0.3s ease",
                }}
                aria-label={p.name}
              >
                <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: prodIdx === i ? NAVY : `${CREAM}66`, fontWeight: prodIdx === i ? 600 : 400, pointerEvents: "none" }}>
                  {p.num}
                </span>
                <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: prodIdx === i ? NAVY : `${CREAM}44`, pointerEvents: "none" }}>
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>
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
            <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: CREAM, marginBottom: "64px" }}>
              숫자로 보는 <em style={{ color: GOLD }}>blum</em>
            </h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: LINE }}>
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

      {/* ══ TIMELINE ════════════════════════════════════════════════════ */}
      <section id="timeline" style={{ padding: "120px 0", backgroundColor: NAVY }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <div style={{ marginBottom: "80px" }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "14px" }}>Brand Story</p>
              <h2 className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 300, color: CREAM }}>
                1952년부터<br /><em style={{ color: GOLD }}>현재까지</em>
              </h2>
            </div>
          </FadeIn>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", backgroundColor: LINE, transform: "translateX(-50%)" }} />
            {TIMELINE.map((item, i) => (
              <div key={item.y} ref={(el) => { tlRefs.current[i] = el; }}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 48px 1fr", marginBottom: "64px", alignItems: "center",
                  opacity:    tlVisible[i] ? 1 : 0.1,
                  transform:  tlVisible[i] ? "none" : i % 2 === 0 ? "translateX(-40px)" : "translateX(40px)",
                  transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                }}>
                {i % 2 === 0 ? (
                  <>
                    <div style={{ textAlign: "right", paddingRight: "40px" }}>
                      <span className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: i === TIMELINE.length - 1 ? GOLD : `${GOLD}22`, display: "block", lineHeight: 1, marginBottom: "8px" }}>{item.y}</span>
                      <h3 style={{ fontSize: "16px", fontWeight: 400, color: CREAM, marginBottom: "8px" }}>{item.t}</h3>
                      <p style={{ fontSize: "13px", color: GRAY, lineHeight: 1.85 }}>{item.b}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: `${GOLD}55`, border: `1px solid ${GOLD}66` }} /></div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: `${GOLD}55`, border: `1px solid ${GOLD}66` }} /></div>
                    <div style={{ paddingLeft: "40px" }}>
                      <span className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: i === TIMELINE.length - 1 ? GOLD : `${GOLD}22`, display: "block", lineHeight: 1, marginBottom: "8px" }}>{item.y}</span>
                      <h3 style={{ fontSize: "16px", fontWeight: 400, color: CREAM, marginBottom: "8px" }}>{item.t}</h3>
                      <p style={{ fontSize: "13px", color: GRAY, lineHeight: 1.85 }}>{item.b}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "28px 2rem", backgroundColor: "#080B10" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span className="v4-font-serif" style={{ fontSize: "16px", fontWeight: 300, color: `${GOLD}66`, letterSpacing: "0.2em" }}>blum</span>
          <span style={{ fontSize: "11px", color: `${CREAM}33` }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {([["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]] as [string, string][]).map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? `${GOLD}99` : `${CREAM}33`, textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
