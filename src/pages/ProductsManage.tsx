import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchSellerProducts } from "@/lib/product/useFetchSellerProducts";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductsManage = () => {
  const { user } = useAuthStore();
  const { data: products = [] } = useFetchSellerProducts(user?.uid || "");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>(
    products.map(() => 0)
  );

  useEffect(() => {
    if (products.length > 0) {
      setCurrentImageIndex(products.map(() => 0));
    }
  }, [products]);

  const handleProductClick = (productId: string) => {
    navigate(`/manage/edit/${productId}`);
  };

  const handleNextImage = (index: number, direction: "next" | "prev") => {
    setCurrentImageIndex((prevIndexes) =>
      prevIndexes.map((imgIdx, idx) =>
        idx === index
          ? direction === "next"
            ? (imgIdx + 1) % products[idx].productImage.length
            : (imgIdx - 1 + products[idx].productImage.length) %
              products[idx].productImage.length
          : imgIdx
      )
    );
  };

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            {user?.nickname} 님이 판매중인 도서
          </h2>
          <Button onClick={() => navigate("/manage/add")} className="mt-5">
            판매 도서 추가하기
          </Button>
        </div>
        {/* 판매 도서가 없을 경우 */}
        {!products?.length && (
          <div>
            <p className="text-slate-500 text-sm">판매중인 도서가 없습니다.</p>
            <p className="text-slate-500 text-sm">도서를 추가해보세요!</p>
          </div>
        )}
        {/* 판매 도서가 있을 경우 */}
        <div className="grid grid-cols-4 gap-4 justify-center">
          {products.map((product, productIndex) => (
            <div
              key={product.productId}
              onClick={() => handleProductClick(product.productId)}
              className="border p-4"
            >
              {/* 이미지 슬라이드 */}
              {product.productImage && product.productImage.length > 0 && (
                <div className="relative">
                  <img
                    src={product.productImage[currentImageIndex[productIndex]]}
                    alt={product.productName}
                    className="w-full h-48 object-cover mb-2"
                  />
                  {/* 좌우 화살표 버튼 */}
                  <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage(productIndex, "prev");
                    }}
                  >
                    {"<"}
                  </button>
                  <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage(productIndex, "next");
                    }}
                  >
                    {">"}
                  </button>
                </div>
              )}
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <p className="text-sm">작가: {product.productAuthor}</p>
              <p className="text-sm">가격: {product.productPrice}원</p>
              <p className="text-sm">재고: {product.productQuantity}개</p>
              <p className="text-sm">{product.productDescription}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default ProductsManage;
