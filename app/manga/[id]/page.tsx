import MangaDetails from "@/components/Manga/MangaDetails";

interface pageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: pageProps) {
  return (
    <div>
      <MangaDetails mangaID={params.id} />
    </div>
  );
}
