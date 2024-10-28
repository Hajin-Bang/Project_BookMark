import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAPI } from "../api";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // toast
    },
    onError: (error) => {
      console.error("상품 업데이트 중 에러 발생:", error);
      // toast
    },
  });
};
