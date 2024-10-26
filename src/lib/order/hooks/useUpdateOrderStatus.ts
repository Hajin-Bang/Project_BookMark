import { useState } from "react";
import { updateOrderStatusAPI } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateOrderStatusAPI(orderId, newStatus);
      queryClient.invalidateQueries({ queryKey: ["sellerOrders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (err) {
      console.error("주문 상태 업데이트 오류:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateOrderStatus, isLoading, error };
};
