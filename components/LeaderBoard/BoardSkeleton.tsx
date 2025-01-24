"use client";

import { Card, Listbox, ListboxItem, Skeleton } from "@heroui/react";

export default function BoardSkeleton() {
  return (
    <Card className="grid grid-cols-1" shadow="sm" radius="sm">
      <Listbox variant="light" aria-label="skeleton">
        <ListboxItem key="1" showDivider textValue="skeleton">
          <Skeleton className="rounded-md">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
        </ListboxItem>
        <ListboxItem key="2" showDivider textValue="skeleton">
          <Skeleton className="rounded-md">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
        </ListboxItem>
        <ListboxItem key="3" showDivider textValue="skeleton">
          <Skeleton className="rounded-md">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
        </ListboxItem>
        <ListboxItem key="4" textValue="skeleton">
          <Skeleton className="rounded-md">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
        </ListboxItem>
      </Listbox>
    </Card>
  );
}
