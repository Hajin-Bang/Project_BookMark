import { useProductStore } from "@/store/product/useProductStore";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import {
  ProductAddFormValues,
  ProductForm,
} from "@/components/product/ProductForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { useAddProduct } from "@/lib/product/hooks/useAddProduct";

const ProductAdd = () => {
  const { user } = useAuthStore();
  const { mutate } = useAddProduct();
  const addProduct = useProductStore((state) => state.addProduct);
  const navigate = useNavigate();

  const handleProductAdd = (data: ProductAddFormValues) => {
    if (!user) {
      console.error("사용자가 로그인되어 있지 않습니다.");
      return;
    }

    const productData = {
      ...data,
      productId: "",
      sellerId: user.uid, // 로그인된 사용자의 uid를 sellerId로 설정
      productPrice: Number(data.productPrice),
      productQuantity: Number(data.productQuantity),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mutate(productData, {
      onSuccess: (newProduct) => {
        addProduct(newProduct);
        navigate("/manage");
      },
    });
    console.log("상품 등록 완료", data);
  };

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          도서 등록
        </h2>
        <div className="w-2/3 min-w-72 mx-auto">
          <ProductForm onSubmit={handleProductAdd} id="productForm" />
          <div className="w-full flex mt-2">
            <Button type="submit" form="productForm" className="flex-grow">
              등록하기
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProductAdd;
