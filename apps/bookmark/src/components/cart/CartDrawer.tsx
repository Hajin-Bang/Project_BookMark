import { useNavigate } from "react-router-dom";
import CartTable from "./CartTable";
import { useFetchCart } from "@/lib/cart/hooks/useFetchCart";
import Button from "@design-system/button/Button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const navigate = useNavigate();
  const { cartItems, totalQuantity, isLoading, error } = useFetchCart();

  const handleBuyNow = () => {
    if (cartItems && cartItems.length > 0) {
      navigate("/checkout", { state: { items: cartItems } });
    }
  };

  return (
    <div
      className={`fixed top-[64px] right-0 h-full w-[50%] bg-white z-30 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative pt-12">
        <button
          onClick={onClose}
          className="absolute top-4 right-10 text-2xl text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold">장바구니</h2>
      </div>
      <div className="overflow-y-auto max-h-[75vh]">
        <CartTable cartItems={cartItems} isLoading={isLoading} error={error} />
      </div>
      {totalQuantity > 0 && (
        <div className="flex justify-end mr-4 mt-4">
          <Button onClick={handleBuyNow} priority="dark">
            구매하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
