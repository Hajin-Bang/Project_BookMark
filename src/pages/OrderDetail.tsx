import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useCancelOrder } from "@/lib/order/hooks/useCancelOrder";
import { useFetchOrder } from "@/lib/order/hooks/useFetchOrder";
import { OrderItem } from "@/lib/order/types";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: orders, isLoading, error } = useFetchOrder({ isSeller: false });
  const { mutate: cancelOrder } = useCancelOrder();
  const navigate = useNavigate();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;
  console.log(orders);

  const order = orders?.find((order) => order.orderId === orderId);

  if (!order) return <div>해당 주문을 찾을 수 없습니다.</div>;

  const handleCancelOrder = () => {
    if (orderId) {
      cancelOrder(orderId, {
        onSuccess: () => {
          alert("주문이 취소되었습니다.");
          navigate("/orders");
        },
        onError: (error) => {
          console.error("주문 취소 중 오류 발생:", error);
          alert("주문 취소에 실패하였습니다.");
        },
      });
    }
  };

  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center mt-12 px-40">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          주문 상세 정보
        </h2>
        <div className="w-full flex justify-center mt-6">
          <div className="w-1/3 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>주문 번호:</strong> {order.orderId}
            </p>
            <p className="text-sm text-gray-600">
              <strong>주문 날짜:</strong>{" "}
              {order.createdAt && order.createdAt.toDate
                ? order.createdAt.toDate().toLocaleString()
                : "날짜 정보 없음"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>총 금액:</strong> {order.totalAmount.toLocaleString()}원
            </p>
            <p className="text-sm text-gray-600">
              <strong>주문 상태:</strong> {order.status}
            </p>
          </div>
        </div>
        <div className="w-full mt-8">
          <ul>
            {(order.items || []).map((item: OrderItem) => (
              <li key={item.productId} className="mb-4">
                <Card className="flex gap-4 items-center p-4">
                  {item.productImage && (
                    <img
                      src={item.productImage[0]}
                      alt={item.productName}
                      className="w-20 h-20 object-cover"
                    />
                  )}
                  <div className="flex flex-col items-start">
                    <CardTitle className="text-lg font-medium">
                      {item.productName}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      수량: {item.quantity}개
                    </CardDescription>
                    <span className="text-sm font-semibold text-gray-700">
                      {(item.productPrice * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          {order.status !== "주문 취소" && (
            <Button className="mt-4 bg-red-400" onClick={handleCancelOrder}>
              주문 취소하기
            </Button>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default OrderDetail;
