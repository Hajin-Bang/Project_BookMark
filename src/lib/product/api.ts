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
  OrderByDirection,
} from "firebase/firestore";

export const fetchProducts = async (
  options: {
    category?: string;
    order?: string;
    sellerId?: string;
    productId?: string;
    limit?: number;
  },
  pageParam: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  products: Product[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const productRef = collection(db, "products");

    const [orderField, orderDirection] = options.order?.split("/") || [
      "createdAt",
      "desc",
    ];

    let q = query(
      productRef,
      orderBy(orderField, orderDirection as OrderByDirection)
    );

    // 카테고리 필터
    if (options.category) {
      q = query(q, where("productCategory", "==", options.category));
    }

    // 판매자 필터
    if (options.sellerId) {
      q = query(q, where("sellerId", "==", options.sellerId));
    }

    // 특정 상품 ID
    if (options.productId) {
      q = query(q, where("productId", "==", options.productId));
    }

    // 페이지네이션
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    // 개수 제한
    if (options.limit) {
      q = query(q, limit(options.limit));
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

    return { products, lastVisible };
  } catch (error) {
    console.error("Firestore 쿼리 중 오류 발생:", error);
    return { products: [], lastVisible: null };
  }
};
