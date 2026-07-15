"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GOLD, CREAM, LINE } from "./v3Shared";

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const CTA_LINE1 = "더 자세한 서비스 안내가";
const CTA_LINE2 = "필요하신가요?";

type CtaProps = {
  sectionStyle: (idx: number) => React.CSSProperties;
  sectionIndex: number;
  animKey:      number;
  isActive:     boolean;
};

export default function ServicesCtaSection({ sectionStyle, sectionIndex, animKey, isActive }: CtaProps) {
  const [showLine,  setShowLine]  = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showBtn,   setShowBtn]   = useState(false);
  const [hovered,   setHovered]   = useState(false);

  const totalChars = CTA_LINE1.length + CTA_LINE2.length;

  useEffect(() => {
    setShowLine(false);
    setShowLabel(false);
    setCharCount(0);
    setShowBtn(false);

    if (!isActive) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setShowLine(true),  80));
    timers.push(setTimeout(() => setShowLabel(true), 200));

    for (let c = 0; c < totalChars; c++) {
      timers.push(setTimeout(() => setCharCount(c + 1), 320 + c * 40));
    }

    timers.push(setTimeout(() => setShowBtn(true), 320 + totalChars * 40 + 120));

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]);

  const renderChars = (text: string, offset: number) =>
    text.split("").map((ch, j) => {
      const idx   = offset + j;
      const shown = charCount > idx;
      return (
        <span key={idx} style={{
          display: "inline-block",
          opacity:   shown ? 1 : 0,
          transform: shown ? "none" : "translateY(28px)",
          transition: shown ? `opacity 0.45s ${EASE}, transform 0.45s ${EASE}` : "none",
          whiteSpace: ch === " " ? "pre" : "normal",
        }}>{ch}</span>
      );
    });

  return (
    <div style={sectionStyle(sectionIndex)}>
      <div style={{
        width: "100%", height: "100%",
        backgroundColor: "#070B10",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "0 2rem", boxSizing: "border-box",
        textAlign: "center",
      }}>
        <div style={{
          width: showLine ? "180px" : "0px", height: "1px",
          background: `linear-gradient(to right, ${GOLD}, ${GOLD}44)`,
          marginBottom: "32px",
          transition: showLine ? `width 0.7s ${EASE}` : "none",
        }} />

        <p style={{
          fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase",
          color: `${GOLD}77`, marginBottom: "28px",
          opacity:   showLabel ? 1 : 0,
          transform: showLabel ? "none" : "translateY(16px)",
          transition: `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
        }}>Get in Touch</p>

        <Link
          href="/v3/contact"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            textDecoration: "none", cursor: "pointer",
            display: "block", marginBottom: "40px",
          }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 300,
            color: hovered ? GOLD : CREAM, lineHeight: 1.4,
            transition: `color 0.3s ease, opacity 0.3s ease`,
            opacity: hovered ? 0 : 1,
            position: "relative",
            margin: 0,
          }}>
            <span style={{ display: "block" }}>{renderChars(CTA_LINE1, 0)}</span>
            <span style={{ display: "block" }}>{renderChars(CTA_LINE2, CTA_LINE1.length)}</span>
          </h2>

          <div style={{
            position: "absolute",
            left: "50%", transform: "translateX(-50%)",
            marginTop: "-2.2em",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 300,
            color: GOLD, letterSpacing: "0.05em",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            whiteSpace: "nowrap", pointerEvents: "none",
          }}>
            문의하기
          </div>
        </Link>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: `1px solid ${LINE}`, padding: "24px 2rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "10px", color: "rgba(245,240,232,0.18)", letterSpacing: "0.1em" }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</span>
            <div style={{ display: "flex", gap: "24px" }}>
              {([["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"]] as [string, string][]).map(([l, h]) => (
                <Link key={l} href={h} style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.2)", textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
