import GroupsList from "@/components/Groups/GroupsList";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

interface pageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  searchParams,
}: pageProps): Promise<Metadata> {
  const { page } = getSearchParams({ searchParams });

  return {
    title:
      page === 1
        ? "Tìm kiếm nhóm dịch - SuicaoDex"
        : `Trang ${page} - Tìm kiếm nhóm dịch - SuicaoDex`,
    description: "Các nhóm dịch Manga",
    keywords: ["Mới cập nhật", "Manga", "Nhóm dịch", "Dịch giả"],
    openGraph: {
      images: `${siteConfig.suicaodex.domain}/hanabi_holder.webp`,
    },
  };
}

export default function Page({ searchParams }: pageProps) {
  const { page, limit, q } = getSearchParams({ searchParams });
  return <GroupsList page={page} limit={limit} q={q} />;
}

const getSearchParams = ({ searchParams }: pageProps) => {
  const page = parseInt(String(searchParams["page"] ?? "1"));
  const limit = parseInt(String(searchParams["limit"] ?? "32"));
  const q = String(searchParams["q"] ?? "");

  return {
    page,
    limit,
    q,
  };
};
