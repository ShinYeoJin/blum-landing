"use client";

import React from "react";
import { Reveal, Counter } from "./v1Shared";

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 border-b border-zinc-100">
      <Reveal className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
        {[
          { target: 2441, suffix: "M€",  label: "전 세계 연매출" },
          { target: 120,  suffix: "개국+", label: "글로벌 판매 국가" },
          { target: 34,   suffix: "개소", label: "전 세계 자회사·대리점" },
          { target: 9850, suffix: "명",  label: "전 세계 임직원" },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-2xl md:text-3xl font-extralight text-zinc-900 mb-1 tabular-nums">
              <Counter target={s.target} suffix={s.suffix} />
            </div>
            <div className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase">{s.label}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
