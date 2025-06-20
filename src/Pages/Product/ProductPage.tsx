import { useGetProductById } from "@/hooks/Products/useGetProductById";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Package, FileText } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useDrawerStore from "@/store/drawerStore";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

interface ProductPageProps {
  productId: string;
  provider: string;
}

export const ProductPage = ({ productId, provider }: ProductPageProps) => {
  const { data: product, isLoading } = useGetProductById(productId, provider);
  const { addToCart } = useCartStore();
  const { openCartDrawer } = useDrawerStore();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      openCartDrawer();
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!product) {
    return;
  }

  const productName =
    product.name.charAt(0).toUpperCase() + product.name.slice(1);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Button onClick={handleGoBack} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sem imagem disponível
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productName}
              </h1>
              <Badge variant="secondary" className="mb-4">
                {product.provider}
              </Badge>
            </div>

            <div className="space-y-2">
              {product.discountValue ? (
                <div className="space-y-1">
                  <div className="text-sm text-gray-500 line-through">
                    ${product.price?.toFixed(2)}
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    ${(product.price - product.discountValue).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">
                    Economia de ${product.discountValue.toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="text-3xl font-bold text-primary">
                  ${product.price?.toFixed(2)}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.available ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`text-sm ${
                  product.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.available ? "Em estoque" : "Indisponível"}
              </span>
            </div>

            {product.material && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Material
                  </span>
                </div>
                <p className="text-gray-700 pl-6">{product.material}</p>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={!product.available}
              className="w-full text-lg py-6"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.available ? "Adicionar ao Carrinho" : "Indisponível"}
            </Button>
          </div>
        </div>

        {product.description && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Descrição do Produto
              </h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
