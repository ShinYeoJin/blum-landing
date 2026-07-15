"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import ServicePanel from "@/components/v3/ServicePanel";
import ServicesCtaSection from "@/components/v3/ServicesCtaSection";
import { GOLD, NAVY, CREAM, GRAY, LINE } from "@/components/v3/v3Shared";

/* ── Data ───────────────────────────────────────────────────────── */
const BASE  = "https://www.blum.com";

const SERVICES = [
  {
    num:  "01",
    name: "계획 / 설계 지원",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
    items: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
    img: `${BASE}/images/560/258/4215872/corporate/media/bilder/services/img2487_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
  },
  {
    num:  "02",
    name: "E-Services",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결됩니다.",
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
    img: `${BASE}/images/560/258/4215632/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
  },
  {
    num:  "03",
    name: "조립 / 조정 지원",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 전문 조립 장치로 작업을 단순화합니다.",
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
    img: `${BASE}/images/560/258/4214417/corporate/media/bilder/services/vab0526_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    num:  "04",
    name: "마케팅 / 판매 지원",
    desc: "blum 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 고해상도 이미지, 영상, 기술 문서 등 판매에 필요한 모든 자료를 제공합니다.",
    items: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
    img: `${BASE}/images/560/258/4212635/corporate/media/bilder/services/Blum_ME5340169_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
  },
  {
    num:  "05",
    name: "교육 / 트레이닝",
    desc: "blum 제품의 정확한 설치와 조정을 위한 전문 교육 프로그램. 온라인 튜토리얼과 EASY ASSEMBLY 앱을 통해 언제 어디서나 학습이 가능합니다.",
    items: ["제품 설치 및 조정 교육", "온라인 튜토리얼", "EASY ASSEMBLY 앱 가이드", "파트너 트레이닝 프로그램"],
    img: `${BASE}/images/560/258/4207516/corporate/media/bilder/services/vab0527_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
];

const TOTAL = 1 + SERVICES.length + 1;

/* ══════════════════════════════════════════════════════════════════ */
export default function V4Services() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 400);
  };

  const [h1,  setH1]  = useState(false);
  const [h2,  setH2]  = useState(false);
  const [sub, setSub] = useState(false);

  const [sectionIdx, setSectionIdx] = useState(0);
  const [animate,    setAnimate]    = useState(false);

  const [panelAnim, setPanelAnim] = useState<{ key: number; dir: "down" | "up" }>({ key: 0, dir: "down" });

  const idxRef        = useRef(0);
  const heroReadyRef  = useRef(false);
  const transitionRef = useRef(false);
  const touchStartY   = useRef(0);

  useEffect(() => { idxRef.current = sectionIdx; }, [sectionIdx]);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setH1(true),  120);
    const t2 = setTimeout(() => setH2(true),  400);
    const t3 = setTimeout(() => setSub(true), 720);
    const t4 = setTimeout(() => { heroReadyRef.current = true; }, 1750);
    const t5 = setTimeout(() => setAnimate(true), 50);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    if (!heroReadyRef.current) return;
    if (transitionRef.current) return;
    const next = idxRef.current + dir;
    if (next < 0 || next >= TOTAL) return;

    const scrollDir: "down" | "up" = dir === 1 ? "down" : "up";
    transitionRef.current = true;
    idxRef.current = next;
    setSectionIdx(next);
    setPanelAnim(prev => ({ key: prev.key + 1, dir: scrollDir }));
    setTimeout(() => { transitionRef.current = false; }, 820);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (transitionRef.current) return;
      if (Math.abs(e.deltaY) < 10) return;
      go(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, [go]);

  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      go(diff > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [go]);

  const sectionStyle = useCallback((idx: number): React.CSSProperties => ({
    position:  "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    transform: `translateY(${(idx - sectionIdx) * 100}vh)`,
    transition: animate ? "transform 0.6s cubic-bezier(0.76,0,0.24,1)" : "none",
    willChange: "transform",
    zIndex: idx === sectionIdx ? 10 : 5,
  }), [sectionIdx, animate]);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
    .v4s-nav-link:hover { color:${GOLD} !important; }

    @keyframes v4s-slide-r { from{opacity:0;transform:translateX(70px)} to{opacity:1;transform:none} }
    @keyframes v4s-slide-l { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:none} }
    @keyframes v4s-fade    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:none} }

    .v4s-h1r { animation: v4s-slide-r 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-h1l { animation: v4s-slide-l 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-sub { animation: v4s-fade    0.9s cubic-bezier(0.16,1,0.3,1) both; }

    @keyframes v4s-menu-in  { from{transform:translateY(-100%)} to{transform:translateY(0)} }
    @keyframes v4s-menu-out { from{transform:translateY(0)} to{transform:translateY(-100%)} }
    @keyframes v4s-item-in  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

    .v4s-hamburger { display:none; background:none; border:none; color:${CREAM}; font-size:22px; cursor:pointer; padding:4px 8px; line-height:1; }
    .v4s-mobile-menu { position:fixed; inset:0; background:#0a0e1a; z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:36px; overflow:hidden; }
    .v4s-mobile-menu.v4s-menu-opening { animation:v4s-menu-in 0.4s ease-out forwards; }
    .v4s-mobile-menu.v4s-menu-closing { animation:v4s-menu-out 0.4s ease-in forwards; }
    .v4s-mobile-link { color:#c9a84c; text-decoration:none; font-size:28px; letter-spacing:0.2em; text-transform:uppercase; font-family:'Cormorant Garamond',Georgia,serif; font-weight:300; opacity:0; }
    .v4s-mobile-menu.v4s-menu-opening .v4s-mobile-link { animation:v4s-item-in 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-mobile-menu.v4s-menu-opening .v4s-mobile-link:nth-child(2) { animation-delay:0.12s; }
    .v4s-mobile-menu.v4s-menu-opening .v4s-mobile-link:nth-child(3) { animation-delay:0.20s; }
    .v4s-mobile-menu.v4s-menu-opening .v4s-mobile-link:nth-child(4) { animation-delay:0.28s; }
    .v4s-mobile-menu.v4s-menu-opening .v4s-mobile-link:nth-child(5) { animation-delay:0.36s; }
    .v4s-mobile-close { position:absolute; top:20px; right:24px; background:none; border:none; color:#c9a84c; font-size:28px; cursor:pointer; line-height:1; }

    @media (max-width:768px) {
      .v4s-nav-desktop { display:none !important; }
      .v4s-hamburger   { display:block !important; }
      .v4s-panel-inner { position:relative !important; }
      .v4s-img-half    { position:absolute !important; inset:0 !important; flex:none !important; width:100% !important; height:100% !important; opacity:1 !important; transform:none !important; }
      .v4s-img-half::after { content:''; position:absolute; inset:0; background:rgba(0,0,0,0.55); z-index:1; pointer-events:none; }
      .v4s-img-half > div { display:none !important; }
      .v4s-text-half   { position:relative !important; z-index:2 !important; flex:none !important; width:100% !important; background:transparent !important; padding:80px 24px 24px !important; box-sizing:border-box !important; align-items:flex-start !important; }
    }
  `;

  return (
    <div style={{ backgroundColor: NAVY, color: CREAM, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ NAV ════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: "64px",
        backgroundColor: navScrolled ? "rgba(13,17,23,0.96)" : "rgba(13,17,23,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: navScrolled ? `1px solid ${LINE}` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/v3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>blum</Link>
          <div className="v4s-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([["제품", "/v3#products"], ["가치", "/v3#values"], ["서비스", "/v3/services"], ["연락처", "/v3/contact"]] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="v4s-nav-link" style={{
                color: label === "서비스" ? GOLD : GRAY,
                textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                borderBottom: label === "서비스" ? `1px solid ${GOLD}44` : "none",
                paddingBottom: label === "서비스" ? "2px" : "0",
              }}>{label}</Link>
            ))}
          </div>
          <button className="v4s-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="메뉴 열기">☰</button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ════════════════════════════════════════════ */}
      {menuOpen && (
        <div className={`v4s-mobile-menu ${menuClosing ? "v4s-menu-closing" : "v4s-menu-opening"}`}>
          <button className="v4s-mobile-close" onClick={closeMenu} aria-label="메뉴 닫기">✕</button>
          {([["제품", "/v3#products"], ["가치", "/v3/values"], ["서비스", "/v3/services"], ["연락처", "/v3/contact"]] as [string, string][]).map(([label, href]) => (
            <Link key={label} href={href} className="v4s-mobile-link" onClick={closeMenu}>{label}</Link>
          ))}
        </div>
      )}

      {/* ══ Section 0: Hero ════════════════════════════════════════ */}
      <div style={sectionStyle(0)}>
        <div style={{
          width: "100%", height: "100%", backgroundColor: NAVY,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 2rem", boxSizing: "border-box",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", paddingTop: "64px" }}>
            <p style={{
              fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase",
              color: `${GOLD}88`, marginBottom: "24px",
              opacity: h1 ? 1 : 0, transition: "opacity 0.6s ease 0.05s",
            }}>Services · blum</p>

            <div style={{ overflow: "hidden", marginBottom: "8px" }}>
              {h1 && <h1 className="v4s-h1r" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 300, color: CREAM, lineHeight: 0.95, margin: 0 }}>blum이 함께하는</h1>}
            </div>
            <div style={{ overflow: "hidden", marginBottom: "36px" }}>
              {h2 && <h1 className="v4s-h1l" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 300, color: GOLD, fontStyle: "italic", lineHeight: 0.95, margin: 0 }}>전 과정 서비스</h1>}
            </div>
            {sub && (
              <p className="v4s-sub" style={{ fontSize: "15px", color: GRAY, lineHeight: 2, fontWeight: 300, maxWidth: "480px" }}>
                기획부터 설치, 판매까지 — blum은 파트너의 성공을 위해<br />
                모든 단계에서 전문적인 지원을 제공합니다.
              </p>
            )}
            {sub && (
              <div style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "12px", opacity: 0.45 }}>
                <span style={{ width: "32px", height: "1px", backgroundColor: GOLD }} />
                <span style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>Scroll</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ Sections 1–5: Service panels ══════════════════════════ */}
      {SERVICES.map((s, i) => (
        <ServicePanel
          key={s.num}
          s={s}
          i={i}
          sectionStyle={sectionStyle}
          animKey={panelAnim.key}
          isActive={sectionIdx === i + 1}
          direction={panelAnim.dir}
        />
      ))}

      {/* ══ Section 6: CTA ═════════════════════════════════════════ */}
      <ServicesCtaSection
        sectionStyle={sectionStyle}
        sectionIndex={SERVICES.length + 1}
        animKey={panelAnim.key}
        isActive={sectionIdx === SERVICES.length + 1}
      />
    </div>
  );
}
