import api from '@/services/api/api'
import type { Product } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetProductById = (id: string, provider: string) => {
  const getProductByIdFn = async () => {
    const response = await api.get(`/products/${provider}/${id}`)
    return response.data as Product
  }

  return useQuery({
    queryKey: ['getProductById'],
    queryFn: getProductByIdFn,
  })
}
