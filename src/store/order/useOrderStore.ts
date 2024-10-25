import { create } from "zustand";
import { OrderItem } from "@/lib/order/types";

interface OrderState {
  orderItems: OrderItem[];
  totalAmount: number;
  setOrderItems: (items: OrderItem[]) => void;
  calculateTotalAmount: () => void;
  clearOrder: () => void;
}

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
