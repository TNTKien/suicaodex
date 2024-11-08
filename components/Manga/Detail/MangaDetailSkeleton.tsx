import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";

export default function MangaDetailSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Card
        radius="sm"
        shadow="sm"
        className="flex flex-col rounded-t-none bg-background/60 dark:bg-default-100/50 w-full"
      >
        <CardHeader className="items-start flex flex-col w-full sm:flex-row gap-4">
          <Skeleton className="h-[300px] w-[200px] md:w-[230px] rounded-lg" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-3 w-1/2 md:w-1/4 rounded-md" />
            <Skeleton className="h-3 w-2/3 rounded-md" />
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-5 w-14 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="bottom-0 flex flex-col items-start gap-2 z-10">
          <Skeleton className="h-2 w-3/5 rounded-lg" />
          <Skeleton className="h-2 w-full rounded-lg" />
        </CardFooter>
      </Card>
      <div className="flex flex-col md:flex-row gap-2">
        <Card radius="sm" shadow="sm" className="w-full basis-1/3">
          <CardBody className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <Skeleton className="h-10 w-1/2 rounded-md" />
              <Skeleton className="h-10 w-1/2 rounded-md" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-full w-full rounded-md" />
          </CardBody>
        </Card>
        <Card radius="sm" shadow="sm" className="w-full basis-2/3">
          <CardBody className="flex flex-col gap-2">
            <Skeleton className="h-7 w-1/4 rounded-md mb-2" />
            <Skeleton className="h-14 w-full rounded-md" />
            <Skeleton className="h-14 w-full rounded-md" />
            <Skeleton className="h-14 w-full rounded-md" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
