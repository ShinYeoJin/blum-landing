import Link from "next/link";

const VERSIONS = [
  {
    href: "/v1",
    num: "V1",
    title: "미니멀 모던",
    subtitle: "Minimal Modern",
    desc: "극도의 여백 · 좌우 2단 그리드 · 흑백 계열",
    tag: "클래식 미니멀",
    bgColor: "#18181b",
    borderColor: "#3f3f46",
    previewBg: "#111111",
    previewAccent: "#ffffff",
    bars: [
      { w: "100%", h: 60, bg: "#222" },
      { w: "70%", h: 14, bg: "#444", mt: 16 },
      { w: "50%", h: 10, bg: "#333", mt: 8 },
      { w: "100%", h: 1, bg: "#444", mt: 20 },
      { w: "100%", h: 80, bg: "#1a1a1a", mt: 12 },
    ],
  },
  {
    href: "/v2",
    num: "V2",
    title: "따뜻한 자연",
    subtitle: "Warm Natural",
    desc: "카드형 레이아웃 · 따뜻한 우드톤 · 자연스러운 텍스처",
    tag: "웜톤 내추럴",
    bgColor: "#3b2a1a",
    borderColor: "#6b4c2a",
    previewBg: "#faf7f2",
    previewAccent: "#c68642",
    bars: [
      { w: "100%", h: 50, bg: "#f0ebe3" },
      { w: "60%", h: 12, bg: "#d4a574", mt: 14 },
      { w: "40%", h: 9, bg: "#c68642", mt: 6 },
      { w: "100%", h: 1, bg: "#e8ddd0", mt: 18 },
      { w: "100%", h: 75, bg: "#ede8e0", mt: 10 },
    ],
  },
  {
    href: "/v3",
    num: "V3",
    title: "트렌디 볼드",
    subtitle: "Trendy Bold",
    desc: "비대칭 오버레이 · 강렬한 타이포 · 레드 포인트",
    tag: "볼드 트렌디",
    bgColor: "#0a0a0a",
    borderColor: "#c8102e",
    previewBg: "#0a0a0a",
    previewAccent: "#c8102e",
    bars: [
      { w: "100%", h: 55, bg: "#111" },
      { w: "80%", h: 16, bg: "#c8102e", mt: 14 },
      { w: "55%", h: 10, bg: "#444", mt: 8 },
      { w: "30%", h: 3, bg: "#c8102e", mt: 12 },
      { w: "100%", h: 70, bg: "#0d0d0d", mt: 10 },
    ],
  },
  {
    href: "/v4",
    num: "V4",
    title: "시네마틱",
    subtitle: "Cinematic",
    desc: "풀스크린 핀 섹션 · 수평 스크롤 · 딥네이비 + 골드",
    tag: "시네마틱 럭셔리",
    bgColor: "#0D1117",
    borderColor: "#D4AF37",
    previewBg: "#0D1117",
    previewAccent: "#D4AF37",
    bars: [
      { w: "100%", h: 55, bg: "#0a0d12" },
      { w: "65%", h: 14, bg: "#D4AF37", mt: 14 },
      { w: "45%", h: 9, bg: "#8a7030", mt: 8 },
      { w: "20%", h: 2, bg: "#D4AF37", mt: 12 },
      { w: "100%", h: 72, bg: "#080b0f", mt: 10 },
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
                    {/* 시뮬레이션 레이아웃 바 */}
                    {v.bars.map((bar, i) => (
                      <div key={i} style={{
                        width: bar.w, height: bar.h,
                        background: bar.bg,
                        marginTop: bar.mt ?? 0,
                        borderRadius: 2,
                      }} />
                    ))}
                    {/* 포인트 컬러 닷 */}
                    <div style={{
                      display: "flex", gap: 6, marginTop: 16,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.previewAccent, opacity: 0.8 }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.previewAccent, opacity: 0.4 }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.previewAccent, opacity: 0.2 }} />
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
