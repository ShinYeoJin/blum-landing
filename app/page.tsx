import Link from "next/link";

const BASE = "https://www.blum.com";

const VERSIONS = [
  {
    href: "/v1",
    num: "V1",
    title: "미니멀 모던",
    subtitle: "Minimal Modern",
    desc: "좌우 2단 그리드 교차 배치 · 극도의 여백 · 흑백 세리프 타이포그래피",
    tag: "2-Column Grid",
    accent: "#ffffff",
    bg: "#18181b",
    border: "#3f3f46",
    thumbBg: "#111",
    img: `${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`,
    imgOverlay: "rgba(10,10,11,0.55)",
  },
  {
    href: "/v2",
    num: "V2",
    title: "따뜻한 자연",
    subtitle: "Warm Natural",
    desc: "3열 카드 그리드 · 전폭 교차 이미지 행 · 따뜻한 우드톤",
    tag: "Card + Full Row",
    accent: "#c68642",
    bg: "#2a1e12",
    border: "#6b4c2a",
    thumbBg: "#faf7f2",
    img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    imgOverlay: "rgba(42,30,18,0.45)",
  },
  {
    href: "/v3",
    num: "V3",
    title: "트렌디 볼드",
    subtitle: "Trendy Bold",
    desc: "전폭 배경 텍스트 오버레이 · 비대칭 12열 그리드 · 레드 포인트",
    tag: "Asymmetric Overlay",
    accent: "#c8102e",
    bg: "#0a0a0a",
    border: "#c8102e44",
    thumbBg: "#0a0a0a",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
    imgOverlay: "rgba(10,10,10,0.52)",
  },
  {
    href: "/v4",
    num: "V4",
    title: "시네마틱",
    subtitle: "Cinematic",
    desc: "풀스크린 슬라이드쇼 · 클릭 전환 제품 뷰어 · 수직 타임라인",
    tag: "Fullscreen Pinned",
    accent: "#D4AF37",
    bg: "#0D1117",
    border: "#D4AF3744",
    thumbBg: "#0D1117",
    img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
    imgOverlay: "rgba(13,17,23,0.52)",
  },
];

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .vc {
          display: block;
          text-decoration: none;
          transition: transform 0.4s cubic-bezier(0.25,1,0.5,1),
                      box-shadow 0.4s ease;
          will-change: transform;
        }
        .vc:hover { transform: translateY(-8px); }
        .vc:hover .vc-img { transform: scale(1.06); }
        .vc:hover .vc-arrow { transform: translateX(5px); }
        .vc:hover .vc-num { opacity: 1; }
        .vc:hover .vc-border { opacity: 1; }

        .vc-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25,1,0.5,1);
          display: block;
        }
        .vc-arrow { transition: transform 0.3s ease; display: inline-block; }
        .vc-num   { transition: opacity 0.3s ease; }
        .vc-border { transition: opacity 0.4s ease; }

        @media (max-width: 768px) {
          .cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .page-header { padding: 40px 20px 32px !important; }
          .main-pad { padding: 32px 20px 60px !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#080a0d", minHeight: "100vh", color: "#fff" }}>

        {/* ── 상단 공지 바 ── */}
        <div style={{
          background: "#0f1318", borderBottom: "1px solid rgba(212,175,55,0.12)",
          padding: "9px 32px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4AF37", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)" }}>
            디자인 시안 예시본 — Design Mockup for Review Only
          </span>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4AF37", display: "inline-block", flexShrink: 0 }} />
        </div>

        {/* ── 헤더 ── */}
        <header className="page-header" style={{ padding: "72px 40px 56px", textAlign: "center" }}>
          {/* blum 로고 */}
          <div style={{ marginBottom: "24px" }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 300,
              color: "#D4AF37", letterSpacing: "0.35em",
              display: "block", lineHeight: 1,
            }}>blum</span>
            <span style={{
              display: "block", marginTop: 8,
              fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase",
              color: "rgba(212,175,55,0.5)",
            }}>moving ideas</span>
          </div>

          {/* 구분선 */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 320, margin: "0 auto 28px" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(212,175,55,0.15)" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>Design Mockup</span>
            <div style={{ flex: 1, height: 1, background: "rgba(212,175,55,0.15)" }} />
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300, fontSize: "clamp(22px, 4vw, 36px)",
            color: "#fff", margin: "0 0 14px", letterSpacing: "0.02em", lineHeight: 1.2,
          }}>
            랜딩 페이지 디자인 시안 4종
          </h1>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)", color: "rgba(255,255,255,0.38)",
            maxWidth: 460, margin: "0 auto", lineHeight: 1.8, letterSpacing: "0.01em",
          }}>
            동일한 브랜드 콘텐츠 · 4가지 서로 다른 디자인 방향<br />
            카드를 클릭해 각 버전을 확인하세요
          </p>
        </header>

        {/* ── 카드 그리드 ── */}
        <main className="main-pad" style={{ padding: "0 40px 80px", maxWidth: 1160, margin: "0 auto" }}>

          {/* 카운트 레이블 */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>4 Versions</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {VERSIONS.map((v) => (
              <Link key={v.href} href={v.href} className="vc" style={{
                background: v.bg,
                border: `1px solid ${v.border}`,
                overflow: "hidden",
              }}>
                {/* 썸네일 이미지 영역 */}
                <div style={{ position: "relative", height: 200, overflow: "hidden", background: v.thumbBg }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.img}
                    alt={v.title}
                    className="vc-img"
                  />
                  {/* 컬러 오버레이 */}
                  <div style={{ position: "absolute", inset: 0, background: v.imgOverlay }} />
                  {/* 버전 번호 */}
                  <div className="vc-num" style={{
                    position: "absolute", top: 16, left: 18,
                    fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase",
                    color: v.accent, opacity: 0.7,
                  }}>{v.num}</div>
                  {/* 태그 뱃지 */}
                  <div style={{
                    position: "absolute", top: 12, right: 14,
                    fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: v.accent, background: `${v.accent}18`,
                    border: `1px solid ${v.accent}44`,
                    padding: "3px 9px",
                  }}>{v.tag}</div>
                  {/* 하단 그라디언트 */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top, ${v.bg}, transparent)` }} />
                  {/* hover 테두리 효과 */}
                  <div className="vc-border" style={{
                    position: "absolute", inset: 0,
                    border: `2px solid ${v.accent}55`,
                    opacity: 0, pointerEvents: "none",
                  }} />
                </div>

                {/* 카드 하단 정보 */}
                <div style={{ padding: "20px 22px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: v.accent, opacity: 0.65, marginBottom: 5 }}>
                        {v.num} · {v.subtitle}
                      </div>
                      <div style={{ fontSize: "clamp(17px, 2.2vw, 21px)", fontWeight: 300, color: "#fff", letterSpacing: "-0.01em", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {v.title}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.75, margin: "0 0 16px" }}>
                    {v.desc}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: v.accent, letterSpacing: "0.1em" }}>
                    <span>시안 보기</span>
                    <span className="vc-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 하단 안내 */}
          <div style={{
            marginTop: 40, padding: "20px 28px",
            background: "#0c0f14", border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start",
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 7 }}>About This Mockup</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.75 }}>
                blum 공식 사이트(blum.com)의 실제 콘텐츠를 기반으로 제작된 디자인 예시본입니다. 실제 서비스가 아닙니다.
              </p>
            </div>
            <div style={{ minWidth: 160 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 7 }}>Official Site</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.75 }}>blum.com/kr/ko/</p>
            </div>
          </div>
        </main>

        {/* ── 푸터 ── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
            Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
            Design Mockup Only
          </span>
        </footer>
      </div>
    </>
  );
}
