import api from '@/services/api/api'
import type { Order } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetAllOrdersByUserId = () => {
  const GetAllOrdersByUserIdFn = async () => {
    const response = await api.get(`/orders`)
    return response.data as Order[]
  }

  return useQuery({
    queryKey: ['GetAllOrdersByUserId'],
    queryFn: GetAllOrdersByUserIdFn,
  })
}
