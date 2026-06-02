"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Constants ── */
const NAVY  = "#0D1117";
const GOLD  = "#D4AF37";
const CREAM = "#F5F0E8";
const GRAY  = "rgba(245,240,232,0.55)";
const LINE  = "rgba(212,175,55,0.18)";

/* ── Confirmed Blum official image URLs (crawled from blum.com) ── */
const IMG = {
  hero1:     "https://www.blum.com/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg",
  hero2:     "https://www.blum.com/images/560/258/4215892/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg",
  brand1:    "https://www.blum.com/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg",
  brand2:    "https://www.blum.com/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg",
  aventos1:  "https://www.blum.com/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
  aventos2:  "https://www.blum.com/images/560/747/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_3:4.jpg",
  legrabox1: "https://www.blum.com/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
  legrabox2: "https://www.blum.com/images/560/258/4215299/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
  hinge1:    "https://www.blum.com/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",
  hinge2:    "https://www.blum.com/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
  movento1:  "https://www.blum.com/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg",
  movento2:  "https://www.blum.com/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg",
  tipon1:    "https://www.blum.com/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",
  tipon2:    "https://www.blum.com/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg",
  box1:      "https://www.blum.com/images/560/258/4173336/corporate/media/bilder/produkte/boxsysteme/BOX1856_AA_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",
  box2:      "https://www.blum.com/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg",
};

/* ── Data ── */
const CHAPTERS = [
  {
    label: "BRAND STORY · SINCE 1952",
    title: "moving ideas.",
    body: "편리함을 높이고 삶의 질을 향상시키는 고품질 가구용 피팅. Julius Blum GmbH는 오스트리아 포어알베르크에서 시작해 세계 최고의 가구 피팅 제조업체 중 하나로 성장했습니다.",
    img: IMG.brand1,
  },
  {
    label: "INNOVATION",
    title: "끊임없는 혁신",
    body: "BLUMOTION, CLIP top, LEGRABOX, TIP-ON — blum은 끊임없이 움직여 더 나은 아이디어를 만들어갑니다. 가구 제조업체의 질문이 혁신의 원동력입니다.",
    img: IMG.legrabox1,
  },
  {
    label: "GLOBAL LEADERSHIP",
    title: "글로벌 리더십",
    body: "€2,441M 매출, 9,850명 임직원, 120개국 수출, 34개 자회사·대리점. 3대째 가족 경영으로 신뢰와 혁신을 이어가고 있습니다.",
    img: IMG.brand2,
  },
];

const PRODUCTS = [
  {
    name: "AVENTOS",
    cat: "리프트 시스템",
    desc: "가구와 완벽하게 하나가 되어 고품질 가구 디자인을 완성. HKi · HF top · HS top · HL top · HK top · HK-S · HK-XS",
    imgs: [IMG.aventos1, IMG.aventos2],
  },
  {
    name: "LEGRABOX",
    cat: "박스 시스템",
    desc: "슬림한 서랍면(12.8mm), 최대 하중 40kg 및 70kg 지지. pure · free · special edition · individual",
    imgs: [IMG.legrabox1, IMG.legrabox2],
  },
  {
    name: "CLIP top BLUMOTION",
    cat: "경첩 시스템",
    desc: "댐핑 기능이 경첩 보스에 통합. 도어의 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    imgs: [IMG.hinge1, IMG.box1],
  },
  {
    name: "MOVENTO",
    cat: "러너 시스템",
    desc: "가볍게 미끄러지는 듯한 동작 및 4차원 프런트 조정. 4가지 모션 기술 호환.",
    imgs: [IMG.movento1, IMG.movento2],
  },
  {
    name: "TIP-ON BLUMOTION",
    cat: "모션 기술",
    desc: "기계식 열기 및 소프트 닫기. 도어, 리프트 시스템, 풀아웃에 사용 가능.",
    imgs: [IMG.tipon1, IMG.tipon2],
  },
  {
    name: "TANDEMBOX",
    cat: "박스 시스템",
    desc: "금속 서랍과 숨겨진 롤러로 구성된 다목적 박스 시스템. 다양한 높이와 설계 변형.",
    imgs: [IMG.box1, IMG.box2],
  },
];

