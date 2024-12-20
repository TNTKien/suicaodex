"use client";

import { Card, CardBody, Skeleton } from "@nextui-org/react";

export default function ChapterCardSkeleton() {
  return (
    <Card className="rounded-md w-full" radius="none" shadow="sm">
      <CardBody className="flex flex-row gap-2 p-1.5">
        <Skeleton className="flex-grow h-[100px] w-[80px] rounded-md" />
        <div className="flex-grow flex flex-col w-full justify-evenly">
          <Skeleton className="h-7 w-full rounded-md" />
          <Skeleton className="h-3 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-3/5 rounded-md" />
        </div>
      </CardBody>
    </Card>
  );
}
