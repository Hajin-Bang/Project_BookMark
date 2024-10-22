import { db } from "@/firebase";
import { Product } from "@/store/product/useProductStore";
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

export const fetchProducts = async (
  options: { category?: string; sellerId?: string; limit?: number },
  pageParam: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  products: Product[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  console.log("fetchProducts 호출됨", options);
  try {
    const productRef = collection(db, "products");
    let q = query(productRef, orderBy("createdAt", "desc"));

    // 카테고리 필터 적용
    if (options.category) {
      q = query(q, where("productCategory", "==", options.category));
    }

    // 판매자 필터 적용
    if (options.sellerId) {
      q = query(q, where("sellerId", "==", options.sellerId));
    }

    // 페이지네이션 적용
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    // 가져올 개수 제한 적용
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const querySnapshot = await getDocs(q);
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    const products: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Product;
      console.log(data);
      const createdAt = (data.createdAt as Timestamp)?.toDate();
      const updatedAt = (data.updatedAt as Timestamp)?.toDate();

      return {
        ...data,
        productId: doc.id,
        createdAt,
        updatedAt,
      } as Product;
    });

    return { products, lastVisible };
  } catch (error) {
    console.error("Firestore 쿼리 중 오류 발생:", error);
    return { products: [], lastVisible: null };
  }
};
