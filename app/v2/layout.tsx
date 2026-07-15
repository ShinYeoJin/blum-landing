import V3Nav from "@/components/v2/V3Nav";
import V3Footer from "@/components/v2/V3Footer";

export const metadata = {
  title: { default: "BLUM — BOLD & TRENDY", template: "%s | BLUM V3" },
  description: "트렌디하고 볼드한 BLUM 프리미엄 가구 피팅 브랜드 경험",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <V3Nav />
      {children}
      <V3Footer />
    </>
  );
}
