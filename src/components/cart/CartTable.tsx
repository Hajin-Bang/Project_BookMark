import { useDeleteCart } from "@/lib/cart/hooks/useDeleteCart";
import { useFetchCart } from "@/lib/cart/hooks/useFetchCart";
import { useUpdateCartQuantity } from "@/lib/cart/hooks/useUpdateCart";

const CartTable = () => {
  const { data: cartItems, isLoading, error } = useFetchCart();
  const { mutate: removeFromCart } = useDeleteCart();
  const { mutate: updateCartQuantity } = useUpdateCartQuantity();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching cart items: {error.message}</p>;

  if (!cartItems || cartItems.length === 0)
    return <p>장바구니가 비어 있습니다.</p>;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity({ productId, newQuantity });
  };

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
          {cartItems.map((item, index) => (
            <tr key={`${item.productId}-${index}`} className="border-b">
              <td className="p-4 whitespace-nowrap">{item.productName}</td>
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
