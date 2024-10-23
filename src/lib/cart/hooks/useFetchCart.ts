import { useAuthStore } from "@/store/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "../api";

export const useFetchCart = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["cartItems", user?.uid],
    queryFn: () => {
      return fetchCartItems(user!);
    },
    enabled: !!user,
  });
};
