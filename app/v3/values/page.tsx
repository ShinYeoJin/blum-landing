"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const GOLD  = "#D4AF37";
const NAVY  = "#0D1117";
const CREAM = "#F5F0E8";
const GRAY  = "rgba(245,240,232,0.55)";
const LINE  = "rgba(212,175,55,0.18)";

const VALUES = [
  {
    num:  "01",
    en:   "Convenience",
    ko:   "편리함",
    body: "편리함을 높이고 삶의 질을 향상시키는 고품질 가구용 피팅을 제조합니다.",
    img:  "https://www.blum.com/images/560/258/4215299/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
    imgSide: "right" as const,
  },
  {
    num:  "02",
    en:   "Innovation",
    ko:   "혁신",
    body: "가구의 열고 닫음을 매력적인 경험으로 만들어 드립니다. blum의 moving ideas.",
    img:  "https://www.blum.com/images/560/258/4207125/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1659_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg",
    imgSide: "left" as const,
  },
  {
    num:  "03",
    en:   "Trust",
    ko:   "신뢰",
    body: "blum의 혁신적인 제품은 가구 수명이 오래 지속될 수 있도록 설계됩니다. 좋은 서비스는 좋은 상담으로 시작합니다.",
    img:  "https://www.blum.com/images/560/258/4188512/corporate/media/bilder/unternehmen/IMG1146_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg",
    imgSide: "right" as const,
  },
  {
    num:  "04",
    en:   "Sustainability",
    ko:   "지속가능성",
    body: "사회, 환경, 직원에 대한 기업 책임. 자연 자원을 미래 세대를 위해 보존하는 것이 blum의 핵심 가치입니다.",
    img:  "https://www.blum.com/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg",
    imgSide: "left" as const,
  },
];

