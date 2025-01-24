"use client";

import { Card, CardBody, Skeleton } from "@heroui/react";

export default function TabSkeleton() {
  return (
    <Card className="rounded-md w-full" radius="none" shadow="sm">
      <CardBody className="flex flex-row gap-3 p-2">
        <Skeleton className="h-[200px] w-[233px] md:w-[193px] rounded-md" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-2 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md mt-8" />
          <Skeleton className="h-4 w-3/5 rounded-md mt-2" />
          <Skeleton className="h-4 w-2/3 rounded-md mt-2" />
        </div>
      </CardBody>
    </Card>
  );
}
