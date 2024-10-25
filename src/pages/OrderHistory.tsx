import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import OrderHistoryCard from "@/components/order/OrderHistoryCard";
import { useFetchOrder } from "@/lib/order/hooks/useFetchOrder";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useFetchOrder();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;

  console.log("주문 데이터:", orders);

  if (!orders || orders.length === 0) {
    return <div>구매 내역이 없습니다.</div>;
  }

  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center  mt-12 px-40">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          구매 내역
        </h2>
        {orders.map((order) => (
          <div
            key={order.orderId}
            onClick={() => navigate(`/orders/${order.orderId}`)}
          >
            <OrderHistoryCard order={order} />
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default OrderHistory;
