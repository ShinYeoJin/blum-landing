"use client";

import { useRef, useState, useEffect } from "react";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

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

/*
  Gallery scroll timeline
  ─────────────────────────────────────────────────────────────────
  OFFSET  = 0.5  → thumbnails fully visible before animation begins
  SLOT    = 1.0  → one scroll-viewport per card transition
  HALF    = 0.5

  Card i:
    shrinkStart = OFFSET + i * SLOT          (card i starts shrinking)
    shrinkEnd   = shrinkStart + HALF         (only for i < 3)
    growStart   = shrinkStart - HALF         (only for i > 0)
    growEnd     = shrinkStart                (only for i > 0)

  Raw timeline:
    card 0 active : raw  0    → 0.5
    card 0 shrink : raw  0.5  → 1.0
    card 1 grow   : raw  1.0  → 1.5
    card 1 shrink : raw  1.5  → 2.0
    card 2 grow   : raw  2.0  → 2.5
    card 2 shrink : raw  2.5  → 3.0
    card 3 grow   : raw  3.0  → 3.5
    card 3 active : raw  3.5  → 4.0

  Gallery height = (4.0 + 1) × 100vh = 500vh
  ─────────────────────────────────────────────────────────────────
*/
const OFFSET = 0.5;
const SLOT   = 1.0;
const HALF   = 0.5;
const N      = 4;

/* ── Count-up ── */
function CountUp({ target, active }: { target: number; active: boolean }) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1800);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target]);
  return <>{value.toLocaleString()}</>;
}

