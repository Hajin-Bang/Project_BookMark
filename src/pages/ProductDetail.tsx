import CartDrawer from "@/components/cart/CartDrawer";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { ProductCategorySection } from "@/components/product/ProductCategorySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAddCart } from "@/lib/cart/hooks/useAddCart";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProducts";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useFetchProducts({ productId });
  const product = data?.pages
    ?.flatMap((page) => page.products)
    ?.find((product) => product.productId === productId);

  const { mutate: addCart } = useAddCart();
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addCart(product);
      setCartOpen(true);
    }
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center  mt-12 px-40">
        <div className="flex">
          {/* 왼쪽: 이미지 */}
          <div className="w-1/3">
            {product?.productImage && product.productImage.length > 0 ? (
              <Carousel>
                <CarouselContent className="relative">
                  {product?.productImage?.map((img: string, idx: number) => (
                    <CarouselItem
                      key={idx}
                      className="flex items-center justify-center h-90 w-100"
                    >
                      <img
                        src={img}
                        alt={`${product?.productName} image`}
                        className="w-full h-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {product?.productImage?.length > 1 && (
                  <>
                    <CarouselPrevious className="m-1" />
                    <CarouselNext className="m-1" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                <span className="text-gray-500">이미지 없음</span>
              </div>
            )}
          </div>

          {/* 오른쪽 상품 상세  */}
          <div className="w-2/3 flex flex-col justify-between p-10">
            <section className="flex flex-col gap-2 text-left w-96 overflow-clip">
              <h2 className="pb-6 text-2xl font-semibold tracking-tight">
                {product?.productName}
              </h2>
              <div className="flex flex-col gap-2">
                <p className="text-lg  text-gray-500">
                  저자: {product?.productAuthor}
                </p>
                <p className="text-lg  text-gray-500">
                  판매가: {product?.productPrice.toLocaleString()}원
                </p>
                <Badge variant="secondary" className="text-sm  text-gray-500 ">
                  {product?.productCategory}
                </Badge>
                <p className="text-lg  text-gray-500">
                  재고: {product?.productQuantity.toLocaleString()}권
                </p>
              </div>
            </section>
            <div className="flex gap-4">
              <Button className="w-1/2" onClick={handleAddToCart}>
                장바구니
              </Button>
              <Button className="w-1/2">구매하기</Button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-10 ml-20 w-full flex flex-col items-start">
          <h2 className="text-2xl font-semibold mb-4">책 소개</h2>
          <p className="text-gray-700">{product?.productDescription}</p>
        </div>
      </main>

      <section className="mt-20">
        {product?.productCategory && (
          <ProductCategorySection category={product.productCategory} />
        )}
      </section>

      <CartDrawer isOpen={cartOpen} onClose={handleCloseCart} />
    </Layout>
  );
};

export default ProductDetail;
