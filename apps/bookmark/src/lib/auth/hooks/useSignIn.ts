import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { signInAPI } from "../api";
import { SignInData, UserData } from "../types";

const useSignIn = () => {
  const { setIsLogin, setUser } = useAuthStore();

  return useMutation<UserData, Error, SignInData>({
    mutationFn: signInAPI,
    onSuccess: (userData: UserData) => {
      setIsLogin(true);
      setUser(userData);
      // Toast
    },
    onError: (error: Error) => {
      console.error("로그인 실패", error);
      // Toast
    },
  });
};

export default useSignIn;
