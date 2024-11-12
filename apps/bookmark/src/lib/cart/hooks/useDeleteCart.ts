import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartAPI } from "../api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<void, Error, string>({
    mutationFn: async (productId: string) => {
      await deleteCartAPI(productId, user?.uid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART_ITEMS, user?.uid],
      });
    },
    onError: (error) => {
      console.error("장바구니 상품 삭제 중 에러 발생", error);
    },
  });
};
