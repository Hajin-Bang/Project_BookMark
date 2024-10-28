import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrderParams } from "../types";
import { addOrderAPI } from "../api";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateOrderParams>({
    mutationFn: addOrderAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // toast
    },
    onError: (error) => {
      console.error("주문 생성 중 에러 발생", error);
      // toast
    },
  });
};
