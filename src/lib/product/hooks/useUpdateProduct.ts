import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAPI } from "../api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductAPI,
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCT, updatedProduct.productId],
      });

      // toast
    },
    onError: (error) => {
      console.error("상품 업데이트 중 에러 발생:", error);
      // toast
    },
  });
};
