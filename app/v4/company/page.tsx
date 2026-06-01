"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";

function useInView(threshold = 0.1) {
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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(40px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { val: 2441, suffix: "M€", label: "전 세계 매출액", sub: "2024/25 회계연도" },
  { val: 9850, suffix: "명", label: "전 세계 임직원" , sub: "글로벌 패밀리" },
  { val: 120, suffix: "+", label: "수출 대상국", sub: "개국" },
  { val: 1952, suffix: "년", label: "창립 연도", sub: "오스트리아" },
  { val: 8, suffix: "개", label: "생산 시설", sub: "포어알베르크" },
  { val: 34, suffix: "개소", label: "자회사 및 대리점", sub: "전 세계" },
];

const VALUES = [
  { title: "삶의 질 향상", body: "편리함을 높이고 삶의 질을 향상시키는 고품질 주방 및 가구용 피팅을 제조합니다. blum의 모든 제품은 사용자의 일상을 더 편리하게 만들기 위해 설계됩니다." },
  { title: "영감과 혁신", body: "고객의 질문이 혁신의 원동력입니다. blum은 끊임없이 움직여 더 나은 아이디어를 만들어갑니다. BLUMOTION, LEGRABOX, TIP-ON 등 수많은 혁신 제품이 이를 증명합니다." },
  { title: "지속가능한 성장", body: "자연 자원을 미래 세대를 위해 보존하는 것이 blum의 핵심 가치입니다. 오스트리아 로컬 생산으로 탄소 발자국을 최소화합니다." },
  { title: "사회적 책임", body: "9,850명의 임직원과 함께하는 blum은 공정하고 안전한 근무 환경을 조성합니다. 가족 경영 기업으로서 3대째 신뢰를 이어가고 있습니다." },
];

export default function V4Company() {
  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ backgroundColor: "#050505", color: "#f0f0f0", fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "60px",
        backgroundColor: navScrolled ? "rgba(5,5,5,0.96)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <Link href="/v4" style={{ color: "#fff", textDecoration: "none", fontSize: "18px", fontWeight: 300, letterSpacing: "0.35em", textTransform: "uppercase" }}>blum</Link>
          <div className="hidden md:flex items-center gap-8">
            {[["제품", "/v4#products"], ["서비스", "/v4/services"], ["회사", "/v4/company"], ["연락처", "/v4/contact"]].map(([label, href]) => (
              <Link key={label} href={href} style={{
                color: label === "회사" ? "#fff" : "rgba(255,255,255,0.45)",
                textDecoration: label === "회사" ? "underline" : "none",
                textUnderlineOffset: "4px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
              }}>{label}</Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
            alt="blum company"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 30%, rgba(5,5,5,0.5) 70%, rgba(5,5,5,0.1) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "120px 2rem 80px", width: "100%" }}>
          <Reveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>About Blum</p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", fontWeight: 200, letterSpacing: "-0.02em", color: "#fff", marginBottom: "24px", lineHeight: 1.1 }}>
              세계가 인정한<br /><span style={{ color: "#e63329" }}>오스트리아의 기술</span>
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.9, fontWeight: 300, maxWidth: "480px" }}>
              Julius Blum GmbH는 1952년 오스트리아에서 창립된 가족 경영 기업으로, 전 세계 120개국에 프리미엄 가구 피팅을 공급하고 있습니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "80px 0", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div style={{ padding: "40px 32px", backgroundColor: "#080808" }}>
                  <div style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 200, color: "#fff", lineHeight: 1, marginBottom: "6px" }}>
                    <Counter target={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>{s.label}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "100px 0", backgroundColor: "#050505" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="flex flex-col md:grid">
            <Reveal>
              <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Our Story</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, color: "#fff", marginBottom: "28px", lineHeight: 1.2 }}>
                3대째 이어오는<br />가족 경영의 신뢰
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  "Julius Blum GmbH는 1952년 오스트리아 포어알베르크 주 회흐스트에서 창립되었습니다. 처음에는 말굽 못 제조업으로 시작해 정밀 금속 가공 기술을 축적했습니다.",
                  "현재 3대째 가족 경영으로 운영되며, 전 세계 34개 자회사 및 대리점을 통해 120개국 이상에 제품을 공급하고 있습니다.",
                  "오스트리아 포어알베르크 지역에 8개의 생산 시설을 운영하며, 모든 제품을 Made in Austria 품질 기준으로 생산합니다.",
                ].map((text, i) => (
                  <p key={i} style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, fontWeight: 300 }}>{text}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <img
                  src={`${BASE}/images/560/258/4215064/corporate/media/bilder/unternehmen/standort/blum_luftbild_werk2_4:3.jpg`}
                  alt="blum factory"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{ position: "absolute", bottom: "16px", left: "16px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                  Höchst, Austria · 생산 시설
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 0", backgroundColor: "#080808" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Values</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, color: "#fff", marginBottom: "56px" }}>blum이 추구하는 것</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div style={{ padding: "48px 40px", backgroundColor: "#080808" }}>
                  <span style={{ fontSize: "clamp(2rem,3vw,2.5rem)", fontWeight: 200, color: "rgba(255,255,255,0.06)", display: "block", marginBottom: "16px" }}>0{i + 1}</span>
                  <h3 style={{ fontSize: "18px", fontWeight: 400, color: "#fff", marginBottom: "12px" }}>{v.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.9, fontWeight: 300 }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 2rem", backgroundColor: "#030303" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>© 2025 Blum Korea. All rights reserved.</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {[["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? "rgba(230,51,41,0.7)" : "rgba(255,255,255,0.2)", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
