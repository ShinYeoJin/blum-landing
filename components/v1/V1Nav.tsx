"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  {
    label: "제품",
    href: "/v1/products",
    children: [
      { label: "리프트 시스템", href: "/v1/products#lift" },
      { label: "경첩 시스템", href: "/v1/products#hinge" },
      { label: "박스 시스템", href: "/v1/products#box" },
      { label: "러너 시스템", href: "/v1/products#runner" },
      { label: "모션 기술", href: "/v1/products#motion" },
      { label: "포켓 시스템", href: "/v1/products#pocket" },
    ],
  },
  { label: "서비스", href: "/v1/services", children: [] },
  { label: "기업 소개", href: "/v1/company", children: [] },
  { label: "Contact Us", href: "/v1/contact", children: [] },
];

const SUB_PAGES = ["/v1/products", "/v1/services", "/v1/company", "/v1/contact"];

function ContactButton({ textColor, borderColor }: { textColor: string; borderColor: string }) {
  const pathname = usePathname();
  const isSub    = SUB_PAGES.some((p) => pathname.startsWith(p));
  const [hovered, setHovered] = useState(false);

  const bg    = hovered && isSub ? "#18181b" : "transparent";
  const color = hovered && isSub ? "#ffffff"  : textColor;

  return (
    <Link
      href="/v1/contact"
      style={{
        marginLeft: "16px",
        padding: "8px 20px",
        fontSize: "11px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        border: `1px solid ${borderColor}`,
        color,
        backgroundColor: bg,
        textDecoration: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      className={!isSub ? "hover:bg-zinc-900 hover:text-white" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      문의하기
    </Link>
  );
}

export default function V1Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [hidden,   setHidden]     = useState(false);
  const [open,     setOpen]       = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const lastY    = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      if (y < 80) {
        setHidden(false);
      } else {
        setHidden(y > lastY.current);
      }
      lastY.current = y;
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpen(null); }, [pathname]);

  /* Hero pages have dark bg → white text; scrolled always black */
  const isHeroPage = pathname === "/v1";
  const textColor = isHeroPage && !scrolled ? "#ffffff" : "#18181b";
  const borderColor = isHeroPage && !scrolled ? "rgba(255,255,255,0.2)" : "rgba(24,24,27,0.1)";
  const bg = scrolled ? "rgba(255,255,255,0.97)" : "transparent";

  return (
    <>
      {/* Wrapper — slides up/down as a unit */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 70,
        transform: hidden ? "translateY(-80px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>

      {/* Nav */}
      <nav
        className="transition-all duration-300"
        style={{
          position: "relative",
          height: "56px",
          backgroundColor: bg,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${borderColor}` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/v1"
            style={{ color: textColor, textDecoration: "none", fontSize: "18px", fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-geist-sans, sans-serif)", transition: "color 0.3s" }}
          >
            blum
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0">
            {MENU.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children.length > 0 && setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link
                  href={item.href}
                  className="block px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 relative group"
                  style={{ color: textColor, textDecoration: "none" }}
                >
                  {item.label}
                  {/* Underline indicator */}
                  <span
                    className="absolute bottom-0 left-5 right-5 h-px transition-all duration-300"
                    style={{
                      backgroundColor: textColor,
                      transform: pathname.startsWith(item.href) ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                    }}
                  />
                  <span
                    className="absolute bottom-0 left-5 right-5 h-px transition-all duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: textColor, transform: "scaleX(0)", transformOrigin: "left" }}
                  />
                </Link>

                {/* Dropdown */}
                {item.children.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: `translateX(-50%) translateY(${open === item.label ? "0" : "-6px"})`,
                      opacity: open === item.label ? 1 : 0,
                      pointerEvents: open === item.label ? "auto" : "none",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                      minWidth: "180px",
                      backgroundColor: "#ffffff",
                      border: "1px solid rgba(24,24,27,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                      padding: "8px 0",
                    }}
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block px-5 py-2.5 text-xs tracking-wider hover:bg-zinc-50 transition-colors"
                        style={{ color: "#52525b", textDecoration: "none" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <ContactButton textColor={textColor} borderColor={borderColor} />
          </div>

          {/* Mobile */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: textColor }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="메뉴"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{ backgroundColor: "#ffffff", borderColor: "rgba(24,24,27,0.08)" }}
          >
            {MENU.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-8 py-3.5 text-xs tracking-[0.15em] uppercase border-b"
                  style={{ color: "#18181b", textDecoration: "none", borderColor: "rgba(24,24,27,0.05)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div className="px-8 py-4">
              <Link
                href="/contact"
                className="block text-center py-3 text-xs tracking-[0.15em] uppercase border border-zinc-900"
                style={{ color: "#18181b", textDecoration: "none" }}
                onClick={() => setMobileOpen(false)}
              >
                문의하기
              </Link>
            </div>
          </div>
        )}
      </nav>
      </div>{/* end hide/show wrapper */}
    </>
  );
}