const STATS = [
  { n: 2441, s: "M€", l: "전 세계 매출액",    sub: "2024/25" },
  { n: 9850, s: "명",  l: "전 세계 임직원",    sub: "글로벌" },
  { n: 120,  s: "+",  l: "수출 대상국",        sub: "개국" },
  { n: 6700, s: "명",  l: "포어알베르크 직원", sub: "본사" },
  { n: 34,   s: "개", l: "자회사·대리점",      sub: "전 세계" },
  { n: 8,    s: "개", l: "포어알베르크 공장",  sub: "본사 포함" },
];

const TIMELINE = [
  { y: "1952",  t: "창립",       b: "Julius Blum GmbH 설립. 오스트리아 포어알베르크 회흐스트에서 정밀 금속 가공 기술로 가구 피팅 산업의 기반을 다짐." },
  { y: "1990s", t: "CLIP 시스템", b: "CLIP 경첩 시스템 출시. 공구 없이 탈착 가능한 구조로 전 세계 가구 제조업체에 채택." },
  { y: "2000s", t: "BLUMOTION",  b: "통합 댐핑 기술 BLUMOTION 개발. 도어와 서랍이 마지막 순간 스스로 부드럽게 닫히는 경험을 선보임." },
  { y: "2010s", t: "LEGRABOX",   b: "슬림 서랍면 12.8mm의 LEGRABOX 출시. 최대 70kg 하중 지지, 디자인과 기능의 완벽한 조화." },
  { y: "현재",  t: "글로벌 리더십", b: "€2,441M 매출, 9,850명 임직원, 120개국 수출. 34개 자회사·대리점. 3대째 가족 경영." },
];

