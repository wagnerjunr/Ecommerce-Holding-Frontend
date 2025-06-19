import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductListSkeleton } from "./ProductListSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useGetProducts } from "@/hooks/Products/useGetProducts";
import type { Product } from "@/types";
import { PaginationComponent } from "../Layout/Pagination/Pagination";

export const ProductList = () => {
  const { data: products, isLoading } = useGetProducts();
  const [searchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [activeSection, setActiveSection] = useState<
    "all" | "brazilian" | "european"
  >("all");

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const brazilianProducts = filteredProducts?.filter(
    (product) =>
      product.provider.toLowerCase().includes("brazil") ||
      product.provider.toLowerCase().includes("brasil")
  );

  const europeanProducts = filteredProducts?.filter(
    (product) =>
      product.provider.toLowerCase().includes("europe") ||
      product.provider.toLowerCase().includes("europa")
  );

  const getProductsToShow = (): Product[] | undefined => {
    switch (activeSection) {
      case "brazilian":
        return brazilianProducts;
      case "european":
        return europeanProducts;
      default:
        return filteredProducts;
    }
  };

  const productsToShow = getProductsToShow();

  const totalPages = Math.ceil((productsToShow?.length || 0) / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsToShow?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "brazilian":
        return "Produtos Brasileiros";
      case "european":
        return "Produtos Europeus";
      default:
        return "Todos os Produtos";
    }
  };

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <Button variant="outline" onClick={() => setActiveSection("all")}>
          Todos ({filteredProducts?.length || 0})
        </Button>
        <Button variant="outline" onClick={() => setActiveSection("brazilian")}>
          Brasileiros ({brazilianProducts?.length || 0})
        </Button>
        <Button variant="outline" onClick={() => setActiveSection("european")}>
          Europeus ({europeanProducts?.length || 0})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{getSectionTitle()}</span>
            <span className="text-sm font-normal text-muted-foreground">
              Página {currentPage} de {totalPages} •{" "}
              {productsToShow?.length || 0} produtos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentProducts?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Nenhum produto encontrado."
                  : "Nenhum produto disponível nesta seção."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <PaginationComponent
                totalItems={productsToShow?.length || 0}
                currentPage={currentPage}
                itemsPerPage={productsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
