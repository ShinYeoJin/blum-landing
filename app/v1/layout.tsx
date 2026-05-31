import V1Nav from "@/components/v1/V1Nav";
import V1Footer from "@/components/v1/V1Footer";

export const metadata = {
  title: { default: "blum — 미니멀 모던", template: "%s | blum V1" },
  description: "미니멀하고 모던한 blum 프리미엄 가구 피팅 브랜드 경험",
};

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <V1Nav />
      {children}
      <V1Footer />
    </>
  );
}
