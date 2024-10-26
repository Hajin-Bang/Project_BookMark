import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCreateOrder } from "@/lib/order/hooks/useCreateOrder";
import { CreateOrderParams } from "@/lib/order/types";

interface OrderFormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
}
const OrderForm = () => {
  const navigate = useNavigate();
  const { orderItems, totalAmount } = useOrderStore();
  const createOrder = useCreateOrder();
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>();

  const onSubmit = () => {
    if (!user?.uid) {
      navigate("/signin");
      return;
    }

    const orderData: CreateOrderParams = {
      userId: user.uid,
      orderItems: orderItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity,
        productImage: item.productImage,
        sellerName: item.sellerName,
        sellerId: item.sellerId,
      })),
      totalAmount,
    };

    createOrder.mutate(orderData, {
      onSuccess: () => {
        alert("주문이 성공적으로 완료되었습니다!");
        navigate("/mypage");
      },
      onError: (error) => {
        console.error("주문 생성 중 에러 발생", error);
        alert("주문을 실패하였습니다.");
      },
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const nameValidation = { required: "이름을 입력하세요" };
  const addressValidation = {
    required: "주소를 입력하세요.",
  };

  const postalCodeValidation = {
    required: "우편번호를 입력하세요.",
    pattern: {
      value: /^[0-9]{5}$/,
      message: "우편번호는 5자리 숫자여야 합니다.",
    },
  };
  const phoneValidation = {
    required: "전화번호를 입력하세요",
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: "전화번호는 10자리 또는 11자리 숫자여야 합니다.",
    },
  };
  const emailValidation = {
    required: "이메일은 필수 항목입니다.",
    validate: {
      validEmail: (value: string) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
        "이메일 양식이 올바르지 않습니다.",
    },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <div>
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          {...register("name", nameValidation)}
          type="text"
          placeholder="이름을 입력하세요."
        />
        {errors.name && <p className="text-red-400">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="address">주소</Label>
        <Input
          id="address"
          {...register("address", addressValidation)}
          type="text"
          placeholder="주소를 입력하세요."
        />
        {errors.address && (
          <p className="text-red-400">{errors.address.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="postalCode">우편번호</Label>
        <Input
          id="postalCode"
          {...register("postalCode", postalCodeValidation)}
          type="text"
          placeholder="우편번호를 입력하세요."
        />
        {errors.postalCode && (
          <p className="text-red-400">{errors.postalCode.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phone">전화번호</Label>
        <Input
          id="phone"
          {...register("phone", phoneValidation)}
          type="text"
          placeholder="01012345678"
        />
        {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          {...register("email", emailValidation)}
          type="text"
          placeholder="example@example.com"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>

      {/* 버튼 */}
      <div className="w-full flex gap-2 mt-2">
        <Button type="button" onClick={handleCancel} className="flex-grow">
          주문 취소하기
        </Button>
        <Button type="submit" className="flex-grow  bg-blue-400">
          결제하기
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
