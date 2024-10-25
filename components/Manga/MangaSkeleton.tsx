import { Card, CardBody, Skeleton } from "@nextui-org/react";

export default function MangaSkeleton() {
  return (
    // <div className="flex flex-col md:flex-row gap-8 mb-8">
    //   <Card className="w-full md:w-1/4">
    //     <Skeleton className="h-full w-full rounded-lg bg-default" />
    //   </Card>
    //   <div className="w-full md:w-3/4 flex flex-col gap-4">
    //     <Skeleton className="h-10 w-full rounded-lg bg-default pb-4" />
    //     <Skeleton className="h-5 w-full rounded-lg bg-default pb-4" />
    //     <div className="flex flex-wrap gap-1 mb-4">
    //       <Skeleton className="h-5 w-20 rounded-lg bg-default" />
    //       <Skeleton className="h-5 w-20 rounded-lg bg-default" />
    //       <Skeleton className="h-5 w-20 rounded-lg bg-default" />
    //     </div>
    //     <Skeleton className="h-96 w-full rounded-lg bg-default" />
    //   </div>
    // </div>

    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full h-[324]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-start justify-center">
          <div className="relative col-span-6 md:col-span-2">
            <Skeleton className="h-[300] rounded-lg bg-default-300" />
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
