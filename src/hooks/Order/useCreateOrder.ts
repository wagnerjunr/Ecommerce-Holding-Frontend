import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "@/services/api/api";
import type { OrderItem } from "@/types";

export interface CreateOrderRequest {
  addressId: string;
  total: number;
  items: OrderItem[];
}

type ResponseData = {
    id: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
    addressId: string;
    userId: string;
};

export const useCreateOrder = () => {
  const createOrderFn = async ({ data }: { data: CreateOrderRequest }) => {
    try {
      const response = await api.post("/orders", data);
      toast.success("Sucesso", {
        description: response.data.message || "Pedido criado com sucesso!",
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });

      return response.data as ResponseData;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Erro!", {
          description:
            error.response?.data.message || "Erro interno do servidor.",
          action: {
            label: "OK",
            onClick: () => toast.dismiss(),
          },
        });
      } else {
        toast.error("Erro!", {
          description: "Erro inesperado. Tente novamente.",
          action: {
            label: "OK",
            onClick: () => toast.dismiss(),
          },
        });
      }
      throw error;
    }
  };

  return useMutation({
    mutationFn: createOrderFn,
  });
};