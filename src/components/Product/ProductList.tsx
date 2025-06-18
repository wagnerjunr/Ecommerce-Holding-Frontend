import { useState, useEffect } from 'react';
import {ProductCard} from './ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useGetProducts } from '@/hooks/Products/useGetProducts';
import type { Product } from '@/types';

export const ProductList = () => {
  const {data: products, isLoading } = useGetProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState<'all' | 'brazilian' | 'european'>('all');
  const productsPerPage = 8;

  useEffect(() => {
   console.log(products);
  }, [products]);

  // Filtrar produtos por busca
  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separar produtos por provider
  const brazilianProducts = filteredProducts?.filter(product => 
    product.provider.toLowerCase().includes('brazil') || 
    product.provider.toLowerCase().includes('brasil')
  );

  const europeanProducts = filteredProducts?.filter(product => 
    product.provider.toLowerCase().includes('europe') || 
    product.provider.toLowerCase().includes('europa')
  );

  // Determinar quais produtos mostrar baseado na seção ativa
  const getProductsToShow = (): Product[] | undefined => {
    switch (activeSection) {
      case 'brazilian':
        return brazilianProducts;
      case 'european':
        return europeanProducts;
      default:
        return filteredProducts;
    }
  };

  const productsToShow = getProductsToShow();

  // Calcular paginação
  const totalPages = Math.ceil((productsToShow?.length || 0) / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsToShow?.slice(startIndex, endIndex);

  // Reset página quando mudar seção
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'brazilian':
        return 'Produtos Brasileiros';
      case 'european':
        return 'Produtos Europeus';
      default:
        return 'Todos os Produtos';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">


      <div className="flex gap-4 flex-wrap">
        <Button 
          variant={activeSection === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveSection('all')}
        >
          Todos ({filteredProducts?.length || 0})
        </Button>
        <Button 
          variant={activeSection === 'brazilian' ? 'default' : 'outline'}
          onClick={() => setActiveSection('brazilian')}
        >
          Brasileiros ({brazilianProducts?.length || 0})
        </Button>
        <Button 
          variant={activeSection === 'european' ? 'default' : 'outline'}
          onClick={() => setActiveSection('european')}
        >
          Europeus ({europeanProducts?.length || 0})
        </Button>
      </div>

      {/* Seção de produtos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{getSectionTitle()}</span>
            <span className="text-sm font-normal text-muted-foreground">
              Página {currentPage} de {totalPages} • {productsToShow?.length || 0} produtos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentProducts?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? 'Nenhum produto encontrado.' : 'Nenhum produto disponível nesta seção.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts?.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // Mostrar apenas algumas páginas para não sobrecarregar a UI
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 3 ||
                        page === currentPage + 3
                      ) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
