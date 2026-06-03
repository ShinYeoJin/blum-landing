import Link from "next/link";

const CREAM = "#faf7f2";
const BROWN = "#2c1e0f";
const AMBER = "#c68642";
const MUTED = "#8a6a4a";

export default function V2Footer() {
  return (
    <footer style={{ backgroundColor: BROWN, fontFamily: "'Georgia', serif" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <span style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: CREAM }}>blum</span>
            <p className="mt-3 text-xs leading-7" style={{ color: MUTED }}>
              moving ideas<br />따뜻한 공간을 위한<br />프리미엄 피팅 · Since 1952
            </p>
            <a href="https://www.blum.com/kr/ko/" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 text-[10px] tracking-wider"
              style={{ color: AMBER, textDecoration: "underline", textUnderlineOffset: "3px" }}>
              공식 사이트 →
            </a>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: AMBER }}>제품</p>
            <ul className="space-y-3">
              {[
                ["AVENTOS 리프트", "/v2/products/aventos"],
                ["CLIP top 경첩", "/v2/products#hinge"],
                ["LEGRABOX 서랍", "/v2/products#box"],
                ["MOVENTO 러너", "/v2/products#runner"],
                ["TIP-ON 모션", "/v2/products#motion"],
                ["REVEGO 포켓", "/v2/products#pocket"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-xs hover:opacity-80 transition-opacity" style={{ color: MUTED, textDecoration: "none" }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: AMBER }}>서비스 / 회사</p>
            <ul className="space-y-3">
              {[
                ["설계 지원", "/services#plan"],
                ["E-Services", "/services#digital"],
                ["회사 소개", "/company#about"],
                ["브랜드 스토리", "/company#about"],
                ["지속가능성", "/company#sustainability"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link href={h} className="text-xs hover:opacity-80 transition-opacity" style={{ color: MUTED, textDecoration: "none" }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: AMBER }}>연락처</p>
            <p className="text-xs leading-7" style={{ color: MUTED }}>
              Julius Blum GmbH<br />
              Industriestrasse 1<br />
              6973 Höchst, Austria
            </p>
            <Link href="/contact" className="inline-block mt-5 px-6 py-2.5 text-xs rounded-full transition-opacity hover:opacity-90"
              style={{ backgroundColor: AMBER, color: CREAM, textDecoration: "none" }}>
              쇼룸 방문 신청
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(138,106,74,0.2)" }}>
          <span className="text-[10px]" style={{ color: "rgba(138,106,74,0.5)" }}>© 2025 Julius Blum GmbH. All rights reserved.</span>
          <div className="flex items-center gap-5">
            {[["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"], ["V4", "/v4"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-[10px] hover:opacity-80 transition-opacity" style={{ color: "rgba(138,106,74,0.5)", textDecoration: "none" }}>{l}</Link>
            ))}
            <a
              href="https://blum-landing.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest uppercase px-3 py-1.5 border hover:opacity-80 transition-opacity"
              style={{ color: "rgba(138,106,74,0.7)", borderColor: "rgba(138,106,74,0.3)", textDecoration: "none" }}
            >
              공식 사이트
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
