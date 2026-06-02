"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Design tokens (v4 통일) ─────────────────────────────────────── */
const GOLD  = "#D4AF37";
const NAVY  = "#0D1117";
const CREAM = "#F5F0E8";
const GRAY  = "rgba(245,240,232,0.55)";
const LINE  = "rgba(212,175,55,0.18)";
const BASE  = "https://www.blum.com";

/* ── Data ─────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num:  "01",
    name: "계획 / 설계 지원",
    desc: "가구 기획 단계부터 blum이 함께합니다. 구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다. 도면 데이터와 제품 구성 프로그램을 통해 전문적인 가구 설계를 지원합니다.",
    items: ["구역 플래너", "캐비닛 구성 시뮬레이터", "제품 구성 프로그램", "도면 데이터 제공"],
    img: `${BASE}/images/560/258/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    num:  "02",
    name: "E-Services",
    desc: "언제 어디서나 온라인으로 blum의 모든 서비스를 이용하세요. CAD/CAM 데이터부터 주문 관리까지 디지털로 완결되는 온라인 서비스 포털을 제공합니다.",
    items: ["CAD/CAM 데이터 서비스", "제품 DB", "온라인 주문 인터페이스", "EASY ASSEMBLY 앱"],
    img: `${BASE}/images/560/258/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png`,
  },
  {
    num:  "03",
    name: "조립 / 조정 지원",
    desc: "정밀한 설치와 완벽한 조정을 위한 전문 도구와 가이드. ECODRILL, EASYSTICK 등 blum의 전문 조립 장치로 작업을 단순화하고 품질을 높입니다.",
    items: ["ECODRILL 드릴링 기기", "EASYSTICK 스탬핑 도구", "MINIPRESS top", "조립 장치 선택기"],
    img: `${BASE}/images/560/258/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
  },
  {
    num:  "04",
    name: "마케팅 / 판매 지원",
    desc: "blum 제품을 판매하는 파트너를 위한 포괄적인 마케팅 자료와 기술 지원. 고해상도 이미지, 영상, 기술 문서 등 판매에 필요한 모든 자료를 제공합니다.",
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

/* ── FadeUp: 아래→위 fade-in (CTA용) ─────────────────────────────── */
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
  const [navScrolled, setNavScrolled] = useState(false);

  /* Hero animation stages */
  const [h1,  setH1]  = useState(false); // line 1 slide from right
  const [h2,  setH2]  = useState(false); // line 2 slide from left
  const [sub, setSub] = useState(false); // sub text fade-in

  /* Sticky services: track scrollY + each section's offsetTop */
  const [scrollY, setScrollY] = useState(0);
  const svcRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [svcOffsets, setSvcOffsets] = useState<number[]>([]);
  const [svcVis, setSvcVis] = useState<boolean[]>(SERVICES.map(() => false));

  useEffect(() => {
    const fn = () => { setNavScrolled(window.scrollY > 60); setScrollY(window.scrollY); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Hero: staged entrance */
  useEffect(() => {
    const t1 = setTimeout(() => setH1(true),  120);
    const t2 = setTimeout(() => setH2(true),  400);
    const t3 = setTimeout(() => setSub(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  /* Measure section offsets after mount */
  useEffect(() => {
    const measure = () => {
      setSvcOffsets(svcRefs.current.map(el => el?.getBoundingClientRect().top ?? 0 + window.scrollY));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* IntersectionObserver per service content block */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    svcRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setSvcVis(p => { const n = [...p]; n[i] = true; return n; });
      }, { threshold: 0.15 });
      io.observe(el); observers.push(io);
    });
    return () => observers.forEach(io => io.disconnect());
  }, []);

  /* Per-card parallax offset (subtle, content "rises" as you scroll) */
  const parallax = (i: number) => {
    const offset = svcOffsets[i] ?? 0;
    const rel = scrollY - offset + (typeof window !== "undefined" ? window.innerHeight * 0.4 : 0);
    return Math.min(0, -rel * 0.06); // negative = translate up
  };

  /* CSS ──────────────────────────────────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

    .v4s-serif { font-family:'Cormorant Garamond','Georgia',serif; }
    .v4s-nav-link { transition:color 0.2s ease; }
    .v4s-nav-link:hover { color:${GOLD} !important; }
    .v4s-btn { transition:all 0.35s cubic-bezier(0.25,1,0.5,1); display:inline-block; }
    .v4s-btn:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(212,175,55,0.3); }

    /* Sticky service stack */
    .v4s-svc-wrap {
      position: relative;
      height: 140vh;
    }
    .v4s-svc-sticky {
      position: sticky;
      top: 64px;
      height: calc(100vh - 64px);
      overflow: hidden;
    }

    /* Item list */
    .v4s-item { display:flex; align-items:center; gap:10px; }
    .v4s-item-dot { width:16px; height:1px; background:${GOLD}; flex-shrink:0; display:inline-block; }

    @keyframes v4s-slide-r { from{opacity:0;transform:translateX(70px)} to{opacity:1;transform:none} }
    @keyframes v4s-slide-l { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:none} }
    @keyframes v4s-fade    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }

    .v4s-h1r { animation: v4s-slide-r 0.9s cubic-bezier(0.16,1,0.3,1) both; }
    .v4s-h1l { animation: v4s-slide-l 0.9s cubic-bezier(0.16,1,0.3,1) 0.28s both; }
    .v4s-sub { animation: v4s-fade    0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both; }

    @media (max-width: 768px) {
      .v4s-svc-wrap { height: auto; }
      .v4s-svc-sticky { position: relative; top: auto; height: auto; min-height: 600px; }
      .v4s-svc-inner { flex-direction: column !important; }
      .v4s-svc-img { height: 260px !important; }
    }
  `;

  return (
    <div style={{ backgroundColor: NAVY, color: CREAM, fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ NAV (v4 통일) ══════════════════════════════════════════ */}
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
            }}>
              blum이 함께하는
            </h1>
          )}
        </div>
        <div style={{ overflow: "hidden", marginBottom: "32px" }}>
          {h2 && (
            <h1 className="v4s-serif v4s-h1l" style={{
              fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 300,
              color: GOLD, fontStyle: "italic", lineHeight: 0.95, margin: 0,
            }}>
              전 과정 서비스
            </h1>
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

      {/* ══ SERVICES — sticky stack ═════════════════════════════════
          각 카드가 sticky로 쌓이며 다음 카드가 이전 카드 위를 덮는 구조.
          배경(이미지) 고정 + 콘텐츠 위로 솟구치는 효과.
      ═════════════════════════════════════════════════════════════ */}
      <section style={{ paddingBottom: "0" }}>
        {SERVICES.map((s, i) => {
          const visible  = svcVis[i];
          const imgLeft  = i % 2 === 0;
          const py       = parallax(i);

          return (
            <div key={s.num} className="v4s-svc-wrap">
              <div
                className="v4s-svc-sticky"
                ref={(el) => { svcRefs.current[i] = el; }}
                style={{
                  zIndex: i + 1,
                  backgroundColor: i % 2 === 0 ? "#0A0E14" : "#080B10",
                  borderTop: `1px solid ${LINE}`,
                }}
              >
                {/* Inner flex: image + text */}
                <div className="v4s-svc-inner" style={{
                  display: "flex",
                  flexDirection: imgLeft ? "row" : "row-reverse",
                  height: "100%",
                }}>

                  {/* ── Image half ─────────────────────────────── */}
                  <div style={{
                    flex: "0 0 52%", position: "relative", overflow: "hidden",
                    opacity:    visible ? 1 : 0,
                    transition: "opacity 1s ease 0ms",
                  }}>
                    <img
                      src={s.img}
                      alt={s.name}
                      className="v4s-svc-img"
                      style={{
                        width: "100%", height: "110%", objectFit: "cover", display: "block",
                        transform: `translateY(${py}px)`,
                        transition: "transform 0.1s linear",
                        willChange: "transform",
                      }}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                    />
                    {/* Gradient toward text side */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: imgLeft
                        ? `linear-gradient(to right, transparent 65%, ${i % 2 === 0 ? "#0A0E14" : "#080B10"} 100%)`
                        : `linear-gradient(to left,  transparent 65%, ${i % 2 === 0 ? "#0A0E14" : "#080B10"} 100%)`,
                    }} />
                  </div>

                  {/* ── Text half ──────────────────────────────── */}
                  <div style={{
                    flex: 1, display: "flex", alignItems: "center",
                    padding: "0 clamp(28px,5%,72px)",
                    transform: `translateY(${visible ? py * 0.5 : 60}px)`,
                    opacity: visible ? 1 : 0,
                    transition: visible
                      ? `opacity 0.85s ease 150ms, transform 0.1s linear`
                      : "opacity 0s, transform 0s",
                  }}>
                    <div>
                      {/* Ghost number */}
                      <div className="v4s-serif" style={{
                        fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 300,
                        color: `${GOLD}14`, lineHeight: 1, marginBottom: "4px",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(24px)",
                        transition: "opacity 0.7s ease 80ms, transform 0.7s ease 80ms",
                      }}>{s.num}</div>

                      {/* Service name */}
                      <div style={{
                        clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                        transition: "clip-path 0.85s cubic-bezier(0.77,0,0.18,1) 220ms",
                      }}>
                        <h2 className="v4s-serif" style={{
                          fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300,
                          color: CREAM, lineHeight: 1.1, marginBottom: "20px",
                        }}>{s.name}</h2>
                      </div>

                      {/* Gold divider */}
                      <div style={{
                        width: "40px", height: "1px", backgroundColor: `${GOLD}55`,
                        transform: visible ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.7s cubic-bezier(0.77,0,0.18,1) 420ms",
                        marginBottom: "20px",
                      }} />

                      {/* Description */}
                      <p style={{
                        fontSize: "14px", color: GRAY, lineHeight: 1.95,
                        maxWidth: "360px", marginBottom: "28px",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(16px)",
                        transition: "opacity 0.8s ease 500ms, transform 0.8s ease 500ms",
                      }}>{s.desc}</p>

                      {/* Items */}
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {s.items.map((item, ii) => (
                          <li key={item} className="v4s-item" style={{
                            fontSize: "12px", color: `${CREAM}55`,
                            opacity: visible ? 1 : 0,
                            transform: visible ? "none" : "translateY(12px)",
                            transition: `opacity 0.7s ease ${560 + ii * 100}ms, transform 0.7s ease ${560 + ii * 100}ms`,
                          }}>
                            <span className="v4s-item-dot" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

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
            color: NAVY,
            textDecoration: "none",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            padding: "16px 40px",
            backgroundColor: GOLD,
          }}>
            문의하기
          </Link>
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
