import { AdvancedSearch } from "@/components/Search/Advanced/AdvancedSearch";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

interface pageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export const metadata: Metadata = {
  title: "Tìm kiếm nâng cao - SuicaoDex",
  description: "Công cụ tìm kiếm nâng cao",
  keywords: ["Tìm kiếm nâng cao", "Nâng cao", "Tìm kiếm", "Manga", "SuicaoDex"],
  openGraph: {
    images: `${siteConfig.domains.suicaodex}/SuicaoHan.webp`,
  },
};

export default function Page({ searchParams }: pageProps) {
  const { page, limit } = getSearchParams({ searchParams });

  return <AdvancedSearch page={page} limit={limit} />;
}

const getSearchParams = ({ searchParams }: pageProps) => {
  const pageParams = searchParams["page"] ?? "1";
  const limitParams = searchParams["limit"] ?? "30";

  // const page = pageParams
  //   ? typeof pageParams === "string"
  //     ? pageParams
  //     : pageParams[0]
  //   : "1";
  // const limit = limitParams
  //   ? typeof limitParams === "string"
  //     ? limitParams
  //     : limitParams[0]
  //   : "10";

  return {
    page: parseInt(pageParams),
    limit: parseInt(limitParams),
  };
};
