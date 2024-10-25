import { create } from "zustand";
import { OrderState } from "./types";

export const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],
  totalAmount: 0,

  setOrderItems: (items) => {
    set({ orderItems: items });
    set((state) => ({
      totalAmount: state.orderItems.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
      ),
    }));
  },

  calculateTotalAmount: () =>
    set((state) => ({
      totalAmount: state.orderItems.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
      ),
    })),

  clearOrder: () => set({ orderItems: [], totalAmount: 0 }),
}));
