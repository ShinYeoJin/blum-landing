"use client";

import React from "react";
import Link from "next/link";
import { Reveal, SlideLeft, ExpandLine } from "./v1Shared";

const BASE = "https://www.blum.com";

const PRODUCTS = [
  {
    id: "aventos",
    name: "AVENTOS",
    category: "리프트 시스템",
    desc: "높이가 높은 캐비닛과 상부장을 훌륭하게 무대에 올려주는 리프트 시스템. 부드럽고 조용히 닫히고 가볍게 들어올려집니다.",
    href: "/v1/products/aventos",
    img: `${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "legrabox",
    name: "LEGRABOX",
    category: "박스 시스템",
    desc: "가장 까다로운 디자인 요구 사항에 적합한 서랍 시스템. 슬림한 서랍면(12.8mm)으로 최대 하중 40kg 및 70kg을 지지합니다.",
    href: "/v1/products#box",
    img: `${BASE}/images/560/258/4213747/corporate/media/bilder/produkte/boxsysteme/legrabox-design/me10782852_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`,
  },
  {
    id: "cliptop",
    name: "CLIP top BLUMOTION",
    category: "경첩 시스템",
    desc: "경첩 보스 컵에 통합된 BLUMOTION. 적응형 댐핑으로 도어의 무게에 관계없이 항상 매끄럽게 닫힙니다.",
    href: "/v1/products#hinge",
    img: `${BASE}/images/560/258/4214992/corporate/media/bilder/produkte/scharniersysteme/CLP0318_DT_FRD_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
  {
    id: "tipon",
    name: "TIP-ON",
    category: "모션 기술",
    desc: "도어, 고정식 리프트 또는 풀아웃 시스템 등의 핸들 없는 가구를 원터치로 열 수 있는 기계식 열기 시스템.",
    href: "/v1/products#motion",
    img: `${BASE}/images/560/258/4215081/corporate/media/bilder/produkte/bewegungstechnologien/TOB0008_AA_FOT_FO_BAU_-SALL_-APR6I_-V1_4:3.jpg`,
  },
];

export default function ProductSection() {
  return (
    <section id="products" className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/*
          Mobile: flex-col (normal flow)
          Desktop: flex-row with sticky left sidebar
          부모에 overflow 없음 → position: sticky 정상 동작
        */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "4rem" }}
             className="flex-col md:flex-row v1-prod-row">

          {/* Left — sticky sidebar: 스크롤 내려도 화면에 고정 */}
          <div
            className="hidden md:block"
            style={{
              width: "35%",
              flexShrink: 0,
              position: "sticky",
              top: "30vh",
              height: "fit-content",
              alignSelf: "flex-start",
            }}
          >
            <SlideLeft>
              <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-4">Product Lines</p>
              <h2 className="text-3xl md:text-4xl font-extralight mb-4" style={{ letterSpacing: "-0.02em" }}>
                Signature<br />Systems
              </h2>
            </SlideLeft>
            <ExpandLine delay={80} className="w-8 h-px bg-zinc-200 my-6" />
            <Reveal delay={120}>
              <p className="text-sm text-zinc-400 leading-8 mb-8" style={{ fontWeight: 300 }}>
                blum의 대표 제품 라인. 힌지부터 리프트 시스템까지, 모든 움직임에는 blum의 정밀함이 담겨 있습니다.
              </p>
              <Link
                href="/v1/products"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group"
                style={{ textDecoration: "none" }}
              >
                전체 제품 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          {/* Mobile only: left header (normal flow) */}
          <div className="block md:hidden mb-12 v1-prod-left">
            <SlideLeft>
              <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-300 mb-4">Product Lines</p>
              <h2 className="text-3xl font-extralight mb-4" style={{ letterSpacing: "-0.02em" }}>
                Signature<br />Systems
              </h2>
            </SlideLeft>
            <ExpandLine delay={80} className="w-8 h-px bg-zinc-200 my-6" />
            <Reveal delay={120}>
              <p className="text-sm text-zinc-400 leading-8 mb-8" style={{ fontWeight: 300 }}>
                blum의 대표 제품 라인. 힌지부터 리프트 시스템까지, 모든 움직임에는 blum의 정밀함이 담겨 있습니다.
              </p>
              <Link
                href="/v1/products"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group"
                style={{ textDecoration: "none" }}
              >
                전체 제품 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          {/* Right — product cards (일반 스크롤, GSAP 개별 애니메이션) */}
          <div style={{ width: "65%", minWidth: 0 }} className="w-full md:w-auto v1-prod-right">
            <div className="grid grid-cols-2 gap-3">

              <Link href={PRODUCTS[0].href} className="product-card col-span-2 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/7" }}>
                  <img src={PRODUCTS[0].img} alt={PRODUCTS[0].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="card-text p-6">
                  <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[0].category}</span>
                  <h3 className="text-xl font-light text-zinc-900 mb-2">{PRODUCTS[0].name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-md">{PRODUCTS[0].desc}</p>
                </div>
              </Link>

              <Link href={PRODUCTS[1].href} className="product-card col-span-1 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <img src={PRODUCTS[1].img} alt={PRODUCTS[1].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="card-text p-6">
                  <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[1].category}</span>
                  <h3 className="text-lg font-light text-zinc-900 mb-2">{PRODUCTS[1].name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{PRODUCTS[1].desc}</p>
                </div>
              </Link>

              <Link href={PRODUCTS[2].href} className="product-card col-span-1 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <img src={PRODUCTS[2].img} alt={PRODUCTS[2].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="card-text p-6">
                  <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[2].category}</span>
                  <h3 className="text-lg font-light text-zinc-900 mb-2">{PRODUCTS[2].name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{PRODUCTS[2].desc}</p>
                </div>
              </Link>

              <Link href={PRODUCTS[3].href} className="product-card col-span-2 group block overflow-hidden bg-zinc-50" style={{ textDecoration: "none" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/7" }}>
                  <img src={PRODUCTS[3].img} alt={PRODUCTS[3].name} className="product-img w-full h-full object-cover absolute inset-0 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="card-text p-6">
                  <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">{PRODUCTS[3].category}</span>
                  <h3 className="text-xl font-light text-zinc-900 mb-2">{PRODUCTS[3].name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-md">{PRODUCTS[3].desc}</p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
