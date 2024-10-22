import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { ProductCategorySection } from "@/components/product/ProductCategorySection";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const HomePage = () => {
  const categories = ["시/소설", "에세이/인문", "그림책/일러스트", "사진"];

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["products"] });
    };
  }, [queryClient]);

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        {categories.map((category) => {
          return <ProductCategorySection key={category} category={category} />;
        })}
      </main>
    </Layout>
  );
};

export default HomePage;
