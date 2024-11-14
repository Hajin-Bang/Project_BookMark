import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { Card } from "@design-system/card/components/Card";
import { CardTitle } from "@design-system/card/components/CardTitle";
import { CardContent } from "@design-system/card/components/CardContent";
import { useCancelOrder } from "@/lib/order/hooks/useCancelOrder";
import { useFetchOrder } from "@/lib/order/hooks/useFetchOrder";
import { OrderItem } from "@/lib/order/types";
import Button from "@design-system/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import CancelOrderModal from "@/components/order/CancelOrderModal";
import { useToast } from "@design-system/toast/ToastContext";
import { useModalState } from "@/hooks/useModalState";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: orders, isLoading, error } = useFetchOrder({ isSeller: false });
  const { mutate: cancelOrder } = useCancelOrder();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModalState();
  const { addToast } = useToast();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;
  const order = orders?.find((order) => order.orderId === orderId);
  if (!order) return <div>해당 주문을 찾을 수 없습니다.</div>;

  const handleCancelOrder = () => {
    if (orderId) {
      cancelOrder(orderId, {
        onSuccess: () => {
          navigate("/orders");
          addToast({
            title: "주문이 취소되었습니다.",
            variant: "success",
            duration: 3000,
          });
        },
        onError: (error) => {
          console.error("주문 취소 중 오류 발생:", error);
          addToast({
            title: "주문이 취소 중 오류가 발생했습니다.",
            variant: "error",
            duration: 3000,
          });
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
                <Card direction="row">
                  {item.productImage && (
                    <img
                      src={item.productImage[0]}
                      alt={item.productName}
                      className="w-20 h-20 object-cover"
                    />
                  )}
                  <div className="flex flex-col items-start">
                    <CardTitle className="text-md">
                      {item.productName}
                    </CardTitle>
                    <CardContent className="text-sm">
                      수량: {item.quantity}개
                    </CardContent>
                    <span className="text-sm font-semibold text-gray-700">
                      {(item.productPrice * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          {order.status !== "주문 취소" && (
            <Button className="mt-4" priority="important" onClick={openModal}>
              주문 취소하기
            </Button>
          )}
        </div>
      </main>

      <CancelOrderModal
        open={isOpen}
        onOpenChange={closeModal}
        onConfirmCancel={handleCancelOrder}
      />
    </Layout>
  );
};

export default OrderDetail;
