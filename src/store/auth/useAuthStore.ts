import { create } from "zustand";

interface User {
  uid: string;
  nickname: string;
  email: string;
  isSeller: boolean;
}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (userData) =>
    set({
      user: {
        uid: userData.uid,
        email: userData.email,
        nickname: userData.nickname,
        isSeller: userData.isSeller,
      },
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
