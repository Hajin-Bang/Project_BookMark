import { useAuthStore } from "@/store/auth/useAuthStore";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

export const NavigationBar = () => {
  const navigate = useNavigate();

  const { isLogin, logout } = useAuthStore();

  const handleLogin = () => {
    navigate("/signin");
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="fixed left-0 top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold cursor-pointer">책갈피</h1>
            <div className="flex items-center space-x-4">
              {isLogin ? (
                <div className="flex items-center space-x-4">
                  <ShoppingCart className="h-5 w-5" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-dark"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-dark"
                  onClick={handleLogin}
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
