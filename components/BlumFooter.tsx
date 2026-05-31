import Link from "next/link";

const BASE = "https://www.blum.com";

interface BlumFooterProps {
  theme?: "dark" | "light";
}

export default function BlumFooter({ theme = "dark" }: BlumFooterProps) {
  const isDark = theme === "dark";
  const bg = isDark ? "#0a0a0a" : "#faf7f2";
  const border = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const text = isDark ? "#e4e4e7" : "#2c1e0f";
  const muted = isDark ? "rgba(240,240,240,0.3)" : "#8a6a4a";

  return (
    <footer style={{ backgroundColor: bg, borderTop: `1px solid ${border}` }}>
      {/* Footer image bar */}
      <div className="w-full overflow-hidden" style={{ height: "180px" }}>
        <img
          src={`${BASE}/images/560/0/4213780//corporate/layout/facelift/images/content/Footer/xsmall-footer.jpg`}
          alt="blum footer"
          className="w-full h-full object-cover"
          style={{ opacity: isDark ? 0.5 : 0.6 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + desc */}
          <div className="md:col-span-1">
            <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.2em", color: text, textTransform: "uppercase" }}>
              blum
            </span>
            <p className="mt-3 text-xs leading-6" style={{ color: muted }}>
              moving ideas<br />
              프리미엄 가구 피팅<br />
              Since 1952
            </p>
            <a
              href={`${BASE}/kr/ko/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded"
              style={{ border: "1px solid #c8102e", color: "#c8102e" }}
            >
              공식 사이트 →
            </a>
          </div>

          {/* Products */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: "#c8102e" }}>제품</p>
            <ul className="space-y-2.5">
              {[
                ["AVENTOS 리프트 시스템", "/products#lift"],
                ["CLIP top 경첩 시스템", "/products#hinge"],
                ["LEGRABOX 박스 시스템", "/products#box"],
                ["MOVENTO 러너 시스템", "/products#runner"],
                ["TIP-ON 모션 기술", "/products#motion"],
                ["REVEGO 포켓 시스템", "/products#pocket"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-xs hover:opacity-80 transition-opacity" style={{ color: muted, textDecoration: "none" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: "#c8102e" }}>서비스</p>
            <ul className="space-y-2.5">
              {[
                ["계획 / 설계 지원", "/services#plan"],
                ["E-Services", "/services#digital"],
                ["조립 장치", "/services#assembly"],
                ["마케팅 자료", "/services#marketing"],
                ["CAD/CAM 데이터", "/services#digital"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-xs hover:opacity-80 transition-opacity" style={{ color: muted, textDecoration: "none" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: "#c8102e" }}>회사 / 연락처</p>
            <ul className="space-y-2.5">
              {[
                ["Blum 소개", "/company#about"],
                ["실적 / 수치", "/company#facts"],
                ["지속가능성", "/company#sustainability"],
                ["쇼룸 안내", "/contact#showroom"],
                ["문의하기", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-xs hover:opacity-80 transition-opacity" style={{ color: muted, textDecoration: "none" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-[10px] tracking-wider mb-1" style={{ color: muted }}>본사</p>
              <p className="text-xs leading-5" style={{ color: muted }}>
                Julius Blum GmbH<br />
                Industriestrasse 1<br />
                6973 Höchst, Austria
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t text-[10px]"
          style={{ borderColor: border, color: muted }}
        >
          <span>© 2025 Julius Blum GmbH. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: muted, textDecoration: "none" }}>버전 선택</Link>
            <Link href="/v1" className="hover:opacity-80 transition-opacity" style={{ color: muted, textDecoration: "none" }}>V1</Link>
            <Link href="/v2" className="hover:opacity-80 transition-opacity" style={{ color: muted, textDecoration: "none" }}>V2</Link>
            <Link href="/v3" className="hover:opacity-80 transition-opacity" style={{ color: muted, textDecoration: "none" }}>V3</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
