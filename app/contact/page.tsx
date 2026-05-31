"use client";

import { useState } from "react";
import BlumNav from "@/components/BlumNav";
import BlumFooter from "@/components/BlumFooter";

const BASE = "https://www.blum.com";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", category: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "#fff", color: "#18181b" }}>
      <BlumNav theme="light" forceTransparent forcedColor="#fff" />

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "380px", paddingTop: "86px" }}>
        <div className="absolute inset-0">
          <img
            src={`${BASE}/images/560/258/4212633/corporate/media/bilder/services/img2575_aa_fot_fo_bau_-sall_-aip01_-v1_4:3.jpg`}
            alt="blum contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#c8102e" }}>Contact</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-3">좋은 서비스는<br />좋은 상담으로 시작됩니다</h1>
          <p className="text-sm text-white/60 max-w-sm">제품 문의, 쇼룸 방문, 파트너십 — 무엇이든 편하게 연락주세요.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-10">
            {/* HQ */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4 font-semibold" style={{ color: "#c8102e" }}>본사</p>
              <p className="text-sm leading-7" style={{ color: "#52525b" }}>
                Julius Blum GmbH<br />
                Werk 2, Industriestrasse 1<br />
                6973 Höchst, Austria
              </p>
              <a href="https://www.blum.com/kr/ko/" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs" style={{ color: "#c8102e", textDecoration: "underline" }}>
                공식 사이트 방문 →
              </a>
            </div>

            {/* Channels */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4 font-semibold" style={{ color: "#c8102e" }}>상담 채널</p>
              <ul className="space-y-4">
                {[
                  { icon: "🌐", label: "온라인 문의", value: "blum.com 공식 문의 폼", href: "https://www.blum.com/kr/ko/contact/" },
                  { icon: "📍", label: "영업소 찾기", value: "전국 영업소 안내", href: "https://www.blum.com/kr/ko/contact/sales-offices/" },
                  { icon: "🏠", label: "쇼룸", value: "제품 직접 체험", href: "https://www.blum.com/kr/ko/contact/showrooms/" },
                ].map((c) => (
                  <li key={c.label}>
                    <span className="text-lg">{c.icon}</span>
                    <div className="mt-1">
                      <p className="text-xs font-medium" style={{ color: "#18181b" }}>{c.label}</p>
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "#71717a", textDecoration: "none" }}>{c.value} →</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Showroom */}
            <div id="showroom" className="scroll-mt-32">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4 font-semibold" style={{ color: "#c8102e" }}>쇼룸 안내</p>
              <div className="rounded-xl overflow-hidden mb-3">
                <img
                  src={`${BASE}/images/560/258/4214768/corporate/media/bilder/virtueller-schauraum/blum-virtueller-schauraum_2_4:3.png`}
                  alt="blum showroom"
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <p className="text-xs leading-6" style={{ color: "#71717a" }}>
                전 세계 blum 쇼룸에서 AVENTOS, LEGRABOX, CLIP top을 직접 체험해보실 수 있습니다. 가상 쇼룸도 운영 중입니다.
              </p>
              <a
                href="https://www.blum.com/kr/ko/contact/showrooms/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs tracking-wider uppercase px-5 py-2.5 rounded-md"
                style={{ backgroundColor: "#c8102e", color: "#fff", textDecoration: "none" }}
              >
                쇼룸 찾기
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-semibold" style={{ color: "#c8102e" }}>문의서</p>
            <h2 className="text-2xl font-light mb-8">무엇을 도와드릴까요?</h2>

            {submitted ? (
              <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "#f4f4f5" }}>
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-medium mb-2">문의가 접수되었습니다</h3>
                <p className="text-sm" style={{ color: "#71717a" }}>2영업일 내로 담당자가 연락드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "이름 *", placeholder: "홍길동", type: "text", required: true },
                    { key: "company", label: "회사명", placeholder: "회사 이름 (선택)", type: "text", required: false },
                    { key: "email", label: "이메일 *", placeholder: "example@company.com", type: "email", required: true },
                    { key: "phone", label: "연락처", placeholder: "010-0000-0000", type: "tel", required: false },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#52525b" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.required}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                        style={{ border: "1px solid rgba(0,0,0,0.15)", backgroundColor: "#fafafa", color: "#18181b" }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#52525b" }}>문의 유형</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid rgba(0,0,0,0.15)", backgroundColor: "#fafafa", color: "#18181b" }}
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
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#52525b" }}>문의 내용 *</label>
                  <textarea
                    rows={5}
                    placeholder="문의하실 내용을 자유롭게 작성해주세요."
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                    style={{ border: "1px solid rgba(0,0,0,0.15)", backgroundColor: "#fafafa", color: "#18181b" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm tracking-wider uppercase font-semibold rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#c8102e", color: "#fff" }}
                >
                  문의 보내기
                </button>
                <p className="text-xs text-center" style={{ color: "#a1a1aa" }}>
                  * 표시는 필수 입력 항목입니다. 개인정보는 문의 처리 목적으로만 사용됩니다.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* E-Services Link */}
      <section className="py-12" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">E-Services 포털을 통해 온라인으로 바로 지원받으세요.</p>
            <p className="text-xs mt-1" style={{ color: "#71717a" }}>제품 구성, CAD 데이터, 주문 관리를 온라인으로.</p>
          </div>
          <a
            href="https://e-services.blum.com/main/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-xs tracking-wider uppercase px-6 py-3 rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#18181b", color: "#fff", textDecoration: "none" }}
          >
            E-Services 접속
          </a>
        </div>
      </section>

      <BlumFooter theme="light" />
    </div>
  );
}
