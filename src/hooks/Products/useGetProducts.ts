import api from '@/services/api/api'
import type { Product } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
  const getProductsFn = async () => {
    const response = await api.get(`/products`)
    return response.data as Product[]
  }

  return useQuery({
    queryKey: ['getProducts'],
    queryFn: getProductsFn,
  })
}
