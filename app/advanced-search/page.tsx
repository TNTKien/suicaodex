import { Metadata } from "next";

import { AdvancedSearch } from "@/components/Search/Advanced/AdvancedSearch";
import { siteConfig } from "@/config/site";

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
    images: `${siteConfig.suicaodex.domain}/hanabi_holder.webp`,
  },
};

export default function Page({ searchParams }: pageProps) {
  const { page, limit, author, q, content, status, demos, include, exclude } =
    getSearchParams({
      searchParams,
    });

  return (
    <AdvancedSearch
      limit={limit}
      page={page}
      q={q}
      author={author}
      content={content}
      status={status}
      demos={demos}
      include={include}
      exclude={exclude}
    />
  );
}

const getSearchParams = ({ searchParams }: pageProps) => {
  const page = parseInt(String(searchParams["page"] ?? "1"));
  const limit = parseInt(String(searchParams["limit"] ?? "30"));
  const author = String(searchParams["author"] ?? "");
  const q = String(searchParams["q"] ?? "");
  const content = String(searchParams["content"] ?? "");
  const status = String(searchParams["status"] ?? "");
  const demos = String(searchParams["demos"] ?? "");
  const include = String(searchParams["include"] ?? "");
  const exclude = String(searchParams["exclude"] ?? "");

  return {
    page,
    limit,
    q,
    author,
    content,
    status,
    demos,
    include,
    exclude,
  };
};
