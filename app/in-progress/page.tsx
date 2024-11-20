import Incomming from "@/components/incoming";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Comming Soon - SuicaoDex",
    description: "Tính năng đang phát triển",
    keywords: ["Mới cập nhật", "Manga"],
  };
}

export default function Page() {
  return <Incomming />;
}
