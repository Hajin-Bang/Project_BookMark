import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import {
  ProductAddFormValues,
  ProductForm,
} from "@/components/product/ProductForm";
import { db } from "@/firebase";
import { useModalState } from "@/hooks/useModalState";
import { useDeleteProduct } from "@/lib/product/hooks/useDeleteProduct";
import { useUpdateProduct } from "@/lib/product/hooks/useUpdateProduct";
import Button from "@design-system/button/Button";
import Modal from "@design-system/modal/components/Modal";
import { useToast } from "@design-system/toast/ToastContext";
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
  const { isOpen, openModal, closeModal } = useModalState();
  const { addToast } = useToast();

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

  const handleProductDelete = () => {
    if (!productId) return;
    deleteProduct.mutate(productId, {
      onSuccess: () => {
        navigate("/manage");
        addToast({
          title: "도서가 삭제되었습니다.",
          variant: "success",
          duration: 3000,
        });
      },
      onError: (error) => {
        console.error("도서 삭제 중 에러 발생:", error);
        addToast({
          title: "도서 삭제 중 오류가 발생했습니다.",
          variant: "error",
          duration: 3000,
        });
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
              onClick={openModal}
              className="flex-grow"
              priority="important"
            >
              삭제하기
            </Button>
          </div>
        </div>
      </main>

      <Modal open={isOpen} onOpenChange={closeModal}>
        <Modal.Content>
          <Modal.Title>삭제 확인</Modal.Title>
          <Modal.Description>
            정말로 이 상품을 삭제하시겠습니까? <br /> 삭제된 상품은 복구할 수
            없습니다.
          </Modal.Description>
          <Modal.Actions>
            <Modal.Cancel priority="important" onOpenChange={closeModal}>
              취소
            </Modal.Cancel>
            <Modal.Action priority="important" onClick={handleProductDelete}>
              확인
            </Modal.Action>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

export default ProductUpdateDelete;
