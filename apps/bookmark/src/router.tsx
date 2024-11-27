import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/common/components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyPage = lazy(() => import("./pages/MyPage"));
const ProductsManage = lazy(() => import("./pages/ProductsManage"));
const ProductAdd = lazy(() => import("./pages/ProductAdd"));
const ProductUpdateDelete = lazy(() => import("./pages/ProductUpdateDelete"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Management = lazy(() => import("./pages/Management"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const SellerHistory = lazy(() => import("./pages/SellerHistory"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* 누구나 접근 가능한 공용 페이지 */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category/:category" element={<ProductCategory />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* 구매자 전용 페이지 */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />

          {/* 판매자 전용 페이지 */}
          <Route path="/manage" element={<ProductsManage />} />
          <Route path="/manage/add" element={<ProductAdd />} />
          <Route
            path="/manage/edit/:productId"
            element={<ProductUpdateDelete />}
          />
          <Route path="/manage/options" element={<Management />} />
          <Route path="/manage/orders" element={<SellerHistory />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
