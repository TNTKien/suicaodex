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
          {tag.name}
        </Chip>
      ))}
    </>
  );
};

export default MangaTags;
