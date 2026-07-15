"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

const CATEGORIES = [
  {
    id: "hinge",
    name: "경첩 시스템",
    en: "HINGE SYSTEMS",
    desc: "CLIP top BLUMOTION — 경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑, 다양한 국제 디자인상 수상.",
    href: "/v3/products#hinge",
    num: "01",
    imgIndex: 2,
    imgs: [
      `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4214534/corporate/media/bilder/produkte/scharniersysteme/CLP0344_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4174906/corporate/media/bilder/produkte/scharniersysteme/clip-top_blumotion_105/blum-clip-top-blumotion-105-cme151388_4:3.jpg`,
    ],
  },
  {
    id: "box",
    name: "박스 시스템",
    en: "BOX SYSTEMS",
    desc: "LEGRABOX / MERIVOBOX — 가장 까다로운 디자인 요구 사항에 적합. 슬림한 서랍면(12.8mm), 최대 하중 40kg·70kg.",
    href: "/v3/products#box",
    num: "02",
    imgIndex: 2,
    imgs: [
      `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4209438/corporate/media/bilder/produkte/boxsysteme/MBX0277_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4173336/corporate/media/bilder/produkte/boxsysteme/BOX1856_AA_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
    ],
  },
  {
    id: "lift",
    name: "리프트 시스템",
    en: "LIFT SYSTEMS",
    desc: "AVENTOS — 높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트. 7가지 제품군.",
    href: "/v3/products/aventos",
    num: "03",
    imgIndex: 1,
    imgs: [
      `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`,
      `${BASE}/images/560/258/4207901/corporate/media/bilder/produkte/klappensysteme/aventos-top/kla1119_mc_4:3.jpg`,
    ],
  },
  {
    id: "runner",
    name: "슬라이딩 러너",
    en: "RUNNER SYSTEMS",
    desc: "MOVENTO — 일체형인 듯 매우 가볍게 미끄러지는 듯한 동작. 4차원 프런트 조정, 최대 동적 하중 60kg.",
    href: "/v3/products#runner",
    num: "04",
    imgIndex: 1,
    imgs: [
      `${BASE}/images/560/258/4202352/corporate/media/bilder/produkte/fuehrungssysteme/me25334921_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4215095/corporate/media/bilder/produkte/fuehrungssysteme/mov0003_dt_frd_fo_bau_-sall_-apr6i_-v2_4:3.jpg`,
      `${BASE}/images/560/258/4214071/corporate/media/bilder/produkte/fuehrungssysteme/ME14726240_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`,
    ],
  },
  {
    id: "motion",
    name: "모션 기술",
    en: "MOTION TECHNOLOGY",
    desc: "TIP-ON / BLUMOTION — 핸들 없는 가구를 원터치로 여는 기계식 열기 시스템. SERVO-DRIVE 전동 옵션 제공.",
    href: "/v3/products#motion",
    num: "05",
    imgIndex: 0,
    imgs: [
      `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
      `${BASE}/images/560/258/4207125/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1659_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`,
      `${BASE}/images/560/258/4204524/corporate/media/bilder/produkte/bewegungstechnologien/blum_tip0163_aa_fot_fo_bau_-sall_-apr3_-v1_4:3.jpg`,
    ],
  },
  {
    id: "pocket",
    name: "포켓 시스템",
    en: "POCKET SYSTEMS",
    desc: "REVEGO — 다기능 공간을 만들 수 있는 완전히 새로운 기회. 독일 디자인상·Red Dot·iF Award 2022 수상.",
    href: "/v3/products#pocket",
    num: "06",
    imgIndex: 0,
    imgs: [
      `${BASE}/images/560/258/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg`,
      `${BASE}/images/560/258/4204148/corporate/media/bilder/produkte/schrankanwendungen/moebeltuer-nach-innen/me57420985_all_src_4:3.jpg`,
      `${BASE}/images/560/258/4214378/corporate/media/bilder/produkte/schrankanwendungen/spacestep0008_4:3.jpg`,
    ],
  },
];

/* ── CTA reveal ── */
function BoldReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateX(-20px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      {children}
    </div>
  );
}

/* ── Single card display ── */
/* rotType: 0=Y+ 1=Y- 2=X+ 3=X- (randomised per transition) */
const ROT_OUT  = ["flipOutY",  "flipOutYN",  "flipOutX",  "flipOutXN"];
const ROT_IN   = ["flipInY",   "flipInYN",   "flipInX",   "flipInXN"];
const ROT_INIT = ["rotateY(-90deg)", "rotateY(90deg)", "rotateX(-90deg)", "rotateX(90deg)"];

