import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchSellerProducts } from "@/lib/product/useFetchSellerProducts";
import { Layout } from "@/components/common/components/Layout";
import { Button } from "@/components/ui/button";

const ProductsManage = () => {
  const { user } = useAuthStore();
  const { data: products = [] } = useFetchSellerProducts(user?.uid || "");

  return (
    <Layout>
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            {user?.nickname} 님이 판매중인 도서
          </h2>
          <Button className="mt-5">판매 도서 추가하기</Button>
        </div>
        {/* 판매 도서가 없을 경우 */}
        {!products?.length && (
          <div>
            <p className="text-slate-500 text-sm">판매중인 도서가 없습니다.</p>
            <p className="text-slate-500 text-sm">도서를 추가해보세요!</p>
          </div>
        )}
        {/* 판매 도서가 있을 경우 */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.productId} className="border p-4">
              <h3 className="text-lg font-semibold">{product.productName}</h3>
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
