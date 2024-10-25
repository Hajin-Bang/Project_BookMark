export interface OrderItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string[];
}

export interface OrderState {
  orderItems: OrderItem[];
  totalAmount: number;
  setOrderItems: (items: OrderItem[]) => void;
  calculateTotalAmount: () => void;
  clearOrder: () => void;
}
