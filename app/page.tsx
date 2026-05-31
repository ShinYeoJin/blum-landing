import Link from "next/link";

export default function Home() {
  const versions = [
    {
      href: "/v1",
      label: "V1",
      title: "미니멀 / 모던",
      desc: "여백을 활용한 고급스러운 무채색 디자인",
      bg: "bg-zinc-900",
      text: "text-white",
      accent: "bg-white text-zinc-900",
      tag: "Minimal · Modern",
    },
    {
      href: "/v2",
      title: "따뜻한 / 감성적",
      label: "V2",
      desc: "자연소재, 우드톤, 아늑한 인테리어 감성",
      bg: "bg-[#f5ede0]",
      text: "text-[#3b2a1a]",
      accent: "bg-[#3b2a1a] text-[#f5ede0]",
      tag: "Warm · Natural",
    },
    {
      href: "/v3",
      title: "트렌디 / 볼드",
      label: "V3",
      desc: "강렬한 타이포그래피, 큰 이미지, 세련된 레이아웃",
      bg: "bg-[#0a0a0a]",
      text: "text-white",
      accent: "bg-[#ff3b00] text-white",
      tag: "Trendy · Bold",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between">
        <span className="text-2xl font-light tracking-[0.3em] uppercase">blum</span>
        <span className="text-xs text-zinc-400 tracking-widest uppercase">Design Preview</span>
      </header>

      {/* Hero */}
      <section className="px-8 py-20 md:py-32 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4">Lifestyle · Interior</p>
        <h1 className="text-4xl md:text-7xl font-light tracking-tight text-zinc-900 mb-6 leading-tight">
          세 가지의<br />
          <em className="not-italic font-semibold">blum</em>
        </h1>
        <p className="text-lg text-zinc-500 max-w-md">
          하나의 브랜드, 세 가지 디자인 방향. 당신의 공간에 어울리는 스타일을 찾아보세요.
        </p>
      </section>

      {/* Version Cards */}
      <section className="px-8 pb-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {versions.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className={`group relative flex flex-col justify-between p-8 min-h-[380px] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${v.bg} ${v.text}`}
          >
            <div>
              <span className={`inline-block text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-6 ${v.accent}`}>
                {v.tag}
              </span>
              <div className="text-6xl font-light opacity-10 mb-2">{v.label}</div>
              <h2 className="text-2xl font-light mb-3">{v.title}</h2>
              <p className="text-sm opacity-60 leading-relaxed">{v.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium mt-8">
              <span>둘러보기</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        ))}
      </section>

      <footer className="border-t border-zinc-100 px-8 py-6 text-center text-xs text-zinc-400 tracking-widest uppercase">
        © 2025 Blum. All rights reserved.
      </footer>
    </main>
  );
}
