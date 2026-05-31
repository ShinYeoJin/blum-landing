"use client";

import { useState } from "react";
import Link from "next/link";

const BASE = "https://www.blum.com";
const RED = "#c8102e";

export default function V3Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", category: "", message: "" });

  return (
    <div style={{ backgroundColor: "#000000", color: "#f0f0f0", fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "380px", paddingTop: "80px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4212633/corporate/media/bilder/services/img2575_aa_fot_fo_bau_-sall_-aip01_-v1_4:3.jpg`}
            alt="blum contact"
            className="w-full h-full object-cover opacity-20"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 50%, rgba(0,0,0,0.3) 100%)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", backgroundColor: RED, opacity: 0.05 }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>Contact</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
            CONTACT<br /><span style={{ color: RED }}>US.</span>
          </h1>
          <div style={{ width: "60px", height: "3px", backgroundColor: RED, marginBottom: "16px" }} />
          <p className="text-sm" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>제품 문의, 쇼룸 방문, 파트너십 — 무엇이든 연락주세요.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>본사</p>
              <p className="text-sm leading-7" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                Julius Blum GmbH<br />
                Werk 2, Industriestrasse 1<br />
                6973 Höchst, Austria
              </p>
              <a href="https://www.blum.com/kr/ko/" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-black uppercase tracking-wider"
                style={{ color: RED, textDecoration: "none" }}>
                공식 사이트 →
              </a>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>상담 채널</p>
              <ul className="space-y-5">
                {[
                  { label: "온라인 문의", value: "blum.com 공식 문의 폼", href: "https://www.blum.com/kr/ko/contact/" },
                  { label: "영업소 찾기", value: "전국 영업소 안내", href: "https://www.blum.com/kr/ko/contact/sales-offices/" },
                  { label: "쇼룸", value: "제품 직접 체험", href: "https://www.blum.com/kr/ko/contact/showrooms/" },
                ].map((c) => (
                  <li key={c.label}>
                    <p className="text-xs font-black uppercase mb-1" style={{ color: "rgba(240,240,240,0.7)" }}>{c.label}</p>
                    <a href={c.href} target="_blank" rel="noopener noreferrer"
                      className="text-xs"
                      style={{ color: "rgba(240,240,240,0.35)", textDecoration: "none", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>{c.value} →</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-4" style={{ color: RED }}>쇼룸 안내</p>
              <div style={{ border: `1px solid rgba(200,16,46,0.2)`, overflow: "hidden" }}>
                <img
                  src={`${BASE}/images/560/258/4214768/corporate/media/bilder/virtueller-schauraum/blum-virtueller-schauraum_2_4:3.png`}
                  alt="blum showroom"
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <p className="text-xs leading-6 mt-3 mb-4" style={{ color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                전 세계 blum 쇼룸에서 AVENTOS, LEGRABOX, CLIP top을 직접 체험하실 수 있습니다.
              </p>
              <a
                href="https://www.blum.com/kr/ko/contact/showrooms/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[10px] tracking-[0.2em] uppercase font-black px-5 py-2.5 transition-opacity hover:opacity-80"
                style={{ backgroundColor: RED, color: "#fff", textDecoration: "none" }}
              >
                쇼룸 찾기
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.4em] uppercase font-black mb-6" style={{ color: RED }}>문의서</p>
            <h2 className="text-2xl font-black uppercase mb-8">무엇을 도와드릴까요?</h2>

            {submitted ? (
              <div className="p-12 text-center border" style={{ borderColor: "rgba(200,16,46,0.2)", backgroundColor: "#0a0a0a" }}>
                <div className="text-5xl mb-4 font-black" style={{ color: RED }}>✓</div>
                <h3 className="text-lg font-black uppercase mb-2">문의 접수 완료</h3>
                <p className="text-sm" style={{ color: "rgba(240,240,240,0.4)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>2영업일 내로 담당자가 연락드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "이름 *", placeholder: "홍길동", type: "text", required: true },
                    { key: "company", label: "회사명", placeholder: "회사 이름 (선택)", type: "text", required: false },
                    { key: "email", label: "이메일 *", placeholder: "example@company.com", type: "email", required: true },
                    { key: "phone", label: "연락처", placeholder: "010-0000-0000", type: "tel", required: false },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-[9px] tracking-[0.2em] uppercase font-black mb-1.5"
                        style={{ color: "rgba(240,240,240,0.4)" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.required}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none"
                        style={{ border: `1px solid rgba(200,16,46,0.2)`, backgroundColor: "#0a0a0a", color: "#f0f0f0", fontFamily: "Arial, sans-serif" }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-black mb-1.5"
                    style={{ color: "rgba(240,240,240,0.4)" }}>문의 유형</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ border: `1px solid rgba(200,16,46,0.2)`, backgroundColor: "#0a0a0a", color: "#f0f0f0", fontFamily: "Arial, sans-serif" }}
                  >
                    <option value="">선택해주세요</option>
                    <option>제품 문의</option>
                    <option>쇼룸 방문 신청</option>
                    <option>파트너십 / 딜러 문의</option>
                    <option>기술 지원</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-black mb-1.5"
                    style={{ color: "rgba(240,240,240,0.4)" }}>문의 내용 *</label>
                  <textarea
                    rows={5}
                    placeholder="문의하실 내용을 자유롭게 작성해주세요."
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none resize-none"
                    style={{ border: `1px solid rgba(200,16,46,0.2)`, backgroundColor: "#0a0a0a", color: "#f0f0f0", fontFamily: "Arial, sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-80"
                  style={{ backgroundColor: RED, color: "#fff" }}
                >
                  문의 보내기
                </button>
                <p className="text-[9px] text-center" style={{ color: "rgba(240,240,240,0.25)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
                  * 표시는 필수 입력 항목입니다. 개인정보는 문의 처리 목적으로만 사용됩니다.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <section className="py-12 border-t" style={{ borderColor: "rgba(200,16,46,0.15)", backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase">E-SERVICES 포털</p>
            <p className="text-xs mt-1" style={{ color: "rgba(240,240,240,0.35)", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>제품 구성, CAD 데이터, 주문 관리를 온라인으로.</p>
          </div>
          <a
            href="https://e-services.blum.com/main/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-[10px] tracking-[0.2em] uppercase font-black px-6 py-3 transition-opacity hover:opacity-80"
            style={{ border: `1px solid rgba(200,16,46,0.4)`, color: "#f0f0f0", textDecoration: "none" }}
          >
            E-Services 접속
          </a>
        </div>
      </section>
    </div>
  );
}
