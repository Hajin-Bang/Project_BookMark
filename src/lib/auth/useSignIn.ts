import { db } from "@/firebase";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";

interface UserData {
  uid: string;
  email: string;
  nickname: string;
  isSeller: boolean;
}

interface SignInData {
  email: string;
  password: string;
}

const useSignIn = () => {
  const { setIsLogin, setUser } = useAuthStore();

  return useMutation<UserData, Error, SignInData>({
    mutationFn: async ({ email, password }: SignInData) => {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("계정 정보를 찾을 수 없습니다.");
      }

      const userData = userDoc.data();
      const token = await user.getIdToken();

      Cookies.set("accessToken", token, { expires: 7 });

      return {
        uid: user.uid,
        email: user.email || "",
        nickname: userData.nickname,
        isSeller: userData.isSeller,
        accessToken: token,
      };
    },
    onSuccess: (userData: UserData) => {
      setIsLogin(true);
      setUser(userData);
    },
    onError: (error: Error) => {
      console.error("로그인 실패", error);
    },
  });
};

export default useSignIn;
