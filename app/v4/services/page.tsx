"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ── Design tokens ──────────────────────────────────────────────── */
const GOLD  = "#D4AF37";
const NAVY  = "#0D1117";
const CREAM = "#F5F0E8";
const GRAY  = "rgba(245,240,232,0.55)";
const LINE  = "rgba(212,175,55,0.18)";
const BASE  = "https://www.blum.com";

/* ── Data ───────────────────────────────────────────────────────── */
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

const TOTAL = 1 + SERVICES.length + 1; // 7 sections total

/* ── Easing ─────────────────────────────────────────────────────── */
const EASE = "cubic-bezier(0.16,1,0.3,1)";

/* ── ServicePanel ────────────────────────────────────────────────
   Isolated component so useEffect can cleanly manage its own
   animation state without closure issues in the parent.
─────────────────────────────────────────────────────────────────── */
type PanelProps = {
  s: (typeof SERVICES)[0];
  i: number;
  sectionStyle: (idx: number) => React.CSSProperties;
  animKey: number;   // increments every navigation → re-triggers effect
  isActive: boolean;
  direction: "down" | "up";
};

function ServicePanel({ s, i, sectionStyle, animKey, isActive, direction }: PanelProps) {
  /* Each boolean drives one visual element */
  const [showImg,   setShowImg]   = useState(false);
  const [showNum,   setShowNum]   = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showLine,  setShowLine]  = useState(false);
  const [showDesc,  setShowDesc]  = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    /* Always reset first so outgoing panels become invisible for next visit */
    setShowImg(false);
    setShowNum(false);
    setShowTitle(false);
    setShowLine(false);
    setShowDesc(false);
    setShowItems(false);

    if (!isActive) return; // nothing more to do for off-screen panels

    /* Chain with timeouts — panel is sliding in from translateY(100vh),
       transition takes 600ms, so start the sequence right away;
       by the time the panel arrives elements are already fading in. */
    const timers = [
      setTimeout(() => setShowImg(true),   60),
      setTimeout(() => setShowNum(true),   160),
      setTimeout(() => setShowTitle(true), 260),
      setTimeout(() => setShowLine(true),  360),
      setTimeout(() => setShowDesc(true),  460),
      setTimeout(() => setShowItems(true), 560),
    ];
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]); // animKey changes every navigation — this is intentional

  const imgOffset  = direction === "down" ? "-60px" : "60px";
  const imgStyle: React.CSSProperties = {
    flex: "0 0 52%", position: "relative", overflow: "hidden",
    opacity:    showImg ? 1 : 0,
    transform:  showImg ? "none" : `translateY(${imgOffset})`,
    transition: `opacity 0.75s ${EASE}, transform 0.75s ${EASE}`,
  };

  const textStyle: React.CSSProperties = {
    flex: 1, display: "flex", alignItems: "center",
    padding: "0 clamp(28px,5%,72px)",
  };

  const imgLeft = i % 2 === 0;
  const bgColor = i % 2 === 0 ? "#0A0E14" : "#080B10";

  return (
    <div style={sectionStyle(i + 1)}>
      <div style={{
        width: "100%", height: "100%",
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: imgLeft ? "row" : "row-reverse",
      }}>
        {/* ── Image half ───────────────────────────────────────── */}
        <div style={imgStyle}>
          <img
            src={s.img}
            alt={s.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: imgLeft
              ? `linear-gradient(to right, transparent 65%, ${bgColor} 100%)`
              : `linear-gradient(to left,  transparent 65%, ${bgColor} 100%)`,
          }} />
        </div>

        {/* ── Text half ────────────────────────────────────────── */}
        <div style={textStyle}>
          <div style={{ width: "100%" }}>

            {/* Number */}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 300,
              color: GOLD, lineHeight: 1, marginBottom: "4px",
              opacity:    showNum ? 1 : 0,
              transform:  showNum ? "none" : "translateY(16px)",
              transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
            }}>{s.num}</div>

            {/* Service name */}
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300,
              color: CREAM, lineHeight: 1.1, marginBottom: "16px", margin: "0 0 16px",
              opacity:    showTitle ? 1 : 0,
              transform:  showTitle ? "none" : "translateX(-40px)",
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
            }}>{s.name}</h2>

            {/* Gold divider line */}
            <div style={{
              width: showLine ? "40px" : "0px", height: "1px",
              backgroundColor: `${GOLD}77`, marginBottom: "20px",
              transition: showLine ? `width 0.5s ${EASE}` : "none",
            }} />

            {/* Description */}
            <p style={{
              fontSize: "14px", color: GRAY, lineHeight: 1.95,
              maxWidth: "360px", marginBottom: "32px",
              opacity:    showDesc ? 1 : 0,
              transform:  showDesc ? "none" : "translateY(20px)",
              transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
            }}>{s.desc}</p>

            {/* Items — each staggered */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {s.items.map((item, j) => (
                <li key={item} style={{
                  fontSize: "13px", color: CREAM,
                  display: "flex", alignItems: "center", gap: "12px",
                  fontWeight: 300, letterSpacing: "0.02em",
                  opacity:    showItems ? 1 : 0,
                  transform:  showItems ? "none" : "translateY(12px)",
                  transition: showItems
                    ? `opacity 0.5s ${EASE} ${j * 80}ms, transform 0.5s ${EASE} ${j * 80}ms`
                    : "none",
                }}>
                  <span style={{ width: "18px", height: "1px", backgroundColor: GOLD, flexShrink: 0, display: "inline-block" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CtaSection ──────────────────────────────────────────────────── */
type CtaProps = {
  sectionStyle: (idx: number) => React.CSSProperties;
  animKey: number;
  isActive: boolean;
};

/* Split the headline into individual characters for stagger */
const CTA_LINE1 = "더 자세한 서비스 안내가";
const CTA_LINE2 = "필요하신가요?";

function CtaSection({ sectionStyle, animKey, isActive }: CtaProps) {
  const [showLine,  setShowLine]  = useState(false); // gold bar expands
  const [showLabel, setShowLabel] = useState(false); // "Get in Touch" label
  const [charCount, setCharCount] = useState(0);     // chars revealed so far
  const [showBtn,   setShowBtn]   = useState(false); // button
  const [hovered,   setHovered]   = useState(false); // CTA hover state

  const totalChars = CTA_LINE1.length + CTA_LINE2.length;

  useEffect(() => {
    setShowLine(false);
    setShowLabel(false);
    setCharCount(0);
    setShowBtn(false);

    if (!isActive) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setShowLine(true),  80));
    timers.push(setTimeout(() => setShowLabel(true), 200));

    // stagger each character: start at 320ms, 40ms apart
    for (let c = 0; c < totalChars; c++) {
      timers.push(setTimeout(() => setCharCount(c + 1), 320 + c * 40));
    }

    timers.push(setTimeout(() => setShowBtn(true), 320 + totalChars * 40 + 120));

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]);

  /* Render a line of text with per-character reveal */
  const renderChars = (text: string, offset: number) =>
    text.split("").map((ch, j) => {
      const idx   = offset + j;
      const shown = charCount > idx;
      return (
        <span key={idx} style={{
          display: "inline-block",
          opacity:   shown ? 1 : 0,
          transform: shown ? "none" : "translateY(28px)",
          transition: shown ? `opacity 0.45s ${EASE}, transform 0.45s ${EASE}` : "none",
          whiteSpace: ch === " " ? "pre" : "normal",
        }}>{ch}</span>
      );
    });

  return (
    <div style={sectionStyle(SERVICES.length + 1)}>
      <div style={{
        width: "100%", height: "100%",
        backgroundColor: "#070B10",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "0 2rem", boxSizing: "border-box",
        textAlign: "center",
      }}>

        {/* Gold gradient line — expands left → right */}
        <div style={{
          width: showLine ? "180px" : "0px", height: "1px",
          background: `linear-gradient(to right, ${GOLD}, ${GOLD}44)`,
          marginBottom: "32px",
          transition: showLine ? `width 0.7s ${EASE}` : "none",
        }} />

        {/* "Get in Touch" label */}
        <p style={{
          fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase",
          color: `${GOLD}77`, marginBottom: "28px",
          opacity:   showLabel ? 1 : 0,
          transform: showLabel ? "none" : "translateY(16px)",
          transition: `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
        }}>Get in Touch</p>

        {/* Clickable headline with hover effect */}
        <Link
          href="/v4/contact"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            textDecoration: "none", cursor: "pointer",
            display: "block", marginBottom: "40px",
          }}
        >
          {/* Normal text — fades out on hover */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 300,
            color: hovered ? GOLD : CREAM, lineHeight: 1.4,
            transition: `color 0.3s ease, opacity 0.3s ease`,
            opacity: hovered ? 0 : 1,
            position: "relative",
            margin: 0,
          }}>
            <span style={{ display: "block" }}>{renderChars(CTA_LINE1, 0)}</span>
            <span style={{ display: "block" }}>{renderChars(CTA_LINE2, CTA_LINE1.length)}</span>
          </h2>

          {/* "문의하기 →" overlay — fades in on hover */}
          <div style={{
            position: "absolute",
            left: "50%", transform: "translateX(-50%)",
            marginTop: "-2.2em",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 300,
            color: GOLD, letterSpacing: "0.05em",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            whiteSpace: "nowrap", pointerEvents: "none",
          }}>
            문의하기 →
          </div>
        </Link>

        {/* Button */}
        <div style={{
          opacity:   showBtn ? 1 : 0,
          transform: showBtn ? "none" : "translateY(24px)",
          transition: `opacity 0.55s ${EASE}, transform 0.55s ${EASE}`,
          marginBottom: "64px",
        }}>
          <Link href="/v4/contact" style={{
            color: NAVY, textDecoration: "none",
            fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "14px 36px", backgroundColor: GOLD, display: "inline-block",
            transition: "all 0.35s cubic-bezier(0.25,1,0.5,1)",
          }}>문의하기</Link>
        </div>

        {/* Footer */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: `1px solid ${LINE}`, padding: "24px 2rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "10px", color: "rgba(245,240,232,0.18)", letterSpacing: "0.1em" }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</span>
            <div style={{ display: "flex", gap: "24px" }}>
              {([["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]] as [string, string][]).map(([l, h]) => (
                <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? `${GOLD}77` : "rgba(245,240,232,0.2)", textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function V4Services() {
  const [navScrolled, setNavScrolled] = useState(false);

  /* Hero animation stages */
  const [h1,  setH1]  = useState(false);
  const [h2,  setH2]  = useState(false);
  const [sub, setSub] = useState(false);

  /* Fullpage navigation state */
  const [sectionIdx, setSectionIdx] = useState(0);
  const [animate,    setAnimate]    = useState(false);

  /* Passed to ServicePanel / CtaSection to re-trigger their effects */
  const [panelAnim, setPanelAnim] = useState<{ key: number; dir: "down" | "up" }>({ key: 0, dir: "down" });

  /* Refs for stale-closure-free event handlers */
  const idxRef        = useRef(0);
  const heroReadyRef  = useRef(false);
  const transitionRef = useRef(false);
  const touchStartY   = useRef(0);

  useEffect(() => { idxRef.current = sectionIdx; }, [sectionIdx]);

  /* Nav tint */
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Block native scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Hero entrance sequence */
  useEffect(() => {
    const t1 = setTimeout(() => setH1(true),  120);
    const t2 = setTimeout(() => setH2(true),  400);
    const t3 = setTimeout(() => setSub(true), 720);
    const t4 = setTimeout(() => { heroReadyRef.current = true; }, 1750);
    const t5 = setTimeout(() => setAnimate(true), 50);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  /* Navigate between sections */
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

  /* Wheel */
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

  /* Touch */
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

  /* Each section is position:fixed.  Offset = (sectionIdx - idx) * 100vh */
  const sectionStyle = useCallback((idx: number): React.CSSProperties => ({
    position:  "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    transform: `translateY(${(idx - sectionIdx) * 100}vh)`,
    transition: animate ? "transform 0.6s cubic-bezier(0.76,0,0.24,1)" : "none",
    willChange: "transform",
    zIndex: idx === sectionIdx ? 10 : 5,
  }), [sectionIdx, animate]);

  /* CSS */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
    .v4s-nav-link:hover { color:${GOLD} !important; }

    @keyframes v4s-slide-r { from{opacity:0;transform:translateX(70px)} to{opacity:1;transform:none} }
    @keyframes v4s-slide-l { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:none} }
    @keyframes v4s-fade    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:none} }

    .v4s-h1r { animation: v4s-slide-r 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-h1l { animation: v4s-slide-l 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-sub { animation: v4s-fade    0.9s cubic-bezier(0.16,1,0.3,1) both; }
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
          <Link href="/v4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>blum</Link>
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([["제품", "/v4#products"], ["가치", "/v4#values"], ["서비스", "/v4/services"], ["연락처", "/v4/contact"]] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="v4s-nav-link" style={{
                color: label === "서비스" ? GOLD : GRAY,
                textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                borderBottom: label === "서비스" ? `1px solid ${GOLD}44` : "none",
                paddingBottom: label === "서비스" ? "2px" : "0",
              }}>{label}</Link>
            ))}
          </div>
        </div>
      </nav>

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
      <CtaSection
        sectionStyle={sectionStyle}
        animKey={panelAnim.key}
        isActive={sectionIdx === SERVICES.length + 1}
      />
    </div>
  );
}
