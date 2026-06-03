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

/* ── IO slide-in component ── */
function Reveal({
  children,
  delay = 0,
  from = "bottom",
  style: extraStyle = {},
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
  style?: React.CSSProperties;
}) {
  const ref  = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const initial =
    from === "left"  ? "translate(-56px, 0)"  :
    from === "right" ? "translate(56px, 0)"   :
                       "translate(0, 48px)";

  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translate(0,0)" : initial,
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

/* ── Counting stat item ── */
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

/* ── GSAP photo section ── */
function PhotoSection() {
  const pinRef    = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);

  const PHOTOS = [
    `${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
    `${BASE}/images/560/258/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg`,
    `${BASE}/images/560/258/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`,
  ];

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const pin    = pinRef.current;
        const p1     = photo1Ref.current;
        const p2     = photo2Ref.current;
        const p3     = photo3Ref.current;
        const text   = textRef.current;
        if (!pin || !p1 || !p2 || !p3 || !text) return;

        /* initial states */
        gsap.set([p1, p2, p3], { opacity: 0, scale: 1.08 });
        gsap.set(text, { opacity: 0, x: 48 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:    pin,
            start:      "top top",
            end:        "+=250%",
            pin:        true,
            scrub:      1,
            pinSpacing: true,
          },
        });

        /* Phase 1 (t 0→1): 3 photos fade in staggered */
        tl
          .to(p1, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0)
          .to(p2, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0.15)
          .to(p3, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0.3)

        /* Phase 2 (t 1→2): p1 & p2 shrink/fade, p3 expands, text slides in */
          .to([p1, p2], { opacity: 0, scale: 0.92, duration: 0.5 }, 1)
          .to(p3,        { flex: "1 0 55%", duration: 0.6, ease: "power2.inOut" }, 1)
          .to(text,      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 1.3)

          .to({}, { duration: 0.01 }, 1.99);

        ScrollTrigger.refresh();
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={pinRef}
      style={{ height: "100vh", position: "relative", overflow: "hidden", backgroundColor: "#f4f4f5" }}
    >
      {/* Label */}
      <div style={{ position: "absolute", top: 48, left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa" }}>About Blum</p>
      </div>

      {/* Photos row */}
      <div style={{ position: "absolute", inset: 0, display: "flex", gap: 3, padding: "80px 3rem 3rem" }}>
        <div ref={photo1Ref} style={{ flex: "1 0 0", overflow: "hidden" }}>
          <img src={PHOTOS[0]} alt="blum workplace" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div ref={photo2Ref} style={{ flex: "1 0 0", overflow: "hidden" }}>
          <img src={PHOTOS[1]} alt="blum factory" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div ref={photo3Ref} style={{ flex: "1 0 0", overflow: "hidden", transition: "flex 0.6s ease" }}>
          <img src={PHOTOS[2]} alt="blum leadership" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>

        {/* Text panel */}
        <div
          ref={textRef}
          style={{
            flex: "0 0 38%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px",
            backgroundColor: "#f4f4f5",
          }}
        >
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>
            About Blum
          </p>
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35, marginBottom: 24 }}>
            편리함을 높이고<br />삶의 질을 향상시키는<br />가구 피팅 제조사
          </h2>
          <div style={{ width: 36, height: 1, backgroundColor: "#18181b", marginBottom: 24 }} />
          <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 16 }}>
            Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
          </p>
          <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85 }}>
            기능성과 디자인, 내구성의 완벽한 균형을 추구하며, 매일 수백만 명의 일상을 더 편리하게 만듭니다.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function V1Company() {
  /* Hero text reveal */
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".c-item");
    items.forEach((item) => {
      item.style.opacity   = "0";
      item.style.transform = "translateY(52px)";
      item.style.transition = "";
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        items.forEach((item, i) => {
          item.style.transition = `opacity 0.9s ease ${i * 150}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`;
          item.style.opacity    = "1";
          item.style.transform  = "translateY(0)";
        });
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* ══════════ STEP 1: Hero 100vh ══════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img
          src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
          alt="blum company"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* top white gradient for nav */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 28%)" }} />
        {/* bottom dark gradient for text */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />

        <div ref={heroRef} style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 720, padding: "0 32px" }}>
          <p className="c-item" style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
            Company
          </p>
          <h1
            className="c-item"
            style={{ fontSize: "clamp(28px, 4.5vw, 60px)", fontWeight: 300, color: "#ffffff", lineHeight: 1.25, marginBottom: 24 }}
          >
            blum은 끊임없이 움직여<br />더 나은 아이디어를 만듭니다
          </h1>
          <div className="c-item" style={{ width: 40, height: 1, backgroundColor: "rgba(255,255,255,0.4)", margin: "0 auto 24px" }} />
          <p className="c-item" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
            1952년 오스트리아 포어알베르크에서 시작한 blum.<br />70년이 넘는 역사 속에서 세계 최고의 가구 피팅 제조사로 성장했습니다.
          </p>
        </div>
      </section>

      {/* ══════════ STEP 2: 브랜드 소개 (IO reveal, alternating) ══════════ */}
      <section style={{ padding: "100px 0", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", gap: 80 }}>
          <Reveal from="left" style={{ flex: "1 1 0", minWidth: 0 }}>
            <img
              src={`${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
              alt="blum workplace"
              style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </Reveal>
          <Reveal from="right" style={{ flex: "1 1 0", minWidth: 0 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>
              Brand
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35, marginBottom: 24 }}>
              세계가 신뢰하는<br />오스트리아의 기술
            </h2>
            <div style={{ width: 36, height: 1, backgroundColor: "#18181b", marginBottom: 24 }} />
            <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 16 }}>
              Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.
            </p>
            <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85 }}>
              힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다. 기능성과 디자인, 내구성의 완벽한 균형을 추구하며, 매일 수백만 명의 일상을 더 편리하게 만듭니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════ STEP 3: 숫자로 보는 blum (100vh counting) ══════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#fafafa", padding: "80px 48px", borderTop: "1px solid rgba(24,24,27,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 12 }}>
              Facts &amp; Figures
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#18181b" }}>
              숫자로 보는 blum
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, backgroundColor: "#e4e4e7" }}>
            {STATS.map((s, i) => (
              <StatItem key={s.label} stat={s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STEP 4: 3 photos → expand → ABOUT BLUM (GSAP pin) ══════════ */}
      <PhotoSection />

      {/* ══════════ STEP 5: 경영진 ══════════ */}
      <section style={{ padding: "100px 0", backgroundColor: "#ffffff", borderTop: "1px solid rgba(24,24,27,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <Reveal style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 12 }}>
              Leadership
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#18181b" }}>경영진</h2>
          </Reveal>

          <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
            <Reveal from="left" style={{ flex: "1 1 0", minWidth: 0 }}>
              <img
                src={`${BASE}/images/560/258/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`}
                alt="Philipp & Martin Blum"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </Reveal>
            <Reveal from="right" style={{ flex: "1 1 0", minWidth: 0 }}>
              <h3 style={{ fontSize: "clamp(20px, 2.4vw, 32px)", fontWeight: 300, color: "#18181b", marginBottom: 8, lineHeight: 1.3 }}>
                Philipp &amp; Martin Blum
              </h3>
              <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 28 }}>
                공동 경영진
              </p>
              <div style={{ width: 36, height: 1, backgroundColor: "#d4d4d8", marginBottom: 28 }} />
              <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 20 }}>
                창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
              </p>
              <blockquote style={{ fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 300, fontStyle: "italic", color: "#18181b", lineHeight: 1.6, borderLeft: "2px solid #d4d4d8", paddingLeft: 20, margin: 0 }}>
                "당사는 끊임없이 움직여<br />더 나은 아이디어를 만듭니다."
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ STEP 6: 지속가능성 ══════════ */}
      <section style={{ padding: "100px 0", backgroundColor: "#fafafa", borderTop: "1px solid rgba(24,24,27,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "flex", gap: 80, alignItems: "center" }}>
          <Reveal from="left" style={{ flex: "1 1 0", minWidth: 0 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>
              Sustainability
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35, marginBottom: 24 }}>
              지속가능한 미래를<br />함께 만듭니다
            </h2>
            <div style={{ width: 36, height: 1, backgroundColor: "#18181b", marginBottom: 24 }} />
            <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 24 }}>
              blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#52525b" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#18181b", flexShrink: 0, display: "inline-block" }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" style={{ flex: "1 1 0", minWidth: 0 }}>
            <img
              src={`${BASE}/images/560/258/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`}
              alt="blum sustainability"
              style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section style={{ padding: "80px 48px", textAlign: "center", borderTop: "1px solid rgba(24,24,27,0.06)" }}>
        <Reveal>
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
        </Reveal>
      </section>
    </div>
  );
}
