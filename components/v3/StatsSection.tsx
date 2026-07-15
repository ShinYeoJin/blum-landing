"use client";

import React from "react";
import { GOLD, CREAM, GRAY, LINE, FadeIn, MaskReveal, GCounter } from "./v3Shared";

const IMG_STATS_BG = "https://www.blum.com/images/560/258/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg";

const STATS = [
  { n: 1952, s: "",    l: "창립 연도",      sub: "오스트리아 포어알베르크" },
  { n: 2441, s: "M€",  l: "전 세계 매출",   sub: "2024/25 회계연도" },
  { n: 9850, s: "명",   l: "전 세계 임직원", sub: "글로벌 네트워크" },
  { n: 120,  s: "+",   l: "수출 대상국",     sub: "34개 자회사·대리점" },
];

export default function StatsSection() {
  return (
    <section style={{ position: "relative", backgroundColor: "#070B10", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={IMG_STATS_BG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #070B10, transparent 30%, transparent 70%, #070B10)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "100px 2rem" }}>
        <FadeIn>
          <p style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: `${GOLD}77`, marginBottom: "12px" }}>BLUM IN NUMBERS</p>
          <MaskReveal delay={100}>
            <h2 className="v4-font-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: CREAM, marginBottom: "64px" }}>
              숫자로 보는 <em style={{ color: GOLD }}>blum</em>
            </h2>
          </MaskReveal>
        </FadeIn>

        <div className="v4-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: LINE }}>
          {STATS.map((s, i) => (
            <FadeIn key={s.l} delay={i * 110}>
              <div className="v4-stat-card" style={{ padding: "52px 32px", backgroundColor: "#070B10" }}>
                <div className="v4-font-serif" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", fontWeight: 300, color: GOLD, lineHeight: 1, marginBottom: "12px" }}>
                  <GCounter to={s.n} suffix={s.s} />
                </div>
                <div style={{ fontSize: "14px", color: CREAM, marginBottom: "8px", fontWeight: 400 }}>{s.l}</div>
                <div style={{ width: "24px", height: "1px", backgroundColor: `${GOLD}44`, marginBottom: "8px" }} />
                <div style={{ fontSize: "12px", color: GRAY, lineHeight: 1.7 }}>{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
