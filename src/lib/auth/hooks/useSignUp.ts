import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "../api";
import { SignUpFormValues, UserData } from "../types";

export const useSignUp = () => {
  const { setUser, setIsLogin } = useAuthStore();
  const navigate = useNavigate();

  return useMutation<UserData, Error, SignUpFormValues>({
    mutationFn: signUpAPI,
    onSuccess: (userData: UserData) => {
      setUser(userData);
      setIsLogin(true);
      // Toast

      if (userData.isSeller) {
        navigate("/manage");
      } else {
        navigate("/");
      }
    },
    onError: (error: Error) => {
      console.error("회원가입 중 오류가 발생했습니다.", error.message);
      // Toast
    },
  });
};
