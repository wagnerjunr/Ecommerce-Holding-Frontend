import { useState, useEffect } from "react";
import { useGetProducts } from "@/hooks/Products/useGetProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";

export const ProductBanner = () => {
  const { data: products, isLoading } = useGetProducts();
  const { addToCart } = useCartStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const bannerProducts = products?.slice(0, 5) || [];

  console.log(bannerProducts);

  useEffect(() => {
    if (!isAutoPlaying || bannerProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerProducts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [bannerProducts.length, isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      prev === 0 ? bannerProducts.length - 1 : prev - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % bannerProducts.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleAddToCart = () => {
    if (bannerProducts.length === 0) return;

    const currentProduct = bannerProducts[currentIndex];

    if (!currentProduct.available) {
      toast.error("Produto indisponível", {
        description: "Este produto não está disponível no momento.",
      });
      return;
    }
    addToCart(currentProduct);
  };

  if (isLoading) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center"></div>
      </div>
    );
  }

  if (!bannerProducts.length) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
        <p className="text-white text-xl">Nenhum produto disponível</p>
      </div>
    );
  }

  const currentProduct = bannerProducts[currentIndex];

  return (
    <div className="relative h-96 overflow-hidden rounded-lg group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${currentProduct.image})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-between p-8 px-20">
          <div className="text-white max-w-md space-y-4">
            <Badge variant="secondary" className="w-fit">
              {currentProduct.provider}
            </Badge>
            <h2 className="text-4xl font-bold leading-tight">
              {currentProduct.name}
            </h2>
            <p className="text-lg opacity-90 line-clamp-3">
              {currentProduct.description}
            </p>

            <div className="flex items-center space-x-4">
              {currentProduct.discountValue ? (
                <>
                  <span className="text-2xl text-gray-300 line-through">
                    R$ {currentProduct.price},00
                  </span>
                  <span className="text-3xl font-bold text-white">
                    R$ {currentProduct.price - currentProduct.discountValue},00
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    -
                    {Math.round(
                      (currentProduct.discountValue / currentProduct.price) *
                        100
                    )}
                    %
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-bold text-white">
                  R$ {currentProduct.price},00
                </span>
              )}
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-blue-500 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-102"
              disabled={!currentProduct.available}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {currentProduct.available
                ? "Adicionar ao Carrinho"
                : "Indisponível"}
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Produto anterior"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Próximo produto"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir para produto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
