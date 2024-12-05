import { Metadata } from "next";

import Latest from "@/components/Manga/Latest/Latest";
import { siteConfig } from "@/config/site";

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
        ? "Mới cập nhật - SuicaoDex"
        : `Trang ${page} - Mới cập nhật - SuicaoDex`,
    description: "Manga mới cập nhật",
    keywords: ["Mới cập nhật", "Manga"],
    openGraph: {
      images: `${siteConfig.suicaodex.domain}/hanabi_holder.webp`,
    },
  };
}

export default function Page({ searchParams }: pageProps) {
  const { page, limit } = getSearchParams({ searchParams });

  return <Latest limit={limit} page={page} />;
}

const getSearchParams = ({ searchParams }: pageProps) => {
  const pageParams = searchParams["page"] ?? "1";
  const limitParams = searchParams["limit"] ?? "24";

  const page = pageParams
    ? typeof pageParams === "string"
      ? pageParams
      : pageParams[0]
    : "1";
  const limit = limitParams
    ? typeof limitParams === "string"
      ? limitParams
      : limitParams[0]
    : "10";

  return {
    page: parseInt(page),
    limit: parseInt(limit),
  };
};
