import { authStatusType, Layout } from "@/components/common/components/Layout";
import OrderForm from "@/components/order/OrderForm";
import OrderItemList from "@/components/order/OrderItemList";
import { useLocation } from "react-router-dom";

interface OrderItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string[];
}

const Checkout = () => {
  const location = useLocation();
  const { items } = location.state as { items: OrderItem[] };

  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          주문 정보
        </h2>
        <OrderItemList items={items} />
        <OrderForm />
      </main>
    </Layout>
  );
};

export default Checkout;
