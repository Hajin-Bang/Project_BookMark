import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { ProductCard } from "@/components/product/ProductCard";
import { useFetchCategoryProducts } from "@/lib/product/useFetchCategoryProducts";
import { useInfiniteScroll } from "@/lib/product/useInfiniteScroll";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductCategory = () => {
  const { category } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchCategoryProducts(category || "");
  const navigate = useNavigate();

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) || [];
  }, [data?.pages]);

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage,
  });

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div>
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
            {category}
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4 justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onClick={() => navigate(`/product/${product.productId}`)}
            />
          ))}
        </div>
        <div ref={ref} style={{ height: "1px" }}></div>
      </main>
    </Layout>
  );
};

export default ProductCategory;
