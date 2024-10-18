import { db } from "@/firebase";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface SignUpFormValues {
  email: string;
  password: string;
  nickname: string;
  isSeller: boolean;
}

interface UserData {
  uid: string;
  email: string;
  nickname: string;
  isSeller: boolean;
}

export const useSignUp = () => {
  const { setUser, setIsLogin } = useAuthStore();
  const navigate = useNavigate();

  return useMutation<UserData, Error, SignUpFormValues>({
    mutationFn: async ({
      email,
      password,
      nickname,
      isSeller,
    }: SignUpFormValues) => {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nickname,
        email: user.email,
        isSeller,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const token = await user.getIdToken();
      Cookies.set("accessToken", token, { expires: 7 });

      return {
        uid: user.uid,
        email: user.email || "",
        nickname,
        isSeller,
      };
    },
    onSuccess: (userData: UserData) => {
      setUser(userData);
      setIsLogin(true);

      if (userData.isSeller) {
        navigate("/manage");
      } else {
        navigate("/");
      }
    },
    onError: (error: Error) => {
      console.error("회원가입 중 오류가 발생했습니다.", error.message);
    },
  });
};
