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

const SERVICES = [
  {
    num: "01",
    name: "계획 / 설계 지원",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다. 도면 데이터와 제품 구성 프로그램을 통해 전문적인 가구 설계를 지원합니다.",
    items: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    num: "02",
    name: "E-Services",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결되는 온라인 서비스 포털을 제공합니다. EASY ASSEMBLY 앱으로 현장에서도 빠른 지원이 가능합니다.",
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
  },
  {
    num: "03",
    name: "조립 / 조정 지원",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 blum의 전문 조립 장치로 작업을 단순화하고 품질을 높입니다.",
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    num: "04",
    name: "마케팅 / 판매 지원",
    desc: "blum 제품을 판매하는 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 고해상도 이미지, 영상, 기술 문서 등 판매에 필요한 모든 자료를 제공합니다.",
    items: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
    img: `${BASE}/images/560/258/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
  },
  {
    num: "05",
    name: "교육 / 트레이닝",
    desc: "blum 제품의 정확한 설치와 조정을 위한 전문 교육 프로그램. 온라인 튜토리얼과 EASY ASSEMBLY 앱을 통해 언제 어디서나 학습이 가능합니다.",
    items: ["제품 설치 및 조정 교육", "온라인 튜토리얼", "EASY ASSEMBLY 앱 가이드", "파트너 트레이닝 프로그램"],
    img: `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`,
  },
];

export default function V4Services() {
  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ backgroundColor: "#050505", color: "#f0f0f0", fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: "100vh" }}>
      <style>{`.v4s-btn { transition: all 0.35s cubic-bezier(0.25,1,0.5,1); } .v4s-btn:hover { transform: translateY(-2px); }`}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: "60px",
        backgroundColor: navScrolled ? "rgba(5,5,5,0.96)" : "rgba(5,5,5,0.8)",
        backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.4s ease",
      }}>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <Link href="/v4" style={{ color: "#fff", textDecoration: "none", fontSize: "18px", fontWeight: 300, letterSpacing: "0.35em", textTransform: "uppercase" }}>blum</Link>
          <div className="hidden md:flex items-center gap-8">
            {[["제품", "/v4#products"], ["서비스", "/v4/services"], ["회사", "/v4/company"], ["연락처", "/v4/contact"]].map(([label, href]) => (
              <Link key={label} href={href} style={{
                color: label === "서비스" ? "#fff" : "rgba(255,255,255,0.45)",
                textDecoration: label === "서비스" ? "underline" : "none",
                textUnderlineOffset: "4px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
              }}>{label}</Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: "9px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Services</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 200, letterSpacing: "-0.02em", color: "#fff", marginBottom: "24px" }}>
            blum이 함께하는<br /><span style={{ color: "#e63329" }}>전 과정 서비스</span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.9, fontWeight: 300, maxWidth: "480px" }}>
            기획부터 설치, 판매까지 — blum은 파트너의 성공을 위해 모든 단계에서 전문적인 지원을 제공합니다.
          </p>
        </Reveal>
      </section>

      {/* Services */}
      <section style={{ paddingBottom: "120px" }}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.num} delay={i * 60}>
            <div style={{
              display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: "0",
              marginBottom: "2px", backgroundColor: i % 2 === 0 ? "#080808" : "#060606",
            }} className="flex flex-col md:grid">
              <div style={{ order: i % 2 === 0 ? 0 : 1, padding: "64px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 200, color: "rgba(255,255,255,0.06)", display: "block", marginBottom: "16px", lineHeight: 1 }}>{s.num}</span>
                <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 300, color: "#fff", marginBottom: "20px" }}>{s.name}</h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.9, fontWeight: 300, marginBottom: "28px" }}>{s.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {s.items.map((item) => (
                    <li key={item} style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "16px", height: "1px", backgroundColor: "#e63329", flexShrink: 0, display: "inline-block" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0, position: "relative", minHeight: "360px" }}>
                <img
                  src={s.img}
                  alt={s.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: i % 2 === 0 ? "linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 50%)" : "linear-gradient(to left, rgba(6,6,6,0.5) 0%, transparent 50%)" }} />
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 2rem", textAlign: "center", backgroundColor: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Reveal>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 200, color: "#fff", marginBottom: "24px" }}>더 자세한 서비스 안내가 필요하신가요?</h2>
          <Link href="/v4/contact" className="v4s-btn" style={{
            color: "#fff", textDecoration: "none", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "14px 32px", backgroundColor: "#e63329", display: "inline-block",
          }}>
            문의하기
          </Link>
        </Reveal>
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
