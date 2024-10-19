import { FieldValue } from "firebase/firestore";
import { create } from "zustand";

export interface Product {
  productId: string;
  sellerId: string;
  productName: string;
  productAuthor: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: string;
  productImage: string[];
  createdAt: string | FieldValue | Date; // FieldValue 타입 허용
  updatedAt: string | FieldValue | Date;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],

  addProduct: (product: Product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  deleteProduct: (productId: string) =>
    set((state) => ({
      products: state.products.filter(
        (product) => product.productId !== productId
      ),
    })),
}));
