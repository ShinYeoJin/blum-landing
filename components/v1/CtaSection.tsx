"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "./v1Shared";

const BASE = "https://www.blum.com";

export default function CtaSection() {
  return (
    <section className="relative bg-zinc-950 py-36 md:py-52 overflow-hidden">
      <div className="absolute inset-0">
        <img src={`${BASE}/images/560/258/4214768/corporate/media/bilder/virtueller-schauraum/blum-virtueller-schauraum_2_4:3.png`} alt="blum showroom" className="w-full h-full object-cover opacity-15" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(9,9,11,0.5) 0%, rgba(9,9,11,0.95) 80%)" }} />
      </div>
      <Reveal className="relative z-10 max-w-3xl mx-auto px-8 text-center">
        <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 mb-8">Contact &amp; Showroom</p>
        <h2 className="font-extralight text-white mb-8 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}>
          쇼룸에서<br />직접 경험하세요
        </h2>
        <p className="text-zinc-400 text-sm leading-8 mb-14 max-w-sm mx-auto" style={{ fontWeight: 300 }}>
          전문 컨설턴트가 공간에 최적화된<br />blum 솔루션을 제안해드립니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/v1/contact" className="text-[11px] tracking-[0.25em] uppercase px-9 py-4 bg-white text-zinc-900 hover:bg-zinc-100 transition-colors" style={{ textDecoration: "none" }}>문의 / 방문 신청</Link>
          <Link href="/v1/products" className="text-[11px] tracking-[0.25em] uppercase px-9 py-4 border text-white hover:bg-white/10 transition-colors" style={{ borderColor: "rgba(255,255,255,0.18)", textDecoration: "none" }}>전체 제품 보기</Link>
        </div>
      </Reveal>
    </section>
  );
}
