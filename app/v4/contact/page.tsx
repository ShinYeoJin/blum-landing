"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const GOLD  = "#D4AF37";
const NAVY  = "#0D1117";
const CREAM = "#F5F0E8";
const GRAY  = "rgba(245,240,232,0.55)";
const LINE  = "rgba(212,175,55,0.18)";

/* ── Scroll reveal ────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SlideIn({ children, from = "left", delay = 0, className = "" }: {
  children: React.ReactNode; from?: "left" | "right" | "bottom"; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  const initial = from === "left" ? "translateX(-60px)" : from === "right" ? "translateX(60px)" : "translateY(40px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : initial,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── Input field ─────────────────────────────────────────────────── */
const INPUT: React.CSSProperties = {
  width: "100%", padding: "14px 0", backgroundColor: "transparent",
  border: "none", borderBottom: `1px solid rgba(212,175,55,0.25)`,
  color: CREAM, fontSize: "14px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
  outline: "none", transition: "border-color 0.3s ease",
};

/* ══════════════════════════════════════════════════════════════════ */
export default function V4Contact() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 400);
  };

  /* Hero text animation */
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [sub, setSub] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setH1(true), 100);
    const t2 = setTimeout(() => setH2(true), 350);
    const t3 = setTimeout(() => setSub(true), 650);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
    .v4c-serif { font-family:'Cormorant Garamond','Georgia',serif; }
    .v4c-nav-link:hover { color:${GOLD} !important; }
    .v4c-input:focus { border-bottom-color:${GOLD} !important; }
    .v4c-input::placeholder { color:rgba(245,240,232,0.2); }
    .v4c-btn { transition:all 0.35s cubic-bezier(0.25,1,0.5,1); }
    .v4c-btn:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(212,175,55,0.3); }

    @keyframes v4c-slide-r { from{opacity:0;transform:translateX(80px)} to{opacity:1;transform:none} }
    @keyframes v4c-slide-l { from{opacity:0;transform:translateX(-80px)} to{opacity:1;transform:none} }
    @keyframes v4c-fade    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

    .v4c-h1r { animation: v4c-slide-r 0.95s cubic-bezier(0.16,1,0.3,1) both; }
    .v4c-h1l { animation: v4c-slide-l 0.95s cubic-bezier(0.16,1,0.3,1) both; }
    .v4c-sub { animation: v4c-fade    0.95s cubic-bezier(0.16,1,0.3,1) both; }

    @keyframes v4c-menu-in  { from{transform:translateY(-100%)} to{transform:translateY(0)} }
    @keyframes v4c-menu-out { from{transform:translateY(0)} to{transform:translateY(-100%)} }
    @keyframes v4c-item-in  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

    .v4c-hamburger { display:none; background:none; border:none; color:${CREAM}; font-size:22px; cursor:pointer; padding:4px 8px; line-height:1; }
    .v4c-mobile-menu { position:fixed; inset:0; background:#0a0e1a; z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:36px; overflow:hidden; }
    .v4c-mobile-menu.v4c-menu-opening { animation:v4c-menu-in 0.4s ease-out forwards; }
    .v4c-mobile-menu.v4c-menu-closing { animation:v4c-menu-out 0.4s ease-in forwards; }
    .v4c-mobile-link { color:#c9a84c; text-decoration:none; font-size:28px; letter-spacing:0.2em; text-transform:uppercase; font-family:'Cormorant Garamond',Georgia,serif; font-weight:300; opacity:0; }
    .v4c-mobile-link:hover { color:${GOLD}; }
    .v4c-mobile-menu.v4c-menu-opening .v4c-mobile-link { animation:v4c-item-in 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    .v4c-mobile-menu.v4c-menu-opening .v4c-mobile-link:nth-child(2) { animation-delay:0.12s; }
    .v4c-mobile-menu.v4c-menu-opening .v4c-mobile-link:nth-child(3) { animation-delay:0.20s; }
    .v4c-mobile-menu.v4c-menu-opening .v4c-mobile-link:nth-child(4) { animation-delay:0.28s; }
    .v4c-mobile-menu.v4c-menu-opening .v4c-mobile-link:nth-child(5) { animation-delay:0.36s; }
    .v4c-mobile-close { position:absolute; top:20px; right:24px; background:none; border:none; color:#c9a84c; font-size:28px; cursor:pointer; line-height:1; }

    @media (max-width:768px) {
      .v4c-nav-desktop { display:none !important; }
      .v4c-hamburger   { display:block !important; }
      .v4c-contact-grid { grid-template-columns:1fr !important; gap:40px !important; }
      .v4c-form-col    { order:-1 !important; }
      .v4c-name-row    { grid-template-columns:1fr !important; }
      .v4c-hq-grid     { grid-template-columns:1fr 1fr !important; }
      .v4c-section-pad { padding:0 1rem 80px !important; }
      .v4c-hero-pad    { padding:120px 1rem 60px !important; }
    }
  `;

  return (
    <div style={{ backgroundColor: NAVY, color: CREAM, fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ NAV ════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "64px",
        backgroundColor: navScrolled ? "rgba(13,17,23,0.96)" : "rgba(13,17,23,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: navScrolled ? `1px solid ${LINE}` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/v4" className="v4c-serif" style={{ color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>blum</Link>
          <div className="v4c-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([
              ["제품",   "/v4#products"],
              ["가치",   "/v4/values"],
              ["서비스", "/v4/services"],
              ["연락처", "/v4/contact"],
            ] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="v4c-nav-link" style={{
                color: label === "연락처" ? GOLD : GRAY,
                textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                borderBottom: label === "연락처" ? `1px solid ${GOLD}44` : "none",
                paddingBottom: label === "연락처" ? "2px" : "0",
              }}>{label}</Link>
            ))}
          </div>
          <button className="v4c-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="메뉴 열기">☰</button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ════════════════════════════════════════════ */}
      {menuOpen && (
        <div className={`v4c-mobile-menu ${menuClosing ? "v4c-menu-closing" : "v4c-menu-opening"}`}>
          <button className="v4c-mobile-close" onClick={closeMenu} aria-label="메뉴 닫기">✕</button>
          {([["제품", "/v4#products"], ["가치", "/v4/values"], ["서비스", "/v4/services"], ["연락처", "/v4/contact"]] as [string, string][]).map(([label, href]) => (
            <Link key={label} href={href} className="v4c-mobile-link" onClick={closeMenu}>{label}</Link>
          ))}
        </div>
      )}

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="v4c-hero-pad" style={{
        paddingTop: "160px", paddingBottom: "100px",
        maxWidth: "1280px", margin: "0 auto", padding: "160px 2rem 100px",
      }}>
        <p style={{
          fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase",
          color: `${GOLD}77`, marginBottom: "28px",
          opacity: h1 ? 1 : 0, transition: "opacity 0.5s ease",
        }}>Contact &amp; Showroom · blum Korea</p>

        <div style={{ overflow: "hidden", marginBottom: "6px" }}>
          {h1 && (
            <h1 className="v4c-serif v4c-h1r" style={{
              fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300,
              color: CREAM, lineHeight: 0.95, margin: 0,
            }}>쇼룸에서</h1>
          )}
        </div>
        <div style={{ overflow: "hidden", marginBottom: "40px" }}>
          {h2 && (
            <h1 className="v4c-serif v4c-h1l" style={{
              fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300,
              color: GOLD, fontStyle: "italic", lineHeight: 0.95, margin: 0,
            }}>직접 경험하세요</h1>
          )}
        </div>
        {sub && (
          <p className="v4c-sub" style={{ fontSize: "15px", color: GRAY, lineHeight: 2, fontWeight: 300, maxWidth: "460px" }}>
            전문 컨설턴트가 공간에 최적화된<br />blum 솔루션을 제안해드립니다.
          </p>
        )}
      </section>

      {/* ══ CONTACT GRID ═══════════════════════════════════════════ */}
      <section className="v4c-section-pad" style={{ padding: "0 2rem 120px", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="v4c-contact-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
        }}>
          {/* Left — Korea showroom info */}
          <SlideIn from="left">
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: `${GOLD}77`, marginBottom: "24px" }}>한국 쇼룸</p>
              <h2 className="v4c-serif" style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 300, color: CREAM, marginBottom: "40px", lineHeight: 1.2 }}>
                blum Korea<br />Showroom
              </h2>

              {[
                { label: "주소",   value: "서울특별시 강남구 테헤란로 431\n저스트코 타워 2층" },
                { label: "전화",   value: "02-6925-0800" },
                { label: "이메일", value: "info.korea@blum.com" },
                { label: "영업시간", value: "월요일 – 금요일\n09:00 – 18:00" },
              ].map((item, i) => (
                <div key={item.label} style={{
                  paddingBottom: "24px", marginBottom: "24px",
                  borderBottom: `1px solid ${LINE}`,
                }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}66`, display: "block", marginBottom: "8px" }}>{item.label}</span>
                  <p style={{ fontSize: "15px", color: CREAM, fontWeight: 300, lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </SlideIn>

          {/* Right — form (first on mobile) */}
          <SlideIn from="right" delay={80} className="v4c-form-col">
            <div style={{
              padding: "48px",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: `1px solid ${LINE}`,
            }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: `${GOLD}77`, marginBottom: "12px" }}>문의 / 방문 신청</p>
              <h2 className="v4c-serif" style={{ fontSize: "1.8rem", fontWeight: 300, color: CREAM, marginBottom: "36px" }}>Send a Message</h2>

              <form style={{ display: "flex", flexDirection: "column", gap: "28px" }} onSubmit={(e) => e.preventDefault()}>
                <div className="v4c-name-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <label style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}77`, display: "block", marginBottom: "8px" }}>이름 *</label>
                    <input type="text" placeholder="홍길동" className="v4c-input" style={INPUT} />
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}77`, display: "block", marginBottom: "8px" }}>회사명</label>
                    <input type="text" placeholder="회사명" className="v4c-input" style={INPUT} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}77`, display: "block", marginBottom: "8px" }}>연락처 *</label>
                  <input type="tel" placeholder="010-0000-0000" className="v4c-input" style={INPUT} />
                </div>
                <div>
                  <label style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}77`, display: "block", marginBottom: "8px" }}>이메일</label>
                  <input type="email" placeholder="example@company.com" className="v4c-input" style={INPUT} />
                </div>
                <div>
                  <label style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}77`, display: "block", marginBottom: "8px" }}>문의 내용</label>
                  <textarea placeholder="문의하실 내용을 작성해 주세요" rows={4} className="v4c-input" style={{ ...INPUT, resize: "none", lineHeight: 1.8 }} />
                </div>
                <button type="submit" className="v4c-btn" style={{
                  width: "100%", padding: "16px", backgroundColor: GOLD,
                  color: NAVY, border: "none", cursor: "pointer",
                  fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 500,
                }}>문의 보내기</button>
              </form>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ HEADQUARTERS ═══════════════════════════════════════════ */}
      <section style={{ borderTop: `1px solid ${LINE}`, padding: "80px 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SlideIn from="bottom">
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: `${GOLD}55`, marginBottom: "32px" }}>Headquarters</p>
            <div className="v4c-hq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
              {[
                { label: "회사",   value: "Julius Blum GmbH" },
                { label: "주소",   value: "Industriestrasse 1\n6973 Höchst, Austria" },
                { label: "전화",   value: "+43 5578 705-0" },
                { label: "웹사이트", value: "www.blum.com" },
              ].map((item) => (
                <div key={item.label}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}55`, display: "block", marginBottom: "8px" }}>{item.label}</span>
                  <p style={{ fontSize: "13px", color: "rgba(245,240,232,0.45)", fontWeight: 300, lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "28px 2rem", backgroundColor: "#070B10" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "10px", color: "rgba(245,240,232,0.18)", letterSpacing: "0.1em" }}>© 2025 Blum Korea. All rights reserved.</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {([["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]] as [string, string][]).map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? `${GOLD}77` : "rgba(245,240,232,0.2)", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
