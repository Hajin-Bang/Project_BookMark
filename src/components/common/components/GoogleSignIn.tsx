import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuthStore();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("유저 정보를 찾을 수 없습니다.");
      }
      const userData = userDoc.data();

      if (token) {
        Cookies.set("accessToken", token, { expires: 7 });
      } else {
        console.error("토큰을 가져오지 못했습니다.");
      }

      setUser({
        uid: user.uid,
        email: user.email || "",
        nickname: userData.nickname,
        isSeller: userData.isSeller,
      });
      setIsLogin(true);

      if (userData.isSeller) {
        navigate("/manage");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Google 로그인 실패", error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} className="w-full">
      구글 이메일로 로그인하기
    </Button>
  );
};
