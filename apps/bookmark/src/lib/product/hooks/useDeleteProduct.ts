import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { deleteProductAPI } from "../api";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: (productId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCT, productId],
      });
      // toast
    },
    onError: (error) => {
      console.error("상품 삭제 중 에러 발생:", error);
      // toast
    },
  });
};
