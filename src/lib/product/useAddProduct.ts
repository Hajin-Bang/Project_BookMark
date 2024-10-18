import { db } from "@/firebase";
import { Product } from "@/store/product/useProductStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const addProductAPI = async (product: Product): Promise<Product> => {
    return await runTransaction(db, async (transaction) => {
      const productRef = collection(db, "products");
      const q = query(productRef, orderBy("productId", "desc"), limit(1)); // 최신 ID 가져오기
      const querySnapshot = await getDocs(q);

      // 가장 큰 ID를 찾아서 그 다음 ID 생성
      let maxId = 0;
      if (!querySnapshot.empty) {
        maxId = parseInt(querySnapshot.docs[0].data().productId);
      }

      const newId = maxId + 1; // 새로운 상품 ID 생성

      const newProductData = {
        ...product,
        productId: String(newId), // 새로운 상품 ID 할당
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // firestore에 새로운 상품 등록
      const newDocRef = doc(productRef, newId.toString());
      transaction.set(newDocRef, newProductData);

      return {
        ...newProductData,
        productId: String(newId),
      };
    });
  };

  return useMutation<Product, Error, Product>({
    mutationFn: addProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("상품 등록 중 에러 발생:", error);
    },
  });
};
