import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartQuantityAPI } from "../api";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation<void, Error, { productId: string; newQuantity: number }>({
    mutationFn: ({ productId, newQuantity }) =>
      updateCartQuantityAPI(productId, user!, newQuantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems", user?.uid] });
    },
    onError: (error) => {
      console.error("장바구니 수량 업데이트 중 에러 발생:", error);
    },
  });
};
