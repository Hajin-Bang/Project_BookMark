import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { ProductCard } from "@/components/product/ProductCard";
import { useInfiniteScroll } from "@/lib/product/hooks/useInfiniteScroll";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProducts";

const ProductCategory = () => {
  const { category } = useParams();
  const [order, setOrder] = useState("createdAt/desc");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchProducts({ category, order });
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
        <div>
          <Select value={order} onValueChange={(value) => setOrder(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt/desc">최신순</SelectItem>
              <SelectItem value="productPrice/desc">높은 가격순</SelectItem>
              <SelectItem value="productPrice/asc">낮은 가격순</SelectItem>
            </SelectContent>
          </Select>
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