/* ── CTA heading: state-swap on hover, no dual DOM ── */
function CtaHeading() {
  const [on, setOn] = useState(false);
  return (
    <a
      href="/v3/contact"
      style={{
        display: "block",
        fontSize: 32, fontWeight: 900,
        textTransform: "uppercase", lineHeight: 1,
        color: on ? RED : "#f0f0f0",
        textDecoration: "none",
        cursor: "pointer",
        fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
      }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {on ? "LET'S CONNECT" : "HOW CAN WE HELP YOU?"}
    </a>
  );
}

export default function V3Company() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const galleryRef  = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const textRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  const [statsActive, setStatsActive] = useState(false);

  /* ── Hero slide-in ── */
  useEffect(() => {
    const el = heroTextRef.current;
    if (!el) return;
    el.style.transform = "translateX(100vw)";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = "transform 1s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform  = "translateX(0)";
    }));
  }, []);

  /* ── Scroll: scale/opacity card gallery ── */
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const y       = window.scrollY;
      const vh      = window.innerHeight;
      const gallery = galleryRef.current;
      if (!gallery) return;

      const raw = Math.max(0, (y - gallery.offsetTop) / vh);

      let statsNet = 0;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const shrinkStart = OFFSET + i * SLOT;
        const shrinkEnd   = shrinkStart + HALF;
        const growStart   = shrinkStart - HALF; /* = OFFSET + (i-1)*SLOT + HALF */
        const growEnd     = shrinkStart;        /* same as shrinkStart */

        let scale: number, opacity: number;

        if (i === 0) {
          /* Card 0 starts active, then shrinks */
          if (raw < shrinkStart) {
            scale = 1.0; opacity = 1.0;
          } else if (raw < shrinkEnd) {
            const t = (raw - shrinkStart) / HALF;
            scale   = 1.0 - 0.3 * t;
            opacity = 1.0 - 0.5 * t;
          } else {
            scale = 0.7; opacity = 0.5;
          }
        } else {
          /* Cards 1-3: inactive → grow → (shrink for i<3) */
          const tGrow   = Math.max(0, Math.min(1, (raw - growStart) / HALF));
          const tShrink = i < N - 1
            ? Math.max(0, Math.min(1, (raw - shrinkStart) / HALF))
            : 0;
          const net = tGrow - tShrink; /* 0 → 1 → 0  (or 0 → 1 for last card) */
          scale   = 0.7 + 0.3 * net;
          opacity = 0.5 + 0.5 * net;

          if (i === 1) statsNet = net;
        }

        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.opacity   = String(opacity.toFixed(4));

        /* Overlay text fades in only when card is nearly fully active */
        const textEl = textRefs.current[i];
        if (textEl) {
          const tOp = Math.max(0, (scale - 0.88) / 0.12);
          textEl.style.opacity = String(tOp.toFixed(4));
        }
      });

      setStatsActive(statsNet > 0.5);
    };

    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => { cardRefs.current[i] = el; };
  const setTextRef = (i: number) => (el: HTMLDivElement | null) => { textRefs.current[i] = el; };

  const textBase = (right: boolean): React.CSSProperties => ({
    position: "absolute",
    bottom: 40,
    [right ? "right" : "left"]: 36,
    maxWidth: 400,
    opacity: 0,
    textAlign: right ? "right" : "left",
    willChange: "opacity",
    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
  });

  /* Shared card style */
  const cardStyle: React.CSSProperties = {
    flex: "1 1 0",
    height: "55vh",
    position: "relative",
    overflow: "hidden",
    willChange: "transform, opacity",
    transformOrigin: "center center",
  };

  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>

      {/* ══ HERO ══ */}
      <section style={{
        height: "100vh", position: "relative",
        display: "flex", alignItems: "flex-end", padding: "0 48px 80px",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMG_1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 50%, rgba(0,0,0,0.2) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(200,16,46,0.07) 0%, transparent 55%)" }} />
        </div>
        <div ref={heroTextRef} style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>Company</p>
          <h1 style={{ fontSize: "clamp(52px, 10vw, 120px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, marginBottom: 24 }}>
            MOVING<br /><span style={{ color: RED }}>IDEAS.</span>
          </h1>
          <div style={{ width: 60, height: 3, backgroundColor: RED, marginBottom: 24 }} />
          <p style={{ fontSize: 14, maxWidth: 520, lineHeight: 1.75, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            1952년 오스트리아 포어알베르크에서 시작한 blum.&nbsp;
            70년이 넘는 역사 속에서 세계 최고의 가구 피팅 제조사로 성장했습니다.
          </p>
        </div>
      </section>

      {/* ══ CARD GALLERY: 500vh ══
          4 cards in a flex row (55vh height each), 12px gap.
          Active card: scale(1), opacity 1.
          Inactive card: scale(0.7), opacity 0.5.
          Two-phase per transition: current shrinks first, next grows after.
      ══ */}
      <div ref={galleryRef} style={{ height: "500vh", position: "relative" }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          backgroundColor: "#000",
          display: "flex", alignItems: "center",
          padding: "0 24px", gap: 12,
        }}>

          {/* ── CARD 0 — About Blum | text right-bottom ── */}
          <div ref={setCardRef(0)} style={cardStyle}>
            <img src={IMG_2} alt="blum workplace"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>01</div>
            <div ref={setTextRef(0)} style={textBase(true)}>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>About Blum</p>
              <h2 style={{ fontSize: "clamp(16px, 2vw, 28px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12, color: "#f0f0f0" }}>
                편리함을 높이고<br />삶의 질을 향상시키는
              </h2>
              <div style={{ width: 30, height: 2, backgroundColor: RED, marginBottom: 12, marginLeft: "auto" }} />
              <p style={{ fontSize: 12, lineHeight: 1.75, color: "rgba(240,240,240,0.55)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
              </p>
            </div>
          </div>

          {/* ── CARD 1 — 숫자로 보는 BLUM | text left-bottom + count-up ── */}
          <div ref={setCardRef(1)} style={{ ...cardStyle, opacity: 0.5, transform: "scale(0.7)" }}>
            <img src={IMG_3} alt="blum factory"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>02</div>
            <div ref={setTextRef(1)} style={textBase(false)}>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>Facts &amp; Figures</p>
              <h2 style={{ fontSize: "clamp(16px, 2vw, 28px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12, color: "#f0f0f0" }}>
                숫자로 보는 BLUM
              </h2>
              <div style={{ width: 30, height: 2, backgroundColor: RED, marginBottom: 16 }} />
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
                backgroundColor: "rgba(200,16,46,0.15)",
                border: "1px solid rgba(200,16,46,0.15)",
                maxWidth: 420,
              }}>
                {STATS.map((s) => (
                  <div key={s.label} style={{ padding: "12px 10px", backgroundColor: "rgba(0,0,0,0.7)", textAlign: "center" }}>
                    <div style={{ fontSize: "clamp(14px, 1.5vw, 22px)", fontWeight: 900, color: "#f0f0f0", lineHeight: 1, marginBottom: 3 }}>
                      <CountUp target={s.num} active={statsActive} />
                      {s.unit === "개국+" ? "+" : ""}
                    </div>
                    <div style={{ fontSize: 7, fontWeight: 900, color: RED, marginBottom: 3 }}>{s.unit === "개국+" ? "개국" : s.unit}</div>
                    <div style={{ fontSize: 7, lineHeight: 1.4, color: "rgba(240,240,240,0.3)", fontFamily: "Arial, sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CARD 2 — 경영진 | text right-bottom ── */}
          <div ref={setCardRef(2)} style={{ ...cardStyle, opacity: 0.5, transform: "scale(0.7)" }}>
            <img src={IMG_4} alt="Philipp & Martin Blum"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>03</div>
            <div ref={setTextRef(2)} style={textBase(true)}>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>Leadership</p>
              <h2 style={{ fontSize: "clamp(16px, 2vw, 28px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12, color: "#f0f0f0" }}>경영진</h2>
              <div style={{ width: 30, height: 2, backgroundColor: RED, marginBottom: 12, marginLeft: "auto" }} />
              <p style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f0f0f0", marginBottom: 4 }}>
                Philipp &amp; Martin Blum
              </p>
              <p style={{ fontSize: 8, letterSpacing: "0.3em", fontWeight: 900, color: RED, textTransform: "uppercase", marginBottom: 12 }}>공동 경영진</p>
              <p style={{ fontSize: 12, lineHeight: 1.75, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
              </p>
            </div>
          </div>

          {/* ── CARD 3 — 지속가능한 미래 | text left-bottom ── */}
          <div ref={setCardRef(3)} style={{ ...cardStyle, opacity: 0.5, transform: "scale(0.7)" }}>
            <img src={IMG_5} alt="blum sustainability"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>04</div>
            <div ref={setTextRef(3)} style={textBase(false)}>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>Sustainability</p>
              <h2 style={{ fontSize: "clamp(16px, 2vw, 28px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12, color: "#f0f0f0" }}>
                지속가능한<br />미래
              </h2>
              <div style={{ width: 30, height: 2, backgroundColor: RED, marginBottom: 12 }} />
              <p style={{ fontSize: 12, lineHeight: 1.75, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 16 }}>
                blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "rgba(240,240,240,0.6)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                    <span style={{ width: 4, height: 4, backgroundColor: RED, flexShrink: 0, display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>{/* end sticky */}
      </div>{/* end gallery */}

      {/* ══ CTA ══ */}
      <section style={{ padding: "80px 48px", textAlign: "center", borderTop: "1px solid rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 24 }}>
          GET IN TOUCH
        </p>
        <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, marginBottom: 0 }}>
          <CtaHeading />
        </h2>
      </section>

    </div>
  );
}
