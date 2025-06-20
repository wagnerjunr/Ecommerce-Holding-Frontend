import api from "@/services/api/api";
import type { Users } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersById = (id: string) => {
  const getUserByIdFn = async () => {
    const response = await api.get(`/users/${id}`);
    return response.data as Users;
  };

  return useQuery({
    queryKey: ["getUserById"],
    queryFn: getUserByIdFn,
  });
};
