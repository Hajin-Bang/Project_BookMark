import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderAPI } from "../api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => cancelOrderAPI(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
    onError: (error) => {
      console.error("주문 취소 중 오류 발생", error);
    },
  });
};
