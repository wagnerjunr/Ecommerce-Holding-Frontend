import api from '@/services/api/api'
import type { Product } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useSearchProducts = (searchTerm: string) => {
  const searchProductsFn = async () => {
    if (!searchTerm.trim()) {
      return []
    }
    const response = await api.get(`/products`)
    const products = response.data as Product[]
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.provider.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return useQuery({
    queryKey: ['searchProducts', searchTerm],
    queryFn: searchProductsFn,
    enabled: searchTerm.trim().length > 0,
    staleTime: 5 * 60 * 1000, 
  })
}