import { MangaStats } from "@/types";
import { Accordion, AccordionItem, Progress } from "@nextui-org/react";
import { Bookmark, Star } from "lucide-react";

interface MangaRatingProps {
  stats: MangaStats;
}

export const MangaRating = ({ stats }: MangaRatingProps) => {
  return (
    <Accordion
      defaultExpandedKeys={["1"]}
      disableIndicatorAnimation
      variant="bordered"
      selectionMode="multiple"
      isCompact
      className="rounded-lg"
    >
      <AccordionItem
        key="1"
        aria-label="Đánh giá"
        title={
          <div className="flex flex-row justify-between items-center">
            <p className="text-base">Đánh giá</p>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-[#f31260] text-lg">
                {stats.rating.bayesian.toFixed(2)}
              </p>
              <Star color="#f31260" />
            </div>
          </div>
        }
        hideIndicator
      >
        {Object.keys(stats.rating.distribution)
          .sort((a, b) => Number(b) - Number(a))
          .map((key) => (
            <Progress
              key={key}
              label={key}
              size="sm"
              value={
                stats.rating.distribution[
                  key as keyof typeof stats.rating.distribution
                ]
              }
              maxValue={stats.rating.max}
              color="danger"
              formatOptions={{ style: "decimal" }}
              showValueLabel={true}
            />
          ))}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Lượt theo dõi"
        title={
          <div className="flex flex-row justify-between items-center">
            <p className="text-base">Lượt theo dõi</p>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-[#f31260] text-lg">{stats.follows}</p>
              <Bookmark color="#f31260" />
            </div>
          </div>
        }
        hideIndicator
      />
    </Accordion>
  );
};
