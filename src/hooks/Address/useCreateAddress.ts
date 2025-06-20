import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "@/services/api/api";
import type { Address } from "@/types";

export interface CreateAddressRequest {
  street: string;
  city: string;
  state: string;
  neighborhood: string;
  number: string;
  complement?: string;
  zipCode: string;
}
export const useCreateAddress = () => {
  const createAddressFn = async ({ data }: { data: CreateAddressRequest }) => {
    try {
      const response = await api.post("/address", data);
      toast.success("Sucesso", {
        description: response.data.message || "Endereço criado com sucesso!",
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });

      return response.data as Address;
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
      }
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["CreateAddress"],
    mutationFn: createAddressFn,
  });
};