import ProductCarousel from "./ProductCarousel";
import Badge from "@design-system/badge/Badge";
import { Card } from "@design-system/card/components/Card";
import { CardTitle } from "@design-system/card/components/CardTitle";
import { CardContent } from "@design-system/card/components/CardContent";

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
      className="hover:scale-105 transform transition duration-200 ease-in-out w-full flex flex-col  p-4 h-fit gap-2 cursor-pointer flex-grow flex-shrink min-w-[230px]"
      onClick={() => onClick(product.productId)}
      onMouseEnter={() => onMouseEnter && onMouseEnter(product.productId)}
    >
      <ProductCarousel images={product.productImage} />
      <CardTitle className="pt-2 line-clamp-1">{product.productName}</CardTitle>
      <CardContent className="text-sm text-gray-600 line-clamp-1">
        {product.productAuthor}
      </CardContent>
      <span className="text-sm font-semibold text-gray-700">
        {product.productPrice}원
      </span>
      <div className="pl-4 pr-4">
        <Badge>{product.productCategory}</Badge>
      </div>
    </Card>
  );
};
