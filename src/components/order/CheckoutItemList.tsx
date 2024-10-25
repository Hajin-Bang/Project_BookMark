import { Card, CardDescription, CardTitle } from "../ui/card";

interface OrderItem {
  productId: string;
  productImage: string[];
  productName: string;
  productPrice: number;
  quantity: number;
}

const CheckoutItemList = ({ items }: { items: OrderItem[] }) => {
  return (
    <div className="w-full">
      <ul>
        {items.map((item) => (
          <li key={item.productId}>
            <Card className="flex gap-4 items-center mb-4 p-3">
              {item.productImage && (
                <img
                  src={item.productImage[0]}
                  alt={item.productName}
                  className="w-20 h-20 object-cover"
                />
              )}

              <div className="flex flex-col items-start">
                <CardTitle className="text-sm">{item.productName}</CardTitle>
                <CardDescription className="text-sm">
                  수량: {item.quantity}개
                </CardDescription>
                <span className="text-sm font-semibold text-gray-700">
                  {(item.productPrice * item.quantity).toLocaleString()}원
                </span>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutItemList;