/* ── GCounter ── */
function GCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!on) return;
    const s = performance.now(), dur = 2200;
    const tick = (now: number) => {
      const p    = Math.min((now - s) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [on, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ── FadeIn ── */
function FadeIn({ children, delay = 0, y = 36 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity:    vis ? 1 : 0,
      transform:  vis ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── WipeBanner ── */
function WipeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`v4-wipe-section${active ? " v4-wipe-go" : ""}`}
      style={{ backgroundColor: "#0A0E14", padding: "100px 2rem", textAlign: "center" }}
    >
      <div className="v4-wipe-cover" />
      <div className="v4-wipe-content" style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "18px" }}>Our Philosophy</p>
        <blockquote
          className="v4-font-serif"
          style={{ fontSize: "clamp(1.6rem,4vw,3.2rem)", fontWeight: 300, color: CREAM, lineHeight: 1.5, maxWidth: "760px", margin: "0 auto 36px", fontStyle: "italic", letterSpacing: "-0.01em" }}
        >
          "가구의 열고 닫음을<br />매력적인 경험으로<br />만들어 드립니다."
        </blockquote>
        <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}66` }}>Julius Blum GmbH · Since 1952</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function V4() {
  const [loaded, setLoaded]   = useState(false);
  const [loadOut, setLoadOut] = useState(false);
  const [scrollY, setScrollY]         = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  /* Pinned chapters */
  const chapterWrapRef             = useRef<HTMLDivElement>(null);
  const [chapterIdx, setChapterIdx] = useState(0);

  /* Product card visibility */
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardVis, setCardVis] = useState<boolean[]>(PRODUCTS.map(() => false));

  /* Timeline visibility */
  const tlRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [tlVisible, setTlVisible] = useState<boolean[]>(TIMELINE.map(() => false));

  /* Loading timers */
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true),  2400);
    const t2 = setTimeout(() => setLoadOut(true), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* Global scroll */
  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Pinned chapters scroll tracking */
  useEffect(() => {
    const onScroll = () => {
      const el = chapterWrapRef.current;
      if (!el) return;
      const rect      = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress  = Math.max(0, Math.min(1, -rect.top / scrollable));
      setChapterIdx(Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Product cards IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setCardVis((prev) => { const n = [...prev]; n[i] = true; return n; });
      }, { threshold: 0.12 });
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, [loadOut]);

  /* Timeline IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    tlRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setTlVisible((prev) => { const n = [...prev]; n[i] = true; return n; });
      }, { threshold: 0 });
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  /* 3D Tilt on product images */
  useEffect(() => {
    const cards    = document.querySelectorAll<HTMLElement>(".v4-tilt");
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>("img");
      if (!img) return;
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        img.style.transform  = `perspective(720px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.05)`;
        img.style.transition = "transform 0.06s ease";
      };
      const onLeave = () => {
        img.style.transform  = "perspective(720px) rotateY(0deg) rotateX(0deg) scale(1)";
        img.style.transition = "transform 0.7s cubic-bezier(0.25,1,0.5,1)";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [loadOut]);

  /* Scroll to chapter section */
  const scrollToChapters = () => {
    chapterWrapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const heroParallax = scrollY * 0.28;
  const heroOpacity  = Math.max(0, 1 - scrollY / 700);

  /* ── CSS ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

    @keyframes v4-load-char {
      from { opacity:0; transform:translateY(40px) scaleY(1.15); }
      to   { opacity:1; transform:none; }
    }
    @keyframes v4-load-out {
      to { transform:translateY(-100%); opacity:0; }
    }
    @keyframes v4-load-up {
      from { opacity:0; transform:translateY(28px); }
      to   { opacity:1; transform:none; }
    }
    @keyframes v4-ticker {
      from { transform:translateX(0); }
      to   { transform:translateX(-50%); }
    }
    @keyframes v4-scrollbar {
      0%   { transform:translateY(-100%); }
      100% { transform:translateY(300%); }
    }
    @keyframes v4-wipe-in {
      0%  { transform:scaleX(0); transform-origin:left; }
      50% { transform:scaleX(1); transform-origin:left; }
      51% { transform:scaleX(1); transform-origin:right; }
      100%{ transform:scaleX(0); transform-origin:right; }
    }
    @keyframes v4-progress {
      from { width:0%; }
      to   { width:100%; }
    }
    @keyframes v4-dot-pulse {
      0%,100% { box-shadow:0 0 0 0 ${GOLD}55; }
      50%     { box-shadow:0 0 0 5px ${GOLD}00; }
    }
    @keyframes v4-img-reveal {
      from { clip-path:inset(0 100% 0 0); }
      to   { clip-path:inset(0 0% 0 0); }
    }

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
    .v4-wipe-section.v4-wipe-go .v4-wipe-cover   { animation:v4-wipe-in 1s cubic-bezier(0.77,0,0.18,1) both; }
    .v4-wipe-content { opacity:1; }

    .v4-tilt     { cursor:crosshair; overflow:hidden; }
    .v4-tilt img { transition:transform 0.7s cubic-bezier(0.25,1,0.5,1); display:block; width:100%; height:100%; object-fit:cover; }

    .v4-btn { transition:all 0.35s cubic-bezier(0.25,1,0.5,1); display:inline-flex; align-items:center; }
    .v4-btn:hover { transform:translateY(-3px); }

    .v4-nav-link { transition:color 0.2s ease; }
    .v4-nav-link:hover { color:${GOLD} !important; }

    /* Product card hover */
    .v4-prod-card { transition:transform 0.4s cubic-bezier(0.25,1,0.5,1); }
    .v4-prod-card:hover { transform:translateY(-6px); }
    .v4-prod-card:hover .v4-prod-img img { transform:scale(1.07); }
    .v4-prod-img img { transition:transform 0.6s cubic-bezier(0.25,1,0.5,1); }
    .v4-prod-card:hover .v4-prod-label { transform:translateY(0); opacity:1; }
    .v4-prod-label { transform:translateY(8px); opacity:0; transition:transform 0.4s ease, opacity 0.4s ease; }

    /* Chapter dot active pulse */
    .v4-dot-active { animation:v4-dot-pulse 2s ease infinite; }

    @media (max-width:768px) {
      .v4-grid-products { grid-template-columns:1fr !important; }
      .v4-timeline-grid { grid-template-columns:1fr !important; }
    }
  `;

  /* ── RENDER ── */
  return (
    <div className="v4-font-sans" style={{ backgroundColor: NAVY, color: CREAM, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ LOADING ══════════════════════════════════════════════════════ */}
      {!loadOut && (
        <div
          className={loaded ? "v4-load-out" : ""}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            backgroundColor: NAVY,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "20px",
          }}
        >
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
          <Link href="/v4" className="v4-font-serif" style={{ color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>
            blum
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([["제품", "#products"], ["타임라인", "#timeline"], ["서비스", "/v4/services"], ["연락처", "/v4/contact"]] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="v4-nav-link" style={{ color: GRAY, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", alignItems: "flex-end", overflow: "hidden", backgroundColor: NAVY }}>
        {/* Parallax background */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={IMG.hero1}
            alt="blum hero"
            style={{ width: "100%", height: "110%", objectFit: "cover", opacity: 0.35, transform: `translateY(${heroParallax}px)` }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${NAVY} 18%, rgba(13,17,23,0.55) 55%, rgba(13,17,23,0.15) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,17,23,0.75) 0%, transparent 65%)" }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 7rem", width: "100%", opacity: heroOpacity }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: GOLD, opacity: 0.5 }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: GRAY }}>Premium Furniture Fittings · Austria · Since 1952</span>
          </div>
          <h1 className="v4-font-serif" style={{ marginBottom: "1.5rem", lineHeight: 0.88, fontWeight: 300, fontSize: "clamp(4.5rem,13vw,11rem)", letterSpacing: "-0.01em" }}>
            <span style={{ color: CREAM, display: "block" }}>moving</span>
            <span style={{ color: GOLD, fontStyle: "italic", display: "block" }}>ideas.</span>
          </h1>
          <p style={{ color: GRAY, fontSize: "14px", lineHeight: 2, fontWeight: 300, maxWidth: "380px", marginBottom: "2.5rem" }}>
            편리함을 높이고 삶의 질을 향상시키는<br />고품질 가구용 피팅
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="#products" className="v4-btn" style={{ color: NAVY, backgroundColor: GOLD, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 30px", gap: "8px" }}>
              제품 살펴보기 →
            </Link>
            <Link href="#timeline" className="v4-btn" style={{ color: CREAM, border: `1px solid ${LINE}`, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 30px" }}>
              브랜드 스토리
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
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

      {/* ══ PINNED CHAPTERS ════════════════════════════════════════════ */}
      <div ref={chapterWrapRef} style={{ height: "300vh", backgroundColor: NAVY }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: NAVY }}>
          {/* Background images — crossfade */}
          {CHAPTERS.map((ch, i) => (
            <div key={i} style={{ position: "absolute", inset: 0, opacity: chapterIdx === i ? 1 : 0, transition: "opacity 0.9s ease" }}>
              <img
                src={ch.img}
                alt={ch.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.28 }}
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${NAVY} 38%, transparent 100%)` }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${NAVY} 0%, transparent 55%)` }} />
            </div>
          ))}

          {/* Chapter text panels */}
          {CHAPTERS.map((ch, i) => (
            <div key={i} style={{
              position: "absolute", left: "8%", top: "50%",
              transform: chapterIdx === i
                ? "translateY(-50%)"
                : chapterIdx > i
                  ? "translateY(calc(-50% - 70px))"
                  : "translateY(calc(-50% + 70px))",
              opacity: chapterIdx === i ? 1 : 0,
              transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)",
              maxWidth: "580px", zIndex: 10,
            }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "20px" }}>{ch.label}</p>
              <h2 className="v4-font-serif" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 300, color: CREAM, lineHeight: 0.9, marginBottom: "28px", letterSpacing: "-0.01em" }}>
                {ch.title}
              </h2>
              <p style={{ fontSize: "15px", color: GRAY, lineHeight: 1.95, fontWeight: 300 }}>{ch.body}</p>
            </div>
          ))}

          {/* Chapter progress dots — circular, clickable */}
          <div style={{
            position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: "14px", zIndex: 10,
          }}>
            {CHAPTERS.map((_, i) => (
              <button
                key={i}
                onClick={scrollToChapters}
                className={chapterIdx === i ? "v4-dot-active" : ""}
                style={{
                  width:  chapterIdx === i ? "10px" : "7px",
                  height: chapterIdx === i ? "10px" : "7px",
                  borderRadius: "50%",
                  background: chapterIdx === i ? GOLD : `${GOLD}44`,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.4s ease",
                }}
                aria-label={`Chapter ${i + 1}`}
              />
            ))}
          </div>

          {/* Chapter counter */}
          <div style={{ position: "absolute", bottom: "40px", left: "8%", zIndex: 10 }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.3em", color: `${GOLD}55` }}>
              {String(chapterIdx + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* ══ PRODUCT WORLD — grid layout ════════════════════════════════ */}
      <section id="products" style={{ backgroundColor: "#0A0E14", padding: "100px 0 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <p style={{ color: GOLD, fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "12px" }}>PRODUCT WORLD</p>
            <h2 className="v4-font-serif" style={{ color: CREAM, fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, marginBottom: "16px", lineHeight: 1 }}>제품 세계</h2>
            <p style={{ color: GRAY, fontSize: "13px", lineHeight: 1.85, maxWidth: "480px", marginBottom: "72px" }}>
              blum은 가구의 움직임을 완성하는 다양한 제품 시스템을 제공합니다.
            </p>
          </FadeIn>

          {/* Products grid */}
          <div
            className="v4-grid-products"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", backgroundColor: LINE }}
          >
            {PRODUCTS.map((p, idx) => (
              <div
                key={p.name}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="v4-prod-card"
                style={{
                  backgroundColor: "#0A0E14",
                  opacity:    cardVis[idx] ? 1 : 0,
                  transform:  cardVis[idx] ? "none" : "translateY(48px) scale(0.97)",
                  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 90}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 90}ms`,
                }}
              >
                {/* Primary image */}
                <div className="v4-tilt" style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={p.imgs[0]}
                    alt={p.name}
                    style={{ opacity: 0.88 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                {/* Card body */}
                <div style={{ padding: "28px 24px 32px" }}>
                  <p style={{ color: GOLD, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "10px" }}>{p.cat}</p>
                  <h3 className="v4-font-serif" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 300, color: CREAM, marginBottom: "12px", lineHeight: 1 }}>{p.name}</h3>
                  <p style={{ color: GRAY, fontSize: "13px", lineHeight: 1.85 }}>{p.desc}</p>

                  {/* Secondary image thumbnail */}
                  <div style={{ marginTop: "20px", display: "flex", gap: "8px" }}>
                    {p.imgs.map((src, ii) => (
                      <div key={ii} style={{ width: "56px", height: "42px", overflow: "hidden", opacity: ii === 0 ? 0.6 : 0.4, border: ii === 0 ? `1px solid ${GOLD}44` : "none" }}>
                        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                    ))}
                  </div>

                  <div className="v4-prod-label" style={{ marginTop: "16px" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD }}>자세히 보기 →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY BANNER ══════════════════════════════════════════ */}
      <WipeBanner />

      {/* ══ TIMELINE ════════════════════════════════════════════════════ */}
      <section id="timeline" style={{ padding: "120px 0", backgroundColor: NAVY }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <div style={{ marginBottom: "80px" }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "14px" }}>Brand Story</p>
              <h2 className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 300, color: CREAM, letterSpacing: "-0.01em" }}>
                1952년부터<br /><em style={{ color: GOLD }}>현재까지</em>
              </h2>
            </div>
          </FadeIn>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", backgroundColor: LINE, transform: "translateX(-50%)" }} />

            {TIMELINE.map((item, i) => (
              <div
                key={item.y}
                ref={(el) => { tlRefs.current[i] = el; }}
                className="v4-timeline-grid"
                style={{
                  display: "grid", gridTemplateColumns: "1fr 48px 1fr", marginBottom: "64px", alignItems: "center",
                  opacity:    tlVisible[i] ? 1 : 0.1,
                  transform:  tlVisible[i] ? "none" : i % 2 === 0 ? "translateX(-40px)" : "translateX(40px)",
                  transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    <div style={{ textAlign: "right", paddingRight: "40px" }}>
                      <span className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: i === TIMELINE.length - 1 ? GOLD : `${GOLD}22`, display: "block", lineHeight: 1, marginBottom: "8px" }}>{item.y}</span>
                      <h3 style={{ fontSize: "16px", fontWeight: 400, color: CREAM, marginBottom: "8px" }}>{item.t}</h3>
                      <p style={{ fontSize: "13px", color: GRAY, lineHeight: 1.85, fontWeight: 300 }}>{item.b}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: `${GOLD}55`, border: `1px solid ${GOLD}66` }} />
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: `${GOLD}55`, border: `1px solid ${GOLD}66` }} />
                    </div>
                    <div style={{ paddingLeft: "40px" }}>
                      <span className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: i === TIMELINE.length - 1 ? GOLD : `${GOLD}22`, display: "block", lineHeight: 1, marginBottom: "8px" }}>{item.y}</span>
                      <h3 style={{ fontSize: "16px", fontWeight: 400, color: CREAM, marginBottom: "8px" }}>{item.t}</h3>
                      <p style={{ fontSize: "13px", color: GRAY, lineHeight: 1.85, fontWeight: 300 }}>{item.b}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", backgroundColor: "#0A0E14" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <div style={{ marginBottom: "60px" }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "14px" }}>By The Numbers</p>
              <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: CREAM, letterSpacing: "-0.01em" }}>
                숫자로 보는 <em style={{ color: GOLD }}>blum</em>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", backgroundColor: LINE }}>
            {STATS.map((s, i) => (
              <FadeIn key={s.l} delay={i * 80}>
                <div style={{ padding: "44px 32px", backgroundColor: "#0A0E14" }}>
                  <div className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: GOLD, lineHeight: 1, marginBottom: "8px" }}>
                    <GCounter to={s.n} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: "13px", color: CREAM, marginBottom: "4px" }}>{s.l}</div>
                  <div style={{ fontSize: "11px", color: GRAY }}>{s.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BRAND IMAGES ════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: NAVY, padding: "100px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <FadeIn>
            <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "14px" }}>About Blum</p>
            <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: CREAM, letterSpacing: "-0.01em", marginBottom: "56px" }}>
              오스트리아에서 <em style={{ color: GOLD }}>세계로</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", backgroundColor: LINE }}>
            <FadeIn delay={0}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#0A0E14" }}>
                <img
                  src={IMG.brand1}
                  alt="Blum 공장"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, transition: "transform 0.7s ease, opacity 0.4s ease" }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.04)"; (e.target as HTMLImageElement).style.opacity = "0.95"; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; (e.target as HTMLImageElement).style.opacity = "0.75"; }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div style={{ backgroundColor: "#0A0E14", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "20px" }}>Julius Blum GmbH</p>
                <p className="v4-font-serif" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: CREAM, fontWeight: 300, lineHeight: 1.5, marginBottom: "24px", fontStyle: "italic" }}>
                  "3대째 가족 경영으로<br />신뢰와 혁신을 이어갑니다."
                </p>
                <p style={{ fontSize: "13px", color: GRAY, lineHeight: 1.9 }}>
                  오스트리아 포어알베르크 회흐스트에서 시작한 blum은
                  현재 120개국에 제품을 수출하는 글로벌 리더입니다.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div style={{ backgroundColor: "#0A0E14", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "20px" }}>Sustainability</p>
                <p className="v4-font-serif" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: CREAM, fontWeight: 300, lineHeight: 1.5, marginBottom: "24px", fontStyle: "italic" }}>
                  "지속가능성은<br />우리의 핵심 가치입니다."
                </p>
                <p style={{ fontSize: "13px", color: GRAY, lineHeight: 1.9 }}>
                  blum은 환경 보호와 사회적 책임을 기업 전략의 중심에 두고
                  지속가능한 생산과 운영을 실천합니다.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#0A0E14" }}>
                <img
                  src={IMG.brand2}
                  alt="Blum 서비스"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, transition: "transform 0.7s ease, opacity 0.4s ease" }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.04)"; (e.target as HTMLImageElement).style.opacity = "0.95"; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; (e.target as HTMLImageElement).style.opacity = "0.75"; }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </FadeIn>
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
