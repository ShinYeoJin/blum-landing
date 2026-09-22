import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

export const metadata = {
  title: { default: "BLUM — BOLD & TRENDY", template: "%s | BLUM V2" },
  description: "트렌디하고 볼드한 BLUM 프리미엄 가구 피팅 브랜드 경험",
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
