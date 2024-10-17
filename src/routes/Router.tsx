import HomePage from "@/components/pages/HomePage";
import CartPage from "@/components/pages/CartPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import LoginPage from "@/components/pages/LoginPage";
import ManageMainPage from "@/components/pages/ManageMainPage";
import MyPage from "@/components/pages/MyPage";
import SignInPage from "@/components/pages/SignInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 접근 가능한 공용 페이지 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* 구매자 전용 페이지 */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 판매자 전용 페이지 */}
        <Route path="/manage" element={<ManageMainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
