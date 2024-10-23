import { useCartStore } from "@/store/cart/useCartStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const deleteCartItem = useCartStore((state) => state.deleteCart);

  return useMutation<void, Error, string>({
    mutationFn: async (productId: string) => {
      deleteCartItem(productId);
      return Promise.resolve();
    },
    onSuccess: (_, productId) => {
      deleteCartItem(productId);
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error) => {
      console.error("장바구니 상품 삭제 중 에러 발생", error);
    },
  });
};
