import { Card, CardDescription, CardTitle } from "../ui/card";

interface OrderListItem {
  productId: string;
  productImage: string[];
  productName: string;
  productPrice: number;
  quantity: number;
  sellerName: string;
}

interface OrderProps {
  orderId: string;
  items: OrderListItem[];
  totalAmount: number;
  createdAt: string;
  status: string;
}

const OrderHistoryCard = ({ order }: { order: OrderProps }) => {
  const totalQuantity = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Card className="p-4 mb-4">
      <CardTitle className="text-lg font-semibold">
        주문 번호: {order.orderId}
      </CardTitle>
      <CardDescription className="text-sm">
        상품 {order.items[0].productName} 외 {order.items.length - 1}개
      </CardDescription>
      <CardDescription className="text-sm">
        총 수량: {totalQuantity}개
      </CardDescription>
      <CardDescription className="text-sm">
        총 금액: {order.totalAmount.toLocaleString()}원
      </CardDescription>
      <CardDescription className="text-sm">
        주문 상태: {order.status}
      </CardDescription>
    </Card>
  );
};

export default OrderHistoryCard;
