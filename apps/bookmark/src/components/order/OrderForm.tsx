import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCreateOrder } from "@/lib/order/hooks/useCreateOrder";
import { CreateOrderParams, OrderItem } from "@/lib/order/types";
import Button from "@design-system/button/Button";
import Input from "@design-system/input/Input";
import Label from "@design-system/label/Label";
import { useToast } from "@design-system/toast/ToastContext";

interface OrderFormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
}

interface OrderFormProps {
  orderItems: OrderItem[];
  totalAmount: number;
}

const OrderForm = ({ orderItems, totalAmount }: OrderFormProps) => {
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const { user } = useAuthStore();
  const { addToast } = useToast();
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
      totalAmount: totalAmount,
    };

    createOrder.mutate(orderData, {
      onSuccess: () => {
        navigate("/mypage");
        addToast({
          title: "주문이 완료되었습니다!",
          variant: "success",
          duration: 3000,
        });
      },
      onError: () => {
        addToast({
          title: "주문 처리 중 오류가 발생했습니다.",
          variant: "error",
          duration: 3000,
        });
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
          full
          id="name"
          {...register("name", nameValidation)}
          type="text"
          placeholder="이름을 입력하세요."
          error={errors.name?.message}
        />
      </div>
      <div>
        <Label htmlFor="address">주소</Label>
        <Input
          full
          id="address"
          {...register("address", addressValidation)}
          type="text"
          placeholder="주소를 입력하세요."
          error={errors.address?.message}
        />
      </div>

      <div>
        <Label htmlFor="postalCode">우편번호</Label>
        <Input
          full
          id="postalCode"
          {...register("postalCode", postalCodeValidation)}
          type="text"
          placeholder="우편번호를 입력하세요."
          error={errors.postalCode?.message}
        />
      </div>
      <div>
        <Label htmlFor="phone">전화번호</Label>
        <Input
          full
          id="phone"
          {...register("phone", phoneValidation)}
          type="text"
          placeholder="01012345678"
          error={errors.phone?.message}
        />
      </div>
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input
          full
          id="email"
          {...register("email", emailValidation)}
          type="text"
          placeholder="example@example.com"
          error={errors.email?.message}
        />
      </div>

      <div className="w-full flex gap-2 mt-2">
        <Button
          type="button"
          priority="dark"
          onClick={handleCancel}
          className="flex-grow"
        >
          주문 취소하기
        </Button>
        <Button type="submit" priority="important" className="flex-grow">
          결제하기
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
