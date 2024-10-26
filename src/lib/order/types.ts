export interface OrderItem {
  productId: string;
  productImage: string[];
  productName: string;
  productPrice: number;
  quantity: number;
  sellerName: string;
  sellerId: string;
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

export enum OrderStatus {
  ORDER_COMPLETE = "주문완료",
  AWAITING_SHIPMENT = "발송대기",
  SHIPPING_STARTED = "발송시작",
  ORDER_CANCELLED = "주문취소",
}
