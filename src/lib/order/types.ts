export interface OrderItem {
  productId: string;
  productImage: string[];
  productName: string;
  productPrice: number;
  quantity: number;
  sellerName: string;
}

export interface CreateOrderParams {
  userId: string;
  orderItems: OrderItem[];
  totalAmount: number;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  status: string;
}
