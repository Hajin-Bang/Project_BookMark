import { Order } from "@/lib/order/types";
import { useNavigate } from "react-router-dom";

interface OrderTableRowProps {
  order: Order;
  isSeller: boolean;
  onStatusChange?: (orderId: string, newStatus: string) => void;
}

const OrderTableRow = ({
  order,
  isSeller,
  onStatusChange,
}: OrderTableRowProps) => {
  const totalQuantity = (order.items || []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navigate = useNavigate();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onStatusChange) {
      onStatusChange(order.orderId, e.target.value);
    }
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
            className="border border-gray-300 rounded-md p-1 text-center"
          >
            <option value="주문완료">주문완료</option>
            <option value="발송대기">발송대기</option>
            <option value="발송시작">발송시작</option>
            <option value="주문취소">주문취소</option>
          </select>
        ) : (
          order.status
        )}
      </td>
    </tr>
  );
};

export default OrderTableRow;
