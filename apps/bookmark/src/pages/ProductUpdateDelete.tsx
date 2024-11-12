import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import {
  ProductAddFormValues,
  ProductForm,
} from "@/components/product/ProductForm";
import { db } from "@/firebase";
import { useDeleteProduct } from "@/lib/product/hooks/useDeleteProduct";
import { useUpdateProduct } from "@/lib/product/hooks/useUpdateProduct";
import Button from "@design-system/button/Button";
import Modal from "@design-system/modal/components/Modal";
import { useModalContext } from "@design-system/modal/ModalContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductUpdateDelete = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productData, setProductData] = useState<
    ProductAddFormValues | undefined
  >(undefined);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();
  const { openModal } = useModalContext();

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
          navigate("/manage");
        },
      }
    );
  };

  const handleDeleteClick = () => {
    openModal();
  };

  const handleProductDelete = () => {
    if (!productId) return;
    deleteProduct.mutate(productId, {
      onSuccess: () => {
        navigate("/manage");
      },
      onError: (error) => {
        console.error("상품 삭제 중 에러 발생:", error);
      },
    });
  };

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2">
          도서 수정/삭제하기
        </h2>
        <div className="w-2/3 min-w-72 mx-auto">
          <ProductForm
            onSubmit={handleProductUpdate}
            defaultValues={productData}
          />
          <div className="w-full flex gap-2 mt-2">
            <Button
              type="submit"
              form="productForm"
              className="flex-grow"
              priority="dark"
            >
              수정하기
            </Button>
            <Button
              onClick={handleDeleteClick}
              className="flex-grow"
              priority="important"
            >
              삭제하기
            </Button>
          </div>
        </div>
      </main>

      <Modal>
        <Modal.Content>
          <Modal.Title>삭제 확인</Modal.Title>
          <Modal.Description>
            정말로 이 상품을 삭제하시겠습니까? <br /> 삭제된 상품은 복구할 수
            없습니다.
          </Modal.Description>
          <div className="flex justify-center gap-2">
            <Modal.Cancel priority="important">취소</Modal.Cancel>
            <Modal.Action priority="important" onClick={handleProductDelete}>
              확인
            </Modal.Action>
          </div>
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

export default ProductUpdateDelete;
