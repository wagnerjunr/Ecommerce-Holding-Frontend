import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useSearchProducts } from "@/hooks/Products/useSearchProducts"
import { SearchProductItem } from "./SearchProductItem"
import type { Product } from "@/types"

interface ProductSearchPopoverProps {
  placeholder?: string
  className?: string
}

export const ProductSearchPopover = ({ 
  placeholder = "Procurar por Produto", 
  className = "" 
}: ProductSearchPopoverProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { data: products, isLoading } = useSearchProducts(debouncedSearchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (searchTerm.trim().length > 0 && isFocused) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [searchTerm, isFocused])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleProductClick = (product: Product) => {
    window.location.href = `/product/${product.provider}/${product.id}`
    setIsOpen(false)
    setSearchTerm("")
    setDebouncedSearchTerm("")
    setIsFocused(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    if (searchTerm.trim().length > 0) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsFocused(false)
        setIsOpen(false)
      }
    }, 150)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-[400px] overflow-y-auto">
          <div className="p-2">
            {isLoading && debouncedSearchTerm && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-sm text-gray-500">Buscando...</span>
              </div>
            )}

            {!isLoading && debouncedSearchTerm && products && products.length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">Nenhum produto encontrado</p>
              </div>
            )}

            {!isLoading && products && products.length > 0 && (
              <>
                <div className="text-xs text-gray-500 mb-2 px-2">
                  {products.length} resultado{products.length !== 1 ? 's' : ''}
                </div>
                <div className="space-y-1">
                  {products.slice(0, 8).map((product) => (
                    <SearchProductItem
                      key={`${product.provider}-${product.id}`}
                      product={product}
                      onProductClick={handleProductClick}
                    />
                  ))}
                  {products.length > 8 && (
                    <div className="text-xs text-gray-500 text-center py-2">
                      +{products.length - 8} produtos a mais...
                    </div>
                  )}
                </div>
              </>
            )}

            {!debouncedSearchTerm && (
              <div className="text-center py-6">
                <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Digite para pesquisar</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}