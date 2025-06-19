import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const ProductListSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-28" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-40" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
