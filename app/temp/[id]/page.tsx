import { auth } from "@/auth";
import MangaTest from "@/components/TestComponents/MangaTest";

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  const session = await auth();
  return <MangaTest mangaID={params.id} session={session} />;
}
