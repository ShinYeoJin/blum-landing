"use client";

import Link from "next/link";

export default function Home() {
  const versions = [
    {
      href: "/v1",
      label: "V1",
      title: "미니멀 모던",
      desc: "극도의 여백과 좌우 2단 그리드",
      bg: "#18181b",
      accent: "#ffffff",
    },
    {
      href: "/v2",
      label: "V2",
      title: "따뜻한 자연",
      desc: "카드형 레이아웃과 따뜻한 우드톤",
      bg: "#3b2a1a",
      accent: "#c68642",
    },
    {
      href: "/v3",
      label: "V3",
      title: "트렌디 볼드",
      desc: "비대칭 텍스트 오버레이와 강렬한 타이포",
      bg: "#c8102e",
      accent: "#ffffff",
    },
    {
      href: "/v4",
      label: "V4",
      title: "시네마틱",
      desc: "풀스크린 타임라인과 골드 배색",
      bg: "#0D1117",
      accent: "#D4AF37",
    },
  ];

  const products = [
    {
      name: "AVENTOS",
      category: "Lift Systems",
      img: "https://www.blum.com/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
    },
    {
      name: "LEGRABOX",
      category: "Box Systems",
      img: "https://www.blum.com/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg",
    },
    {
      name: "MOVENTO",
      category: "Runner Systems",
      img: "https://www.blum.com/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg",
    },
  ];

  const pillars = ["삶의 질", "영감", "제품 종류", "서비스", "품질", "혁신", "신뢰"];

  const stats = [
    { value: "€2,441M", label: "전 세계 매출" },
    { value: "9,850명", label: "전 세계 임직원" },
    { value: "120개국+", label: "수출 대상국" },
    { value: "34개", label: "자회사·대리점" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&display=swap');

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        @keyframes tickerMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .hero-label  { animation: heroIn 0.9s ease forwards; animation-delay: 0.1s; opacity: 0; }
        .hero-title  { animation: heroIn 0.9s ease forwards; animation-delay: 0.3s; opacity: 0; }
        .hero-sub    { animation: heroIn 0.9s ease forwards; animation-delay: 0.55s; opacity: 0; }
        .hero-scroll { animation: heroIn 0.9s ease forwards, scrollBounce 1.8s ease-in-out 1.5s infinite; animation-delay: 0.8s, 1.5s; opacity: 0; }

        .stat-item   { animation: fadeUp 0.7s ease forwards; opacity: 0; }
        .stat-item:nth-child(1) { animation-delay: 0.7s; }
        .stat-item:nth-child(2) { animation-delay: 0.85s; }
        .stat-item:nth-child(3) { animation-delay: 1.0s; }
        .stat-item:nth-child(4) { animation-delay: 1.15s; }

        .product-card img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .product-card:hover img {
          transform: scale(1.07);
        }

        .version-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .version-card:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .pillar-pill {
          flex-shrink: 0;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 20px 28px;
          border-top: 1px solid #d4a574;
          color: #1a1a1a;
          white-space: nowrap;
        }

        .ticker-track {
          display: flex;
          animation: tickerMove 18s linear infinite;
        }
        .ticker-wrap {
          overflow: hidden;
          display: flex;
        }

        @media (max-width: 768px) {
          .stats-bar { flex-wrap: wrap; gap: 16px !important; }
          .products-grid { flex-direction: column !important; }
          .versions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          {/* background image */}
          <img
            src="https://www.blum.com/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg"
            alt="blum hero"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
            }}
          />
          {/* overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.55)",
          }} />

          {/* center content */}
          <div style={{
            position: "relative", zIndex: 2,
            textAlign: "center", padding: "0 24px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
          }}>
            <p className="hero-label" style={{
              fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)", margin: 0,
            }}>
              Julius Blum GmbH · Höchst, Austria · Since 1952
            </p>
            <h1 className="hero-title" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 300, fontSize: "clamp(52px, 10vw, 120px)",
              color: "#fff", margin: 0, lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}>
              moving ideas
            </h1>
            <p className="hero-sub" style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 480, margin: 0, lineHeight: 1.7,
            }}>
              편리함을 높이고 삶의 질을 향상시키는 고품질 가구용 피팅
            </p>
          </div>

          {/* scroll indicator */}
          <div className="hero-scroll" style={{
            position: "absolute", bottom: 100, left: "50%",
            transform: "translateX(-50%)", zIndex: 2,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="6.5" y="0.5" width="3" height="8" rx="1.5" fill="rgba(255,255,255,0.4)" />
              <path d="M8 16l-4 4h8l-4-4z" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>

          {/* stats bar */}
          <div className="stats-bar" style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            zIndex: 2,
            display: "flex", justifyContent: "center",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            padding: "20px 40px",
            gap: 48,
          }}>
            {stats.map((s) => (
              <div key={s.value} className="stat-item" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 300, color: "#d4a574", letterSpacing: "0.04em" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BRAND PILLARS ── */}
        <section style={{ background: "#fff", padding: "60px 0", overflow: "hidden" }}>
          <div style={{ padding: "0 40px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999", margin: 0 }}>
              Brand Values
            </p>
          </div>
          <div className="ticker-wrap">
            <div className="ticker-track">
              {[...pillars, ...pillars].map((p, i) => (
                <div key={i} className="pillar-pill">{p}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT SHOWCASE ── */}
        <section style={{ background: "#0a0a0a", padding: "80px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>
              Product Lines
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#fff", margin: "0 0 48px", letterSpacing: "-0.01em" }}>
              혁신적인 제품군
            </h2>
            <div className="products-grid" style={{ display: "flex", gap: 24 }}>
              {products.map((p) => (
                <div key={p.name} className="product-card" style={{ flex: 1, minWidth: 0, cursor: "pointer" }}>
                  <div style={{ overflow: "hidden", aspectRatio: "4/3", background: "#1a1a1a" }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "20px 0 0" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4a574", marginBottom: 6 }}>
                      {p.category}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 300, color: "#fff", letterSpacing: "0.08em" }}>
                      {p.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DESIGN VERSIONS ── */}
        <section style={{ background: "#f5f5f5", padding: "80px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999", margin: "0 0 12px" }}>
                Design Editions
              </p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#111", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
                네 가지 디자인 경험
              </h2>
              <p style={{ fontSize: 15, color: "#666", margin: 0 }}>같은 blum, 다른 감각으로</p>
            </div>

            <div className="versions-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}>
              {versions.map((v) => (
                <Link key={v.href} href={v.href} style={{ textDecoration: "none" }}>
                  <div
                    className="version-card"
                    style={{
                      background: v.bg,
                      minHeight: 300,
                      padding: 32,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{
                      fontSize: 11, letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: v.accent,
                      opacity: 0.6,
                    }}>
                      {v.label}
                    </div>
                    <div>
                      <div style={{
                        fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 300,
                        color: "#fff", marginBottom: 10, letterSpacing: "-0.01em",
                      }}>
                        {v.title}
                      </div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                        {v.desc}
                      </div>
                      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, color: v.accent, letterSpacing: "0.1em" }}>둘러보기</span>
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                          <path d="M11 1l4 4-4 4M1 5h14" stroke={v.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          background: "#0a0a0a",
          padding: "32px 40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", margin: 0 }}>
            Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", margin: 0 }}>
            © 2025 Blum Korea
          </p>
        </footer>

      </main>
    </>
  );
}
