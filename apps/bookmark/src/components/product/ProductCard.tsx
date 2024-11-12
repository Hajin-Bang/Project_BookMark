import { Card, CardDescription, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import ProductCarousel from "./ProductCarousel";

interface ProductCardProps {
  product: {
    productId: string;
    productImage: string[];
    productName: string;
    productAuthor: string;
    productPrice: number;
    productCategory: string;
  };
  onClick: (productId: string) => void;
  onMouseEnter?: (productId: string) => void;
}

export const ProductCard = ({
  product,
  onClick,
  onMouseEnter,
}: ProductCardProps) => {
  return (
    <Card
      className="w-full flex flex-col p-4 h-fit gap-2 bg-white cursor-pointer flex-grow flex-shrink min-w-[230px]"
      onClick={() => onClick(product.productId)}
      onMouseEnter={() => onMouseEnter && onMouseEnter(product.productId)}
    >
      <ProductCarousel images={product.productImage} />
      <CardTitle className="pt-2 text-lg line-clamp-1">
        {product.productName}
      </CardTitle>
      <CardDescription className="text-sm text-gray-600 line-clamp-1">
        {product.productAuthor}
      </CardDescription>
      <span className="text-sm font-semibold text-gray-700">
        {product.productPrice}원
      </span>
      <div className="pl-4 pr-4">
        <Badge variant="secondary" className="mb-2 inline-block text-gray-500">
          {product.productCategory}
        </Badge>
      </div>
    </Card>
  );
};
