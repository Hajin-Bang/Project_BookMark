import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Skeleton } from "./components/ui/skeleton";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const MyPage = lazy(() => import("./pages/MyPage"));
const ProductsManage = lazy(() => import("./pages/ProductsManage"));
const ProductAdd = lazy(() => import("./pages/ProductAdd"));
const ProductUpdateDelete = lazy(() => import("./pages/ProductUpdateDelete"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Skeleton className="w-24 h-8" />}>
        <Routes>
          {/* 누구나 접근 가능한 공용 페이지 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category/:category" element={<ProductCategory />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* 구매자 전용 페이지 */}
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
