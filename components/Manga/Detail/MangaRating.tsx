import { Accordion, AccordionItem, Progress } from "@nextui-org/react";
import { Bookmark, Star } from "lucide-react";
import { MangaStats } from "@/types";

interface MangaRatingProps {
  stats: MangaStats;
}

export const MangaRating = ({ stats }: MangaRatingProps) => {
  return (
    <Accordion
      disableIndicatorAnimation
      isCompact
      className="rounded-lg"
      defaultExpandedKeys={["1"]}
      selectionMode="multiple"
      variant="bordered"
    >
      <AccordionItem
        key="1"
        hideIndicator
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
      >
        {Object.keys(stats.rating.distribution)
          .sort((a, b) => Number(b) - Number(a))
          .map((key) => (
            <Progress
              key={key}
              color="danger"
              formatOptions={{ style: "decimal" }}
              label={key}
              maxValue={stats.rating.max}
              showValueLabel={true}
              size="sm"
              value={
                stats.rating.distribution[
                  key as keyof typeof stats.rating.distribution
                ]
              }
            />
          ))}
      </AccordionItem>
      <AccordionItem
        key="2"
        hideIndicator
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
      />
    </Accordion>
  );
};
