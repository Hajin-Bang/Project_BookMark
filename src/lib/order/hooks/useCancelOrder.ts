import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderAPI } from "../api";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => cancelOrderAPI(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("주문 취소 중 오류 발생", error);
    },
  });
};
