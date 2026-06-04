"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

/* ── Images (in order of appearance in original v3 company page) ── */
const IMG_1 = `${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`;
const IMG_2 = `${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`;
const IMG_3 = `${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`;
const IMG_4 = `${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`;
const IMG_5 = `${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`;

const STATS = [
  { num: 2441, unit: "백만 유로", label: "전 세계 매출액 (2024/25)" },
  { num: 9850, unit: "명",        label: "전 세계 임직원 수" },
  { num: 120,  unit: "개국+",     label: "수출 대상국" },
  { num: 34,   unit: "개소",      label: "전 세계 자회사 및 대리점" },
  { num: 8,    unit: "개 공장",   label: "포어알베르크 생산 시설" },
  { num: 1952, unit: "년",        label: "브랜드 창립" },
];

const THUMB_TITLES = ["About Blum", "숫자로 보는 BLUM", "경영진", "지속가능한 미래"];
const THUMB_IMGS   = [IMG_2, IMG_3, IMG_4, IMG_5];

/* ── Count-up animation ── */
function CountUp({ target, active }: { target: number; active: boolean }) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const dur = 1800;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target]);
  return <>{value.toLocaleString()}</>;
}

/* ── Img helper ── */
function Img({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  return (
    <img
      src={src} alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

export default function V3Company() {
  const heroTextRef    = useRef<HTMLDivElement>(null);
  const heroImgRef     = useRef<HTMLImageElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef     = useRef<HTMLDivElement>(null);

  const [activeCard, setActiveCard] = useState(0);
  const [statsActive, setStatsActive] = useState(false);

  /* ── Hero text: slide in from right on mount ── */
  useEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    el.style.transform = "translateX(100vw)";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = "transform 1s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform  = "translateX(0)";
    }));

    /* top-right image: fade in after slide completes */
    const img = heroImgRef.current;
    if (!img) return;
    img.style.opacity    = "0";
    img.style.transform  = "scale(1)";
    img.style.transition = "";
    const t = setTimeout(() => {
      img.style.transition = "opacity 0.7s ease";
      img.style.opacity    = "1";
    }, 1100);
    return () => clearTimeout(t);
  }, []);

  /* ── Scroll: hero image zoom-out fade + gallery card index ── */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y  = window.scrollY;
      const vh = window.innerHeight;

      /* hero top-right image: zoom in and fade as user scrolls */
      const img = heroImgRef.current;
      if (img) {
        const p = Math.max(0, Math.min(1, y / vh));
        if (p > 0) {
          img.style.transition = "none";
          img.style.opacity    = String(Math.max(0, 1 - p * 1.3));
          img.style.transform  = `scale(${1 + p * 0.5})`;
          img.style.transformOrigin = "top right";
        }
      }

      /* gallery */
      const gallery = galleryRef.current;
      if (!gallery) return;
      const galleryTop    = gallery.offsetTop;
      const scrollHeight  = gallery.offsetHeight - vh;
      if (scrollHeight <= 0) return;
      const raw  = Math.max(0, (y - galleryTop) / scrollHeight) * 4;
      const idx  = Math.min(3, Math.max(0, Math.floor(raw)));
      setActiveCard(idx);
      setStatsActive(idx === 1);
    };

    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* ── Shared styles ── */
  const textSide = (pad = "0 56px"): React.CSSProperties => ({
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: pad,
    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
  });

  const cardShell = (i: number): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "stretch",
    backgroundColor: i % 2 === 0 ? "#000000" : "#080808",
    opacity:    activeCard === i ? 1 : 0,
    transform:  activeCard === i ? "scale(1)" : "scale(0.93)",
    transition: "opacity 0.55s ease, transform 0.55s ease",
    pointerEvents: activeCard === i ? "auto" : "none",
    overflow: "hidden",
  });

  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>

      {/* ═══════════════════════════════════════════
          HERO WRAPPER — 200vh gives scroll space
          for the top-right image to fade out
      ═══════════════════════════════════════════ */}
      <div ref={heroWrapperRef} style={{ height: "200vh", position: "relative" }}>
        <section style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden",
          display: "flex", alignItems: "flex-end",
          padding: "0 48px 80px",
        }}>
          {/* Dim full-screen background */}
          <div style={{ position: "absolute", inset: 0 }}>
            <Img src={IMG_1} alt="blum company" style={{ opacity: 0.15 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 50%, rgba(0,0,0,0.2) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(200,16,46,0.07) 0%, transparent 55%)" }} />
          </div>

          {/* Text block — slides in from right */}
          <div ref={heroTextRef} style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>
              Company
            </p>
            <h1 style={{ fontSize: "clamp(52px, 10vw, 120px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, marginBottom: 24 }}>
              MOVING<br /><span style={{ color: RED }}>IDEAS.</span>
            </h1>
            <div style={{ width: 60, height: 3, backgroundColor: RED, marginBottom: 24 }} />
            <p style={{ fontSize: 14, maxWidth: 520, lineHeight: 1.75, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
              1952년 오스트리아 포어알베르크에서 시작한 blum.&nbsp;
              70년이 넘는 역사 속에서 세계 최고의 가구 피팅 제조사로 성장했습니다.
            </p>
          </div>

          {/* Top-right image (IMG_1) — appears after slide-in, fades on scroll */}
          <img
            ref={heroImgRef}
            src={IMG_1}
            alt="blum hero"
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
              width: "40%",
              aspectRatio: "4/3",
              objectFit: "cover",
              zIndex: 3,
              opacity: 0,
              pointerEvents: "none",
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          CARD GALLERY
          500vh total → 400vh scrollable → 100vh per card
      ═══════════════════════════════════════════ */}
      <div ref={galleryRef} style={{ height: "500vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>

          {/* ── Thumbnail strip ── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "28vh",
            display: "flex",
            borderBottom: "1px solid rgba(200,16,46,0.2)",
            zIndex: 2,
          }}>
            {THUMB_TITLES.map((title, i) => (
              <div key={i} style={{
                flex: "0 0 25%", height: "100%",
                position: "relative", overflow: "hidden",
                borderRight: i < 3 ? "1px solid rgba(200,16,46,0.1)" : "none",
                opacity: activeCard === i ? 1 : 0.38,
                transition: "opacity 0.5s ease",
              }}>
                <img
                  src={THUMB_IMGS[i]} alt={title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(25%)" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: activeCard === i ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.65)",
                  transition: "background 0.5s ease",
                }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 14px" }}>
                  <div style={{ fontSize: 8, letterSpacing: "0.3em", color: RED, fontWeight: 900, marginBottom: 3 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 900, color: "#f0f0f0", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.3 }}>
                    {title}
                  </div>
                </div>
                {activeCard === i && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, backgroundColor: RED }} />
                )}
              </div>
            ))}
          </div>

          {/* ── Fullscreen card area ── */}
          <div style={{ position: "absolute", top: "28vh", left: 0, right: 0, bottom: 0 }}>

            {/* CARD 1 — About Blum | text right */}
            <div style={cardShell(0)}>
              <div style={{ flex: "0 0 50%", overflow: "hidden" }}>
                <Img src={IMG_2} alt="blum workplace" />
              </div>
              <div style={textSide()}>
                <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 14 }}>
                  About Blum
                </p>
                <h2 style={{ fontSize: "clamp(22px, 2.6vw, 38px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.15, marginBottom: 20, color: "#f0f0f0" }}>
                  편리함을 높이고<br />삶의 질을 향상시키는
                </h2>
                <div style={{ width: 40, height: 3, backgroundColor: RED, marginBottom: 20 }} />
                <p style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 16, maxWidth: 380 }}>
                  Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400, maxWidth: 380 }}>
                  blum의 제품은 힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다. 기능성과 디자인, 내구성의 완벽한 균형을 추구하며, 매일 수백만 명의 일상을 더 편리하게 만듭니다.
                </p>
              </div>
            </div>

            {/* CARD 2 — 숫자로 보는 BLUM | text left + count-up */}
            <div style={cardShell(1)}>
              {/* text/stats on left */}
              <div style={{ ...textSide(), flex: "0 0 45%", backgroundColor: "#0a0a0a" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 14 }}>
                  Facts & Figures
                </p>
                <h2 style={{ fontSize: "clamp(22px, 2.6vw, 38px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.15, marginBottom: 20, color: "#f0f0f0" }}>
                  숫자로 보는<br />BLUM
                </h2>
                <div style={{ width: 40, height: 3, backgroundColor: RED, marginBottom: 20 }} />
                <p style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400, maxWidth: 280 }}>
                  70년 이상의 혁신과 성장 — blum을 이루는 숫자들.
                </p>
              </div>
              {/* stats grid on right */}
              <div style={{
                flex: "1 1 0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                borderLeft: "1px solid rgba(200,16,46,0.15)",
              }}>
                {STATS.map((s, i) => (
                  <div key={s.label} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    padding: "20px 16px", textAlign: "center",
                    borderRight: (i % 3 < 2) ? "1px solid rgba(240,240,240,0.05)" : "none",
                    borderBottom: i < 3 ? "1px solid rgba(240,240,240,0.05)" : "none",
                  }}>
                    <div style={{ fontSize: "clamp(22px, 2.2vw, 32px)", fontWeight: 900, color: "#f0f0f0", marginBottom: 4, lineHeight: 1 }}>
                      {statsActive ? <CountUp target={s.num} active={statsActive} /> : "0"}
                      {s.unit === "개국+" ? "+" : ""}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 900, color: RED, marginBottom: 6 }}>{s.unit === "개국+" ? "개국" : s.unit}</div>
                    <div style={{ fontSize: 9, lineHeight: 1.5, color: "rgba(240,240,240,0.3)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3 — 경영진 | text right */}
            <div style={cardShell(2)}>
              <div style={{ flex: "0 0 50%", overflow: "hidden" }}>
                <Img src={IMG_4} alt="Philipp & Martin Blum" />
              </div>
              <div style={textSide()}>
                <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 14 }}>
                  Leadership
                </p>
                <h2 style={{ fontSize: "clamp(22px, 2.6vw, 38px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.15, marginBottom: 20, color: "#f0f0f0" }}>
                  경영진
                </h2>
                <div style={{ width: 40, height: 3, backgroundColor: RED, marginBottom: 20 }} />
                <p style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f0f0f0", marginBottom: 4 }}>
                  Philipp & Martin Blum
                </p>
                <p style={{ fontSize: 9, letterSpacing: "0.3em", fontWeight: 900, color: RED, textTransform: "uppercase", marginBottom: 20 }}>
                  공동 경영진
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(240,240,240,0.45)", fontFamily: "Arial, sans-serif", fontWeight: 400, maxWidth: 380, marginBottom: 20 }}>
                  창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
                </p>
                <blockquote style={{ fontSize: 14, fontWeight: 900, color: "rgba(240,240,240,0.6)", lineHeight: 1.6, borderLeft: `3px solid ${RED}`, paddingLeft: 16, maxWidth: 360, margin: 0 }}>
                  "당사는 끊임없이 움직여 더 나은 아이디어를 만듭니다."
                </blockquote>
              </div>
            </div>

            {/* CARD 4 — 지속가능한 미래 | text left */}
            <div style={cardShell(3)}>
              <div style={textSide()}>
                <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 14 }}>
                  Sustainability
                </p>
                <h2 style={{ fontSize: "clamp(22px, 2.6vw, 38px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.15, marginBottom: 20, color: "#f0f0f0" }}>
                  지속가능한<br />미래
                </h2>
                <div style={{ width: 40, height: 3, backgroundColor: RED, marginBottom: 20 }} />
                <p style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(240,240,240,0.45)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 24, maxWidth: 380 }}>
                  blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "rgba(240,240,240,0.55)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                      <span style={{ width: 6, height: 6, backgroundColor: RED, flexShrink: 0, display: "inline-block" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: "0 0 50%", overflow: "hidden" }}>
                <Img src={IMG_5} alt="blum sustainability" />
              </div>
            </div>

          </div>{/* end card area */}
        </div>{/* end sticky */}
      </div>{/* end gallery wrapper */}

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section style={{
        padding: "80px 48px",
        textAlign: "center",
        borderTop: "1px solid rgba(200,16,46,0.2)",
        backgroundColor: "#0a0a0a",
      }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>
          GET IN TOUCH
        </p>
        <h2 style={{ fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 32, color: "#f0f0f0" }}>
          문의하기
        </h2>
        <Link
          href="/v3/contact"
          style={{
            display: "inline-block",
            padding: "16px 40px",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 900,
            backgroundColor: RED,
            color: "#fff",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          CONTACT US
        </Link>
      </section>

    </div>
  );
}
