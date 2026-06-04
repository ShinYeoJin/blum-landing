"use client";

import { useState, useRef, useEffect } from "react";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

/* Reusable fade-up hook via IntersectionObserver */
function useFadeUp(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 13,
  outline: "none",
  border: "1px solid rgba(200,16,46,0.2)",
  backgroundColor: "#0a0a0a",
  color: "#f0f0f0",
  fontFamily: "Arial, sans-serif",
  boxSizing: "border-box",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 900,
  color: "rgba(240,240,240,0.4)",
  marginBottom: 6,
  fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
};

export default function V3Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", category: "", message: "",
  });

  const heroRef  = useRef<HTMLElement>(null);
  const formRef  = useRef<HTMLElement>(null);
  const infoRef  = useRef<HTMLElement>(null);

  /* ── Hero slide-up on mount ── */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }));
  }, []);

  /* ── Scroll-triggered fade-up for form & info ── */
  useFadeUp(formRef as React.RefObject<HTMLElement>);
  useFadeUp(infoRef as React.RefObject<HTMLElement>);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>

      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        style={{ minHeight: 380, paddingTop: 82, paddingBottom: 64, paddingLeft: 48, paddingRight: 48, position: "relative", display: "flex", alignItems: "flex-end", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={`${BASE}/images/560/258/4212633/corporate/media/bilder/services/img2575_aa_fot_fo_bau_-sall_-aip01_-v1_4:3.jpg`}
            alt="blum contact"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 50%, rgba(0,0,0,0.3) 100%)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", backgroundColor: RED, opacity: 0.05 }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, width: "100%" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>
            Contact
          </p>
          <h1 style={{ fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, marginBottom: 20 }}>
            CONTACT<br /><span style={{ color: RED }}>US.</span>
          </h1>
          <div style={{ width: 60, height: 3, backgroundColor: RED, marginBottom: 16 }} />
          <p style={{ fontSize: 14, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            제품 문의, 쇼룸 방문, 파트너십 — 무엇이든 연락주세요.
          </p>
        </div>
      </section>

      {/* ══ SECTION 1: 문의서 ══ */}
      <section
        ref={formRef as React.RefObject<HTMLElement>}
        style={{ padding: "80px 48px", borderTop: "1px solid rgba(200,16,46,0.15)", maxWidth: 1280, margin: "0 auto" }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>
          문의서
        </p>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 48, color: "#f0f0f0" }}>
          무엇을 도와드릴까요?
        </h2>

        {submitted ? (
          <div style={{ padding: "64px 0", textAlign: "center", border: "1px solid rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: RED, marginBottom: 16 }}>✓</div>
            <h3 style={{ fontSize: 18, fontWeight: 900, textTransform: "uppercase", marginBottom: 8 }}>문의 접수 완료</h3>
            <p style={{ fontSize: 13, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
              2영업일 내로 담당자가 연락드리겠습니다.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Row 1: 이름 / 회사명 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={LABEL_STYLE}>이름 *</label>
                <input type="text" placeholder="홍길동" required value={form.name}
                  onChange={set("name")} style={INPUT_STYLE} />
              </div>
              <div>
                <label style={LABEL_STYLE}>회사명</label>
                <input type="text" placeholder="회사 이름 (선택)" value={form.company}
                  onChange={set("company")} style={INPUT_STYLE} />
              </div>
            </div>

            {/* Row 2: 이메일 / 연락처 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={LABEL_STYLE}>이메일 *</label>
                <input type="email" placeholder="example@company.com" required value={form.email}
                  onChange={set("email")} style={INPUT_STYLE} />
              </div>
              <div>
                <label style={LABEL_STYLE}>연락처</label>
                <input type="tel" placeholder="010-0000-0000" value={form.phone}
                  onChange={set("phone")} style={INPUT_STYLE} />
              </div>
            </div>

            {/* 문의 유형 */}
            <div>
              <label style={LABEL_STYLE}>문의 유형</label>
              <select value={form.category} onChange={set("category")} style={INPUT_STYLE}>
                <option value="">선택해주세요</option>
                <option>제품 문의</option>
                <option>쇼룸 방문 신청</option>
                <option>파트너십·딜러 문의</option>
                <option>기술 지원</option>
                <option>기타</option>
              </select>
            </div>

            {/* 문의 내용 */}
            <div>
              <label style={LABEL_STYLE}>문의 내용 *</label>
              <textarea
                rows={6}
                placeholder="문의하실 내용을 자유롭게 작성해주세요."
                required
                value={form.message}
                onChange={set("message")}
                style={{ ...INPUT_STYLE, resize: "none" }}
              />
            </div>

            <div>
              <button
                type="submit"
                style={{
                  width: "100%", padding: "18px 0",
                  fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 900,
                  backgroundColor: RED, color: "#fff", border: "none", cursor: "pointer",
                  fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
              >
                문의 보내기
              </button>
              <p style={{ fontSize: 9, textAlign: "center", marginTop: 12, color: "rgba(240,240,240,0.25)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                * 표시는 필수 입력 항목입니다. 개인정보는 문의 처리 목적으로만 사용됩니다.
              </p>
            </div>
          </form>
        )}
      </section>

      {/* ══ SECTION 2: 본사 / 상담채널 / 쇼룸 (3열) ══ */}
      <section
        ref={infoRef as React.RefObject<HTMLElement>}
        style={{
          padding: "80px 48px",
          borderTop: "1px solid rgba(200,16,46,0.15)",
          backgroundColor: "#0a0a0a",
          maxWidth: "100%",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>

          {/* 본사 */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 20 }}>
              본사
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 16 }}>
              Julius Blum GmbH<br />
              Werk 2, Industriestrasse 1<br />
              6973 Höchst, Austria
            </p>
            <a
              href="https://www.blum.com/kr/ko/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, fontWeight: 900, color: RED, textDecoration: "none", letterSpacing: "0.08em", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              공식 사이트 →
            </a>
          </div>

          {/* 상담 채널 */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 20 }}>
              상담 채널
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "온라인 문의", link: "blum.com 공식 문의 폼 →", href: "https://www.blum.com/kr/ko/contact/" },
                { label: "영업소 찾기", link: "전국 영업소 안내 →", href: "https://www.blum.com/kr/ko/contact/sales-offices/" },
                { label: "쇼룸", link: "제품 직접 체험 →", href: "https://www.blum.com/kr/ko/contact/showrooms/" },
              ].map((c) => (
                <div key={c.label}>
                  <p style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(240,240,240,0.7)", marginBottom: 4, fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: "rgba(240,240,240,0.35)", textDecoration: "none", fontFamily: "Arial, sans-serif", fontWeight: 400 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = RED; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,240,240,0.35)"; }}
                  >
                    {c.link}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 쇼룸 안내 */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 20 }}>
              쇼룸 안내
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400, marginBottom: 24 }}>
              전 세계 blum 쇼룸에서 AVENTOS, LEGRABOX, CLIP top을 직접 체험하실 수 있습니다.
            </p>
            <a
              href="https://www.blum.com/kr/ko/contact/showrooms/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 900,
                backgroundColor: RED, color: "#fff", textDecoration: "none",
                fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              쇼룸 찾기
            </a>
          </div>

        </div>
      </section>

      {/* ══ E-SERVICES CTA ══ */}
      <section style={{ padding: "48px 48px", borderTop: "1px solid rgba(200,16,46,0.15)", backgroundColor: "#050505" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", marginBottom: 4 }}>E-SERVICES 포털</p>
            <p style={{ fontSize: 12, color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
              제품 구성, CAD 데이터, 주문 관리를 온라인으로.
            </p>
          </div>
          <a
            href="https://e-services.blum.com/main/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              whiteSpace: "nowrap",
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 900,
              padding: "12px 24px",
              border: "1px solid rgba(200,16,46,0.4)",
              color: "#f0f0f0", textDecoration: "none",
              fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            E-Services 접속
          </a>
        </div>
      </section>

    </div>
  );
}
