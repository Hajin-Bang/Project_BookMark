import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductAPI } from "../api";
import { Product } from "../types";
import { QUERY_KEYS } from "@/lib/queryKeys";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: addProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      // toast
    },
    onError: (error) => {
      console.error("상품 등록 중 에러 발생:", error);
      // toast
    },
  });
};
