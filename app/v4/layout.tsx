export const metadata = {
  title: { default: "blum — Cinematic Story", template: "%s | blum V4" },
  description: "blum의 70년 역사와 혁신 제품이 스크롤로 펼쳐지는 시네마틱 스토리텔링 경험",
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
