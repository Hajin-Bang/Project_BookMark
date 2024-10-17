import { db } from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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

  const onSubmit = async (data: SignInFormValues) => {
    const { email, password } = data;
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      console.log("UID:", user.uid); // Firebase UID 출력
      console.log("Firestore 문서 존재 여부:", userDoc.exists());

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData?.isSeller) {
          navigate("/manage");
        } else {
          navigate("/");
        }
      } else {
        console.log("사용자 데이터가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  const handleClickSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="-full h-screen max-w-md mx-auto space-y-8 flex flex-col justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
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

        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
      <Button variant="outline" className="w-full" onClick={handleClickSignUp}>
        회원가입
      </Button>
    </div>
  );
};

export default SignIn;
