"use client";

import Link from "next/link";

export default function V1Footer() {
  return (
    <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(24,24,27,0.08)" }}>
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span style={{ fontSize: "18px", fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase", color: "#18181b" }}>
              blum
            </span>
            <p className="mt-3 text-xs leading-6" style={{ color: "#a1a1aa" }}>
              moving ideas<br />Premium Furniture Fittings<br />Since 1952
            </p>
            <a
              href="https://www.blum.com/kr/ko/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[10px] tracking-widest uppercase"
              style={{ color: "#71717a", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              공식 사이트
            </a>
          </div>

          {/* Products */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: "#18181b", fontWeight: 500 }}>제품</p>
            <ul className="space-y-3">
              {[
                ["AVENTOS 리프트", "/v1/products/aventos"],
                ["CLIP top 경첩", "/v1/products#hinge"],
                ["LEGRABOX 서랍", "/v1/products#box"],
                ["MOVENTO 러너", "/v1/products#runner"],
                ["TIP-ON 터치", "/v1/products#motion"],
                ["REVEGO 포켓", "/v1/products#pocket"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-xs hover:text-zinc-900 transition-colors" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: "#18181b", fontWeight: 500 }}>서비스 / 회사</p>
            <ul className="space-y-3">
              {[
                ["서비스 개요", "/services"],
                ["E-Services", "/services#digital"],
                ["회사 소개", "/company#about"],
                ["실적 / 수치", "/company#facts"],
                ["지속가능성", "/company#sustainability"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-xs hover:text-zinc-900 transition-colors" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: "#18181b", fontWeight: 500 }}>연락처</p>
            <p className="text-xs leading-6" style={{ color: "#a1a1aa" }}>
              Julius Blum GmbH<br />
              Industriestrasse 1<br />
              6973 Höchst, Austria
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 text-[10px] tracking-widest uppercase px-5 py-2.5 border"
              style={{ color: "#ffffff", backgroundColor: "#18181b", borderColor: "#18181b", textDecoration: "none", transition: "background-color 0.3s ease, color 0.3s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff";
                (e.currentTarget as HTMLAnchorElement).style.color = "#18181b";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#18181b";
                (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
              }}
            >
              문의하기
            </Link>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(24,24,27,0.06)" }}
        >
          <span className="text-[10px]" style={{ color: "#d4d4d8" }}>© 2025 Julius Blum GmbH. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {[["V1 — 미니멀", "/v1"], ["V2 — 감성", "/v2"], ["V3 — 볼드", "/v3"], ["V4 — 시네마틱", "/v4"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-[10px] hover:text-zinc-600 transition-colors" style={{ color: "#d4d4d8", textDecoration: "none" }}>
                {l}
              </Link>
            ))}
            <a
              href="https://blum-landing.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest uppercase px-3 py-1.5 border hover:bg-zinc-900 hover:text-white transition-colors"
              style={{ color: "#18181b", borderColor: "rgba(24,24,27,0.3)", textDecoration: "none" }}
            >
              공식 사이트
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
