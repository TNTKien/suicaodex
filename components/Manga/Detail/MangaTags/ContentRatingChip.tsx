import { Chip } from "@nextui-org/react";

interface ContentRatingChipProps {
  rating: string;
}

const ContentRatingChip = ({ rating }: ContentRatingChipProps) => {
  if (rating === "safe") {
    return null;
  }
  const ratingColor = {
    suggestive: "bg-yellow-500 dark:bg-yellow-400",
    erotica: "bg-red-500 dark:bg-red-400",
    pornographic: "bg-red-800 dark:bg-red-700",
  }[rating];

  return (
    <Chip
      className={`uppercase text-white ${ratingColor}`}
      radius="sm"
      size="sm"
    >
      <a
        href={`/advanced-search?content=${rating}`}
        className="text-xs hover:underline"
      >
        {rating}
      </a>
    </Chip>
  );
};

export default ContentRatingChip;
