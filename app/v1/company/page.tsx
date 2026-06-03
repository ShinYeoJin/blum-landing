"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

const STATS = [
  { num: 2441,  suffix: "",  unit: "백만 유로", label: "전 세계 매출액 (2024/25)" },
  { num: 9850,  suffix: "",  unit: "명",       label: "전 세계 임직원 수" },
  { num: 120,   suffix: "+", unit: "개국",     label: "수출 대상국" },
  { num: 34,    suffix: "",  unit: "개소",     label: "전 세계 자회사 및 대리점" },
  { num: 8,     suffix: "",  unit: "개 공장",  label: "포어알베르크 생산 시설" },
  { num: 1952,  suffix: "",  unit: "년",       label: "브랜드 창립" },
];

const PHOTO1 = `${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`;
const PHOTO2 = `${BASE}/images/560/258/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`;
const PHOTO3 = `${BASE}/images/560/258/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`;

/* ── counting stat ── */
function StatItem({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref     = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const target   = stat.num;
        const duration = 1800;
        const start    = performance.now();
        const raf = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(raf);
        };
        setTimeout(() => requestAnimationFrame(raf), delay);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stat.num, delay]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "#ffffff",
        padding: "40px 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#18181b", lineHeight: 1, marginBottom: 6, fontVariantNumeric: "tabular-nums" }}>
        {val.toLocaleString()}{stat.suffix}
      </div>
      <div style={{ fontSize: 12, color: "#18181b", marginBottom: 6 }}>{stat.unit}</div>
      <div style={{ fontSize: 10, letterSpacing: "0.05em", color: "#a1a1aa", lineHeight: 1.5 }}>{stat.label}</div>
    </div>
  );
}

/* ── snap panel text reveal ── */
function PanelText({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div
      style={{
        opacity:    active ? 1 : 0,
        transform:  active ? "translateY(0)" : "translateY(48px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
      }}
    >
      {children}
    </div>
  );
}

/* ── scroll-snap A-B-C-D container ── */
function SnapSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<"A"|"B"|"C"|"D">("A");
  const panelRefs = {
    A: useRef<HTMLDivElement>(null),
    B: useRef<HTMLDivElement>(null),
    C: useRef<HTMLDivElement>(null),
    D: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, clientHeight } = container;
      const idx = Math.round(scrollTop / clientHeight);
      const panels: Array<"A"|"B"|"C"|"D"> = ["A","B","C","D"];
      setActivePanel(panels[Math.min(idx, 3)]);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const panelStyle: React.CSSProperties = {
    height: "100vh",
    scrollSnapAlign: "start",
    flexShrink: 0,
    display: "flex",
    overflow: "hidden",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const textColStyle: React.CSSProperties = {
    flex: "0 0 45%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 64px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  };

  const dividerStyle: React.CSSProperties = {
    width: 36,
    height: 1,
    backgroundColor: "#d4d4d8",
    margin: "20px 0",
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {/* ── Panel A: 3 photos grid ── */}
      <div ref={panelRefs.A} style={{ ...panelStyle, flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f4f5", padding: "48px" }}>
        <PanelText active={activePanel === "A"}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 16, textAlign: "center" }}>
            Our Story
          </p>
        </PanelText>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "2rem",
            width: "100%",
          }}
        >
          {[PHOTO1, PHOTO2, PHOTO3].map((src, i) => (
            <div key={i} style={{ height: 400, overflow: "hidden" }}>
              <img src={src} alt="" style={imgStyle}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Panel B: 3rd photo + leadership ── */}
      <div ref={panelRefs.B} style={panelStyle}>
        <div style={{ flex: "0 0 55%", overflow: "hidden" }}>
          <img src={PHOTO3} alt="경영진" style={imgStyle}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div style={textColStyle}>
          <PanelText active={activePanel === "B"}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>Leadership</p>
            <h2 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35, marginBottom: 6 }}>
              Philipp &amp; Martin Blum
            </h2>
            <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 0 }}>공동 경영진</p>
            <div style={dividerStyle} />
            <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 20 }}>
              창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
            </p>
            <blockquote style={{ fontSize: "clamp(15px, 1.8vw, 20px)", fontWeight: 300, fontStyle: "italic", color: "#18181b", lineHeight: 1.6, borderLeft: "2px solid #d4d4d8", paddingLeft: 20, margin: 0 }}>
              "당사는 끊임없이 움직여<br />더 나은 아이디어를 만듭니다."
            </blockquote>
          </PanelText>
        </div>
      </div>

      {/* ── Panel C: 2nd photo + sustainability ── */}
      <div ref={panelRefs.C} style={panelStyle}>
        <div style={{ flex: "0 0 55%", overflow: "hidden" }}>
          <img src={PHOTO2} alt="지속가능성" style={imgStyle}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div style={textColStyle}>
          <PanelText active={activePanel === "C"}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>Sustainability</p>
            <h2 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35 }}>
              지속가능한 미래를<br />함께 만듭니다
            </h2>
            <div style={dividerStyle} />
            <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 20 }}>
              blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#52525b" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#18181b", flexShrink: 0, display: "inline-block" }} />
                  {item}
                </li>
              ))}
            </ul>
          </PanelText>
        </div>
      </div>

      {/* ── Panel D: 1st photo + about blum ── */}
      <div ref={panelRefs.D} style={panelStyle}>
        <div style={{ flex: "0 0 55%", overflow: "hidden" }}>
          <img src={PHOTO1} alt="about blum" style={imgStyle}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div style={textColStyle}>
          <PanelText active={activePanel === "D"}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>About Blum</p>
            <h2 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35 }}>
              편리함을 높이고 삶의 질을<br />향상시키는 가구 피팅 제조사
            </h2>
            <div style={dividerStyle} />
            <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85 }}>
              Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다. blum의 제품은 힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다.
            </p>
          </PanelText>
        </div>
      </div>
    </div>
  );
}

