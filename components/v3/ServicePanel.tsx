"use client";

import React, { useState, useEffect } from "react";
import { GOLD, CREAM, GRAY } from "./v3Shared";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export type ServiceItem = {
  num:   string;
  name:  string;
  cat?:  string;
  desc:  string;
  items: string[];
  img:   string;
  img2?: string;
};

type PanelProps = {
  s:            ServiceItem;
  i:            number;
  sectionStyle: (idx: number) => React.CSSProperties;
  animKey:      number;
  isActive:     boolean;
  direction:    "down" | "up";
};

export default function ServicePanel({ s, i, sectionStyle, animKey, isActive, direction }: PanelProps) {
  const [showImg,   setShowImg]   = useState(false);
  const [showNum,   setShowNum]   = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showLine,  setShowLine]  = useState(false);
  const [showDesc,  setShowDesc]  = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    setShowImg(false);
    setShowNum(false);
    setShowTitle(false);
    setShowLine(false);
    setShowDesc(false);
    setShowItems(false);

    if (!isActive) return;

    const timers = [
      setTimeout(() => setShowImg(true),   60),
      setTimeout(() => setShowNum(true),   160),
      setTimeout(() => setShowTitle(true), 260),
      setTimeout(() => setShowLine(true),  360),
      setTimeout(() => setShowDesc(true),  460),
      setTimeout(() => setShowItems(true), 560),
    ];
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]);

  const imgOffset = direction === "down" ? "-60px" : "60px";
  const imgStyle: React.CSSProperties = {
    flex: "0 0 52%", position: "relative", overflow: "hidden",
    opacity:    showImg ? 1 : 0,
    transform:  showImg ? "none" : `translateY(${imgOffset})`,
    transition: `opacity 0.75s ${EASE}, transform 0.75s ${EASE}`,
  };

  const textStyle: React.CSSProperties = {
    flex: 1, display: "flex", alignItems: "center",
    padding: "0 clamp(28px,5%,72px)",
  };

  const imgLeft = i % 2 === 0;
  const bgColor = i % 2 === 0 ? "#0A0E14" : "#080B10";

  return (
    <div style={sectionStyle(i + 1)}>
      <div className="v4s-panel-inner" style={{
        width: "100%", height: "100%",
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: imgLeft ? "row" : "row-reverse",
      }}>
        <div className="v4s-img-half" style={imgStyle}>
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
              : `linear-gradient(to left,  transparent 65%, ${bgColor} 100%)`,
          }} />
        </div>

        <div className="v4s-text-half" style={textStyle}>
          <div style={{ width: "100%" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 300,
              color: GOLD, lineHeight: 1, marginBottom: "4px",
              opacity:    showNum ? 1 : 0,
              transform:  showNum ? "none" : "translateY(16px)",
              transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
            }}>{s.num}</div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 300,
              color: CREAM, lineHeight: 1.1, marginBottom: "16px", margin: "0 0 16px",
              opacity:    showTitle ? 1 : 0,
              transform:  showTitle ? "none" : "translateX(-40px)",
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
            }}>{s.name}</h2>

            <div style={{
              width: showLine ? "40px" : "0px", height: "1px",
              backgroundColor: `${GOLD}77`, marginBottom: "20px",
              transition: showLine ? `width 0.5s ${EASE}` : "none",
            }} />

            <p style={{
              fontSize: "14px", color: GRAY, lineHeight: 1.95,
              maxWidth: "360px", marginBottom: "32px",
              opacity:    showDesc ? 1 : 0,
              transform:  showDesc ? "none" : "translateY(20px)",
              transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
            }}>{s.desc}</p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {s.items.map((item, j) => (
                <li key={item} style={{
                  fontSize: "13px", color: CREAM,
                  display: "flex", alignItems: "center", gap: "12px",
                  fontWeight: 300, letterSpacing: "0.02em",
                  opacity:    showItems ? 1 : 0,
                  transform:  showItems ? "none" : "translateY(12px)",
                  transition: showItems
                    ? `opacity 0.5s ${EASE} ${j * 80}ms, transform 0.5s ${EASE} ${j * 80}ms`
                    : "none",
                }}>
                  <span style={{ width: "18px", height: "1px", backgroundColor: GOLD, flexShrink: 0, display: "inline-block" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
