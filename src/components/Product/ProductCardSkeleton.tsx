import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card className="h-full flex flex-col gap-4">
      <CardHeader>
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <Skeleton className="w-full h-full" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-5 w-20" />
      </CardHeader>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
