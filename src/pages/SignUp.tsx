import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Lock, Mail, User } from "lucide-react";
import { useSignUp } from "@/lib/auth/hooks/useSignUp";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";

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

  const onSubmit = async (data: SignUpFormValues) => {
    mutate(data);
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
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="nickname"
                {...register("nickname", { required: "닉네임을 입력하세요" })}
                type="text"
                placeholder="닉네임"
                className="pl-10"
              />
            </div>
            {errors.nickname && (
              <p className="text-sm text-red-500">{errors.nickname.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                {...register("email", emailValidation)}
                placeholder="이메일"
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                {...register("password", passwordValidation)}
                placeholder="비밀번호"
                className="pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
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
          <Button type="submit" className="w-full">
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
