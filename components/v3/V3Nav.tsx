"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  {
    label: "PRODUCTS",
    href: "/v3/products",
    children: [
      { label: "LIFT SYSTEMS", href: "/v3/products#lift" },
      { label: "HINGE SYSTEMS", href: "/v3/products#hinge" },
      { label: "BOX SYSTEMS", href: "/v3/products#box" },
      { label: "RUNNER SYSTEMS", href: "/v3/products#runner" },
      { label: "MOTION TECH", href: "/v3/products#motion" },
      { label: "POCKET SYSTEMS", href: "/v3/products#pocket" },
    ],
  },
  { label: "SERVICES", href: "/v3/services", children: [] },
  { label: "COMPANY", href: "/v3/company", children: [] },
];

const RED = "#c8102e";

function ContactBtn() {
  const [on, setOn] = useState(false);
  return (
    <a
      href="/v3/contact"
      className="ml-4 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-black"
      style={{ backgroundColor: RED, color: "#fff", textDecoration: "none", display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <span style={{ display: "block", transition: "transform 0.28s ease", transform: on ? "translateY(-100%)" : "translateY(0)" }}>CONTACT</span>
      <span style={{ display: "block", position: "relative", marginTop: "-1em", transition: "transform 0.28s ease", transform: on ? "translateY(0)" : "translateY(100%)" }}>LET'S CONNECT</span>
    </a>
  );
}

export default function V3Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); setOpen(null); }, [pathname]);

  return (
    <>
      {/* Ticker — always red */}
      <div className="fixed top-0 left-0 right-0 z-[70] overflow-hidden flex items-center" style={{ backgroundColor: RED, height: "26px" }}>
        <style>{`@keyframes v3tk{from{transform:translateX(0)}to{transform:translateX(-50%)}} .v3tk{animation:v3tk 24s linear infinite}`}</style>
        <div className="v3tk flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ color: "#fff", fontSize: "9px", letterSpacing: "0.3em", paddingRight: "56px", fontWeight: 900 }}>
              BLUM · MOVING IDEAS · AVENTOS · LEGRABOX · CLIP TOP · TIP-ON · BLUMOTION · SINCE 1952
            </span>
          ))}
        </div>
      </div>

      {/* Nav — always black */}
      <nav
        className="fixed left-0 right-0 z-50"
        style={{
          top: "26px",
          height: "56px",
          backgroundColor: "rgba(10,10,10,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/v3" style={{ color: "#f0f0f0", textDecoration: "none", fontSize: "18px", fontWeight: 900, letterSpacing: "-0.01em" }}>
            BLUM
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
                  className="block px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
                  style={{
                    color: pathname.startsWith(item.href) ? RED : "rgba(240,240,240,0.55)",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                  onMouseEnter={(e) => { if (!pathname.startsWith(item.href)) (e.currentTarget as HTMLAnchorElement).style.color = "#f0f0f0"; }}
                  onMouseLeave={(e) => { if (!pathname.startsWith(item.href)) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,240,240,0.55)"; }}
                >
                  {item.label}
                </Link>

                {/* Dropdown */}
                {item.children.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 1px)",
                      left: "50%",
                      transform: `translateX(-50%) translateY(${open === item.label ? "0" : "-6px"})`,
                      opacity: open === item.label ? 1 : 0,
                      pointerEvents: open === item.label ? "auto" : "none",
                      transition: "opacity 0.18s ease, transform 0.18s ease",
                      minWidth: "180px",
                      backgroundColor: "#111111",
                      border: "1px solid rgba(200,16,46,0.3)",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                      padding: "8px 0",
                    }}
                    onMouseEnter={() => setOpen(item.label)}
                    onMouseLeave={() => setOpen(null)}
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block px-5 py-3 text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-white/5"
                        style={{ color: "rgba(240,240,240,0.55)", textDecoration: "none", fontWeight: 700 }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = RED; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,240,240,0.55)"; }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <ContactBtn />
          </div>

          {/* Mobile */}
          <button
            className="md:hidden p-2"
            style={{ color: "#f0f0f0" }}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden" style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(200,16,46,0.2)" }}>
            {MENU.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-6 py-4 text-[10px] tracking-[0.2em] uppercase font-black border-b"
                style={{ color: "rgba(240,240,240,0.6)", textDecoration: "none", borderColor: "rgba(255,255,255,0.04)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-6 py-4">
              <Link
                href="/v3/contact"
                className="block text-center py-3 text-[10px] tracking-[0.2em] uppercase font-black"
                style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}
                onClick={() => setMobileOpen(false)}
              >
                CONTACT US
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
