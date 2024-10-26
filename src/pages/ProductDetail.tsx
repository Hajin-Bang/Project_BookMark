import CartDrawer from "@/components/cart/CartDrawer";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import ProductCarousel from "@/components/product/ProductCarousel";
import { ProductCategorySection } from "@/components/product/ProductCategorySection";
import { Button } from "@/components/ui/button";
import { useAddCart } from "@/lib/cart/hooks/useAddCart";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProducts";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useFetchProducts({ productId });
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();
  const product = data?.pages
    ?.flatMap((page) => page.products)
    ?.find((product) => product.productId === productId);

  const { mutate: addCart } = useAddCart();
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = () => {
    if (!isLogin) {
      navigate("/signin");
      return;
    }

    if (product) {
      addCart(product);
      setCartOpen(true);
    }
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleBuyNow = () => {
    if (!isLogin) {
      navigate("/signin");
      return;
    }

    if (product) {
      navigate("/checkout", {
        state: {
          items: [
            {
              productId: product.productId,
              productName: product.productName,
              productPrice: product.productPrice,
              productImage: product.productImage,
              quantity: 1,
            },
          ],
        },
      });
    }
  };

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center mt-12 px-8">
        <div className="flex">
          {/* 왼쪽: 이미지 */}
          <div className="w-2/5 mt-10">
            {product?.productImage && product.productImage.length > 0 ? (
              <ProductCarousel
                images={product.productImage}
                className="h-[300px]"
              />
            ) : (
              <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                <span className="text-gray-500">이미지 없음</span>
              </div>
            )}
          </div>

          {/* 오른쪽 상품 상세  */}
          <div className="w-3/5 flex flex-col p-12">
            <section className="flex flex-col gap-2 text-left w-96 overflow-clip">
              <h2 className=" text-2xl font-semibold">
                {product?.productName}
              </h2>
              <div className="flex flex-col gap-4 mt-5">
                <p className="text-l  text-gray-500">
                  저자: {product?.productAuthor}
                </p>
                <p className="text-l  text-gray-500">
                  판매가: {product?.productPrice.toLocaleString()}원
                </p>
                <p className="text-l  text-gray-500">
                  분야: {product?.productCategory}
                </p>
                <p className="text-l  text-gray-500">
                  재고: {product?.productQuantity.toLocaleString()}권
                </p>
              </div>
            </section>
            <div className="w-full flex gap-3 mt-10">
              <Button className="w-1/2 bg-slate-400" onClick={handleAddToCart}>
                장바구니
              </Button>
              <Button className="w-1/2 bg-blue-500" onClick={handleBuyNow}>
                구매하기
              </Button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="w-3/5 mt-4 flex flex-col justify-center ">
          <h2 className="text-2xl font-semibold mb-4">책 소개</h2>
          <p className="text-gray-700 text-left whitespace-pre-line">
            {product?.productDescription}
          </p>
        </div>

        <section className="w-full mt-12 flex justify-center">
          {product?.productCategory && (
            <ProductCategorySection
              category={product.productCategory}
              className="bg-transparent"
            />
          )}
        </section>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={handleCloseCart} />
    </Layout>
  );
};

export default ProductDetail;
