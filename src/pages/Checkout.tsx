import { authStatusType, Layout } from "@/components/common/components/Layout";
import OrderForm from "@/components/order/OrderForm";
import CheckoutItemList from "@/components/order/CheckoutItemList";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OrderItem } from "@/lib/order/types";

const Checkout = () => {
  const location = useLocation();
  const { items } = location.state as { items: OrderItem[] };
  const { setOrderItems, totalAmount } = useOrderStore();

  useEffect(() => {
    setOrderItems(items);
  }, [items, setOrderItems]);

  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          주문 정보
        </h2>
        <CheckoutItemList items={items} />
        <div className="w-full flex justify-end">
          <span className="text-lg text-right font-semibold text-gray-700 mr-3">
            결제 금액: {totalAmount.toLocaleString()}원
          </span>
        </div>
        <OrderForm />
      </main>
    </Layout>
  );
};

export default Checkout;
