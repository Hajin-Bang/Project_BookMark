import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { QUERY_KEYS } from "@/lib/queryKeys";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      return productId;
    },
    onSuccess: (productId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCT, productId],
      });
      // toast
    },
    onError: (error) => {
      console.error("상품 삭제 중 에러 발생:", error);
      // toast
    },
  });
};
