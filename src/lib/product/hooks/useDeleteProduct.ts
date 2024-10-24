import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useProductStore } from "@/store/product/useProductStore";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  return useMutation({
    mutationFn: async (productId: string) => {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      return productId;
    },
    onSuccess: (productId) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      deleteProduct(productId);
    },
    onError: (error) => {
      console.error("상품 삭제 중 에러 발생:", error);
    },
  });
};
