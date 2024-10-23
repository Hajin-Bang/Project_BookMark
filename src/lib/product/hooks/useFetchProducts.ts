import { useInfiniteQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fetchProducts } from "../api";

export const useFetchProducts = (options: {
  category?: string;
  sellerId?: string;
  productId?: string;
  order?: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["products", options],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData> | null;
    }) => {
      return fetchProducts(options, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage?.lastVisible || undefined,
    enabled: !!(options.category || options.sellerId || options.productId),
    initialPageParam: null,
  });
};
