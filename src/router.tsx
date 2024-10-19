import HomePage from "./components/pages/HomePage";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import CartPage from "@/components/pages/CartPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import MyPage from "@/components/pages/MyPage";
import ProductAdd from "./components/pages/ProductAdd";
import ProductsManage from "./components/pages/ProductsManage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 접근 가능한 공용 페이지 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 구매자 전용 페이지 */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 판매자 전용 페이지 */}
        <Route path="/manage" element={<ProductsManage />} />
        <Route path="/manage/add" element={<ProductAdd />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
