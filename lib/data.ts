type Chapter = {
  id: string;
  chapter: string;
  title: string;
  updatedAt: string;
};

type Tag = {
  id: string;
  name: string;
};

type Manga = {
  tags: Tag[];
  cover: string;
  author: string;
  artist: string;
};

export function ChaptersParser(data: any[]): Chapter[] {
  return data.map((item) => {
    return {
      id: item.id,
      chapter: item.attributes.chapter,
      title: item.attributes.title,
      updatedAt: item.attributes.updatedAt,
    };
  });
}

export function TagsParser(data: any[]): Tag[] {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name.en,
    };
  });
}

export function MangaParser(data: any): Manga {
  const coverArt = data.relationships.find(
    (item: any) => item.type === "cover_art"
  );
  const author = data.relationships.find((item: any) => item.type === "author");
  const artist = data.relationships.find((item: any) => item.type === "artist");
  return {
    tags: TagsParser(data.attributes.tags),
    cover: coverArt ? coverArt.attributes.fileName : null,
    author: author ? author.attributes.name : null,
    artist: artist ? artist.attributes.name : null,
  };
}
