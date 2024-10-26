import { useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

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
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.productImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.productImage.length - 1 : prevIndex - 1
    );
  };

  return (
    <Card
      className="w-full flex flex-col p-4 h-fit gap-2 bg-white cursor-pointer flex-grow flex-shrink"
      onClick={() => onClick(product.productId)}
    >
      <div className="relative flex items-center justify-center bg-neutral-100 w-full h-[200px] overflow-hidden">
        {product.productImage.length === 0 ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        ) : (
          <>
            <img
              className="object-cover w-full h-full"
              src={product.productImage[currentIndex]}
              alt={`${product.productName} image ${currentIndex}`}
            />
            {product.productImage.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-300 p-1 rounded-full"
                >
                  ◀
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2   text-gray-300 p-1 rounded-full"
                >
                  ▶
                </button>
              </>
            )}
          </>
        )}
      </div>

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
