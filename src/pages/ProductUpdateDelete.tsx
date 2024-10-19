import { authStatusType, Layout } from "@/components/common/components/Layout";
import {
  ProductAddFormValues,
  ProductForm,
} from "@/components/product/ProductForm";
import { db } from "@/firebase";
import { useUpdateProduct } from "@/lib/product/useUpdateProduct";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductUpdateDelete = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productData, setProductData] = useState<
    ProductAddFormValues | undefined
  >(undefined);
  const updateProduct = useUpdateProduct();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        try {
          const productRef = doc(db, "products", productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            setProductData(productSnap.data() as ProductAddFormValues);
          }
        } catch (error) {
          console.error("상품 데이터 가져오기 중 에러 발생:", error);
        }
      };
      fetchProductData();
    }
  }, [productId]);

  const handleProductUpdate = (updatedData: ProductAddFormValues) => {
    if (!productId || !productData) return;

    updateProduct.mutate(
      { ...productData, ...updatedData },
      {
        onSuccess: () => {
          navigate("/manage"); // 수정 후 /manage 페이지로 이동
        },
      }
    );
  };

  // const handleProductDelete = (data) => {
  //     }

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8"></main>
      <h2>도서 수정/삭제하기</h2>
      <div className="w-2/3 min-w-72">
        <ProductForm
          onSubmit={handleProductUpdate}
          defaultValues={productData}
          isEditMode={true}
        />
      </div>
    </Layout>
  );
};

export default ProductUpdateDelete;
