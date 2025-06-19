import React, { useEffect } from "react";
import { useGetProducts } from "@/hooks/Products/useGetProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { Skeleton } from "../ui/skeleton";

export const ProductCarousel = () => {
  const { data: products, isLoading } = useGetProducts();
  const [api, setApi] = React.useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [api]);

  if (isLoading || !products || products.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-80 mx-auto mb-2" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                >
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const carouselProducts = [...products.slice(0, 3), ...products.slice(-3)];

  return (
    <div className="h-screen w-full flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Produtos em Destaque
          </h1>
          <p className="text-gray-600 text-lg">
            Descubra nossa seleção especial de produtos
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            dragFree: false,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {carouselProducts.map((product: Product, index: number) => (
              <CarouselItem
                key={`${product.id}-${index}`}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12 bg-white/80 hover:bg-white border-gray-200" />
          <CarouselNext className="-right-12 bg-white/80 hover:bg-white border-gray-200" />
        </Carousel>
      </div>
    </div>
  );
};
