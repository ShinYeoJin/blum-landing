"use client";

import { useState } from "react";
import Link from "next/link";

const RED = "#c8102e";

function ContactUsBtn() {
  const [on, setOn] = useState(false);
  return (
    <a
      href="/v3/contact"
      className="inline-block mt-5 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-black"
      style={{ backgroundColor: RED, color: "#fff", textDecoration: "none", overflow: "hidden", verticalAlign: "bottom" }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <span style={{ display: "block", transition: "transform 0.28s ease", transform: on ? "translateY(-100%)" : "translateY(0)" }}>CONTACT US</span>
      <span style={{ display: "block", position: "relative", marginTop: "-1em", transition: "transform 0.28s ease", transform: on ? "translateY(0)" : "translateY(100%)" }}>LET'S CONNECT</span>
    </a>
  );
}

export default function V3Footer() {
  return (
    <footer style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(200,16,46,0.2)", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <span style={{ fontSize: "22px", fontWeight: 900, color: "#f0f0f0", letterSpacing: "-0.01em" }}>BLUM</span>
            <div style={{ width: "32px", height: "2px", backgroundColor: RED, marginTop: "10px", marginBottom: "12px" }} />
            <p className="text-xs leading-6" style={{ color: "rgba(240,240,240,0.3)" }}>
              MOVING IDEAS<br />PREMIUM FURNITURE FITTINGS<br />SINCE 1952
            </p>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase mb-5 font-black" style={{ color: RED }}>PRODUCTS</p>
            <ul className="space-y-3">
              {[
                ["AVENTOS", "/v3/products/aventos"],
                ["CLIP TOP", "/v3/products#hinge"],
                ["LEGRABOX", "/v3/products#box"],
                ["MOVENTO", "/v3/products#runner"],
                ["TIP-ON", "/v3/products#motion"],
                ["REVEGO", "/v3/products#pocket"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-[10px] tracking-[0.15em] uppercase font-black hover:opacity-80 transition-opacity"
                    style={{ color: "rgba(240,240,240,0.3)", textDecoration: "none" }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase mb-5 font-black" style={{ color: RED }}>COMPANY</p>
            <ul className="space-y-3">
              {[
                ["ABOUT", "/v3/company#about"],
                ["FACTS & FIGURES", "/v3/company#facts"],
                ["SUSTAINABILITY", "/v3/company#sustainability"],
                ["SERVICES", "/v3/services"],
                ["CONTACT", "/v3/contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-[10px] tracking-[0.15em] uppercase font-black hover:opacity-80 transition-opacity"
                    style={{ color: "rgba(240,240,240,0.3)", textDecoration: "none" }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase mb-5 font-black" style={{ color: RED }}>CONTACT</p>
            <p className="text-xs leading-6" style={{ color: "rgba(240,240,240,0.3)" }}>
              Julius Blum GmbH<br />
              Industriestrasse 1<br />
              6973 Höchst, Austria
            </p>
            <ContactUsBtn />
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(200,16,46,0.1)" }}>
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(240,240,240,0.2)" }}>
            © 2025 JULIUS BLUM GMBH. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-6">
            {[["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-[9px] tracking-[0.2em] uppercase font-black hover:opacity-80 transition-opacity"
                style={{ color: "rgba(240,240,240,0.2)", textDecoration: "none" }}>{l}</Link>
            ))}
            <a
              href="https://blum-landing.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.2em] uppercase font-black px-3 py-1.5 border hover:opacity-80 transition-opacity"
              style={{ color: "rgba(200,16,46,0.7)", borderColor: "rgba(200,16,46,0.3)", textDecoration: "none" }}
            >
              공식 사이트
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
