import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api/fetchProducts";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const useFetchCategoryProducts = (
  category: string,
  order: string,
  limitCount: number = 4
) => {
  return useInfiniteQuery({
    queryKey: ["products", category, order],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData> | null;
    }) => {
      return fetchProducts({ category, order, limit: limitCount }, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage?.lastVisible || undefined,
    enabled: !!category,
    initialPageParam: null,
  });
};
