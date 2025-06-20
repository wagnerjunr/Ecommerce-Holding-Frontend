import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import api from "@/services/api/api";
import type { Address } from "@/types";

export const useGetUserAddresses = () => {
  const getUserAddressesFn = async () => {
    try {
      const response = await api.get(`/address`);
      return response.data as Address[];
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Erro!", {
          description:
            error.response?.data.message || "Erro ao carregar endereços.",
          action: {
            label: "OK",
            onClick: () => toast.dismiss(),
          },
        });
      }
      throw error;
    }
  };

  return useQuery({
    queryKey: ["UserAddresses"],
    queryFn: getUserAddressesFn,
  });
};
