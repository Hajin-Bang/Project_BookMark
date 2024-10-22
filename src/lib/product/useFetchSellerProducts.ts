import { useInfiniteQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fetchProducts } from "./api/fetchProducts";

export const useFetchSellerProducts = (sellerId: string) => {
  return useInfiniteQuery({
    queryKey: ["products", sellerId],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData> | null;
    }) => {
      return fetchProducts({ sellerId }, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage?.lastVisible || undefined,
    enabled: !!sellerId,
    initialPageParam: null,
  });
};
