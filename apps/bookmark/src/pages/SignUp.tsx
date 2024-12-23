import { useForm } from "react-hook-form";
import { Lock, Mail, User, User2 } from "lucide-react";
import { useSignUp } from "@/lib/auth/hooks/useSignUp";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import Button from "@design-system/button/Button";
import Input from "@design-system/input/Input";
import Label from "@design-system/label/Label";
import { useToast } from "@design-system/toast/ToastContext";

type SignUpFormValues = {
  nickname: string;
  email: string;
  password: string;
  isSeller: boolean;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();
  const { mutate, isPending: isLoading } = useSignUp();
  const { addToast } = useToast();

  const onSubmit = async (data: SignUpFormValues) => {
    mutate(data);
    addToast({
      title: "회원가입이 완료되었습니다!",
      variant: "success",
      duration: 3000,
    });
  };

  const emailValidation = {
    required: "이메일은 필수 항목입니다.",
    validate: {
      validEmail: (value: string) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
        "이메일 양식이 올바르지 않습니다.",
    },
  };

  const passwordValidation = {
    required: "비밀번호는 필수 항목입니다.",
    validate: {
      minLength: (value: string) =>
        value.length >= 10 ||
        (value.length >= 8 &&
          /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value)) ||
        `비밀번호는 최소 10자리이거나,최소 8자리 이상이면서 대문자, 소문자, 숫자, 특수문자 중 3가지를 포함해야 합니다.`,
      notEasyPassword: (value: string) =>
        !/(\d)\1{2}/.test(value) ||
        "비밀번호에 일련번호나 쉬운 숫자 패턴이 포함되어서는 안 됩니다.",
    },
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <NavigationBar />
      <div className="w-full max-w-md mx-auto space-y-8 flex flex-col justify-center  mt-40">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
          회원가입
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <div className="relative">
              <Input
                full
                icon={<User2 />}
                id="nickname"
                {...register("nickname", { required: "닉네임을 입력하세요" })}
                type="text"
                placeholder="닉네임"
                className="pl-10"
                error={errors.nickname?.message}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Input
                full
                icon={<Mail />}
                id="email"
                {...register("email", emailValidation)}
                placeholder="이메일"
                className="pl-10"
                error={errors.email?.message}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                full
                icon={<Lock />}
                id="password"
                {...register("password", passwordValidation)}
                placeholder="비밀번호"
                className="pl-10"
                error={errors.password?.message}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="isSeller"
              className="ml-2 text-sm font-medium leading-none"
            >
              판매자 계정으로 가입하기
            </Label>
            <input
              type="checkbox"
              {...register("isSeller")}
              className="ml-2 accent-slate-500"
            />
          </div>
          <Button type="submit" full>
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
