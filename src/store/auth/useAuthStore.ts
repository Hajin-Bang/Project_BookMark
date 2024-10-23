import { create } from "zustand";
import Cookies from "js-cookie";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export interface User {
  uid: string;
  nickname: string;
  email: string;
  isSeller: boolean;
}
interface AuthState {
  user: User | null;
  isLogin: boolean;
  loading: boolean;
  setUser: (userData: User) => void;
  setIsLogin: (isLogin: boolean) => void;
  logout: () => void;
  checkLoginStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  loading: true,

  setUser: (userData) => {
    set({
      user: userData,
      isLogin: true,
      loading: false,
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
      loading: false,
    });
  },

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      const auth = getAuth();
      // 인증 상태 확인: onAuthStateChanged
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              set({
                user: {
                  uid: user.uid,
                  email: user.email || "",
                  nickname: userData.nickname,
                  isSeller: userData.isSeller,
                },
                isLogin: true,
                loading: false,
              });
            }
          } catch (error) {
            console.error("유저 정보 불러오기 실패", error);
            set({ user: null, isLogin: false, loading: false });
          }
        } else {
          set({ user: null, isLogin: false, loading: false });
        }
      });
    } else {
      set({ isLogin: false, user: null, loading: false });
    }
  },
}));
