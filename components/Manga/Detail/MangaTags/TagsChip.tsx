import { Tag } from "@/types";
import StatusChip from "./StatusChip";
import ContentRatingChip from "./ContentRatingChip";
import { Chip } from "@nextui-org/react";

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
        <Chip className="uppercase text-xs" radius="sm" key={tag.id} size="sm">
          {tag.name}
        </Chip>
      ))}
    </>
  );
};

export default MangaTags;
