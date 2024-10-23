import { db } from "@/firebase";
import { Product } from "@/store/product/useProductStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Partial<Product>) => {
      const productRef = doc(db, "products", product.productId!);

      await updateDoc(productRef, {
        ...(product.productName && { productName: product.productName }),
        ...(product.productAuthor && { productAuthor: product.productAuthor }),
        ...(product.productPrice && { productPrice: product.productPrice }),
        ...(product.productQuantity && {
          productQuantity: product.productQuantity,
        }),
        ...(product.productDescription && {
          productDescription: product.productDescription,
        }),
        ...(product.productCategory && {
          productCategory: product.productCategory,
        }),
        ...(product.productImage && { productImage: product.productImage }),
        updatedAt: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("상품 업데이트 중 에러 발생:", error);
    },
  });
};
