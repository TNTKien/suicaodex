import GroupInfo from "@/components/Groups/GroupInfo";
import { siteConfig } from "@/config/site";
import { getGroupById } from "@/lib/mangadex/groups";
import { group } from "console";
import { Metadata } from "next";

interface pageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  try {
    const group = await getGroupById(params.id);

    return {
      title: `${group.name} - SuicaoDex`,
      description: group.description
        ? group.description
        : `Thông tin nhóm dịch ${group.name} - SuicaoDex`,
      keywords: [`Manga`, `${group.name}`, "SuicaoDex"],

      openGraph: {
        title: `${group.name} - SuicaoDex`,
        siteName: "SuicaoDex",
        description: group.description
          ? group.description
          : `Thông tin nhóm dịch ${group.name} - SuicaoDex`,
        images: `${siteConfig.mangadexAPI.ogURL}/group/${group.id}`,
      },
    };
  } catch (error) {
    return {
      title: "404 Not Found",
    };
  }
}

export default function Page({ params, searchParams }: pageProps) {
  const { page, tab } = getSearchParams({ params, searchParams });

  return <GroupInfo groupID={params.id} page={page} tab={tab} />;
}

const getSearchParams = ({ searchParams }: pageProps) => {
  const page = parseInt(String(searchParams["page"] ?? "1"));
  const tab = String(searchParams["tab"] ?? "");
  return {
    page,
    tab,
  };
};
