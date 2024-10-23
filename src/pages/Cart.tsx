import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";

const Cart = () => {
  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <NavigationBar />
    </Layout>
  );
};

export default Cart;