function CardDisplay({
  cat,
  phase,       // "idle" | "exit-fwd" | "exit-back" | "enter-fwd" | "enter-back"
  rotType,     // 0-3, randomised on each transition
}: {
  cat: typeof CATEGORIES[0];
  phase: string;
  rotType: number;
}) {
  const isExit  = phase === "exit-fwd"  || phase === "exit-back";
  const isEnter = phase === "enter-fwd" || phase === "enter-back";

  const textY       = isExit ? "10px" : "0px";
  const textOpacity = isExit ? "0"    : "1";

  return (
    <div className="v3-card-outer" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 48px", boxSizing: "border-box" }}>
      <div className="v3-card-row" style={{ display: "flex", gap: "80px", alignItems: "center", width: "100%", maxWidth: 1100 }}>

        {/* Image — 3-D flip */}
        <div className="v3-card-img" style={{ flex: "0 0 52%", perspective: "1000px", overflow: "hidden" }}>
          <img
            key={cat.id + phase}
            src={cat.imgs[cat.imgIndex]}
            alt={cat.name}
            style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              display: "block",
              transform: isEnter ? "none" : "none",
              animation: isEnter
                ? `${ROT_IN[rotType]} 0.55s cubic-bezier(0.4,0,0.2,1) forwards`
                : isExit
                ? `${ROT_OUT[rotType]} 0.45s cubic-bezier(0.4,0,0.2,1) forwards`
                : "none",
              /* entering image starts at the rotated position before animating in */
              ...(isEnter ? { transform: ROT_INIT[rotType] } : {}),
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Text */}
        <div
          style={{
            flex: "1 1 0",
            opacity:    textOpacity,
            transform:  `translateY(${textY})`,
            transition: "opacity 0.45s ease, transform 0.45s ease",
          }}
        >
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: RED, fontWeight: 900, marginBottom: 8 }}>
            {cat.num} / {CATEGORIES.length.toString().padStart(2, "0")}
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(240,240,240,0.3)", fontWeight: 900, marginBottom: 16 }}>
            {cat.en}
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, textTransform: "uppercase", color: "#ffffff", lineHeight: 1.1, marginBottom: 24 }}>
            {cat.name}
          </h2>
          <div style={{ width: 48, height: 3, backgroundColor: RED, marginBottom: 24 }} />
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400, maxWidth: 360, marginBottom: 36 }}>
            {cat.desc}
          </p>
          <Link
            href={cat.href}
            style={{
              display: "inline-block",
              fontSize: 11,
              letterSpacing: "0.3em",
              fontWeight: 900,
              textTransform: "uppercase",
              padding: "14px 32px",
              backgroundColor: RED,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            VIEW →
          </Link>
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
        {CATEGORIES.map((c, i) => (
          <div key={c.id} style={{ width: i === CATEGORIES.indexOf(cat) ? 20 : 6, height: 6, backgroundColor: i === CATEGORIES.indexOf(cat) ? RED : "rgba(240,240,240,0.2)", transition: "width 0.3s, background-color 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

export default function V3Products() {
  const heroRef    = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Hero opacity driven by scroll */
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroY,       setHeroY]       = useState(0);

  /* Card state */
  const [cardIndex,  setCardIndex]  = useState(0);
  const [cardPhase,  setCardPhase]  = useState<string>("idle");
  const [rotType,    setRotType]    = useState(0);   /* 0=Y+ 1=Y- 2=X+ 3=X- */
  const pendingIndex = useRef<number | null>(null);
  const animating    = useRef(false);
  const lastIndex    = useRef(0);

  /* Hero mount slide-up */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity   = "0";
    el.style.transform = "translateY(60px)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        el.style.opacity    = "1";
        el.style.transform  = "translateY(0)";
      });
    });
  }, []);

  /* Flip to a new card index */
  const flipTo = useCallback((next: number) => {
    if (animating.current) {
      pendingIndex.current = next;
      return;
    }
    const prev = lastIndex.current;
    if (next === prev) return;

    const dir = next > prev ? "fwd" : "back";
    animating.current = true;

    /* pick a random rotation axis/direction for this transition */
    setRotType(Math.floor(Math.random() * 4));

    /* exit current */
    setCardPhase(`exit-${dir}`);

    setTimeout(() => {
      /* swap card, start enter */
      lastIndex.current = next;
      setCardIndex(next);
      setCardPhase(`enter-${dir}`);

      setTimeout(() => {
        setCardPhase("idle");
        animating.current = false;
        /* flush pending */
        if (pendingIndex.current !== null && pendingIndex.current !== lastIndex.current) {
          const p = pendingIndex.current;
          pendingIndex.current = null;
          flipTo(p);
        }
      }, 560);
    }, 460);
  }, []);

  /* Scroll handler */
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const y = window.scrollY;

      /* hero fade — over first 40vh */
      const heroFadeEnd = window.innerHeight * 0.4;
      const op = Math.max(0, 1 - y / heroFadeEnd);
      const ty = Math.min(y * 0.5, window.innerHeight * 0.3);
      setHeroOpacity(op);
      setHeroY(-ty);

      /* card section */
      const rect      = wrapper.getBoundingClientRect();
      const wTop      = y + rect.top;
      const wHeight   = wrapper.offsetHeight - window.innerHeight;
      const progress  = Math.max(0, Math.min(1, (y - wTop) / wHeight));
      const idx       = Math.min(CATEGORIES.length - 1, Math.floor(progress * CATEGORIES.length));
      flipTo(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [flipTo]);

  return (
    <>
      {/* Keyframes injected once — Y+, Y-, X+, X- variants */}
      <style>{`
        @keyframes flipOutY  { from { transform: rotateY(0deg);   } to { transform: rotateY(90deg);   } }
        @keyframes flipInY   { from { transform: rotateY(-90deg); } to { transform: rotateY(0deg);    } }
        @keyframes flipOutYN { from { transform: rotateY(0deg);   } to { transform: rotateY(-90deg);  } }
        @keyframes flipInYN  { from { transform: rotateY(90deg);  } to { transform: rotateY(0deg);    } }
        @keyframes flipOutX  { from { transform: rotateX(0deg);   } to { transform: rotateX(90deg);   } }
        @keyframes flipInX   { from { transform: rotateX(-90deg); } to { transform: rotateX(0deg);    } }
        @keyframes flipOutXN { from { transform: rotateX(0deg);   } to { transform: rotateX(-90deg);  } }
        @keyframes flipInXN  { from { transform: rotateX(90deg);  } to { transform: rotateX(0deg);    } }
        @media (max-width: 768px) {
          .v3-card-outer { padding: 16px 16px 80px !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; overflow-y: auto !important; }
          .v3-card-row { flex-direction: column !important; gap: 24px !important; }
          .v3-card-img { flex: none !important; width: 100% !important; }
        }
      `}</style>

      <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>

        {/* ── HERO — 200vh scroll space so hero fades before cards begin ── */}
        {/*  outer div = scroll track (200vh): first 100vh hero is in view,   */}
        {/*  next 100vh it rises+fades while black bg shows, then cards start  */}
        <div style={{ height: "200vh", position: "relative", zIndex: 1 }}>
          <section
            ref={heroRef}
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "flex-end",
              padding: "0 24px 80px",
              opacity: heroOpacity,
              transform: `translateY(${heroY}px)`,
              pointerEvents: heroOpacity < 0.1 ? "none" : "auto",
            }}
          >
            <div className="max-w-7xl w-full mx-auto">
              <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>Products</p>
              <h1 style={{ fontSize: "clamp(52px, 10vw, 120px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1, textTransform: "uppercase", marginBottom: 24 }}>
                제품<br /><span style={{ color: RED }}>라인업</span>
              </h1>
              <div style={{ width: 60, height: 3, backgroundColor: RED, marginBottom: 24 }} />
              <p style={{ fontSize: 14, maxWidth: 480, lineHeight: 1.7, color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                blum의 피팅 시스템은 단순한 하드웨어가 아닙니다.<br />
                120개국에서 검증된 혁신 기술로 가구의 가능성을 다시 정의합니다.
              </p>
            </div>
          </section>
        </div>

        {/* ── CARD SECTION — starts after hero scroll track, no overlap ── */}
        <div
          ref={wrapperRef}
          style={{
            height: `${(CATEGORIES.length + 1) * 100}vh`,  /* 700vh */
            position: "relative",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              backgroundColor: "#000000",
              overflow: "hidden",
            }}
          >
            <CardDisplay cat={CATEGORIES[cardIndex]} phase={cardPhase} rotType={rotType} />
          </div>
        </div>

        {/* ── CTA ── */}
        <BoldReveal>
          <section style={{ padding: "80px 24px", textAlign: "center", borderTop: "1px solid rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: RED, marginBottom: 16 }}>CONTACT US</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 32 }}>제품 상담 문의</h2>
            <Link
              href="/v3/contact"
              style={{
                display: "inline-block",
                padding: "16px 40px",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 900,
                backgroundColor: RED,
                color: "#fff",
                textDecoration: "none",
                opacity: 1,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              지금 문의하기
            </Link>
          </section>
        </BoldReveal>
      </div>
    </>
  );
}
