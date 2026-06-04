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
  N = 4 cards, each gets SLOT = 1.0 raw-unit of scroll.
  OFFSET = 0.5 : all thumbnails visible before first expansion.
  Within each SLOT:
    first HALF  (0→0.5) : card expands from thumbnail → fullscreen
    second HALF (0.5→1) : card shrinks fullscreen → thumbnail  [skip for last card]

  Card i expand range : [OFFSET + i·SLOT,         OFFSET + i·SLOT + HALF]
  Card i shrink range : [OFFSET + i·SLOT + HALF,  OFFSET + (i+1)·SLOT]   (i < 3)

  max raw ≈ 4.5  →  gallery height = 5.5 × 100vh = 550vh
  ─────────────────────────────────────────────────────────────────
  Card width (수정 1): base equal-split × 1.2  (20 % wider)
  Active card (수정 2): animates to left=0, top=0, width=100%, height=100vh
  Other cards: fade out (opacity → 0) while active card is expanding
  ─────────────────────────────────────────────────────────────────
*/
const N      = 4;
const GAP    = 12;   /* px gap between thumbnail cards */
const OFFSET = 0.5;
const SLOT   = 1.0;
const HALF   = 0.5;

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

/* ── CTA heading — simple state swap, no dual DOM ── */
function CtaHeading() {
  const [on, setOn] = useState(false);
  return (
    <a
      href="/v3/contact"
      style={{
        display: "block",
        fontSize: "clamp(20px, 2.5vw, 32px)",
        fontWeight: 900,
        textTransform: "uppercase",
        lineHeight: 1,
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
  const innerRef    = useRef<HTMLDivElement>(null); /* position:relative inner wrap */
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

  /* ── Scroll: fullscreen card gallery ── */
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const y       = window.scrollY;
      const vh      = window.innerHeight;
      const gallery = galleryRef.current;
      const inner   = innerRef.current;
      if (!gallery || !inner) return;

      const raw        = Math.max(0, (y - gallery.offsetTop) / vh);
      const containerW = inner.clientWidth || window.innerWidth;

      /* Thumbnail geometry — each card 20 % wider than equal split */
      const cardW = (containerW - (N - 1) * GAP) / N * 1.2;
      const cardH = vh * 0.55;
      const topC  = (vh - cardH) / 2; /* vertical center */

      /* ── Pass 1: compute net for each card ── */
      const nets = Array.from({ length: N }, (_, i) => {
        const expandStart = OFFSET + i * SLOT;
        const shrinkStart = expandStart + HALF;
        const expand = Math.max(0, Math.min(1, (raw - expandStart) / HALF));
        const shrink = i < N - 1 ? Math.max(0, Math.min(1, (raw - shrinkStart) / HALF)) : 0;
        return expand - shrink; /* 0 → 1 → 0  (last card: 0 → 1) */
      });

      const maxNet = Math.max(...nets);
      let stats1Net = 0;

      /* ── Pass 2: apply to DOM ── */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const net     = nets[i];
        const thumbL  = i * (cardW + GAP);

        el.style.left   = `${(thumbL  * (1 - net)).toFixed(2)}px`;
        el.style.top    = `${(topC    * (1 - net)).toFixed(2)}px`;
        el.style.width  = `${(cardW   + (containerW - cardW) * net).toFixed(2)}px`;
        el.style.height = `${(cardH   + (vh          - cardH) * net).toFixed(2)}px`;
        el.style.zIndex = String(10 + i + Math.round(net * 10));

        /* Active card stays fully opaque; others fade out as any card expands */
        el.style.opacity = net > 0.001
          ? "1"
          : String(Math.max(0, 1 - maxNet * 1.5).toFixed(4));

        /* Overlay text visible only when card is nearly fullscreen */
        const textEl = textRefs.current[i];
        if (textEl) {
          textEl.style.opacity = String(Math.max(0, (net - 0.7) / 0.3).toFixed(4));
        }

        if (i === 1) stats1Net = net;
      });

      setStatsActive(stats1Net > 0.5);
    };

    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => { cardRefs.current[i] = el; };
  const setTextRef = (i: number) => (el: HTMLDivElement | null) => { textRefs.current[i] = el; };

  const overlay = "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)";

  const textBase = (right: boolean): React.CSSProperties => ({
    position: "absolute",
    bottom: 48,
    [right ? "right" : "left"]: 48,
    maxWidth: 440,
    opacity: 0,
    textAlign: right ? "right" : "left",
    willChange: "opacity",
    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
  });

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

      {/* ══ CARD GALLERY: 550vh ══ */}
      <div ref={galleryRef} style={{ height: "550vh", position: "relative" }}>
        {/* sticky outer */}
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
          {/* position:relative inner — containing block for absolute cards */}
          <div ref={innerRef} style={{ position: "relative", width: "100%", height: "100%" }}>

            {/* ── CARD 0 — About Blum ── */}
            <div ref={setCardRef(0)} style={{ position: "absolute", overflow: "hidden", willChange: "left, top, width, height, opacity" }}>
              <img src={IMG_2} alt="blum workplace"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, background: overlay }} />
              <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>01</div>
              <div ref={setTextRef(0)} style={textBase(true)}>
                <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>About Blum</p>
                <h2 style={{ fontSize: "clamp(18px, 2.2vw, 32px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 14, color: "#f0f0f0" }}>
                  편리함을 높이고<br />삶의 질을 향상시키는
                </h2>
                <div style={{ width: 32, height: 2, backgroundColor: RED, marginBottom: 14, marginLeft: "auto" }} />
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(240,240,240,0.55)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 10 }}>
                  Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                  blum의 제품은 힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다.
                </p>
              </div>
            </div>

            {/* ── CARD 1 — 숫자로 보는 BLUM ── */}
            <div ref={setCardRef(1)} style={{ position: "absolute", overflow: "hidden", willChange: "left, top, width, height, opacity" }}>
              <img src={IMG_3} alt="blum factory"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, background: overlay }} />
              <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>02</div>
              <div ref={setTextRef(1)} style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "0 48px", opacity: 0, willChange: "opacity",
                fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif", textAlign: "center",
              }}>
                <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>Facts &amp; Figures</p>
                <h2 style={{ fontSize: "clamp(18px, 2.2vw, 32px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 14, color: "#f0f0f0" }}>
                  숫자로 보는 BLUM
                </h2>
                <div style={{ width: 32, height: 2, backgroundColor: RED, marginBottom: 16 }} />
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
                  backgroundColor: "rgba(200,16,46,0.15)",
                  border: "1px solid rgba(200,16,46,0.15)",
                  maxWidth: 460,
                }}>
                  {STATS.map((s) => (
                    <div key={s.label} style={{ padding: "14px 10px", backgroundColor: "rgba(0,0,0,0.7)", textAlign: "center" }}>
                      <div style={{ fontSize: "clamp(16px, 1.6vw, 24px)", fontWeight: 900, color: "#f0f0f0", lineHeight: 1, marginBottom: 3 }}>
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

            {/* ── CARD 2 — 경영진 ── */}
            <div ref={setCardRef(2)} style={{ position: "absolute", overflow: "hidden", willChange: "left, top, width, height, opacity" }}>
              <img src={IMG_4} alt="Philipp & Martin Blum"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, background: overlay }} />
              <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>03</div>
              <div ref={setTextRef(2)} style={textBase(true)}>
                <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>Leadership</p>
                <h2 style={{ fontSize: "clamp(18px, 2.2vw, 32px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 14, color: "#f0f0f0" }}>경영진</h2>
                <div style={{ width: 32, height: 2, backgroundColor: RED, marginBottom: 14, marginLeft: "auto" }} />
                <p style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f0f0f0", marginBottom: 4 }}>
                  Philipp &amp; Martin Blum
                </p>
                <p style={{ fontSize: 8, letterSpacing: "0.3em", fontWeight: 900, color: RED, textTransform: "uppercase", marginBottom: 14 }}>공동 경영진</p>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 14 }}>
                  창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
                </p>
                <blockquote style={{ fontSize: 13, fontWeight: 900, color: "rgba(240,240,240,0.55)", lineHeight: 1.55, borderRight: `3px solid ${RED}`, paddingRight: 14, margin: 0 }}>
                  &ldquo;당사는 끊임없이 움직여 더 나은 아이디어를 만듭니다.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* ── CARD 3 — 지속가능한 미래 ── */}
            <div ref={setCardRef(3)} style={{ position: "absolute", overflow: "hidden", willChange: "left, top, width, height, opacity" }}>
              <img src={IMG_5} alt="blum sustainability"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, background: overlay }} />
              <div style={{ position: "absolute", top: 16, left: 16, fontSize: 8, letterSpacing: "0.35em", color: RED, fontWeight: 900 }}>04</div>
              <div ref={setTextRef(3)} style={textBase(false)}>
                <p style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 10 }}>Sustainability</p>
                <h2 style={{ fontSize: "clamp(18px, 2.2vw, 32px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 14, color: "#f0f0f0" }}>
                  지속가능한<br />미래
                </h2>
                <div style={{ width: 32, height: 2, backgroundColor: RED, marginBottom: 14 }} />
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 18 }}>
                  blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(240,240,240,0.6)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                      <span style={{ width: 5, height: 5, backgroundColor: RED, flexShrink: 0, display: "inline-block" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>{/* end inner relative */}
        </div>{/* end sticky */}
      </div>{/* end gallery */}

      {/* ══ CTA ══ */}
      <section style={{ padding: "80px 48px", textAlign: "center", borderTop: "1px solid rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 24 }}>
          GET IN TOUCH
        </p>
        <h2 style={{ margin: 0 }}>
          <CtaHeading />
        </h2>
      </section>

    </div>
  );
}
