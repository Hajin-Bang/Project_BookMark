import { useAuthStore } from "@/store/auth/useAuthStore";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useInfiniteScroll } from "@/lib/product/hooks/useInfiniteScroll";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { ProductCard } from "@/components/product/ProductCard";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProducts";

const ProductsManage = () => {
  const { user } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchProducts({ sellerId: user?.uid });
  const navigate = useNavigate();

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) || [];
  }, [data?.pages]);

  const handleProductClick = (productId: string) => {
    navigate(`/manage/edit/${productId}`);
  };

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage,
  });

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div>
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
            {user?.nickname}님이 판매중인 도서
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>
        <div ref={ref} style={{ height: "1px" }}></div>
      </main>
    </Layout>
  );
};

export default ProductsManage;
