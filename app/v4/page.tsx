"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

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

function Reveal({ children, delay = 0, className = "", y = 50 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
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

function Counter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimals]);
  return <span ref={ref}>{decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}{suffix}</span>;
}

const TIMELINE = [
  { year: "1952", title: "창립", body: "Julius Blum이 오스트리아 포어알베르크 주 회흐스트에 설립. 말굽 못 제조업으로 시작해 정밀 금속 가공 기술을 축적했습니다." },
  { year: "1970s", title: "피팅으로의 전환", body: "가구 피팅 분야로 전환. 경첩과 서랍 레일 개발을 시작하며 주방 가구 시장에 진입했습니다." },
  { year: "1990s", title: "CLIP 시스템", body: "혁신적인 CLIP 경첩 시스템 출시. 공구 없이 탈착 가능한 설계로 전 세계 가구 제조업체에 채택되었습니다." },
  { year: "2000s", title: "BLUMOTION", body: "통합 댐핑 기술 BLUMOTION 개발. 도어와 서랍이 마지막 순간 스스로 부드럽게 닫히는 혁신을 이루었습니다." },
  { year: "2010s", title: "LEGRABOX", body: "슬림한 서랍면(12.8mm)의 LEGRABOX 출시. 디자인과 기능을 모두 갖춘 서랍 시스템으로 시장을 선도했습니다." },
  { year: "현재", title: "글로벌 리더", body: "2,441백만 유로 매출, 9,850명 임직원, 120개국 수출. 3대째 가족 경영으로 혁신을 이어가고 있습니다." },
];

