"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE = "https://www.blum.com";

const NAV_ITEMS = [
  {
    label: "제품",
    href: "/products",
    sub: [
      { label: "리프트 시스템", href: "/products#lift", img: `${BASE}/images/235/177/4214754/corporate/media/bilder/produkte/klappensysteme/ME12028804_AA_FOT_FO_BAU_-SALL_-AMC_-V2_4:3.jpg` },
      { label: "경첩 시스템", href: "/products#hinge", img: `${BASE}/images/235/177/4214750/corporate/media/bilder/produkte/scharniersysteme/overview/me9974430_4:3.jpg` },
      { label: "박스 시스템", href: "/products#box", img: `${BASE}/images/235/177/4214643/corporate/media/bilder/produkte/boxsysteme/overview-page/ME10783194_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg` },
      { label: "러너 시스템", href: "/products#runner", img: `${BASE}/images/235/177/4214647/corporate/media/bilder/produkte/fuehrungssysteme/AA_FOT_FO_BAU_ME11575182_-SALL_-AMC_-V1_4:3.jpg` },
      { label: "모션 기술", href: "/products#motion", img: `${BASE}/images/235/177/4214649/corporate/media/bilder/produkte/bewegungstechnologien/4-fuer-mehr/img2600_aa_fot_fo_bau_-sall_-am_-v2_4:3.jpg` },
      { label: "포켓 시스템", href: "/products#pocket", img: `${BASE}/images/560/258/4210225/corporate/media/bilder/produkte/pocketsysteme-alt/blum_me10479780_4:3.jpg` },
    ],
  },
  {
    label: "서비스",
    href: "/services",
    sub: [
      { label: "계획 / 설계", href: "/services#plan", img: `${BASE}/images/196/180/4196180/corporate/media/bilder/services/vab0524_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg` },
      { label: "E-Services", href: "/services#digital", img: `${BASE}/images/196/180/4188803/corporate/media/bilder/services/korpus-konfigurator/blum_korpuskonfigurator_me168496_4:3.png` },
      { label: "조립 지원", href: "/services#assembly", img: `${BASE}/images/196/180/4214411/corporate/media/bilder/services/vab0523_aa_fot_fo_bau_-sall_-apr6i_-v2_4:3.jpg` },
      { label: "마케팅 자료", href: "/services#marketing", img: `${BASE}/images/196/180/4207496/corporate/media/bilder/services/img2443_aa_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg` },
    ],
  },
  {
    label: "회사",
    href: "/company",
    sub: [
      { label: "Blum 소개", href: "/company#about", img: `${BASE}/images/268/202/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg` },
      { label: "실적 / 수치", href: "/company#facts", img: `${BASE}/images/268/202/4214774/corporate/media/bilder/unternehmen/img2633_aa_fot_fo_bau_-sall_-am_-v1_4:3.jpg` },
      { label: "지속가능성", href: "/company#sustainability", img: `${BASE}/images/268/202/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg` },
      { label: "경영진", href: "/company#leadership", img: `${BASE}/images/268/202/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg` },
    ],
  },
  {
    label: "연락처",
    href: "/contact",
    sub: [],
  },
];

interface BlumNavProps {
  theme?: "light" | "dark";
  /** When true, nav bg is forced transparent and text follows forcedColor */
  forceTransparent?: boolean;
  forcedColor?: string;
}

