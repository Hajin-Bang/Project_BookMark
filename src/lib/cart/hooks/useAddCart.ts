import { useAuthStore } from "@/store/auth/useAuthStore";
import { CartItem, useCartStore } from "@/store/cart/useCartStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartAPI } from "../api";
import { Product } from "@/lib/product/types";

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const addCartItem = useCartStore((state) => state.addCart);
  const { user } = useAuthStore();

  return useMutation<CartItem, Error, Product>({
    mutationFn: (product) => addCartAPI(product, user!),
    onSuccess: (newCartItem) => {
      addCartItem(newCartItem);
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error) => {
      console.error("장바구니 추가 중 에러 발생", error);
    },
  });
};
