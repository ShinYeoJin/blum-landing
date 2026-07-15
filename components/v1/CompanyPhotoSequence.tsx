"use client";

import React, { useRef, useEffect } from "react";

const BASE = "https://www.blum.com";
const PHOTO1 = `${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`;
const PHOTO2 = `${BASE}/images/560/258/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`;
const PHOTO3 = `${BASE}/images/560/258/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`;

export default function CompanyPhotoSequence() {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const pin = pinRef.current;
        if (!pin) return;

        const p1 = pin.querySelector<HTMLElement>(".photo-1");
        const p2 = pin.querySelector<HTMLElement>(".photo-2");
        const p3 = pin.querySelector<HTMLElement>(".photo-3");
        const tm = pin.querySelector<HTMLElement>(".text-management");
        const ts = pin.querySelector<HTMLElement>(".text-sustainability");
        const ta = pin.querySelector<HTMLElement>(".text-about");
        if (!p1 || !p2 || !p3 || !tm || !ts || !ta) return;

        gsap.set([tm, ts, ta], { opacity: 0, x: 50 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:    pin,
            start:      "top top",
            end:        "+=400%",
            pin:        true,
            scrub:      1,
            pinSpacing: true,
          },
        });

        tl
          .to([p1, p2], { opacity: 0, duration: 0.6 }, 0.2)
          .to(p3, { left: "2%", width: "48%", duration: 1, ease: "power2.inOut" }, 0.2)
          .to(tm, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0.9)

          .to([p3, tm], { opacity: 0, duration: 0.5 }, 2.0)
          .set(p2, { left: "2%", width: "48%" }, 2.5)
          .to(p2,  { opacity: 1, duration: 0.5, ease: "power2.out" }, 2.5)
          .to(ts,  { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 2.8)

          .to([p2, ts], { opacity: 0, duration: 0.5 }, 3.5)
          .set(p1, { left: "2%", width: "48%" }, 4.0)
          .to(p1,  { opacity: 1, duration: 0.5, ease: "power2.out" }, 4.0)
          .to(ta,  { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 4.3)

          .to({}, { duration: 0.01 }, 4.99);
      });
    };

    const pin = pinRef.current;
    if (!pin) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) return; io.disconnect(); init(); },
      { rootMargin: "0px 0px 300px 0px", threshold: 0 },
    );
    io.observe(pin);
    return () => { io.disconnect(); ctx?.revert(); };
  }, []);

  const imgStyle: React.CSSProperties = {
    width: "100%", height: "100%", objectFit: "cover", display: "block",
  };

  const divider: React.CSSProperties = {
    width: 36, height: 1, backgroundColor: "#d4d4d8", margin: "20px 0",
  };

  const textBase: React.CSSProperties = {
    position: "absolute",
    left: "53%",
    top: "20vh",
    width: "44%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    pointerEvents: "none",
  };

  return (
    <div
      className="photo-sequence"
      ref={pinRef}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f4f4f5",
      }}
    >
      <div
        className="photo-1"
        style={{
          position: "absolute",
          left: "2%",
          top: "15vh",
          width: "30%",
          height: "70vh",
          overflow: "hidden",
          borderRadius: 12,
          opacity: 1,
        }}
      >
        <img src={PHOTO1} alt="blum workplace" style={imgStyle}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>

      <div
        className="photo-2"
        style={{
          position: "absolute",
          left: "35%",
          top: "15vh",
          width: "30%",
          height: "70vh",
          overflow: "hidden",
          borderRadius: 12,
          opacity: 1,
        }}
      >
        <img src={PHOTO2} alt="지속가능성" style={imgStyle}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>

      <div
        className="photo-3"
        style={{
          position: "absolute",
          left: "68%",
          top: "15vh",
          width: "30%",
          height: "70vh",
          overflow: "hidden",
          borderRadius: 12,
          opacity: 1,
        }}
      >
        <img src={PHOTO3} alt="경영진" style={imgStyle}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>

      <div className="text-management" style={textBase}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>Leadership</p>
        <h2 style={{ fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35, marginBottom: 6 }}>
          Philipp &amp; Martin Blum
        </h2>
        <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a1a1aa" }}>공동 경영진</p>
        <div style={divider} />
        <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 20 }}>
          창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.
        </p>
        <blockquote style={{ fontSize: "clamp(13px, 1.5vw, 18px)", fontWeight: 300, fontStyle: "italic", color: "#18181b", lineHeight: 1.65, borderLeft: "2px solid #d4d4d8", paddingLeft: 20, margin: 0 }}>
          "당사는 끊임없이 움직여 더 나은 아이디어를 만듭니다."
        </blockquote>
      </div>

      <div className="text-sustainability" style={textBase}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>Sustainability</p>
        <h2 style={{ fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35 }}>
          지속가능한 미래를<br />함께 만듭니다
        </h2>
        <div style={divider} />
        <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85, marginBottom: 20 }}>
          blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"].map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#52525b" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#18181b", flexShrink: 0, display: "inline-block" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-about" style={textBase}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 20 }}>About Blum</p>
        <h2 style={{ fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 300, color: "#18181b", lineHeight: 1.35 }}>
          편리함을 높이고 삶의 질을<br />향상시키는 가구 피팅 제조사
        </h2>
        <div style={divider} />
        <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.85 }}>
          Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다. blum의 제품은 힌지, 서랍, 리프트 시스템 등 가구의 움직임과 관련된 모든 영역을 포괄합니다.
        </p>
      </div>
    </div>
  );
}
