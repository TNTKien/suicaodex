import { Card, CardBody, Skeleton } from "@nextui-org/react";

export default function LatestSkeleton() {
  return (
    <Card
      isBlurred
      className="bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
      radius="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-start justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Skeleton className="h-[200px] rounded-lg bg-default-300" />
          </div>
          <div className="flex flex-col col-span-6 md:col-span-8 gap-2">
            <div className="flex justify-between items-start">
              <Skeleton className="w-3/4 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
            <div className="flex justify-between items-start">
              <Skeleton className="w-full rounded-lg">
                <div className="h-3 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
            <div className="flex justify-between items-start">
              <Skeleton className="w-1/2 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
