import Link from "next/link";

const VERSIONS = [
  {
    href: "/v1",
    num: "V1",
    title: "미니멀 모던",
    subtitle: "Minimal Modern",
    desc: "좌우 2단 그리드 교차 배치 · 극도의 여백 · 흑백 + 세리프 · 아코디언 철학 섹션",
    tag: "2-Column Grid",
    bgColor: "#18181b",
    borderColor: "#3f3f46",
    previewBg: "#111111",
    previewAccent: "#ffffff",
    layout: [
      { type: "full", h: 40, bg: "#222", label: "Hero Full-screen" },
      { type: "two-col", h: 56, left: "#1a1a1a", right: "#333", label: "2-Col Grid" },
      { type: "two-col", h: 56, left: "#2a2a2a", right: "#1a1a1a", label: "2-Col Swap" },
      { type: "full", h: 20, bg: "#181818", label: "Divider Image" },
      { type: "two-col", h: 40, left: "#222", right: "#1c1c1c", label: "Philosophy" },
    ],
  },
  {
    href: "/v2",
    num: "V2",
    title: "따뜻한 자연",
    subtitle: "Warm Natural",
    desc: "3열 카드 그리드 · 전폭 교차 이미지 행 · 따뜻한 우드톤 · 스토리 좌우 분할",
    tag: "Card + Full Row",
    bgColor: "#3b2a1a",
    borderColor: "#6b4c2a",
    previewBg: "#faf7f2",
    previewAccent: "#c68642",
    layout: [
      { type: "full", h: 40, bg: "#e8d8c4", label: "Hero" },
      { type: "three-col", h: 52, cols: ["#ddd0bc", "#c8b8a0", "#ddd0bc"], label: "3-Col Cards" },
      { type: "two-col", h: 44, left: "#f0ebe3", right: "#c8b098", label: "Full-Row Story" },
      { type: "two-col", h: 44, left: "#c8b098", right: "#f5f0e8", label: "Full-Row Swap" },
      { type: "three-col", h: 28, cols: ["#e8ddd0", "#e0d8c8", "#e8ddd0"], label: "Values" },
    ],
  },
  {
    href: "/v3",
    num: "V3",
    title: "트렌디 볼드",
    subtitle: "Trendy Bold",
    desc: "전폭 배경 + 텍스트 오버레이 · 비대칭 12열 그리드 · 강렬한 레드 포인트",
    tag: "Asymmetric Overlay",
    bgColor: "#0a0a0a",
    borderColor: "#c8102e",
    previewBg: "#0a0a0a",
    previewAccent: "#c8102e",
    layout: [
      { type: "full", h: 44, bg: "#111", label: "Full-screen Hero Overlay" },
      { type: "asymm", h: 52, left: "#1a1a1a", right: "#0d0d0d", lw: "38%", label: "Asymm Brand" },
      { type: "four-col", h: 40, cols: ["#0f0f0f", "#131313", "#0f0f0f", "#131313"], label: "4-Col Products" },
      { type: "full", h: 24, bg: "#c8102e", label: "Manifesto Red" },
      { type: "full", h: 18, bg: "#0a0a0a", label: "CTA" },
    ],
  },
  {
    href: "/v4",
    num: "V4",
    title: "시네마틱",
    subtitle: "Cinematic",
    desc: "풀스크린 슬라이드쇼 · 클릭 전환 제품 뷰어 · 수직 타임라인 · 네이비 + 골드",
    tag: "Fullscreen Pinned",
    bgColor: "#0D1117",
    borderColor: "#D4AF37",
    previewBg: "#0D1117",
    previewAccent: "#D4AF37",
    layout: [
      { type: "full", h: 44, bg: "#090d13", label: "Full-screen Hero" },
      { type: "full", h: 48, bg: "#0a0e14", label: "Slideshow Brand Story" },
      { type: "full", h: 48, bg: "#080c11", label: "Fullscreen Product Viewer" },
      { type: "four-col", h: 28, cols: ["#070b10", "#080c12", "#070b10", "#080c12"], label: "Stats Grid" },
      { type: "timeline", h: 36, bg: "#0d1117", label: "Vertical Timeline" },
    ],
  },
];

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .vc {
          transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.3s ease;
          text-decoration: none;
          display: block;
        }
        .vc:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }
        .vc:hover .vc-arrow { transform: translateX(4px); }
        .vc-arrow { transition: transform 0.3s ease; display: inline-block; }

        .notice-bar {
          background: #1a1a1a;
          color: rgba(255,255,255,0.65);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-align: center;
          padding: 10px 24px;
          border-bottom: 1px solid #2a2a2a;
        }
        .notice-bar strong { color: #D4AF37; }

        @media (max-width: 768px) {
          .cards-grid { grid-template-columns: 1fr !important; }
          .page-header h1 { font-size: 32px !important; }
        }
      `}</style>

      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>

        {/* ── 상단 공지 바 ── */}
        <div className="notice-bar">
          <strong>📋 예시본</strong> &nbsp;·&nbsp; 이 페이지는 클라이언트 검토를 위한 디자인 시안입니다. 실제 서비스가 아닙니다.&nbsp;&nbsp;
          <span style={{ opacity: 0.4 }}>Design Mockup for Review Only — Not a Live Product</span>
        </div>

        {/* ── 헤더 ── */}
        <header className="page-header" style={{
          padding: "64px 40px 48px",
          textAlign: "center",
          borderBottom: "1px solid #1e1e1e",
        }}>
          <p style={{
            fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#D4AF37", margin: "0 0 16px", opacity: 0.8,
          }}>
            Julius Blum GmbH · Design Mockup
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 300, fontSize: "clamp(28px, 5vw, 52px)",
            color: "#fff", margin: "0 0 16px", letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}>
            blum 랜딩 페이지 디자인 시안 4종
          </h1>
          <p style={{
            fontSize: "clamp(13px, 2vw, 15px)", color: "rgba(255,255,255,0.45)",
            maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.7,
          }}>
            동일한 브랜드 콘텐츠를 4가지 서로 다른 디자인 방향으로 구현한 시안입니다.
            각 카드를 클릭해 해당 버전을 확인하세요.
          </p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: 4, padding: "8px 18px",
            fontSize: 11, color: "#D4AF37", letterSpacing: "0.1em",
          }}>
            <span>ℹ</span>
            <span>예시본 — 클라이언트 검토용 디자인 시안입니다</span>
          </div>
        </header>

        {/* ── 버전 카드 그리드 ── */}
        <main style={{ padding: "48px 40px 80px", maxWidth: 1200, margin: "0 auto" }}>

          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 32,
          }}>
            <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              4 Versions
            </span>
            <div style={{ flex: 1, height: 1, background: "#1e1e1e" }} />
          </div>

          <div className="cards-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}>
            {VERSIONS.map((v) => (
              <Link key={v.href} href={v.href} className="vc">
                <div style={{
                  background: v.bgColor,
                  border: `1px solid ${v.borderColor}`,
                  overflow: "hidden",
                }}>

                  {/* 상단 미리보기 썸네일 */}
                  <div style={{
                    background: v.previewBg,
                    padding: "20px 20px 16px",
                    borderBottom: `1px solid ${v.borderColor}`,
                    minHeight: 160,
                  }}>
                    <div style={{
                      fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase",
                      color: v.previewAccent, opacity: 0.5, marginBottom: 12,
                    }}>
                      PREVIEW · {v.num}
                    </div>
                    {/* 레이아웃 구조 미리보기 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {v.layout.map((row: { type: string; h: number; bg?: string; left?: string; right?: string; lw?: string; cols?: string[]; label?: string }, i: number) => (
                        <div key={i} style={{ position: "relative" }}>
                          {row.type === "full" && (
                            <div style={{ width: "100%", height: row.h, background: row.bg, borderRadius: 2 }} />
                          )}
                          {row.type === "two-col" && (
                            <div style={{ display: "flex", height: row.h, gap: 2 }}>
                              <div style={{ width: "45%", background: row.left, borderRadius: "2px 0 0 2px" }} />
                              <div style={{ flex: 1, background: row.right, borderRadius: "0 2px 2px 0" }} />
                            </div>
                          )}
                          {row.type === "asymm" && (
                            <div style={{ display: "flex", height: row.h, gap: 2 }}>
                              <div style={{ width: row.lw ?? "38%", background: row.left, borderRadius: "2px 0 0 2px" }} />
                              <div style={{ flex: 1, background: row.right, borderRadius: "0 2px 2px 0" }} />
                            </div>
                          )}
                          {row.type === "three-col" && (
                            <div style={{ display: "flex", height: row.h, gap: 2 }}>
                              {(row.cols ?? []).map((c: string, ci: number) => (
                                <div key={ci} style={{ flex: 1, background: c, borderRadius: ci === 0 ? "2px 0 0 2px" : ci === 2 ? "0 2px 2px 0" : 0 }} />
                              ))}
                            </div>
                          )}
                          {row.type === "four-col" && (
                            <div style={{ display: "flex", height: row.h, gap: 2 }}>
                              {(row.cols ?? []).map((c: string, ci: number) => (
                                <div key={ci} style={{ flex: 1, background: c, borderRadius: ci === 0 ? "2px 0 0 2px" : ci === 3 ? "0 2px 2px 0" : 0 }} />
                              ))}
                            </div>
                          )}
                          {row.type === "timeline" && (
                            <div style={{ display: "flex", height: row.h, alignItems: "center", justifyContent: "center", background: row.bg, borderRadius: 2, position: "relative" }}>
                              <div style={{ width: 1, height: "100%", background: v.previewAccent, opacity: 0.2, position: "absolute", left: "50%" }} />
                              {[20, 40, 65, 85].map((pct, di) => (
                                <div key={di} style={{ position: "absolute", left: `calc(50% - 3px)`, top: `${25 + di * 18}%`, width: 6, height: 6, borderRadius: "50%", background: v.previewAccent, opacity: 0.4 }} />
                              ))}
                            </div>
                          )}
                          {/* row label */}
                          <div style={{ position: "absolute", top: "50%", left: 4, transform: "translateY(-50%)", fontSize: 7, color: v.previewAccent, opacity: 0.35, letterSpacing: "0.15em", pointerEvents: "none", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                            {row.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 하단 정보 */}
                  <div style={{ padding: "24px 28px" }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                      marginBottom: 12,
                    }}>
                      <div>
                        <div style={{
                          fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                          color: v.previewAccent, opacity: 0.7, marginBottom: 6,
                        }}>
                          {v.num} · {v.subtitle}
                        </div>
                        <div style={{
                          fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 300,
                          color: "#fff", letterSpacing: "-0.01em",
                        }}>
                          {v.title}
                        </div>
                      </div>
                      <div style={{
                        fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                        color: v.previewAccent,
                        background: `${v.previewAccent}18`,
                        border: `1px solid ${v.previewAccent}40`,
                        padding: "4px 10px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        marginLeft: 12,
                        marginTop: 4,
                      }}>
                        {v.tag}
                      </div>
                    </div>

                    <p style={{
                      fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7,
                      margin: "0 0 20px",
                    }}>
                      {v.desc}
                    </p>

                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      fontSize: 11, color: v.previewAccent, letterSpacing: "0.08em",
                    }}>
                      <span>시안 보기</span>
                      <span className="vc-arrow">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 하단 안내 */}
          <div style={{
            marginTop: 48, padding: "24px 32px",
            background: "#111", border: "1px solid #1e1e1e",
            display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start",
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>
                About This Mockup
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.7 }}>
                본 시안은 blum 공식 사이트(blum.com)의 실제 콘텐츠를 기반으로 제작된 디자인 예시본입니다.
                제품명, 수치, 브랜드 정보는 공식 정보를 사용하였으나 이 페이지 자체는 공식 사이트가 아닙니다.
              </p>
            </div>
            <div style={{ minWidth: 200 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>
                Official Site
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.7 }}>
                blum.com/kr/ko/
              </p>
            </div>
          </div>
        </main>

        {/* ── 푸터 ── */}
        <footer style={{
          borderTop: "1px solid #1a1a1a",
          padding: "20px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
            Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
            디자인 시안 예시본 — Design Mockup Only
          </span>
        </footer>
      </div>
    </>
  );
}
