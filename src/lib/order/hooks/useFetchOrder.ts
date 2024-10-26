import { useAuthStore } from "@/store/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersAPI } from "../api";

export const useFetchOrder = ({ isSeller = false }: { isSeller?: boolean }) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: [isSeller ? "sellerOrders" : "orders", user?.uid],
    queryFn: () => {
      if (!user?.uid) {
        throw new Error("로그인이 필요합니다.");
      }

      return fetchOrdersAPI({
        userId: !isSeller ? user.uid : undefined,
        sellerId: isSeller ? user.uid : undefined,
      });
    },
    enabled: !!user,
  });
};
