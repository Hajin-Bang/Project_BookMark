import { useQuery } from "@tanstack/react-query";
import { fetchProductDetailsAPI } from "../api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export const useFetchProductDetails = (productId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, productId],
    queryFn: () => fetchProductDetailsAPI(productId),
    enabled: !!productId,
  });
};
