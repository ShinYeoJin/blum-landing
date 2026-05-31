"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  {
    label: "제품",
    href: "/v2/products",
    children: [
      { label: "리프트 시스템", href: "/v2/products#lift" },
      { label: "경첩 시스템", href: "/v2/products#hinge" },
      { label: "박스 시스템", href: "/v2/products#box" },
      { label: "러너 시스템", href: "/v2/products#runner" },
      { label: "모션 기술", href: "/v2/products#motion" },
      { label: "포켓 시스템", href: "/v2/products#pocket" },
    ],
  },
  { label: "서비스", href: "/services", children: [] },
  { label: "회사", href: "/company", children: [] },
  { label: "연락처", href: "/contact", children: [] },
];

const CREAM = "#faf7f2";
const BROWN = "#3b2a1a";
const AMBER = "#c68642";

export default function V2Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpen(null); }, [pathname]);

  const isHero = pathname === "/v2";
  const textColor = isHero && !scrolled ? CREAM : BROWN;
  const bg = scrolled ? `rgba(250,247,242,0.97)` : "transparent";

  return (
    <>
      {/* Warm accent bar */}
      <div className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-center" style={{ backgroundColor: AMBER, height: "22px" }}>
        <span style={{ color: "#fff", fontSize: "9px", letterSpacing: "0.35em" }}>
          BLUM · PREMIUM KITCHEN FITTINGS · SINCE 1952
        </span>
      </div>

      {/* Nav */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: "22px",
          height: "60px",
          backgroundColor: bg,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(59,42,26,0.08)" : "none",
          fontFamily: "'Georgia', serif",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/v2"
            style={{
              color: textColor,
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "'Georgia', serif",
              transition: "color 0.4s",
            }}
          >
            blum
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {MENU.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children.length > 0 && setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm rounded-full transition-all duration-200 hover:bg-amber-50"
                  style={{
                    color: textColor,
                    textDecoration: "none",
                    fontFamily: "'Georgia', serif",
                    fontWeight: pathname.startsWith(item.href) ? 700 : 400,
                    transition: "color 0.4s, background 0.2s",
                  }}
                >
                  {item.label}
                </Link>

                {/* Dropdown */}
                {item.children.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      transform: `translateX(-50%) translateY(${open === item.label ? "0" : "-8px"})`,
                      opacity: open === item.label ? 1 : 0,
                      pointerEvents: open === item.label ? "auto" : "none",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                      minWidth: "180px",
                      backgroundColor: CREAM,
                      border: "1px solid rgba(198,134,66,0.2)",
                      borderRadius: "12px",
                      boxShadow: "0 12px 40px rgba(59,42,26,0.12)",
                      padding: "10px 0",
                      fontFamily: "'Georgia', serif",
                    }}
                    onMouseEnter={() => setOpen(item.label)}
                    onMouseLeave={() => setOpen(null)}
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block px-5 py-2.5 text-sm transition-colors hover:bg-amber-50"
                        style={{ color: BROWN, textDecoration: "none" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/contact"
              className="ml-3 px-5 py-2 text-sm rounded-full transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: BROWN, color: CREAM, textDecoration: "none", fontFamily: "'Georgia', serif" }}
            >
              쇼룸 방문
            </Link>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden p-2"
            style={{ color: textColor }}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden" style={{ backgroundColor: CREAM, borderTop: "1px solid rgba(59,42,26,0.08)", fontFamily: "'Georgia', serif" }}>
            {MENU.map((item) => (
              <div key={item.label} style={{ borderBottom: "1px solid rgba(59,42,26,0.05)" }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-sm text-left"
                  style={{ color: BROWN }}
                  onClick={() => setMobileExpanded((v) => v === item.label ? null : item.label)}
                >
                  {item.label}
                  {item.children.length > 0 && (
                    <svg className={`w-3 h-3 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.children.length > 0 && mobileExpanded === item.label && (
                  <div className="px-8 pb-3 flex flex-col gap-2" style={{ backgroundColor: "rgba(198,134,66,0.04)" }}>
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="text-sm py-1"
                        style={{ color: "#8a6a4a", textDecoration: "none" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-6 py-4">
              <Link
                href="/contact"
                className="block text-center py-3 text-sm rounded-full"
                style={{ backgroundColor: BROWN, color: CREAM, textDecoration: "none" }}
                onClick={() => setMobileOpen(false)}
              >
                쇼룸 방문
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
