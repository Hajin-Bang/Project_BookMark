import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyPage from "./pages/MyPage";
import ProductsManage from "./pages/ProductsManage";
import ProductAdd from "./pages/ProductAdd";
import ProductUpdateDelete from "./pages/ProductUpdateDelete";

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
        <Route
          path="/manage/edit/:productId"
          element={<ProductUpdateDelete />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
