import { useDeleteCart } from "@/lib/cart/hooks/useDeleteCart";
import { useFetchCart } from "@/lib/cart/hooks/useFetchCart";
import { useUpdateCartQuantity } from "@/lib/cart/hooks/useUpdateCart";
import { CartItem } from "@/lib/cart/types";

interface CartTableProps {
  cartItems: CartItem[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const CartTable = ({ cartItems, isLoading, error }: CartTableProps) => {
  const { mutate: removeFromCart } = useDeleteCart();
  const { mutate: updateCartQuantity } = useUpdateCartQuantity();
  const { totalQuantity, totalPrice } = useFetchCart();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (!cartItems || cartItems.length === 0)
    return <p className="m-20">장바구니가 비어있습니다.</p>;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity({ productId, newQuantity });
  };

  return (
    <div className="overflow-x-auto mt-7">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left w-1/2 md:w-1/3 pl-8">도서</th>
            <th className="p-4 text-center w-1/6">수량</th>
            <th className="p-4 text-center w-1/6">가격</th>
            <th className="p-4 text-center w-1/6">삭제</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item, index) => (
            <tr key={`${item.productId}-${index}`} className="border-b">
              <td className="p-4 whitespace-nowrap">
                <div className="flex items-center">
                  {item.productImage && (
                    <img
                      src={item.productImage[0]}
                      alt={item.productName}
                      className="w-16 h-16 object-cover mr-4"
                    />
                  )}
                  <span>{item.productName}</span>
                </div>
              </td>
              <td className="p-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, Number(e.target.value))
                  }
                  className="w-16 text-center border border-gray-300 rounded-md p-1"
                />
              </td>
              <td className="p-4 whitespace-nowrap">
                {item.productPrice.toLocaleString()}원
              </td>
              <td className="p-4">
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-gray-500 hover:text-gray-700 transition-colors text-2xl"
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end m-6 gap-20">
        <div className="flex flex-col items-center gap-5">
          <p>총 수량</p>
          <p className="font-semibold">총 합계</p>
        </div>
        <div className="flex flex-col items-end gap-5">
          <p>{totalQuantity}개</p>
          <p className="font-semibold">{totalPrice.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
