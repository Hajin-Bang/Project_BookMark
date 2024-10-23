import { useAuthStore } from "@/store/auth/useAuthStore";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { isLogin, logout, user } = useAuthStore();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogin = () => {
    navigate("/signin");
  };
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleCartClick = () => {
    setCartOpen((prev) => !prev);
  };

  const handleCartClose = () => {
    setCartOpen(false); // 드로어 닫기
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <>
      <nav className="fixed left-0 top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1
              onClick={() => navigate("/")}
              className="text-xl font-bold cursor-pointer"
            >
              책갈피
            </h1>
            <div className="flex items-center space-x-4">
              {!isLogin && (
                <>
                  <ShoppingCart
                    onClick={handleCartClick}
                    className="h-5 w-5 cursor-pointer"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-dark"
                    onClick={handleLogin}
                  >
                    로그인
                  </Button>
                </>
              )}
              {isLogin && user && !user.isSeller && (
                <>
                  <ShoppingCart
                    onClick={handleCartClick}
                    className="h-5 w-5 cursor-pointer"
                  />
                  <User
                    className="h-5 w-5 cursor-pointer"
                    onClick={handleMyPageClick}
                  />
                  <LogOut
                    onClick={handleLogout}
                    className="h-5 w-5 cursor-pointer"
                  />
                </>
              )}
              {isLogin && user && user.isSeller && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-dark text-red-500"
                  >
                    계정 관리
                  </Button>
                  <LogOut
                    onClick={handleLogout}
                    className="h-5 w-5 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-16">
        <CartDrawer isOpen={cartOpen} onClose={handleCartClose} />
      </div>
    </>
  );
};
