import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

export const metadata = {
  title: { default: "blum — 따뜻한 감성", template: "%s | blum V2" },
  description: "따뜻하고 감성적인 blum 프리미엄 주방 피팅 브랜드 경험",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <V2Nav />
      {children}
      <V2Footer />
    </>
  );
}
