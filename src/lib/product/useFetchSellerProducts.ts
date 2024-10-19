import { db } from "@/firebase";
import { Product } from "@/store/product/useProductStore";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

const fetchSellerProducts = async (sellerId: string): Promise<Product[]> => {
  console.log("Seller ID", sellerId);

  try {
    const productRef = collection(db, "products");
    const q = query(
      productRef,
      where("sellerId", "==", sellerId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const products: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
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
    return products;
  } catch (error) {
    console.error("Firestore 쿼리 중 오류 발생:", error);
    return [];
  }
};

export const useFetchSellerProducts = (sellerId: string) => {
  return useQuery({
    queryKey: ["products", sellerId],
    queryFn: () => fetchSellerProducts(sellerId),
    enabled: !!sellerId,
  });
};
