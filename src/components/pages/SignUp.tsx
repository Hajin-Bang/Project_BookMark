import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../src/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Lock, Mail, User } from "lucide-react";

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
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormValues) => {
    const { nickname, email, password, isSeller } = data;
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        nickname: nickname,
        email: email,
        isSeller: isSeller,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (isSeller) {
        navigate("/manage");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
    }
  };

  const passwordValidation = {
    required: "비밀번호는 필수 항목입니다.",
    validate: {
      minLength: (value: string) =>
        value.length >= 10 ||
        (value.length >= 8 &&
          /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value)) ||
        "비밀번호는 최소 10자리이거나, 최소 8자리 이상이면서 대문자, 소문자, 숫자, 특수문자 중 3가지를 포함해야 합니다.",
      notEasyPassword: (value: string) =>
        !/(\d)\1{2}/.test(value) ||
        "비밀번호에 일련번호나 쉬운 숫자 패턴이 포함되어서는 안 됩니다.",
    },
  };

  return (
    <div className="w-full h-screen max-w-md mx-auto space-y-8 flex flex-col justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nickname">닉네임</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              {...register("nickname", { required: "닉네임을 입력하세요" })}
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
              {...register("email", { required: "이메일을 입력하세요" })}
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
          <label htmlFor="isSeller">판매자 계정으로 가입하기</label>
          <input type="checkbox" {...register("isSeller")} className="ml-2" />
        </div>
        <Button type="submit" className="w-full">
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
