import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { ProductCategorySection } from "@/components/product/ProductCategorySection";

const HomePage = () => {
  const categories = ["시/소설", "에세이/인문", "그림책/일러스트", "사진"];

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        {categories.map((category) => {
          console.log("카테고리:", category);
          return <ProductCategorySection key={category} category={category} />;
        })}
      </main>
    </Layout>
  );
};

export default HomePage;
