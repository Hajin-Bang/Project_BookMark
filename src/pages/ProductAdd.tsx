import { Controller, useForm } from "react-hook-form";
import { imageUpload } from "@/utils/imageUpload";
import { useState } from "react";
import { useAddProduct } from "@/lib/product/useAddProduct";
import { useProductStore } from "@/store/product/useProductStore";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ProductAddFormValues = {
  productName: string;
  productAuthor: string;
  productCategory: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productImage: string[];
};

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProductAddFormValues>();

  const { user } = useAuthStore();
  const { mutate } = useAddProduct();
  const addProduct = useProductStore((state) => state.addProduct);
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedImageUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const url = await imageUpload(files[i]); // Firebase로 이미지 업로드
      if (url) {
        uploadedImageUrls.push(url); // 업로드된 URL 저장
      }
    }
    setImageURLs(uploadedImageUrls);
  };

  const onSubmit = (data: ProductAddFormValues) => {
    if (!user) {
      console.error("사용자가 로그인되어 있지 않습니다.");
      return;
    }

    const productData = {
      ...data,
      productImage: imageURLs,
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
        reset();
        setImageURLs([]);
      },
    });
    console.log("상품 등록 완료", data);
  };

  const nameRegister = register("productName", {
    required: { value: true, message: "책 제목을 입력하세요" },
  });

  const authorRegister = register("productAuthor", {
    required: { value: true, message: "작가를 입력하세요" },
  });

  const priceRegister = register("productPrice", {
    required: { value: true, message: "판매 가격을 입력하세요." },
    pattern: { value: /^\d+$/, message: "판매 가격은 숫자여야 합니다." },
  });

  const quantityRegister = register("productQuantity", {
    required: { value: true, message: "판매 수량을 입력하세요." },
    pattern: { value: /^\d+$/, message: "판매 수량은 숫자여야 합니다." },
  });

  const descriptionRegister = register("productDescription", {
    required: { value: true, message: "도서 상세 설명을 입력하세요." },
  });

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8"></main>
      <h2>도서 등록</h2>
      <div className="w-2/3 min-w-72">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="w-full grid items-center gap-2">
            {/* 이미지 업로드 */}
            <Label htmlFor="productImage">상품 이미지</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {errors.productImage && (
              <p className="text-red-500 text-sm">
                {errors.productImage.message}
              </p>
            )}
            {/* 책 제목 */}
            <Label htmlFor="productName">책 제목</Label>
            <Input
              {...nameRegister}
              type="text"
              id="productName"
              placeholder="책 제목을 입력하세요."
            />
            {errors.productName && (
              <p className="text-sm font-medium leading-none text-red-400">
                {errors.productName.message}
              </p>
            )}
            {/* 작가명 */}
            <Label htmlFor="productName">작가명</Label>
            <Input
              {...authorRegister}
              type="text"
              id="productName"
              placeholder="작가를 입력하세요."
            />
            {errors.productAuthor && (
              <p className="text-sm font-medium leading-none text-red-400">
                {errors.productAuthor.message}
              </p>
            )}
            {/* 카테고리 */}
            <Label htmlFor="productCategory">카테고리</Label>
            <Controller
              name="productCategory"
              control={control}
              defaultValue=""
              rules={{ required: "카테고리를 선택해주세요." }}
              render={({ field }) => (
                <>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POETRY_NOVELS">시/소설</SelectItem>
                      <SelectItem value="PICTURE_BOOKS_ILLUSTRATIONS">
                        그림책/일러스트
                      </SelectItem>
                      <SelectItem value="ESSAYS_HUMANITIES">
                        에세이/인문
                      </SelectItem>
                      <SelectItem value="LIFESTYLE">라이프스타일</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.productCategory && (
                    <p className="text-red-500 text-sm">
                      {errors.productCategory.message}
                    </p>
                  )}
                </>
              )}
            />
            {/* 가격 */}
            <Label htmlFor="productPrice">상품 가격</Label>
            <Input
              {...priceRegister}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              id="productPrice"
              placeholder="상품 가격을 입력하세요."
            />
            {errors.productPrice && (
              <p className="text-sm font-medium leading-none text-red-400">
                {errors.productPrice.message}
              </p>
            )}
            {/* 수량 */}
            <Label htmlFor="productQuantity">상품 수량</Label>
            <Input
              {...quantityRegister}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              id="productQuantity"
              placeholder="상품 수량을 입력하세요."
            />
            {errors.productQuantity && (
              <p className="text-sm font-medium leading-none text-red-400">
                {errors.productQuantity.message}
              </p>
            )}
            {/* 설명 */}
            <Label htmlFor="productDescription">상품 상세 설명</Label>
            <Textarea
              {...descriptionRegister}
              id="productDescription"
              placeholder="상품에 대한 상세한 설명을 입력해 주세요."
            />
            {errors.productDescription && (
              <small className="text-sm font-medium leading-none text-red-400">
                * {errors.productDescription.message}
              </small>
            )}
          </div>
          <div className="w-full flex gap-2">
            <Button type="submit" className="flex-grow">
              저장
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProductAdd;
