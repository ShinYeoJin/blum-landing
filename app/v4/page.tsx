"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

/* ── 인라인 스타일 헬퍼 ── */
type S = React.CSSProperties;
const C = {
  navy:  "#0D1117" as string,
  gold:  "#D4AF37" as string,
  goldD: "#B8942A" as string,
  white: "#F5F0E8" as string,
  gray:  "rgba(245,240,232,0.45)" as string,
  line:  "rgba(212,175,55,0.18)" as string,
};

/* ── ScrollReveal Hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, on };
}

/* ── Reveal 컴포넌트 ── */
function R({
  children, d = 0, y = 40, className = "", style,
}: { children: React.ReactNode; d?: number; y?: number; className?: string; style?: S }) {
  const { ref, on } = useReveal(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? "none" : `translateY(${y}px)`,
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── GSAP 카운터 ── */
function GCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const { ref, on } = useReveal(0);
  useEffect(() => {
    if (!on) return;
    const s = performance.now(), dur = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - s) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [on, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ── 데이터 ── */
const TIMELINE = [
  { y: "1952", t: "창립", b: "Julius Blum이 오스트리아 포어알베르크 회흐스트에 Julius Blum GmbH를 설립. 정밀 금속 가공 기술로 가구 피팅 산업의 기반을 다짐." },
  { y: "1970s", t: "피팅 시대의 시작", b: "가구 피팅 전문 기업으로 전환. 경첩과 러너 시스템 개발을 시작하며 가구 제조업체들과 파트너십을 구축." },
  { y: "1990s", t: "CLIP 시스템 출시", b: "혁신적인 CLIP 경첩 시스템 출시. 공구 없이 탈착 가능한 구조로 전 세계 가구 제조업체에 채택." },
  { y: "2000s", t: "BLUMOTION 혁신", b: "통합 댐핑 기술 BLUMOTION 개발. 도어와 서랍이 마지막 순간 스스로 부드럽게 닫히는 경험을 세상에 선보임." },
  { y: "2010s", t: "LEGRABOX 탄생", b: "12.8mm 슬림 서랍면의 LEGRABOX 출시. 최대 70kg 하중 지지, 디자인과 기능의 완벽한 조화." },
  { y: "현재", t: "글로벌 리더십", b: "€2,441M 매출, 9,850명 임직원, 120개국 수출. 3대째 가족 경영으로 혁신을 이어가는 중." },
];

const PRODUCTS = [
  {
    name: "AVENTOS",
    cat: "리프트 시스템",
    desc: "5가지 오픈 방식. 높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 부드럽고 조용히 닫힙니다.",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    name: "LEGRABOX",
    cat: "박스 시스템",
    desc: "슬림한 서랍면 12.8mm, 최대 하중 70kg. 디자인과 기능을 모두 갖춘 프리미엄 서랍 시스템의 새로운 기준.",
    img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    name: "CLIP top BLUMOTION",
    cat: "경첩 시스템",
    desc: "경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어 무게에 관계없이 항상 매끄럽게 부드럽게 닫힙니다.",
    img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    name: "TIP-ON",
    cat: "모션 기술",
    desc: "핸들 없는 가구를 원터치로 여는 기계식 열기 시스템. 깔끔한 디자인과 직관적 편의성의 완벽한 조화.",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    name: "MOVENTO",
    cat: "러너 시스템",
    desc: "공중에 뜨는 듯 가벼운 서랍 움직임. BLUMOTION 소프트 클로징 내장. 최대 하중 70kg을 부드럽게 지지.",
    img: `${BASE}/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
];

const STATS = [
  { n: 2441, s: "M€", l: "전 세계 매출액", sub: "2024/25 회계연도" },
  { n: 9850, s: "명", l: "전 세계 임직원", sub: "글로벌 패밀리" },
  { n: 120, s: "+", l: "수출 대상국", sub: "개국" },
  { n: 6700, s: "명", l: "포어알베르크 직원", sub: "본사 소재지" },
  { n: 34, s: "개", l: "자회사·대리점", sub: "전 세계 네트워크" },
  { n: 8, s: "개", l: "포어알베르크 공장", sub: "본사 포함" },
];

/* ════════════════════════════════════════════════════════ */
export default function V4() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeProd, setActiveProd] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadOut, setLoadOut] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  /* 로딩 타이머 */
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 2400);
    const t2 = setTimeout(() => setLoadOut(true), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* 스크롤 */
  useEffect(() => {
    const fn = () => { setScrollY(window.scrollY); setNavScrolled(window.scrollY > 60); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* 3D 틸트 */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".v4-tilt");
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>("img");
      if (!img) return;
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        img.style.transform = `perspective(720px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.06)`;
        img.style.transition = "transform 0.06s ease";
      };
      const onLeave = () => {
        img.style.transform = "perspective(720px) rotateY(0deg) rotateX(0deg) scale(1)";
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

  /* 수평 스크롤 동기화 */
  const goProduct = (idx: number) => {
    setActiveProd(idx);
    scrollRef.current?.scrollTo({ left: idx * scrollRef.current.clientWidth, behavior: "smooth" });
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fn = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActiveProd(idx);
    };
    el.addEventListener("scroll", fn, { passive: true });
    return () => el.removeEventListener("scroll", fn);
  }, [loadOut]);

  const heroParallax = scrollY * 0.28;
  const heroOpacity = Math.max(0, 1 - scrollY / 700);

  /* ── CSS in JS ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
    :root { --gold: ${C.gold}; --navy: ${C.navy}; }

    @keyframes v4-load-up   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
    @keyframes v4-load-char { from{opacity:0;transform:translateY(40px) scaleY(1.15)} to{opacity:1;transform:none} }
    @keyframes v4-load-out  { to{transform:translateY(-100%);opacity:0} }
    @keyframes v4-ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes v4-scrollbar { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
    @keyframes v4-wipe-in   { 0%{transform:scaleX(0);transform-origin:left} 50%{transform:scaleX(1);transform-origin:left}
                               51%{transform:scaleX(1);transform-origin:right} 100%{transform:scaleX(0);transform-origin:right} }

    .v4-font-serif { font-family:'Cormorant Garamond','Georgia',serif; }
    .v4-font-sans  { font-family:'Helvetica Neue',Arial,sans-serif; }
    .v4-ticker     { animation:v4-ticker 36s linear infinite; }
    .v4-scrollbar  { animation:v4-scrollbar 2.5s cubic-bezier(0.4,0,0.2,1) infinite; }

    .v4-load-char  { display:inline-block; animation:v4-load-char 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4-load-sub   { animation:v4-load-up 1s cubic-bezier(0.16,1,0.3,1) 1.4s both; }
    .v4-load-out   { animation:v4-load-out 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }

    .v4-wipe-section { position:relative; overflow:hidden; }
    .v4-wipe-cover   { position:absolute;inset:0;background:${C.gold};z-index:20;transform:scaleX(0);pointer-events:none; }
    .v4-wipe-section.v4-wipe-go .v4-wipe-cover { animation:v4-wipe-in 1s cubic-bezier(0.77,0,0.18,1) both; }
    .v4-wipe-section.v4-wipe-go .v4-wipe-content { animation:v4-load-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
    .v4-wipe-content { opacity:0; }

    .v4-prod-scroll::-webkit-scrollbar { display:none; }
    .v4-prod-scroll { -ms-overflow-style:none; scrollbar-width:none; }

    .v4-tilt { cursor:none; }
    .v4-tilt img { transition:transform 0.7s cubic-bezier(0.25,1,0.5,1); }

    .v4-btn { transition:all 0.35s cubic-bezier(0.25,1,0.5,1); }
    .v4-btn:hover { transform:translateY(-3px); }
    .v4-nav-link { transition:color 0.2s ease; }
    .v4-nav-link:hover { color:${C.gold} !important; }

    .v4-timeline-dot { transition:transform 0.3s ease, background 0.3s ease; }
    .v4-timeline-item:hover .v4-timeline-dot { transform:scale(1.8); background:${C.gold}; }

    /* 수평 스크롤 snap */
    .v4-prod-scroll { scroll-snap-type:x mandatory; }
    .v4-prod-item   { scroll-snap-align:start; }
  `;

  /* ────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div className="v4-font-sans" style={{ backgroundColor: C.navy, color: C.white, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ LOADING SCREEN ══════════════════════════════════════════════════ */}
      {!loadOut && (
        <div
          className={loaded ? "v4-load-out" : ""}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            backgroundColor: C.navy,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Logo letter animation */}
          <div className="v4-font-serif" style={{ fontSize: "clamp(3.5rem,12vw,7rem)", fontWeight: 300, letterSpacing: "0.18em", color: C.gold }}>
            {"blum".split("").map((ch, i) => (
              <span key={i} className="v4-load-char" style={{ animationDelay: `${i * 120}ms` }}>{ch}</span>
            ))}
          </div>
          <div className="v4-load-sub" style={{ fontSize: "11px", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>
            moving ideas · since 1952
          </div>
          {/* Progress bar */}
          <div style={{ width: "120px", height: "1px", backgroundColor: "rgba(212,175,55,0.2)", marginTop: "12px", overflow: "hidden" }}>
            <div className="v4-load-sub" style={{ height: "100%", backgroundColor: C.gold, animation: "v4-load-up 2s linear 0.5s both", transformOrigin: "left" }} />
          </div>
        </div>
      )}

      {/* ══ NAV ═════════════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "64px",
        backgroundColor: navScrolled ? "rgba(13,17,23,0.95)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? `1px solid ${C.line}` : "none",
        transition: "all 0.4s ease",
      }}>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <Link href="/v4" className="v4-font-serif" style={{ color: C.gold, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>
            blum
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[["제품","#products"],["서비스","/v4/services"],["회사","/v4/company"],["연락처","/v4/contact"]].map(([label, href]) => (
              <Link key={label} href={href} className="v4-nav-link" style={{ color: C.gray, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {label}
              </Link>
            ))}
            <Link href="/v4/contact" className="v4-btn" style={{ color: C.navy, backgroundColor: C.gold, textDecoration: "none", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "9px 20px" }}>
              문의하기
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        {/* BG parallax */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.22, transform: `scale(1.1) translateY(${heroParallax}px)` }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy} 25%, rgba(13,17,23,0.65) 65%, rgba(13,17,23,0.2) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,17,23,0.7) 0%, transparent 60%)" }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 7rem", width: "100%", opacity: heroOpacity }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: C.gold, opacity: 0.6 }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: C.gray }}>Premium Furniture Fittings · Austria · Since 1952</span>
          </div>

          <h1 className="v4-font-serif" style={{ marginBottom: "1.5rem", lineHeight: 0.88, fontWeight: 300, fontSize: "clamp(4.5rem,13vw,11rem)", letterSpacing: "-0.01em" }}>
            <span style={{ color: C.white, display: "block" }}>moving</span>
            <span style={{ color: C.gold, fontStyle: "italic", display: "block" }}>ideas.</span>
          </h1>

          <p style={{ color: C.gray, fontSize: "15px", lineHeight: 2, fontWeight: 300, maxWidth: "340px", marginBottom: "2.5rem" }}>
            움직임이 달라지면 삶이 달라집니다.<br />blum이 만드는 정밀한 피팅의 세계.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="#products" className="v4-btn" style={{ color: C.navy, backgroundColor: C.gold, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 30px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              제품 살펴보기 <span>→</span>
            </Link>
            <Link href="#timeline" className="v4-btn" style={{ color: C.white, border: `1px solid ${C.line}`, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 30px" }}>
              브랜드 스토리
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 10 }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.gray, writingMode: "vertical-rl" }}>scroll</span>
          <div style={{ width: "1px", height: "56px", backgroundColor: `${C.gold}22`, position: "relative", overflow: "hidden" }}>
            <div className="v4-scrollbar" style={{ width: "100%", height: "45%", backgroundColor: `${C.gold}aa`, position: "absolute", top: 0 }} />
          </div>
        </div>
      </section>

      {/* ══ GOLD TICKER ═════════════════════════════════════════════════════ */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "12px 0", backgroundColor: "rgba(212,175,55,0.04)" }}>
        <div className="v4-ticker" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: `${C.gold}66`, paddingRight: "64px" }}>
              CLIP top · AVENTOS · LEGRABOX · TIP-ON · MOVENTO · BLUMOTION · SINCE 1952 · AUSTRIA ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══ TIMELINE ════════════════════════════════════════════════════════ */}
      <section id="timeline" style={{ padding: "120px 0", backgroundColor: "#0A0E14" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <R d={0}>
            <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${C.gold}88`, marginBottom: "14px" }}>Brand Story</p>
            <h2 className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 300, color: C.white, marginBottom: "80px", letterSpacing: "-0.01em" }}>
              1952년부터<br /><em style={{ color: C.gold }}>현재까지</em>
            </h2>
          </R>

          <div style={{ position: "relative" }}>
            {/* Center line */}
            <div className="hidden md:block" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", backgroundColor: C.line, transform: "translateX(-50%)" }} />

            {TIMELINE.map((item, i) => (
              <R key={item.y} d={i * 80} className="v4-timeline-item">
                {/* Desktop: alternating */}
                <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 48px 1fr", gap: "0", marginBottom: "64px", alignItems: "center" }}>
                  {i % 2 === 0 ? (
                    <>
                      <div style={{ textAlign: "right", paddingRight: "40px" }}>
                        <span className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: i === TIMELINE.length - 1 ? C.gold : `${C.gold}22`, display: "block", lineHeight: 1, marginBottom: "8px" }}>{item.y}</span>
                        <h3 style={{ fontSize: "16px", fontWeight: 400, color: C.white, marginBottom: "8px" }}>{item.t}</h3>
                        <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.85, fontWeight: 300 }}>{item.b}</p>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="v4-timeline-dot" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: `${C.gold}55`, border: `1px solid ${C.gold}66` }} />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="v4-timeline-dot" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: `${C.gold}55`, border: `1px solid ${C.gold}66` }} />
                      </div>
                      <div style={{ paddingLeft: "40px" }}>
                        <span className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: i === TIMELINE.length - 1 ? C.gold : `${C.gold}22`, display: "block", lineHeight: 1, marginBottom: "8px" }}>{item.y}</span>
                        <h3 style={{ fontSize: "16px", fontWeight: 400, color: C.white, marginBottom: "8px" }}>{item.t}</h3>
                        <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.85, fontWeight: 300 }}>{item.b}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile */}
                <div className="md:hidden" style={{ marginBottom: "44px", paddingLeft: "20px", borderLeft: `1px solid ${C.line}` }}>
                  <span className="v4-font-serif" style={{ fontSize: "2rem", fontWeight: 300, color: `${C.gold}44`, display: "block", marginBottom: "4px" }}>{item.y}</span>
                  <h3 style={{ fontSize: "15px", color: C.white, marginBottom: "6px" }}>{item.t}</h3>
                  <p style={{ fontSize: "12px", color: C.gray, lineHeight: 1.8, fontWeight: 300 }}>{item.b}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS — 수평 스크롤 ═══════════════════════════════════════════ */}
      <section id="products" style={{ backgroundColor: C.navy, padding: "100px 0 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 40px" }}>
          <R>
            <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${C.gold}88`, marginBottom: "14px" }}>Product World</p>
            <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 300, color: C.white, letterSpacing: "-0.01em" }}>
              움직임을 만드는<br /><em style={{ color: C.gold }}>제품들</em>
            </h2>
          </R>
        </div>

        {/* 수평 스크롤 컨테이너 */}
        <div
          ref={scrollRef}
          className="v4-prod-scroll"
          style={{ display: "flex", overflowX: "scroll", cursor: "grab" }}
        >
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              className="v4-prod-item"
              style={{ minWidth: "min(560px,90vw)", marginRight: "2px", position: "relative", flexShrink: 0 }}
            >
              {/* 3D tilt 카드 */}
              <div className="v4-tilt" style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden", backgroundColor: "#0A0E14" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.82, display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.3) 50%, transparent 100%)` }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px 32px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "8px" }}>{p.cat}</span>
                  <h3 className="v4-font-serif" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 300, color: C.white, marginBottom: "10px" }}>{p.name}</h3>
                  <p style={{ fontSize: "12px", color: C.gray, lineHeight: 1.8, fontWeight: 300 }}>{p.desc}</p>
                </div>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: `${C.gold}55` }}>0{i + 1}</span>
                </div>
              </div>
            </div>
          ))}
          <div style={{ minWidth: "2rem", flexShrink: 0 }} />
        </div>

        {/* 도트 네비게이션 */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "28px" }}>
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goProduct(i)}
              style={{
                width: activeProd === i ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: activeProd === i ? C.gold : `${C.gold}33`,
                border: "none", cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25,1,0.5,1)",
                padding: 0,
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.3em", color: C.gray, textTransform: "uppercase" }}>← 스와이프하여 탐색 →</span>
        </div>
      </section>

      {/* ══ 골드 와이프 배너 ═══════════════════════════════════════════════ */}
      <WipeBanner />

      {/* ══ STATS ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", backgroundColor: "#0A0E14" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <R>
            <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${C.gold}88`, marginBottom: "14px" }}>By The Numbers</p>
            <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: C.white, marginBottom: "64px", letterSpacing: "-0.01em" }}>
              숫자로 보는 <em style={{ color: C.gold }}>blum</em>
            </h2>
          </R>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", backgroundColor: C.line }}>
            {STATS.map((s, i) => (
              <R key={s.l} d={i * 70}>
                <div style={{ padding: "44px 32px", backgroundColor: "#0A0E14" }}>
                  <div className="v4-font-serif" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: "8px" }}>
                    <GCounter to={s.n} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: "13px", color: C.white, marginBottom: "4px" }}>{s.l}</div>
                  <div style={{ fontSize: "11px", color: C.gray }}>{s.sub}</div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SUSTAINABILITY ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "100px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={`${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`}
            alt="sustainability"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(13,17,23,0.9)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <R>
            <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${C.gold}88`, marginBottom: "14px" }}>Sustainability</p>
            <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: C.white, marginBottom: "56px", letterSpacing: "-0.01em" }}>
              지속가능한 미래를<br /><em style={{ color: C.gold }}>함께 만듭니다</em>
            </h2>
          </R>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "0" }}>
            {[
              { t: "에너지 및 기후 보호", b: "재생 에너지 사용 비율을 지속적으로 확대하고 탄소 발자국 최소화를 위해 노력합니다." },
              { t: "순환 경제", b: "자원 절약형 생산과 재료 재활용을 통해 순환 경제 실현에 기여합니다." },
              { t: "로컬 생산", b: "오스트리아 포어알베르크에서 생산해 환경 친화적 운송을 실천합니다." },
              { t: "지속가능한 품질", b: "100,000회 이상 개폐 테스트를 통과한 제품. 내구성이 곧 지속가능성입니다." },
              { t: "인적자원 관리", b: "9,850명 임직원의 건강과 안전을 최우선으로 하는 공정한 근무 환경." },
            ].map((s, i) => (
              <R key={s.t} d={i * 80}>
                <div style={{ padding: "28px 0", borderBottom: `1px solid ${C.line}` }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <span style={{ color: C.gold, fontSize: "14px", marginTop: "2px", flexShrink: 0 }}>◈</span>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 400, color: C.white, marginBottom: "7px" }}>{s.t}</h3>
                      <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.85, fontWeight: 300 }}>{s.b}</p>
                    </div>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT CTA ═════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", backgroundColor: C.navy }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <R>
              <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${C.gold}88`, marginBottom: "14px" }}>Contact & Showroom</p>
              <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: C.white, marginBottom: "24px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                쇼룸에서<br /><em style={{ color: C.gold }}>직접 경험하세요</em>
              </h2>
              <p style={{ fontSize: "14px", color: C.gray, lineHeight: 2, fontWeight: 300, marginBottom: "36px" }}>
                전문 컨설턴트가 공간에 최적화된<br />blum 솔루션을 제안해드립니다.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/v4/contact" className="v4-btn" style={{ color: C.navy, backgroundColor: C.gold, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 28px" }}>
                  쇼룸 방문 신청
                </Link>
                <Link href="/v4/contact" className="v4-btn" style={{ color: C.white, border: `1px solid ${C.line}`, textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 28px" }}>
                  제품 문의
                </Link>
              </div>
            </R>
            <R d={150}>
              <div style={{ borderLeft: `1px solid ${C.line}`, paddingLeft: "48px" }}>
                {[
                  { l: "서울 쇼룸", v: "서울특별시 강남구 테헤란로 431\n저스트코 타워 2층" },
                  { l: "전화",     v: "02-6925-0800" },
                  { l: "이메일",   v: "info.korea@blum.com" },
                  { l: "영업시간", v: "월–금 09:00–18:00" },
                  { l: "본사",     v: "Julius Blum GmbH\nIndustriestrasse 1 · 6973 Höchst, Austria" },
                ].map((item) => (
                  <div key={item.l} style={{ marginBottom: "24px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${C.gold}66`, display: "block", marginBottom: "5px" }}>{item.l}</span>
                    <p style={{ fontSize: "14px", color: C.gray, fontWeight: 300, lineHeight: 1.75, whiteSpace: "pre-line" }}>{item.v}</p>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${C.line}`, padding: "28px 2rem", backgroundColor: "#080B10" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span className="v4-font-serif" style={{ fontSize: "16px", fontWeight: 300, color: `${C.gold}66`, letterSpacing: "0.2em" }}>blum</span>
          <span style={{ fontSize: "11px", color: `${C.white}33` }}>© 2025 Blum Korea. Julius Blum GmbH · Höchst, Austria</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {[["V1","/v1"],["V2","/v2"],["V3","/v3"],["V4","/v4"]].map(([l,h]) => (
              <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? `${C.gold}99` : `${C.white}33`, textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── 골드 컬러 와이프 배너 (분리 컴포넌트) ── */
function WipeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`v4-wipe-section${active ? " v4-wipe-go" : ""}`} style={{ backgroundColor: "#0A0E14", padding: "80px 2rem", textAlign: "center" }}>
      <div className="v4-wipe-cover" />
      <div className="v4-wipe-content" style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: "#D4AF3788", marginBottom: "14px" }}>Our Philosophy</p>
        <blockquote style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: "clamp(1.5rem,4vw,3rem)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.45, maxWidth: "720px", margin: "0 auto 32px", fontStyle: "italic", letterSpacing: "-0.01em" }}>
          "편리함을 높이고<br />삶의 질을 향상시키는<br />가구 피팅."
        </blockquote>
        <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#D4AF3766" }}>Julius Blum GmbH · Since 1952</span>
      </div>
    </div>
  );
}
