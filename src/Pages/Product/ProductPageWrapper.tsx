import { ProductPage } from './ProductPage';

export const ProductPageWrapper = () => {
  const pathParts = window.location.pathname.split('/');
  const provider = pathParts[2]; 
  const productId = pathParts[3];

  if (!provider || !productId) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">URL inválida</h2>
        <p className="text-gray-600">A URL do produto não está no formato correto.</p>
      </div>
    );
  }

  return <ProductPage productId={productId} provider={provider} />;
};