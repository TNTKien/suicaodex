import { HistoryPage } from "@/components/History/HistoryPage";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Lịch sử đọc - SuicaoDex`,
  description: "Lịch sử đọc truyện của bạn",
  keywords: siteConfig.keywords,
  openGraph: {
    images: `${siteConfig.domains.suicaodex}/SuicaoHan.webp`,
  },
};

export default function Page() {
  return <HistoryPage />;
}
