import { Chip } from "@nextui-org/react";
import StatusChip from "./StatusChip";
import ContentRatingChip from "./ContentRatingChip";
import { Tag } from "@/types";

interface MangaTagsProps {
  tags: Tag[];
  contentRating: string;
  status: string;
}

const MangaTags = ({ tags, contentRating, status }: MangaTagsProps) => {
  return (
    <>
      <StatusChip status={status} />
      <ContentRatingChip rating={contentRating} />
      {tags.map((tag) => (
        <Chip key={tag.id} className="uppercase text-xs" radius="sm" size="sm">
          <a
            href={`/advanced-search?include=${tag.id}`}
            className="text-xs hover:underline"
          >
            {tag.name}
          </a>
        </Chip>
      ))}
    </>
  );
};

export default MangaTags;
