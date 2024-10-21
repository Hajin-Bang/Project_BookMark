import { useEffect } from "react";
import "./App.css";
import AppRouter from "@/router";
import { useAuthStore } from "./store/auth/useAuthStore";

function App() {
  const { checkLoginStatus, isLogin, user } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    console.log("현재 로그인 상태:", isLogin);
    console.log("유저 정보:", user);
  }, [isLogin, user]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
