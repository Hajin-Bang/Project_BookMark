import { useDeleteCart } from "@/lib/cart/hooks/useDeleteCart";
import { useCartStore } from "@/store/cart/useCartStore";

const CartTable = () => {
  const { cartItems } = useCartStore();
  const { mutate: removeFromCart } = useDeleteCart();

  return (
    <div className="overflow-x-auto mt-7">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left w-1/2 md:w-1/3">도서</th>
            <th className="p-4 text-left w-1/6">수량</th>
            <th className="p-4 text-left w-1/6">가격</th>
            <th className="p-4 text-left w-1/6">삭제</th>
          </tr>
        </thead>

        {/* 테이블 바디 */}
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId} className="border-b">
              <td className="p-4 whitespace-nowrap">{item.productName}</td>
              <td className="p-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={() => {}}
                  className="w-16 text-center border border-gray-300 rounded-md p-1"
                />
              </td>
              <td className="p-4 whitespace-nowrap">
                {item.productPrice.toLocaleString()}원
              </td>
              {/* 삭제 버튼 */}
              <td className="p-4">
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
