import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { ImageUploader } from "./ImageUploader";

type ProductFormProps = {
  onSubmit: (data: ProductAddFormValues) => void;
  defaultValues?: ProductAddFormValues;
  id?: string;
};

export type ProductAddFormValues = {
  productName: string;
  productAuthor: string;
  productCategory: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productImage: string[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  defaultValues,
  id = "productForm",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProductAddFormValues>({
    defaultValues,
  });
  const [firebaseImageURLs, setFirebaseImageURLs] = useState<string[]>([]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onFormSubmit = (data: ProductAddFormValues) => {
    onSubmit({
      ...data,
      productImage: firebaseImageURLs,
    });
    reset();
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <div className="w-full grid items-center gap-2 ">
        {/* 이미지 업로드 */}
        <Label htmlFor="productImage">사진</Label>
        <ImageUploader
          onImageChange={setFirebaseImageURLs}
          initialImages={defaultValues?.productImage || []}
        />

        {/* 책 제목 */}
        <Label htmlFor="productName" className="mt-4">
          책 제목
        </Label>
        <Input
          {...register("productName", { required: "책 제목을 입력하세요" })}
          type="text"
          placeholder="책 제목을 입력하세요."
        />
        {errors.productName && (
          <p className="text-red-400">{errors.productName.message}</p>
        )}

        {/* 작가명 */}
        <Label htmlFor="productAuthor">작가명</Label>
        <Input
          {...register("productAuthor", { required: "작가를 입력하세요" })}
          type="text"
          placeholder="작가를 입력하세요."
        />
        {errors.productAuthor && (
          <p className="text-red-400">{errors.productAuthor.message}</p>
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
                  <SelectItem value="시/소설">시/소설</SelectItem>
                  <SelectItem value="그림책/일러스트">
                    그림책/일러스트
                  </SelectItem>
                  <SelectItem value="에세이/인문">에세이/인문</SelectItem>
                  <SelectItem value="사진">사진</SelectItem>
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
          {...register("productPrice", {
            required: "판매 가격을 입력하세요.",
            pattern: {
              value: /^\d+$/,
              message: "판매 가격은 숫자여야 합니다.",
            },
          })}
          type="number"
          placeholder="상품 가격을 입력하세요."
        />
        {errors.productPrice && (
          <p className="text-red-400">{errors.productPrice.message}</p>
        )}

        {/* 수량 */}
        <Label htmlFor="productQuantity">상품 수량</Label>
        <Input
          {...register("productQuantity", {
            required: "판매 수량을 입력하세요.",
            pattern: {
              value: /^\d+$/,
              message: "판매 수량은 숫자여야 합니다.",
            },
          })}
          type="number"
          placeholder="상품 수량을 입력하세요."
        />
        {errors.productQuantity && (
          <p className="text-red-400">{errors.productQuantity.message}</p>
        )}

        {/* 설명 */}
        <Label htmlFor="productDescription">상품 상세 설명</Label>
        <Textarea
          {...register("productDescription", {
            required: "도서 상세 설명을 입력하세요.",
          })}
          placeholder="상품에 대한 상세한 설명을 입력해 주세요."
        />
        {errors.productDescription && (
          <small className="text-red-400">
            {errors.productDescription.message}
          </small>
        )}
      </div>
    </form>
  );
};
