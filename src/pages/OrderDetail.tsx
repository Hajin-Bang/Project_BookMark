import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
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
        <div className="w-full p-4">
          <p>
            <strong>주문 번호:</strong> {order.orderId}
          </p>
          <p>
            <strong>주문 상태:</strong> {order.status}
          </p>
          <p>
            <strong>총 금액:</strong> {order.totalAmount.toLocaleString()}원
          </p>
          <p>
            <strong>주문 날짜:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <ul>
            {(order.items || []).map((item: OrderItem) => (
              <li key={item.productId}>
                <p>상품 이름: {item.productName}</p>
                <p>수량: {item.quantity}</p>
                <p>판매자: {item.sellerName}</p>
                <p>가격: {item.productPrice.toLocaleString()}원</p>
              </li>
            ))}
          </ul>

          {order.status !== "주문 취소" && (
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={handleCancelOrder}
            >
              주문 취소하기
            </button>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default OrderDetail;
