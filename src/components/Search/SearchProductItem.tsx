import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"

interface SearchProductItemProps {
  product: Product
  onProductClick: (product: Product) => void
}

export const SearchProductItem = ({ product, onProductClick }: SearchProductItemProps) => {
  const handleClick = () => {
    onProductClick(product)
  }

  const discountedPrice = product.discountValue 
    ? product.price * (1 - product.discountValue  / 100)
    : product.price

  return (
    <div 
      className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition-colors"
      onClick={handleClick}
    >
      {product.image && (
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">
          {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {product.provider}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-sm">
            R$ {discountedPrice}
          </span>
          {product.discountValue  && (
            <>
              <span className="text-xs text-gray-500 line-through">
                R$ {product.price}
              </span>
              <Badge variant="destructive" className="text-xs px-1 py-0">
                -{product.discountValue}%
              </Badge>
            </>
          )}
        </div>
      </div>
    </div>
  )
}