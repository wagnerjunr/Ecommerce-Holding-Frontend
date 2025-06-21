import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { Product } from "@/types";
import useCartStore from "@/store/cartStore";
import useDrawerStore from "@/store/drawerStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const { openCartDrawer } = useDrawerStore();

  const productName =
    product.name.charAt(0).toUpperCase() + product.name.slice(1);

  const handleAddToCart = () => {
    addToCart(product);
    openCartDrawer();
  };

  const handleProductClick = () => {
    window.location.href = `/product/${product.provider}/${product.id}`;
  };

  return (
    <Card className="h-full flex flex-col gap-4">
      <CardHeader>
        {product.image && (
          <div 
            className="aspect-square overflow-hidden rounded-md mb-4 cursor-pointer"
            onClick={handleProductClick}
          >
            <img
              src="/ImagemTeste.webp"
              alt={productName}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        )}
        <CardTitle 
          className="text-lg line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={handleProductClick}
        >
          {productName}
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {product.provider}
        </Badge>
      </CardHeader>

      <CardFooter className="flex flex-col gap-4">
        {product.discountValue ? (
          <div className="flex items-center gap-3 w-full">
            <div className="text-[20px] font-bold text-neutral line-through">
              R${product?.price}
            </div>

            <div className="text-[20px] font-bold text-destructive">
              R${(product.price - product.discountValue)}
            </div>
          </div>
        ) : (
          <div className="text-[20px] font-bold text-neutral w-full">
            R${product?.price},00
          </div>
        )}

        <Button
          onClick={handleAddToCart}
          className="w-full text-secondary"
          disabled={!product.available}
        >
          {product.available ? "Adicionar ao Carrinho" : "Indisponível"}
        </Button>
      </CardFooter>
    </Card>
  );
};
