"use client";

import { useState } from "react";
import Link from "next/link";
import CompanyHero from "@/components/v1/CompanyHero";
import CompanyStatsSection from "@/components/v1/CompanyStatsSection";
import CompanyPhotoSequence from "@/components/v1/CompanyPhotoSequence";

const BASE = "https://www.blum.com";
const PHOTO1 = `${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`;
const PHOTO2 = `${BASE}/images/560/258/4214770/corporate/media/bilder/unternehmen/nachhaltigkeit/neu2025/Blum_umweltfreundliche_Transporte_4:3.jpg`;
const PHOTO3 = `${BASE}/images/560/258/4214675/corporate/media/bilder/unternehmen/Geschaeftsfuehrung_Philipp-Blum_Martin-Blum_4:3.jpg`;

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function V1Company() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#18181b", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      <style>{`
        /* Fix 6: 숫자로 보는 blum 모바일 2열 */
        @media (max-width: 768px) {
          .v1-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .v1-stats-section {
            text-align: center;
            padding: 60px 24px !important;
          }
          .v1-stats-section > div {
            margin: 0 auto;
          }
        }
        /* Fix 7: 사진 시퀀스 모바일 */
        @media (max-width: 768px) {
          .photo-sequence { display: none !important; }
          .v1-photo-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .v1-photo-mobile { display: none !important; }
        }
      `}</style>

      {/* STEP 1: Hero — image full-screen, scroll → text */}
      <CompanyHero />

      {/* STEP 2: 숫자로 보는 blum */}
      <CompanyStatsSection />

      {/* STEP 3–6: GSAP pin photo sequence (desktop) */}
      <CompanyPhotoSequence />

      {/* STEP 3–6: 모바일 대체 사진 (토글 아코디언) */}
      <div
        className="v1-photo-mobile"
        style={{
          flexDirection: "column",
          gap: 12,
          backgroundColor: "#f4f4f5",
          padding: "40px 16px",
        }}
      >
        {[
          {
            id: "leadership",
            src: PHOTO3,
            alt: "경영진",
            label: "Leadership",
            title: "Philipp & Martin Blum",
            sub: "공동 경영진",
            body: "창업자 Julius Blum의 후손인 두 형제가 blum을 이끌고 있습니다. 가족 기업의 전통을 이어받아 품질과 혁신, 지속가능성을 핵심 가치로 삼고 있습니다.",
            quote: "\"당사는 끊임없이 움직여 더 나은 아이디어를 만듭니다.\"",
          },
          {
            id: "sustainability",
            src: PHOTO2,
            alt: "지속가능성",
            label: "Sustainability",
            title: "지속가능한 미래를 함께 만듭니다",
            sub: "환경·사회적 책임",
            body: "blum은 환경 친화적인 생산 방식, 친환경 물류, 에너지 효율화를 통해 지속가능한 비즈니스를 실현합니다.",
            list: ["에너지 및 기후 보호", "순환 경제 및 자원 활용", "환경 친화적 운송", "직원 건강과 안전 최우선"],
          },
          {
            id: "about",
            src: PHOTO1,
            alt: "blum workplace",
            label: "About Blum",
            title: "편리함을 높이고 삶의 질을 향상시키는 가구 피팅 제조사",
            sub: "오스트리아 포어알베르크",
            body: "Julius Blum GmbH는 고품질 주방 및 가구용 피팅을 제조하는 세계 최고의 제조업체 중 하나입니다. 오스트리아 포어알베르크에 본사를 두고, 전 세계 120개국 이상에 제품을 수출하고 있습니다.",
          },
        ].map((item) => {
          const isOpen = openCard === item.id;
          return (
            <div
              key={item.id}
              style={{ width: "100%", borderRadius: 12, overflow: "hidden", backgroundColor: "#ffffff", cursor: "pointer" }}
              onClick={() => setOpenCard(isOpen ? null : item.id)}
            >
              {/* 이미지 (항상 표시) */}
              <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>

              {/* 제목 + 토글 표시 (항상 표시) */}
              <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 4 }}>{item.label}</p>
                  <h3 style={{ fontSize: 15, fontWeight: 300, color: "#18181b", lineHeight: 1.4 }}>{item.title}</h3>
                </div>
                <span style={{ fontSize: 18, color: "#a1a1aa", flexShrink: 0, marginLeft: 12, transition: "transform 0.3s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </div>

              {/* 세부 텍스트 (토글) */}
              <div style={{
                maxHeight: isOpen ? "400px" : "0",
                overflow: "hidden",
                transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <div style={{ padding: "0 20px 20px" }}>
                  <div style={{ width: 28, height: 1, backgroundColor: "#d4d4d8", marginBottom: 12 }} />
                  <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.8, marginBottom: item.list ? 14 : 0 }}>{item.body}</p>
                  {item.list && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {item.list.map((li) => (
                        <li key={li} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#52525b", marginBottom: 6 }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#18181b", flexShrink: 0, display: "inline-block" }} />
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.quote && (
                    <blockquote style={{ fontSize: 13, fontStyle: "italic", color: "#18181b", borderLeft: "2px solid #d4d4d8", paddingLeft: 14, margin: "12px 0 0", lineHeight: 1.65 }}>
                      {item.quote}
                    </blockquote>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* STEP 7: CTA */}
      <section style={{ padding: "80px 48px", textAlign: "center", borderTop: "1px solid rgba(24,24,27,0.06)", backgroundColor: "#ffffff" }}>
        <Link
          href="/v1/contact"
          style={{
            display: "inline-block",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "14px 40px",
            border: "1px solid #18181b",
            color: "#18181b",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#18181b";
            (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#18181b";
          }}
        >
          문의하기
        </Link>
      </section>
    </div>
  );
}
