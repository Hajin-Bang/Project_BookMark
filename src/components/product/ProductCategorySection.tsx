import { useFetchCategoryProducts } from "@/lib/product/useFetchCategoryProducts";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ChevronRight } from "lucide-react";

interface ProductCategorySectionProps {
  category: string;
}

export const ProductCategorySection = ({
  category,
}: ProductCategorySectionProps) => {
  const { data, isLoading, isError } = useFetchCategoryProducts(category, 4);
  const navigate = useNavigate();

  const products = useMemo(() => {
    const loadedProducts = data?.pages.flatMap((page) => page.products) || [];
    return loadedProducts;
  }, [data?.pages]);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <section
      onClick={() => navigate("/")}
      className="w-full h-fit min-h-[300px] bg-white p-5"
    >
      <h3 className="text-xl font-semibold tracking-tight flex justify-center items-center mb-4">
        {category} <ChevronRight />
      </h3>
      <div className="grid grid-cols-4 justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onClick={handleProductClick}
          />
        ))}
      </div>
    </section>
  );
};
