import { Card, Skeleton } from "@nextui-org/react";

export default function MangaSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      <Card className="w-full md:w-1/4">
        <Skeleton className="h-full w-full rounded-lg bg-default" />
      </Card>
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <Skeleton className="h-10 w-full rounded-lg bg-default pb-4" />
        <Skeleton className="h-5 w-full rounded-lg bg-default pb-4" />
        <div className="flex flex-wrap gap-1 mb-4">
          <Skeleton className="h-5 w-20 rounded-lg bg-default" />
          <Skeleton className="h-5 w-20 rounded-lg bg-default" />
          <Skeleton className="h-5 w-20 rounded-lg bg-default" />
        </div>
        <Skeleton className="h-96 w-full rounded-lg bg-default" />
      </div>
    </div>
  );
}
