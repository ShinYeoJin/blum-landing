"use client";

import { useEffect, useRef, useState } from "react";
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

/* ── CTA reveal (slide from left, same as original BoldReveal) ── */
function BoldReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateX(-20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── 3-D flip card ── */
function FlipCard({ cat, hovered, onEnter, onLeave }: {
  cat: typeof CATEGORIES[0];
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped]   = useState(false);
  const [textIn,  setTextIn]    = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const text = textRef.current;
    if (!card || !text) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || triggered.current) return;
        triggered.current = true;
        /* flip image */
        setFlipped(true);
        /* text slides up slightly after */
        setTimeout(() => setTextIn(true), 400);
        obs.disconnect();
      },
      { threshold: 0.25 },
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, []);

  const featuredImg = cat.imgs[cat.imgIndex];

  return (
    <Link
      href={cat.href}
      className="group block"
      style={{ textDecoration: "none", backgroundColor: "#0a0a0a" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* 3-D flip container */}
      <div
        ref={cardRef}
        style={{
          perspective: "800px",
          aspectRatio: "4/3",
          overflow: "hidden",
          backgroundColor: "#111",
          position: "relative",
        }}
      >
        {/* back face (placeholder colour) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#1a1a1a",
            backfaceVisibility: "hidden",
          }}
        />
        {/* front face — featured image */}
        <img
          src={featuredImg}
          alt={cat.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            backfaceVisibility: "hidden",
            transform: flipped ? "rotateY(0deg)" : "rotateY(-90deg)",
            transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
            transformOrigin: "center center",
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* subtle hover scale on top */}
        <div
          className="group-hover:scale-105"
          style={{
            position: "absolute",
            inset: 0,
            transition: "transform 0.6s ease",
          }}
        />
      </div>

      {/* Text */}
      <div
        ref={textRef}
        style={{
          padding: "24px",
          opacity:   textIn ? 1 : 0,
          transform: textIn ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", fontWeight: 900, color: hovered ? RED : "rgba(200,16,46,0.4)" }}>{cat.num}</span>
          <span style={{ fontSize: 9, letterSpacing: "0.35em", fontWeight: 900, color: hovered ? RED : "rgba(240,240,240,0.25)" }}>{cat.en}</span>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 900, textTransform: "uppercase", marginBottom: 8, color: hovered ? "#fff" : "rgba(240,240,240,0.7)", transition: "color 0.3s" }}>
          {cat.name}
        </h2>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
          {cat.desc}
        </p>
        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 900, color: hovered ? RED : "rgba(240,240,240,0.2)", transition: "color 0.3s" }}>
            VIEW →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function V3Products() {
  const heroRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  /* Hero slide-up on mount */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity   = "0";
    el.style.transform = "translateY(60px)";
    /* next frame so initial state is painted first */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        el.style.opacity    = "1";
        el.style.transform  = "translateY(0)";
      });
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>

      {/* Hero */}
      <section ref={heroRef} className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase mb-4 font-black" style={{ color: RED }}>Products</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6 uppercase">
          제품<br />
          <span style={{ color: RED }}>라인업</span>
        </h1>
        <div style={{ width: "60px", height: "3px", backgroundColor: RED, marginBottom: "24px" }} />
        <p className="text-sm max-w-lg leading-relaxed" style={{ color: "rgba(240,240,240,0.5)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
          blum의 피팅 시스템은 단순한 하드웨어가 아닙니다.
          120개국에서 검증된 혁신 기술로 가구의 가능성을 다시 정의합니다.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(240,240,240,0.04)" }}>
          {CATEGORIES.map((cat) => (
            <FlipCard
              key={cat.id}
              cat={cat}
              hovered={hovered === cat.id}
              onEnter={() => setHovered(cat.id)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </section>

      {/* CTA band */}
      <BoldReveal>
        <section className="py-20 px-6 text-center border-t" style={{ borderColor: "rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>CONTACT US</p>
          <h2 className="text-3xl font-black uppercase mb-8">제품 상담 문의</h2>
          <Link href="/v3/contact"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-80"
            style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}>
            지금 문의하기
          </Link>
        </section>
      </BoldReveal>
    </div>
  );
}
