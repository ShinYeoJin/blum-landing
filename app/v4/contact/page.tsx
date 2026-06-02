"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

const INPUT_STYLE: React.CSSProperties = {
  width: "100%", padding: "14px 0", backgroundColor: "transparent",
  border: "none", borderBottom: "1px solid rgba(255,255,255,0.15)",
  color: "#fff", fontSize: "14px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
  outline: "none", transition: "border-color 0.3s ease",
};

export default function V4Contact() {
  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ backgroundColor: "#050505", color: "#f0f0f0", fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        .v4c-input:focus { border-bottom-color: #e63329 !important; }
        .v4c-input::placeholder { color: rgba(255,255,255,0.25); }
        .v4c-btn { transition: all 0.35s cubic-bezier(0.25,1,0.5,1); }
        .v4c-btn:hover { transform: translateY(-2px); opacity: 0.9; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "60px",
        backgroundColor: navScrolled ? "rgba(5,5,5,0.96)" : "rgba(5,5,5,0.8)",
        backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.4s ease",
      }}>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <Link href="/v4" style={{ color: "#D4AF37", textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>blum</Link>
          <div className="hidden md:flex items-center gap-8">
            {([["제품", "/v4#products"], ["가치", "/v4#values"], ["서비스", "/v4/services"], ["연락처", "/v4/contact"]] as [string,string][]).map(([label, href]) => (
              <Link key={label} href={href} style={{
                color: label === "연락처" ? "#D4AF37" : "rgba(245,240,232,0.55)",
                textDecoration: "none",
                borderBottom: label === "연락처" ? "1px solid rgba(212,175,55,0.44)" : "none",
                paddingBottom: label === "연락처" ? "2px" : "0",
                fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                transition: "color 0.2s ease",
              }}>{label}</Link>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <section style={{ paddingTop: "140px", paddingBottom: "80px" }}>
          <Reveal>
            <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Contact &amp; Showroom</p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 200, letterSpacing: "-0.02em", color: "#fff", marginBottom: "20px" }}>
              쇼룸에서<br /><span style={{ color: "#e63329" }}>직접 경험하세요</span>
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.9, fontWeight: 300, maxWidth: "440px" }}>
              전문 컨설턴트가 공간에 최적화된 blum 솔루션을 제안해드립니다.
            </p>
          </Reveal>
        </section>

        {/* Contact Grid */}
        <section style={{ paddingBottom: "100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }} className="flex flex-col md:grid">
            {/* Info */}
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 400, color: "#fff", marginBottom: "24px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    <span style={{ color: "#e63329" }}>—</span> 한국 쇼룸
                  </h2>
                  {[
                    { label: "주소", value: "서울특별시 강남구 테헤란로 431\n저스트코 타워 2층" },
                    { label: "전화", value: "02-6925-0800" },
                    { label: "이메일", value: "info.korea@blum.com" },
                    { label: "영업시간", value: "월요일 – 금요일\n09:00 – 18:00" },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "6px" }}>{item.label}</span>
                      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.8, whiteSpace: "pre-line" }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 400, color: "#fff", marginBottom: "24px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    <span style={{ color: "#e63329" }}>—</span> 본사 (오스트리아)
                  </h2>
                  {[
                    { label: "회사", value: "Julius Blum GmbH" },
                    { label: "주소", value: "Industriestrasse 1\n6973 Höchst, Austria" },
                    { label: "전화", value: "+43 5578 705-0" },
                    { label: "웹사이트", value: "www.blum.com" },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: "20px" }}>
                      <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "4px" }}>{item.label}</span>
                      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={150}>
              <div style={{ padding: "48px", backgroundColor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 300, color: "#fff", marginBottom: "40px" }}>문의 / 방문 신청</h2>
                <form style={{ display: "flex", flexDirection: "column", gap: "28px" }} onSubmit={(e) => e.preventDefault()}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div>
                      <label style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "8px" }}>이름 *</label>
                      <input type="text" placeholder="홍길동" className="v4c-input" style={INPUT_STYLE} />
                    </div>
                    <div>
                      <label style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "8px" }}>회사명</label>
                      <input type="text" placeholder="회사명" className="v4c-input" style={INPUT_STYLE} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "8px" }}>연락처 *</label>
                    <input type="tel" placeholder="010-0000-0000" className="v4c-input" style={INPUT_STYLE} />
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "8px" }}>이메일</label>
                    <input type="email" placeholder="example@company.com" className="v4c-input" style={INPUT_STYLE} />
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "8px" }}>문의 내용</label>
                    <textarea
                      placeholder="문의하실 내용을 작성해 주세요"
                      rows={4}
                      className="v4c-input"
                      style={{ ...INPUT_STYLE, resize: "none", lineHeight: 1.8 }}
                    />
                  </div>
                  <button type="submit" className="v4c-btn" style={{
                    width: "100%", padding: "16px", backgroundColor: "#e63329", color: "#fff",
                    border: "none", cursor: "pointer", fontSize: "11px", letterSpacing: "0.25em",
                    textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}>
                    문의 보내기
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

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
