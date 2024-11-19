import { auth } from "@/auth";
import Library from "@/components/Library/Library";
import SignInAlert from "@/components/Library/SignInAlert";
import { getMangaByIDs } from "@/lib/data";
import { getUserLib } from "@/lib/db";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Thư viện - SuicaoDex",
    description: "Thư viện của riêng bạn",
    keywords: ["Mới cập nhật", "Manga"],
  };
}

export default async function MyLibrary() {
  const session = await auth();

  return <Library session={session} />;
}
