import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import OrderTableRow from "@/components/order/OrderTableRow";
import { useFetchOrder } from "@/lib/order/hooks/useFetchOrder";

const OrderHistory = () => {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useFetchOrder({ isSeller: false });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;

  if (!orders || orders.length === 0) {
    return <div>구매 내역이 없습니다.</div>;
  }

  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center  mt-12 px-20">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          구매 내역
        </h2>
        <table className="min-w-full table-auto border border-slate-300 mt-12 ">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-4 text-left w-1/6 pl-10">주문 번호</th>
              <th className="p-4 pl-20 text-left w-1/3">상품 이름</th>
              <th className="p-4 text-center w-1/6">수량</th>
              <th className="p-4 text-center w-1/6">총 금액</th>
              <th className="p-4 text-center w-1/6">주문 상태</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderTableRow order={order} isSeller={false} />
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};

export default OrderHistory;