/* ── Hero: image first, text on scroll ── */
function HeroSection() {
  const pinRef  = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const pin  = pinRef.current;
        const text = textRef.current;
        if (!pin || !text) return;

        gsap.set(text, { opacity: 0, y: 52 });

        gsap.timeline({
          scrollTrigger: {
            trigger:    pin,
            start:      "top top",
            end:        "+=80%",
            pin:        true,
            scrub:      0.8,
            pinSpacing: true,
          },
        })
          .to(text, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0);

        ScrollTrigger.refresh();
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={pinRef} style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <img
        src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
        alt="blum company"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      {/* top gradient for nav */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 28%)" }} />
      {/* bottom gradient for text */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          textAlign: "center",
          padding: "0 32px",
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
          Company
        </p>
        <p
          style={{
            fontSize: "clamp(14px, 1.6vw, 20px)",
            fontWeight: 300,
            color: "#ffffff",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            marginBottom: 20,
          }}
        >
          blum은 끊임없이 움직여 더 나은 아이디어를 만듭니다.
        </p>
        <div style={{ width: 40, height: 1, backgroundColor: "rgba(255,255,255,0.4)" }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function V1Company() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* STEP 1: Hero — image full-screen, scroll → text */}
      <HeroSection />

      {/* STEP 2: 숫자로 보는 blum */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#fafafa", padding: "80px 48px", borderTop: "1px solid rgba(24,24,27,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 12 }}>
              Facts &amp; Figures
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#18181b" }}>
              숫자로 보는 blum
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, backgroundColor: "#e4e4e7" }}>
            {STATS.map((s, i) => (
              <StatItem key={s.label} stat={s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* STEP 3–6: Scroll-snap A → B → C → D */}
      <SnapSequence />

      {/* STEP 7: CTA */}
      <section style={{ padding: "80px 48px", textAlign: "center", borderTop: "1px solid rgba(24,24,27,0.06)", backgroundColor: "#ffffff" }}>
        <Link
          href="/v1/contact"
          style={{
            display: "inline-block",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "14px 40px",
            border: "1px solid #18181b",
            color: "#18181b",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#18181b";
            (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#18181b";
          }}
        >
          문의하기
        </Link>
      </section>
    </div>
  );
}
