import { db } from "@/firebase";
import { Product } from "@/store/product/useProductStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const addProductAPI = async (product: Product): Promise<Product> => {
    return await runTransaction(db, async (transaction) => {
      const productRef = collection(db, "products");
      const newDocRef = doc(productRef);

      const newProductData = {
        ...product,
        productId: newDocRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      transaction.set(newDocRef, newProductData);
      return newProductData;
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
