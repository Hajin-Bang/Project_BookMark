import { useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-60 flex flex-col p-4 h-fit gap-2 bg-white cursor-pointer"
      onClick={() => onClick(product.productId)}
    >
      <div
        className="relative flex items-center justify-center bg-neutral-100 h-[200px] w-[200px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.productImage.length === 0 ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        ) : !isHovered ? (
          <img
            className="w-full h-full object-cover"
            src={product.productImage[0]}
            alt={`${product.productName} main image`}
          />
        ) : (
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {product.productImage.map((img: string, idx: number) => (
                <CarouselItem
                  key={idx}
                  className="flex items-center justify-center"
                >
                  <img
                    className="object-cover h-[200px] w-[200px]"
                    src={img}
                    alt={`${product.productName} image ${idx}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      <CardTitle className="pt-2 text-lg ">{product.productName}</CardTitle>
      <CardDescription className="text-sm text-gray-600">
        {product.productAuthor}
      </CardDescription>
      <span className="text-sm font-semibold text-gray-700">
        {product.productPrice}원
      </span>
      <div className="pl-4 pr-4">
        <Badge
          variant="secondary"
          className="mb-2  inline-block text-gray-500 "
        >
          {product.productCategory}
        </Badge>
      </div>
    </Card>
  );
};