export default function BlumNav({ theme = "dark", forceTransparent = false, forcedColor }: BlumNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mega menu on route change
  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [pathname]);

  const navBg =
    forceTransparent && !scrolled
      ? "transparent"
      : theme === "dark"
      ? scrolled ? "rgba(10,10,10,0.96)" : "transparent"
      : scrolled ? "rgba(255,255,255,0.96)" : "transparent";

  const textColor =
    forceTransparent && !scrolled
      ? forcedColor ?? "#fff"
      : theme === "dark"
      ? "#f0f0f0"
      : scrolled ? "#18181b" : "#f0f0f0";

  const subTextColor = theme === "dark" ? "rgba(240,240,240,0.5)" : scrolled ? "#52525b" : "rgba(240,240,240,0.65)";

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  return (
    <>
      {/* Ticker */}
      <div className="fixed top-0 left-0 right-0 z-[70] overflow-hidden flex items-center" style={{ backgroundColor: "#c8102e", height: "26px" }}>
        <style>{`@keyframes blum-ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}} .blum-ticker{animation:blum-ticker 28s linear infinite;}`}</style>
        <div className="blum-ticker flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ color: "#fff", fontSize: "9px", letterSpacing: "0.25em", paddingRight: "64px" }}>
              BLUM · MOVING IDEAS · AVENTOS · LEGRABOX · CLIP TOP · TIP-ON · BLUMOTION · SINCE 1952
            </span>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-400"
        style={{ top: "26px", backgroundColor: navBg, backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(128,128,128,0.15)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" style={{ color: textColor, fontSize: "20px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            blum
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.sub.length > 0 && handleEnter(item.label)}
                onMouseLeave={handleLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 rounded-md text-xs tracking-wider uppercase transition-colors duration-200 hover:opacity-80"
                  style={{ color: textColor, textDecoration: "none", fontWeight: 500 }}
                >
                  {item.label}
                  {item.sub.length > 0 && (
                    <svg className={`w-3 h-3 transition-transform duration-200 ${openMenu === item.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Mega dropdown */}
                {item.sub.length > 0 && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-0 pt-2"
                    style={{
                      top: "100%",
                      width: "max-content",
                      minWidth: "480px",
                      pointerEvents: openMenu === item.label ? "auto" : "none",
                      opacity: openMenu === item.label ? 1 : 0,
                      transform: `translateX(-50%) translateY(${openMenu === item.label ? 0 : -8}px)`,
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <div
                      className="rounded-xl shadow-2xl p-5"
                      style={{ backgroundColor: theme === "dark" ? "#111" : "#fff", border: "1px solid rgba(128,128,128,0.15)" }}
                      onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(item.label); }}
                      onMouseLeave={handleLeave}
                    >
                      <p className="text-[9px] tracking-[0.4em] uppercase mb-4 px-1" style={{ color: "#c8102e" }}>{item.label}</p>
                      <div className="grid grid-cols-3 gap-3">
                        {item.sub.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="group flex flex-col gap-2 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                            style={{ textDecoration: "none" }}
                          >
                            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100" style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#f4f4f5" }}>
                              <img
                                src={s.img}
                                alt={s.label}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                              />
                            </div>
                            <span className="text-xs px-1 pb-1" style={{ color: theme === "dark" ? "#e4e4e7" : "#18181b", fontWeight: 500 }}>{s.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <a
              href="/contact"
              className="ml-4 text-xs tracking-wider uppercase px-4 py-2 rounded-md transition-all hover:opacity-90"
              style={{ backgroundColor: "#c8102e", color: "#fff", fontWeight: 600, textDecoration: "none" }}
            >
              문의하기
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            style={{ color: textColor }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="md:hidden border-t overflow-y-auto"
            style={{
              backgroundColor: theme === "dark" ? "#0a0a0a" : "#fff",
              borderColor: "rgba(128,128,128,0.15)",
              maxHeight: "80vh",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-left"
                  style={{ color: theme === "dark" ? "#e4e4e7" : "#18181b", fontWeight: 500 }}
                  onClick={() => setMobileExpanded((v) => v === item.label ? null : item.label)}
                >
                  {item.label}
                  {item.sub.length > 0 && (
                    <svg className={`w-3 h-3 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.sub.length > 0 && mobileExpanded === item.label && (
                  <div className="px-6 pb-4 flex flex-col gap-3" style={{ backgroundColor: theme === "dark" ? "#111" : "#f9f9f9" }}>
                    {item.sub.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        className="text-xs py-1"
                        style={{ color: subTextColor, textDecoration: "none" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-6 py-4">
              <a
                href="/contact"
                className="block text-center text-xs tracking-wider uppercase px-4 py-3 rounded-md"
                style={{ backgroundColor: "#c8102e", color: "#fff", textDecoration: "none", fontWeight: 600 }}
              >
                문의하기
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
