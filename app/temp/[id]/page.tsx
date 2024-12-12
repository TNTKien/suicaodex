// import { auth } from "@/auth";
// import MangaTest from "@/components/TestComponents/MangaTest";
import NewTest from "@/components/TestComponents/NewTest";

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  //const session = await auth();
  //return <MangaTest mangaID={params.id} session={session} />;

  return <NewTest mangaID={params.id} />;
}