export default function V4Values() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [scrollY,     setScrollY]     = useState(0);

  const valRefs                      = useRef<Array<HTMLDivElement | null>>([]);
  const [valVisible, setValVisible]  = useState<boolean[]>(VALUES.map(() => false));

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 400);
  };

  useEffect(() => {
    const fn = () => { setScrollY(window.scrollY); setNavScrolled(window.scrollY > 60); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    valRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setValVisible(p => { const n = [...p]; n[i] = true; return n; });
      }, { threshold: 0.12 });
      io.observe(el); observers.push(io);
    });
    return () => observers.forEach(io => io.disconnect());
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
    .v4v-serif { font-family:'Cormorant Garamond','Georgia',serif; }
    .v4v-nav-link { transition:color 0.2s ease; }
    .v4v-nav-link:hover { color:${GOLD} !important; }

    @keyframes v4v-menu-in  { from{transform:translateY(-100%)} to{transform:translateY(0)} }
    @keyframes v4v-menu-out { from{transform:translateY(0)} to{transform:translateY(-100%)} }
    @keyframes v4v-item-in  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

    .v4v-hamburger { display:none; background:none; border:none; color:${CREAM}; font-size:22px; cursor:pointer; padding:4px 8px; line-height:1; }
    .v4v-mobile-menu { position:fixed; inset:0; background:${NAVY}; z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:36px; overflow:hidden; }
    .v4v-mobile-menu.v4v-menu-opening { animation:v4v-menu-in 0.4s ease-out forwards; }
    .v4v-mobile-menu.v4v-menu-closing { animation:v4v-menu-out 0.4s ease-in forwards; }
    .v4v-mobile-link { color:#c9a84c; text-decoration:none; font-size:28px; letter-spacing:0.2em; text-transform:uppercase; font-family:'Cormorant Garamond',Georgia,serif; font-weight:300; opacity:0; }
    .v4v-mobile-menu.v4v-menu-opening .v4v-mobile-link { animation:v4v-item-in 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    .v4v-mobile-menu.v4v-menu-opening .v4v-mobile-link:nth-child(2) { animation-delay:0.12s; }
    .v4v-mobile-menu.v4v-menu-opening .v4v-mobile-link:nth-child(3) { animation-delay:0.20s; }
    .v4v-mobile-menu.v4v-menu-opening .v4v-mobile-link:nth-child(4) { animation-delay:0.28s; }
    .v4v-mobile-menu.v4v-menu-opening .v4v-mobile-link:nth-child(5) { animation-delay:0.36s; }
    .v4v-mobile-close { position:absolute; top:20px; right:24px; background:none; border:none; color:#c9a84c; font-size:28px; cursor:pointer; line-height:1; }

    .v4v-val-img-wrap { overflow:hidden; }
    .v4v-val-img { transition:transform 0.9s cubic-bezier(0.25,1,0.5,1); }

    @media (max-width:768px) {
      .v4v-nav-desktop { display:none !important; }
      .v4v-hamburger   { display:block !important; }
      .v4v-val-panel   { flex-direction:column !important; height:auto !important; }
      .v4v-val-img-wrap { flex:none !important; width:100% !important; height:50vh !important; }
      .v4v-val-img-wrap img { height:50vh !important; }
    }
  `;

  return (
    <div style={{ backgroundColor: NAVY, color: CREAM, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ NAV ════════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "64px",
        backgroundColor: navScrolled ? "rgba(13,17,23,0.96)" : "rgba(13,17,23,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: navScrolled ? `1px solid ${LINE}` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/v3" className="v4v-serif" style={{ color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>blum</Link>
          <div className="v4v-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([["제품", "/v3#products"], ["가치", "/v3/values"], ["서비스", "/v3/services"], ["Contact Us", "/v3/contact"]] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="v4v-nav-link" style={{
                color: label === "가치" ? GOLD : GRAY,
                textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                borderBottom: label === "가치" ? `1px solid ${GOLD}44` : "none",
                paddingBottom: label === "가치" ? "2px" : "0",
              }}>{label}</Link>
            ))}
          </div>
          <button className="v4v-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="메뉴 열기">☰</button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ════════════════════════════════════════════════ */}
      {menuOpen && (
        <div className={`v4v-mobile-menu ${menuClosing ? "v4v-menu-closing" : "v4v-menu-opening"}`}>
          <button className="v4v-mobile-close" onClick={closeMenu} aria-label="메뉴 닫기">✕</button>
          {([["제품", "/v3#products"], ["가치", "/v3/values"], ["서비스", "/v3/services"], ["Contact Us", "/v3/contact"]] as [string, string][]).map(([label, href]) => (
            <Link key={label} href={href} className="v4v-mobile-link" onClick={closeMenu}>{label}</Link>
          ))}
        </div>
      )}

      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: "120px", paddingBottom: "60px", maxWidth: "1280px", margin: "0 auto", padding: "120px 2rem 60px" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}88`, marginBottom: "16px" }}>Core Values · blum</p>
        <h1 className="v4v-serif" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 300, color: CREAM, lineHeight: 1.05, marginBottom: "24px" }}>
          blum이 추구하는<br /><em style={{ color: GOLD }}>네 가지 가치</em>
        </h1>
        <div style={{ width: "48px", height: "1px", backgroundColor: `${GOLD}55` }} />
      </section>

      {/* ══ VALUES — 각 패널 100vh sticky ══════════════════════════════ */}
      {VALUES.map((v, i) => {
        const visible  = valVisible[i];
        const imgLeft  = v.imgSide === "left";
        const parallax = (scrollY - 200 * (i + 1)) * 0.04;

        return (
          <div key={v.num} style={{ height: "100vh", position: "relative" }}>
            <div
              ref={(el) => { valRefs.current[i] = el; }}
              className="v4v-val-panel"
              style={{
                position: "sticky", top: 0, height: "100vh", overflow: "hidden",
                display: "flex",
                flexDirection: imgLeft ? "row" : "row-reverse",
                borderTop: `1px solid ${LINE}`,
              }}
            >
              {/* 이미지 절반 */}
              <div className="v4v-val-img-wrap" style={{
                flex: "0 0 52%", position: "relative", overflow: "hidden",
                opacity:    visible ? 1 : 0,
                transform:  visible ? "none" : imgLeft ? "translateX(-56px)" : "translateX(56px)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 100ms, transform 1s cubic-bezier(0.16,1,0.3,1) 100ms",
              }}>
                <img
                  src={v.img}
                  alt={v.ko}
                  className="v4v-val-img"
                  style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transform: `scale(1.04) translateY(${parallax}px)`,
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: imgLeft
                    ? `linear-gradient(to right, transparent 65%, ${NAVY} 100%)`
                    : `linear-gradient(to left,  transparent 65%, ${NAVY} 100%)`,
                }} />
              </div>

              {/* 텍스트 절반 */}
              <div style={{
                flex: 1, display: "flex", alignItems: "center",
                padding: "60px clamp(28px,5%,72px)",
                backgroundColor: NAVY,
              }}>
                <div>
                  {/* 번호 */}
                  <div className="v4v-serif" style={{
                    fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 300,
                    color: `${GOLD}18`, lineHeight: 1, marginBottom: "12px", userSelect: "none",
                    opacity:    visible ? 1 : 0,
                    transform:  visible ? "none" : "translateY(32px) scaleY(1.1)",
                    transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 80ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 80ms",
                  }}>{v.num}</div>

                  {/* 영문 라벨 */}
                  <p style={{
                    fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase",
                    color: `${GOLD}88`, marginBottom: "14px",
                    opacity:    visible ? 1 : 0,
                    transform:  visible ? "none" : "translateY(18px)",
                    transition: "opacity 0.8s ease 200ms, transform 0.8s ease 200ms",
                  }}>{v.en}</p>

                  {/* 한국어 제목 — 마스크 언베일 */}
                  <div style={{
                    clipPath:   visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    transition: "clip-path 0.85s cubic-bezier(0.77,0,0.18,1) 280ms",
                  }}>
                    <h3 className="v4v-serif" style={{
                      fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 300,
                      color: CREAM, lineHeight: 1.05, marginBottom: "24px",
                    }}>{v.ko}</h3>
                  </div>

                  {/* 구분선 */}
                  <div style={{
                    width: "40px", height: "1px", backgroundColor: `${GOLD}55`, marginBottom: "22px",
                    transform:  visible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.7s cubic-bezier(0.77,0,0.18,1) 480ms",
                  }} />

                  {/* 본문 텍스트 */}
                  {v.body.split(". ").map((sentence, si) => (
                    <p key={si} style={{
                      fontSize: "15px", color: GRAY, lineHeight: 1.95, marginBottom: "4px",
                      opacity:    visible ? 1 : 0,
                      transform:  visible ? "none" : "translateY(16px)",
                      transition: `opacity 0.8s ease ${560 + si * 120}ms, transform 0.8s ease ${560 + si * 120}ms`,
                    }}>
                      {sentence}{si < v.body.split(". ").length - 1 ? "." : ""}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ══ FOOTER ═════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "28px 2rem", backgroundColor: "#080B10" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span className="v4v-serif" style={{ fontSize: "16px", fontWeight: 300, color: `${GOLD}66`, letterSpacing: "0.2em" }}>blum</span>
          <span style={{ fontSize: "11px", color: `${CREAM}33` }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</span>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {([["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v3"]] as [string, string][]).map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? `${GOLD}99` : `${CREAM}33`, textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
