import { create } from "zustand";
import Cookies from "js-cookie";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface User {
  uid: string;
  nickname: string;
  email: string;
  isSeller: boolean;
}
interface AuthState {
  user: User | null;
  isLogin: boolean;
  registerStatus: "idle" | "loading" | "error";
  registerError: string | null;
  setUser: (userData: User) => void;
  setIsLogin: (isLogin: boolean) => void;
  logout: () => void;
  checkLoginStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  registerStatus: "idle",
  registerError: null,

  setUser: (userData) => {
    set({
      user: userData,
      isLogin: true,
    });
  },
  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  logout: () => {
    Cookies.remove("accessToken");
    set({
      user: null,
      isLogin: false,
    });
  },

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      const auth = getAuth();
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log("Firestore에서 가져온 유저 데이터:", userData);

              set({
                user: {
                  uid: currentUser.uid,
                  email: currentUser.email || "",
                  nickname: userData.nickname,
                  isSeller: userData.isSeller,
                },
                isLogin: true,
              });
            } else {
              set({
                user: null,
                isLogin: false,
              });
              console.error("유저 정보를 찾을 수 없습니다.");
            }
          } catch (error) {
            console.error(
              "Firestore에서 유저 정보를 가져오는 중 에러 발생",
              error
            );
            set({ user: null, isLogin: false });
          }
        } else {
          set({ user: null, isLogin: false });
        }
      });
    } else {
      set({ isLogin: false, user: null });
    }
  },
}));
