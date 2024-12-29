import { Chip } from "@nextui-org/react";
import StatusChip from "./StatusChip";
import ContentRatingChip from "./ContentRatingChip";
import { Tag } from "@/types";
import MyChip from "@/components/Custom/MyChip";

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
        <MyChip key={tag.id} className="uppercase text-xs">
          <a
            href={`/advanced-search?include=${tag.id}`}
            className="text-xs hover:underline text-gray-700 dark:text-white"
          >
            {tag.name}
          </a>
        </MyChip>
      ))}
    </>
  );
};

export default MangaTags;
