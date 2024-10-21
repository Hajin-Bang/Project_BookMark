import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const MyPage = lazy(() => import("./pages/MyPage"));
const ProductsManage = lazy(() => import("./pages/ProductsManage"));
const ProductAdd = lazy(() => import("./pages/ProductAdd"));
const ProductUpdateDelete = lazy(() => import("./pages/ProductUpdateDelete"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>로딩중 !</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
