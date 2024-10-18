import { useEffect } from "react";
import "./App.css";
import AppRouter from "@/router";
import { useAuthStore } from "./store/auth/useAuthStore";

function App() {
  const { checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
