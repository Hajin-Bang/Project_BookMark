import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import OrderTableRow from "@/components/order/OrderTableRow";
import { useFetchOrder } from "@/lib/order/hooks/useFetchOrder";

const SellerHistory = () => {
  const { data: orders = [] } = useFetchOrder({ isSeller: true });

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center  mt-12 px-20">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          판매 내역
        </h2>
        <table className="min-w-full table-auto border border-slate-300 mt-12 ">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-4 text-left w-1/6 pl-10">주문 번호</th>
              <th className="p-4 pl-20 text-left w-1/3">상품 이름</th>
              <th className="p-4 text-left w-1/6 pl-10">수량</th>
              <th className="p-4 text-left w-1/6 pl-10">총 금액</th>
              <th className="p-4 text-left w-1/6 pl-10">주문 상태</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderTableRow
                key={order.orderId}
                order={order}
                isSeller={true}
              />
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};

export default SellerHistory;
