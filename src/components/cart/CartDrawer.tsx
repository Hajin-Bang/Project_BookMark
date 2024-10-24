import { Button } from "../ui/button";
import CartTable from "./CartTable";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
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
        <CartTable />
      </div>
      <div className="flex justify-end mr-4">
        <Button className="w-1/3">구매하기</Button>
      </div>
    </div>
  );
};

export default CartDrawer;
