"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    num:  "02",
    name: "E-Services",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결됩니다.",
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
  },
  {
    num:  "03",
    name: "조립 / 조정 지원",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 전문 조립 장치로 작업을 단순화합니다.",
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    num:  "04",
    name: "마케팅 / 판매 지원",
    desc: "blum 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 고해상도 이미지, 영상, 기술 문서 등 판매에 필요한 모든 자료를 제공합니다.",
    items: ["마케팅 멀티미디어 자료실", "제품 이미지 / 영상", "기술 문서", "판매 지원 자료"],
    img: `${BASE}/images/560/258/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
  },
  {
    num:  "05",
    name: "교육 / 트레이닝",
    desc: "blum 제품의 정확한 설치와 조정을 위한 전문 교육 프로그램. 온라인 튜토리얼과 EASY ASSEMBLY 앱을 통해 언제 어디서나 학습이 가능합니다.",
    items: ["제품 설치 및 조정 교육", "온라인 튜토리얼", "EASY ASSEMBLY 앱 가이드", "파트너 트레이닝 프로그램"],
    img: `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`,
  },
];

/* ── FadeUp ─────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(48px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function V4Services() {
  gsap.registerPlugin(ScrollTrigger);

  const [navScrolled, setNavScrolled] = useState(false);

  /* Hero animation stages */
  const [h1,  setH1]  = useState(false);
  const [h2,  setH2]  = useState(false);
  const [sub, setSub] = useState(false);
  /* Hero 완료 후 서비스 섹션 등장 */
  const [showServices, setShowServices] = useState(false);

  /* GSAP refs */
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const panelRefs       = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Hero: staged entrance
     h1 slide-r: 0ms start, 900ms duration → done at 900ms
     h2 slide-l: 280ms start, 900ms duration → done at 1180ms
     sub fade:   700ms start, 900ms duration → done at 1600ms
     서비스 섹션: 1700ms 후 표시 (서브 텍스트 완료 + 여유) */
  useEffect(() => {
    const t1 = setTimeout(() => setH1(true),           120);
    const t2 = setTimeout(() => setH2(true),           400);
    const t3 = setTimeout(() => setSub(true),          720);
    const t4 = setTimeout(() => setShowServices(true), 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  /* ── GSAP ScrollTrigger: pinned panel carousel ──────────────────
     핀 방식: pinContainerRef를 pin.
     각 패널은 절대 위치, 초기에는 translateY(100vh) (화면 아래)
     ScrollTrigger scrub으로 각 패널을 순서대로 위로 올리고 앞 패널을 위로 내보냄.
  ─────────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!showServices) return;

    const ctx = gsap.context(() => {
      const container = pinContainerRef.current;
      if (!container) return;

      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const count  = panels.length;

      /* 첫 패널은 중앙에, 나머지는 화면 아래에서 대기 */
      gsap.set(panels[0], { yPercent: 0 });
      panels.slice(1).forEach(p => gsap.set(p, { yPercent: 110 }));

      ScrollTrigger.create({
        trigger:  container,
        start:    "top top",
        end:      `+=${count * 100}vh`,
        pin:      true,
        scrub:    0.6,
        onUpdate: (self) => {
          /* progress 0→1 구간을 count-1 개 슬롯으로 나눔 */
          const rawIdx   = self.progress * (count - 1);
          const slotIdx  = Math.floor(rawIdx);   // 현재 전환 슬롯 (0 ~ count-2)
          const slotProg = rawIdx - slotIdx;      // 슬롯 내 진행도 (0 → 1)

          panels.forEach((p, i) => {
            if (i < slotIdx) {
              /* 이미 지나간 패널: 위로 사라짐 */
              gsap.set(p, { yPercent: -110 });
            } else if (i === slotIdx) {
              /* 현재 나가는 패널: 0 → -110 */
              gsap.set(p, { yPercent: -110 * slotProg });
            } else if (i === slotIdx + 1) {
              /* 들어오는 패널: 110 → 0 */
              gsap.set(p, { yPercent: 110 * (1 - slotProg) });
            } else {
              /* 아직 대기 중인 패널 */
              gsap.set(p, { yPercent: 110 });
            }
          });
        },
      });
    }, pinContainerRef);

    return () => ctx.revert();
  }, [showServices]);

  /* CSS ─────────────────────────────────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

    .v4s-serif { font-family:'Cormorant Garamond','Georgia',serif; }
    .v4s-nav-link { transition:color 0.2s ease; }
    .v4s-nav-link:hover { color:${GOLD} !important; }
    .v4s-btn { transition:all 0.35s cubic-bezier(0.25,1,0.5,1); display:inline-block; }
    .v4s-btn:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(212,175,55,0.3); }

    @keyframes v4s-slide-r { from{opacity:0;transform:translateX(70px)} to{opacity:1;transform:none} }
    @keyframes v4s-slide-l { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:none} }
    @keyframes v4s-fade    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }

    .v4s-h1r { animation: v4s-slide-r 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-h1l { animation: v4s-slide-l 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-sub { animation: v4s-fade    0.9s cubic-bezier(0.16,1,0.3,1) both; }
  `;

  return (
    <div style={{ backgroundColor: NAVY, color: CREAM, fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ NAV ════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "64px",
        backgroundColor: navScrolled ? "rgba(13,17,23,0.96)" : "rgba(13,17,23,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: navScrolled ? `1px solid ${LINE}` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/v4" className="v4s-serif" style={{ color: GOLD, textDecoration: "none", fontSize: "22px", fontWeight: 300, letterSpacing: "0.3em" }}>blum</Link>
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {([
              ["제품",   "/v4#products"],
              ["가치",   "/v4#values"],
              ["서비스", "/v4/services"],
              ["연락처", "/v4/contact"],
            ] as [string, string][]).map(([label, href]) => (
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

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section style={{ padding: "140px 2rem 80px", maxWidth: "1280px", margin: "0 auto" }}>
        <p style={{
          fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase",
          color: `${GOLD}88`, marginBottom: "24px",
          opacity: h1 ? 1 : 0, transition: "opacity 0.6s ease 0.05s",
        }}>Services · blum</p>

        <div style={{ overflow: "hidden", marginBottom: "8px" }}>
          {h1 && (
            <h1 className="v4s-serif v4s-h1r" style={{
              fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 300,
              color: CREAM, lineHeight: 0.95, margin: 0,
            }}>blum이 함께하는</h1>
          )}
        </div>
        <div style={{ overflow: "hidden", marginBottom: "36px" }}>
          {h2 && (
            <h1 className="v4s-serif v4s-h1l" style={{
              fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 300,
              color: GOLD, fontStyle: "italic", lineHeight: 0.95, margin: 0,
              animationDelay: "0ms",
            }}>전 과정 서비스</h1>
          )}
        </div>
        {sub && (
          <p className="v4s-sub" style={{
            fontSize: "15px", color: GRAY, lineHeight: 2,
            fontWeight: 300, maxWidth: "480px",
          }}>
            기획부터 설치, 판매까지 — blum은 파트너의 성공을 위해<br />
            모든 단계에서 전문적인 지원을 제공합니다.
          </p>
        )}
      </section>

      {/* ══ SERVICES — GSAP ScrollTrigger pinned ═══════════════════
          showServices가 true가 되면 렌더, 그 후 useLayoutEffect로 GSAP 세팅.
          pinContainerRef: 핀 고정 컨테이너 (100vh)
          각 패널: absolute, 100%×100%, GSAP가 yPercent 조작
      ════════════════════════════════════════════════════════════ */}
      {showServices && (
        <>
          {/* 핀 가능한 스크롤 여백 + 고정 컨테이너 */}
          <div
            ref={pinContainerRef}
            style={{ position: "relative", height: "100vh", overflow: "hidden" }}
          >
            {SERVICES.map((s, i) => {
              const imgLeft = i % 2 === 0;
              const bgColor = i % 2 === 0 ? "#0A0E14" : "#080B10";
              return (
                <div
                  key={s.num}
                  ref={(el) => { panelRefs.current[i] = el; }}
                  style={{
                    position: "absolute", inset: 0,
                    backgroundColor: bgColor,
                    display: "flex",
                    flexDirection: imgLeft ? "row" : "row-reverse",
                    willChange: "transform",
                  }}
                >
                  {/* Image half */}
                  <div style={{ flex: "0 0 52%", position: "relative", overflow: "hidden" }}>
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
                        : `linear-gradient(to left, transparent 65%, ${bgColor} 100%)`,
                    }} />
                  </div>

                  {/* Text half */}
                  <div style={{
                    flex: 1, display: "flex", alignItems: "center",
                    padding: "0 clamp(28px,5%,72px)",
                  }}>
                    <div>
                      {/* Ghost number */}
                      <div className="v4s-serif" style={{
                        fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 300,
                        color: `${GOLD}18`, lineHeight: 1, marginBottom: "4px",
                      }}>{s.num}</div>

                      {/* Service name */}
                      <h2 className="v4s-serif" style={{
                        fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300,
                        color: CREAM, lineHeight: 1.1, marginBottom: "16px",
                      }}>{s.name}</h2>

                      {/* Gold divider */}
                      <div style={{
                        width: "40px", height: "1px",
                        backgroundColor: `${GOLD}77`,
                        marginBottom: "20px",
                      }} />

                      {/* Description */}
                      <p style={{
                        fontSize: "14px", color: GRAY, lineHeight: 1.95,
                        maxWidth: "360px", marginBottom: "32px",
                      }}>{s.desc}</p>

                      {/* Items — 가독성 개선: 밝은 색·큰 폰트 */}
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                        {s.items.map((item) => (
                          <li key={item} style={{
                            fontSize: "13px",
                            color: CREAM,
                            display: "flex", alignItems: "center", gap: "12px",
                            fontWeight: 300, letterSpacing: "0.02em",
                          }}>
                            <span style={{ width: "18px", height: "1px", backgroundColor: GOLD, flexShrink: 0, display: "inline-block" }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 스크롤 여백 — 핀 구간 이후 페이지가 계속 이어지게 */}
          <div style={{ height: `${(SERVICES.length - 1) * 100}vh` }} />
        </>
      )}

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section style={{
        padding: "120px 2rem",
        textAlign: "center",
        backgroundColor: "#070B10",
        borderTop: `1px solid ${LINE}`,
      }}>
        <FadeUp delay={0}>
          <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}66`, marginBottom: "20px" }}>Get in Touch</p>
        </FadeUp>
        <FadeUp delay={120}>
          <h2 className="v4s-serif" style={{
            fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 300,
            color: CREAM, marginBottom: "36px", lineHeight: 1.3,
          }}>
            더 자세한 서비스 안내가<br />필요하신가요?
          </h2>
        </FadeUp>
        <FadeUp delay={280}>
          <Link href="/v4/contact" className="v4s-btn" style={{
            color: NAVY, textDecoration: "none",
            fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "16px 40px", backgroundColor: GOLD,
          }}>문의하기</Link>
        </FadeUp>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "28px 2rem", backgroundColor: NAVY }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "10px", color: "rgba(245,240,232,0.18)", letterSpacing: "0.1em" }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {([["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]] as [string, string][]).map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: l === "V4" ? `${GOLD}77` : "rgba(245,240,232,0.2)", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