const PRODUCTS = [
  {
    name: "AVENTOS",
    category: "리프트 시스템",
    desc: "높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 5가지 오픈 방식, 부드럽고 조용한 움직임.",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    name: "LEGRABOX",
    category: "박스 시스템",
    desc: "슬림한 서랍면(12.8mm)으로 최대 하중 70kg 지지. 디자인과 기능을 모두 갖춘 프리미엄 서랍 시스템.",
    img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    name: "CLIP top BLUMOTION",
    category: "경첩 시스템",
    desc: "경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어의 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    name: "TIP-ON",
    category: "모션 기술",
    desc: "핸들 없는 가구를 원터치로 여는 기계식 열기 시스템. 깔끔한 디자인과 편리한 사용성의 완벽한 조화.",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
];

const STATS = [
  { val: 2441, suffix: "M€", label: "전 세계 매출액", sub: "2024/25 회계연도", decimals: 0 },
  { val: 9850, suffix: "명", label: "전 세계 임직원", sub: "글로벌 패밀리", decimals: 0 },
  { val: 120, suffix: "개국+", label: "수출 대상국", sub: "전 세계 파트너십", decimals: 0 },
  { val: 70, suffix: "년+", label: "가구 피팅 역사", sub: "1952년 창립", decimals: 0 },
  { val: 8, suffix: "개", label: "포어알베르크 공장", sub: "Made in Austria", decimals: 0 },
  { val: 34, suffix: "개소", label: "자회사 및 대리점", sub: "글로벌 네트워크", decimals: 0 },
];

const SUSTAIN = [
  { icon: "◈", title: "로컬 생산", body: "오스트리아 포어알베르크 지역에서 생산해 운송 거리를 최소화합니다." },
  { icon: "◈", title: "재생 에너지", body: "생산 시설에서 재생 가능 에너지 사용을 지속적으로 확대하고 있습니다." },
  { icon: "◈", title: "내구성 철학", body: "오래 사용할 수 있는 고품질 제품을 만들어 자원 낭비를 줄이는 것이 blum의 핵심 가치입니다." },
  { icon: "◈", title: "친환경 포장", body: "FSC 인증 포장재를 사용하고 포장재 사용량을 지속적으로 줄이고 있습니다." },
  { icon: "◈", title: "안전한 근무 환경", body: "임직원의 안전과 복지를 최우선으로 생각하는 공정한 근무 환경을 조성합니다." },
];

export default function V4() {
  const [scrollY, setScrollY] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const fn = () => { setScrollY(window.scrollY); setNavScrolled(window.scrollY > 60); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const heroParallax = scrollY * 0.3;
  const heroOpacity = Math.max(0, 1 - scrollY / 700);

  return (
    <div style={{ backgroundColor: "#050505", color: "#f0f0f0", fontFamily: "'Helvetica Neue', Arial, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes v4-hero-in { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }
        @keyframes v4-ticker { from { transform:translateX(0) } to { transform:translateX(-50%) } }
        @keyframes v4-scrollbar { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
        .v4-ticker { animation: v4-ticker 32s linear infinite; }
        .v4-scrollbar { animation: v4-scrollbar 2.4s cubic-bezier(0.4,0,0.2,1) infinite; }
        .v4-product-card { transition: transform 0.5s cubic-bezier(0.25,1,0.5,1), box-shadow 0.5s ease; cursor: pointer; overflow: hidden; }
        .v4-product-card:hover { transform: scale(1.03); box-shadow: 0 30px 80px rgba(0,0,0,0.8); }
        .v4-product-card .v4-card-img { transition: transform 0.7s cubic-bezier(0.25,1,0.5,1); }
        .v4-product-card:hover .v4-card-img { transform: scale(1.07); }
        .v4-timeline-dot { transition: transform 0.3s ease, background-color 0.3s ease; }
        .v4-timeline-item:hover .v4-timeline-dot { transform: scale(1.5); background-color: #e63329; }
        .v4-btn { transition: all 0.35s cubic-bezier(0.25,1,0.5,1); }
        .v4-btn:hover { transform: translateY(-2px); }
        .v4-nav-link { transition: color 0.2s ease; }
        .v4-sustain-item { transition: transform 0.3s ease; }
        .v4-sustain-item:hover { transform: translateX(8px); }
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "60px",
        backgroundColor: navScrolled ? "rgba(5,5,5,0.96)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <Link href="/v4" style={{ color: "#fff", textDecoration: "none", fontSize: "18px", fontWeight: 300, letterSpacing: "0.35em", textTransform: "uppercase" }}>
            blum
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[["제품", "/v4#products"], ["서비스", "/v4/services"], ["회사", "/v4/company"], ["연락처", "/v4/contact"]].map(([label, href]) => (
              <Link key={label} href={href} className="v4-nav-link" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {label}
              </Link>
            ))}
            <Link href="/v4/contact" className="v4-btn" style={{ color: "#fff", textDecoration: "none", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "8px 20px", border: "1px solid rgba(255,255,255,0.2)" }}>
              문의하기
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", backgroundColor: "#050505" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
            alt="blum kitchen"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.28, transform: `scale(1.1) translateY(${heroParallax}px)` }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 25%, rgba(5,5,5,0.6) 65%, rgba(5,5,5,0.15) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,5,0.7) 0%, transparent 55%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 6rem", width: "100%", opacity: heroOpacity }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "12px", marginBottom: "2.5rem",
            animation: heroReady ? "v4-hero-in 1s cubic-bezier(0.16,1,0.3,1) 0ms both" : "none",
          }}>
            <div style={{ width: "28px", height: "1px", backgroundColor: "rgba(255,255,255,0.25)" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
              Premium Furniture Fittings · Austria · Since 1952
            </span>
          </div>

          <h1 style={{
            color: "#fff", marginBottom: "1.5rem", lineHeight: 0.88, userSelect: "none",
            fontSize: "clamp(4rem, 13vw, 11rem)", fontWeight: 200, letterSpacing: "-0.03em",
            animation: heroReady ? "v4-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 150ms both" : "none",
          }}>
            moving<br />
            <span style={{ color: "#e63329", fontStyle: "italic" }}>ideas.</span>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 2, maxWidth: "320px", fontWeight: 300, marginBottom: "2.5rem",
            animation: heroReady ? "v4-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 350ms both" : "none",
          }}>
            움직임이 달라지면 삶이 달라집니다.<br />
            blum이 만드는 정밀한 피팅의 세계.
          </p>

          <div style={{
            display: "flex", flexWrap: "wrap", gap: "1rem",
            animation: heroReady ? "v4-hero-in 1.1s cubic-bezier(0.16,1,0.3,1) 500ms both" : "none",
          }}>
            <Link href="#products" className="v4-btn" style={{
              color: "#fff", textDecoration: "none", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
              padding: "14px 28px", backgroundColor: "#e63329", display: "inline-flex", alignItems: "center", gap: "8px",
            }}>
              제품 살펴보기 <span>→</span>
            </Link>
            <Link href="/v4/company" className="v4-btn" style={{
              color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
              padding: "14px 28px", border: "1px solid rgba(255,255,255,0.15)", display: "inline-flex", alignItems: "center", gap: "8px",
            }}>
              브랜드 스토리
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 10 }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", writingMode: "vertical-rl", marginBottom: "4px" }}>scroll</span>
          <div style={{ width: "1px", height: "56px", backgroundColor: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
            <div className="v4-scrollbar" style={{ width: "100%", height: "45%", backgroundColor: "rgba(230,51,41,0.7)", position: "absolute", top: 0 }} />
          </div>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 0", backgroundColor: "#0a0a0a" }}>
        <div className="v4-ticker" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", paddingRight: "64px" }}>
              CLIP top · AVENTOS · LEGRABOX · TIP-ON · MOVENTO · REVEGO · BLUMOTION · SINCE 1952 ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══ BRAND STORY TIMELINE ══ */}
      <section style={{ padding: "120px 0", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Brand Story</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 200, letterSpacing: "-0.02em", marginBottom: "80px", color: "#fff" }}>
              1952년부터<br />
              <span style={{ color: "#e63329" }}>현재까지</span>
            </h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", backgroundColor: "rgba(255,255,255,0.06)", transform: "translateX(-50%)" }} className="hidden md:block" />

            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 100} className="v4-timeline-item">
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center",
                  marginBottom: "56px", direction: i % 2 === 0 ? "ltr" : "rtl",
                }} className="hidden md:grid">
                  <div style={{ textAlign: i % 2 === 0 ? "right" : "left", direction: "ltr" }}>
                    <span style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "-0.02em", color: i === TIMELINE.length - 1 ? "#e63329" : "rgba(255,255,255,0.12)", display: "block", marginBottom: "8px" }}>{item.year}</span>
                    <h3 style={{ fontSize: "18px", fontWeight: 400, marginBottom: "12px", color: "#fff" }}>{item.title}</h3>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontWeight: 300, maxWidth: "320px", marginLeft: i % 2 === 0 ? "auto" : 0, marginRight: i % 2 === 1 ? "auto" : 0 }}>{item.body}</p>
                  </div>
                  <div style={{ position: "relative", direction: "ltr" }}>
                    <div className="v4-timeline-dot" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", position: "absolute", [i % 2 === 0 ? "left" : "right"]: "-5px", top: "50%", transform: "translateY(-50%)", zIndex: 2, border: "1px solid rgba(255,255,255,0.1)" }} />
                  </div>
                </div>
                {/* Mobile layout */}
                <div className="md:hidden" style={{ marginBottom: "48px", paddingLeft: "24px", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 200, color: "rgba(255,255,255,0.15)", display: "block", marginBottom: "6px" }}>{item.year}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 400, marginBottom: "8px", color: "#fff" }}>{item.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, fontWeight: 300 }}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section id="products" style={{ padding: "120px 0", backgroundColor: "#050505" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Product World</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "-0.02em", marginBottom: "64px", color: "#fff" }}>
              주요 제품
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px" }}>
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="v4-product-card" style={{ position: "relative", aspectRatio: "3/4", backgroundColor: "#111" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    className="v4-card-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.2) 50%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#e63329", display: "block", marginBottom: "8px" }}>{p.category}</span>
                    <h3 style={{ fontSize: "20px", fontWeight: 400, color: "#fff", marginBottom: "8px" }}>{p.name}</h3>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
                  </div>
                  <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>0{i + 1}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NUMBERS ══ */}
      <section style={{ padding: "120px 0", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>By The Numbers</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "-0.02em", marginBottom: "80px", color: "#fff" }}>
              숫자로 보는<br />
              <span style={{ color: "#e63329" }}>blum</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", backgroundColor: "rgba(255,255,255,0.04)" }} className="grid-cols-2 md:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div style={{ padding: "48px 32px", backgroundColor: "#080808" }}>
                  <div style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 200, letterSpacing: "-0.02em", color: "#fff", marginBottom: "8px", lineHeight: 1 }}>
                    <Counter target={s.val} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SUSTAINABILITY ══ */}
      <section style={{ position: "relative", padding: "120px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={`${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`}
            alt="sustainability"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(5,5,5,0.88)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Sustainability</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "-0.02em", marginBottom: "64px", color: "#fff" }}>
              지속가능한 미래를 위한<br />
              <span style={{ color: "#e63329" }}>blum</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0" }}>
            {SUSTAIN.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="v4-sustain-item" style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                    <span style={{ color: "#e63329", fontSize: "14px", marginTop: "2px", flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 400, color: "#fff", marginBottom: "8px" }}>{s.title}</h3>
                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontWeight: 300 }}>{s.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT / SHOWROOM ══ */}
      <section style={{ padding: "120px 0", backgroundColor: "#050505" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
            <Reveal>
              <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Contact &amp; Showroom</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 200, letterSpacing: "-0.02em", marginBottom: "40px", color: "#fff", lineHeight: 1.15 }}>
                쇼룸에서<br />직접 경험하세요
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 2, fontWeight: 300, marginBottom: "40px" }}>
                전문 컨설턴트가 공간에 최적화된 blum 솔루션을 제안해드립니다.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/v4/contact" className="v4-btn" style={{
                  color: "#fff", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "14px 28px", backgroundColor: "#e63329",
                }}>
                  쇼룸 방문 신청
                </Link>
                <Link href="/v4/contact" className="v4-btn" style={{
                  color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "14px 28px", border: "1px solid rgba(255,255,255,0.15)",
                }}>
                  제품 문의
                </Link>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", paddingLeft: "48px" }}>
                {[
                  { label: "서울 쇼룸", value: "서울특별시 강남구 테헤란로 431\n저스트코 타워 2층" },
                  { label: "전화", value: "02-6925-0800" },
                  { label: "이메일", value: "info.korea@blum.com" },
                  { label: "영업시간", value: "월–금 09:00–18:00" },
                  { label: "본사 (오스트리아)", value: "Julius Blum GmbH\nIndustriestrasse 1 · 6973 Höchst" },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: "28px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "6px" }}>{item.label}</span>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 0", backgroundColor: "#030303" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
              © 2025 Blum Korea. Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria
            </span>
            <div style={{ display: "flex", gap: "24px" }}>
              {[["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]].map(([l, h]) => (
                <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? "rgba(230,51,41,0.7)" : "rgba(255,255,255,0.2)", textDecoration: "none" }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
