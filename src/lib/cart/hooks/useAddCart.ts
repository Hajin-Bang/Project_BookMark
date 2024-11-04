import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartAPI } from "../api";
import { Product } from "@/lib/product/types";
import { CartItem } from "../types";
import { QUERY_KEYS } from "@/lib/queryKeys";

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<CartItem, Error, Product>({
    mutationFn: (product) => addCartAPI(product, user!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
    onError: (error) => {
      console.error("장바구니 추가 중 에러 발생", error);
    },
  });
};
