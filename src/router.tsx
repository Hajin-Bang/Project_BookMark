import HomePage from "@/components/pages/HomePage";
import CartPage from "@/components/pages/CartPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import SignIn from "@/components/pages/SignIn";
import ManageMainPage from "@/components/pages/ManageMainPage";
import MyPage from "@/components/pages/MyPage";
import SignUp from "@/components/pages/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/auth/useAuthStore";

const AppRouter = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 접근 가능한 공용 페이지 */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signin"
          element={
            !isAuthenticated ? (
              <SignIn />
            ) : (
              <Navigate to={user?.isSeller ? "/manage" : "/"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUp />
            ) : (
              <Navigate to={user?.isSeller ? "/manage" : "/"} />
            )
          }
        />

        {/* 구매자 전용 페이지 */}
        <Route
          path="/cart"
          element={
            isAuthenticated && !user?.isSeller ? (
              <CartPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            isAuthenticated && !user?.isSeller ? (
              <CheckoutPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/mypage"
          element={
            isAuthenticated && !user?.isSeller ? (
              <MyPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* 판매자 전용 페이지 */}
        <Route
          path="/manage"
          element={
            isAuthenticated && user?.isSeller ? (
              <ManageMainPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
