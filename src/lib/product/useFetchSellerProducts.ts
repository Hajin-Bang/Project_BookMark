import { db } from "@/firebase";
import { Product } from "@/store/product/useProductStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";

const fetchSellerProducts = async (
  sellerId: string,
  pageParam: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  products: Product[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const productRef = collection(db, "products");
    let q = query(
      productRef,
      where("sellerId", "==", sellerId),
      orderBy("createdAt", "desc"),
      limit(8)
    );

    if (pageParam) {
      q = query(
        productRef,
        where("sellerId", "==", sellerId),
        orderBy("createdAt", "desc"),
        startAfter(pageParam),
        limit(8)
      );
    }

    const querySnapshot = await getDocs(q);
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    const products: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Product;
      const createdAt = (data.createdAt as Timestamp)?.toDate();
      const updatedAt = (data.updatedAt as Timestamp)?.toDate();

      return {
        ...data,
        productId: doc.id,
        createdAt,
        updatedAt,
      } as Product;
    });

    console.log("판매중인 상품:", products);
    return { products, lastVisible };
  } catch (error) {
    console.error("Firestore 쿼리 중 오류 발생:", error);
    return { products: [], lastVisible: null };
  }
};

export const useFetchSellerProducts = (sellerId: string) => {
  return useInfiniteQuery({
    queryKey: ["products", sellerId],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData> | null;
    }) => {
      return fetchSellerProducts(sellerId, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage?.lastVisible || undefined,
    enabled: !!sellerId,
    initialPageParam: null,
  });
};
