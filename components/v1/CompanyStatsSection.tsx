"use client";

import React, { useRef, useState, useEffect } from "react";

const STATS = [
  { num: 2441,  suffix: "",  unit: "백만 유로", label: "전 세계 매출액 (2024/25)" },
  { num: 9850,  suffix: "",  unit: "명",       label: "전 세계 임직원 수" },
  { num: 120,   suffix: "+", unit: "개국",     label: "수출 대상국" },
  { num: 34,    suffix: "",  unit: "개소",     label: "전 세계 자회사 및 대리점" },
  { num: 8,     suffix: "",  unit: "개 공장",  label: "포어알베르크 생산 시설" },
  { num: 1952,  suffix: "",  unit: "년",       label: "브랜드 창립" },
];

function StatItem({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref     = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const target   = stat.num;
        const duration = 1800;
        const start    = performance.now();
        const raf = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(raf);
        };
        setTimeout(() => requestAnimationFrame(raf), delay);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stat.num, delay]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "#ffffff",
        padding: "40px 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#18181b", lineHeight: 1, marginBottom: 6, fontVariantNumeric: "tabular-nums" }}>
        {val.toLocaleString()}{stat.suffix}
      </div>
      <div style={{ fontSize: 12, color: "#18181b", marginBottom: 6 }}>{stat.unit}</div>
      <div style={{ fontSize: 10, letterSpacing: "0.05em", color: "#a1a1aa", lineHeight: 1.5 }}>{stat.label}</div>
    </div>
  );
}

export default function CompanyStatsSection() {
  return (
    <section className="v1-stats-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#fafafa", padding: "80px 48px", borderTop: "1px solid rgba(24,24,27,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 12 }}>
            Facts &amp; Figures
          </p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: "#18181b" }}>
            숫자로 보는 blum
          </h2>
        </div>
        <div className="v1-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, backgroundColor: "#e4e4e7" }}>
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
