import { Product } from "@/lib/product/types";
import { create } from "zustand";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  addCart: (product: Product) => void;
  deleteCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  setTotalQuantity: (total: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  totalQuantity: 0,

  addCart: (product: Product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),
  deleteCart: (productId: string) =>
    set((state) => {
      return {
        cartItems: state.cartItems.filter(
          (item) => item.productId !== productId
        ),
      };
    }),

  updateQuantity: (productId: string, newQuantity: number) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ),
    })),

  setTotalQuantity: (total: number) => set({ totalQuantity: total }),
}));
