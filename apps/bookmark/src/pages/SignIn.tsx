import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import useSignIn from "@/lib/auth/hooks/useSignIn";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@design-system/button/Button";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { NavigationBar } from "@/components/common/components/NavigationBar";

type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();
  const navigate = useNavigate();
  const { mutate: signIn, isPending: isLoading } = useSignIn();

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    signIn(data, {
      onSuccess: (user) => {
        if (user.isSeller) {
          navigate("/manage");
        } else {
          navigate("/");
        }
      },
      onError: (error) => {
        console.error("로그인 실패", error);
      },
    });
  };

  const handleClickSignUp = () => {
    navigate("/signup");
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <NavigationBar />
      <div className="-full  flex-grow max-w-md mx-auto space-y-5 flex flex-col justify-center mt-40">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
          로그인
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                {...register("email", { required: "이메일을 입력하세요" })}
                placeholder="이메일"
                type="email"
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
                {...register("password", { required: "비밀번호를 입력하세요" })}
                placeholder="비밀번호"
                type="password"
                className="pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" full>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </form>
        <GoogleSignIn />
        <Button priority="dark" onClick={handleClickSignUp}>
          회원가입
        </Button>
      </div>
    </Layout>
  );
};

export default SignIn;