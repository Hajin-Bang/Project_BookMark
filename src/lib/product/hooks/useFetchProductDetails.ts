import { useQuery } from "@tanstack/react-query";
import { fetchProductDetailsAPI } from "../api";

export const useFetchProductDetails = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetailsAPI(productId),
    enabled: !!productId,
  });
};
