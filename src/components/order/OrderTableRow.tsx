import { useUpdateOrderStatus } from "@/lib/order/hooks/useUpdateOrderStatus";
import { Order, OrderStatus } from "@/lib/order/types";
import { useNavigate } from "react-router-dom";

interface OrderTableRowProps {
  order: Order;
  isSeller: boolean;
}

const OrderTableRow = ({ order, isSeller }: OrderTableRowProps) => {
  const totalQuantity = (order.items || []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navigate = useNavigate();
  const { updateOrderStatus, isLoading, error } = useUpdateOrderStatus();

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    await updateOrderStatus(order.orderId, newStatus); // Firestore에 직접 업데이트
  };

  const handleRowClick = () => {
    navigate(`/orders/${order.orderId}`);
  };

  return (
    <tr
      className="border-b-2 border-gray-200 cursor-pointer hover:bg-slate-200"
      onClick={!isSeller ? handleRowClick : undefined}
    >
      <td className="pl-8 text-left whitespace-nowrap">{order.orderId}</td>
      <td className="pl-20 text-left whitespace-nowrap">
        <span>
          {order.items[0].productName}{" "}
          {order.items.length > 1 && ` 외 ${order.items.length - 1}권`}
        </span>
      </td>
      <td className="text-center">{totalQuantity}</td>
      <td className="text-center whitespace-nowrap">
        {order.totalAmount.toLocaleString()}원
      </td>
      <td className="p-4 text-center">
        {isSeller ? (
          <select
            value={order.status}
            onChange={handleStatusChange}
            disabled={isLoading}
            className="border border-gray-300 rounded-md p-1 text-center"
          >
            <option value={OrderStatus.ORDER_COMPLETE}>
              {OrderStatus.ORDER_COMPLETE}
            </option>
            <option value={OrderStatus.AWAITING_SHIPMENT}>
              {OrderStatus.AWAITING_SHIPMENT}
            </option>
            <option value={OrderStatus.SHIPPING_STARTED}>
              {OrderStatus.SHIPPING_STARTED}
            </option>
            <option value={OrderStatus.ORDER_CANCELLED}>
              {OrderStatus.ORDER_CANCELLED}
            </option>
          </select>
        ) : (
          order.status
        )}
      </td>
      {error && <p className="text-red-500">상태 변경 실패: {error.message}</p>}
    </tr>
  );
};

export default OrderTableRow;
