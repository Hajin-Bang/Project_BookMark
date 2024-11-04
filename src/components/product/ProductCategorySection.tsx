import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ChevronRight } from "lucide-react";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProducts";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProductDetailsAPI } from "@/lib/product/api";
import { QUERY_KEYS } from "@/lib/queryKeys";

interface ProductCategorySectionProps {
  category: string;
  className?: string;
}

export const ProductCategorySection = ({
  category,
  className,
}: ProductCategorySectionProps) => {
  const order = "createdAt/desc";
  const { data, isError } = useFetchProducts({ category, order, limit: 4 });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const products = useMemo(() => {
    const loadedProducts = data?.pages.flatMap((page) => page.products) || [];
    return loadedProducts;
  }, [data?.pages]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (isError) return <div>Error loading products</div>;

  const handlePrefetch = (productId: string) => {
    if (!queryClient.getQueryData([QUERY_KEYS.PRODUCT, productId])) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.PRODUCT, productId],
        queryFn: () => fetchProductDetailsAPI(productId),
      });
    }
  };

  return (
    <section className={`w-full h-fit min-h-[300px] p-5 ${className}`}>
      <h3
        onClick={() =>
          navigate(`/category/${encodeURIComponent(category || "")}`)
        }
        className="text-xl cursor-pointer font-semibold tracking-tight flex justify-center items-center mb-4"
      >
        {category} <ChevronRight />
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onClick={handleProductClick}
            onMouseEnter={() => handlePrefetch(product.productId)}
          />
        ))}
      </div>
    </section>
  );
};
