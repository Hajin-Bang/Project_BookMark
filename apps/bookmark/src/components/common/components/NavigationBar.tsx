import { useAuthStore } from "@/store/auth/useAuthStore";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import { useFetchCart } from "@/lib/cart/hooks/useFetchCart";
import Button from "@design-system/button/Button";
import { useModalContext } from "@design-system/modal/ModalContext";
import LogoutModal from "@/components/auth/LogoutModal";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { isLogin, logout, user } = useAuthStore();
  const [cartOpen, setCartOpen] = useState(false);
  const { totalQuantity } = useFetchCart();
  const { openModal } = useModalContext();

  const handleLogin = () => {
    navigate("/signin");
  };
  const handleLogout = () => {
    openModal();
  };

  const handleCartClick = () => {
    setCartOpen((prev) => !prev);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  const handleManagePageClick = () => {
    navigate("/manage/options");
  };

  return (
    <>
      <nav className="fixed left-0 top-0 w-full bg-white shadow-md z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-8 lg:px-16 h-16">
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
                  onClick={handleLogin}
                  className="font-extrabold"
                >
                  로그인
                </Button>
              </>
            )}
            {isLogin && user && !user.isSeller && (
              <>
                <div className="relative">
                  <ShoppingCart
                    onClick={handleCartClick}
                    className="h-5 w-5 cursor-pointer"
                  />
                  {totalQuantity > 0 && (
                    <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </div>
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
                  priority="important"
                  className="font-extrabold"
                  onClick={handleManagePageClick}
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
      </nav>

      <div className="mt-16">
        <CartDrawer isOpen={cartOpen} onClose={handleCartClose} />
      </div>

      <LogoutModal />
    </>
  );
};
