import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

const ManagementPage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleManageClick = () => {
    navigate("/manage");
  };

  const handleAddProductClick = () => {
    navigate("/manage/add");
  };

  const handleOrderManageClick = () => {
    navigate("/manage/orders");
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div className="w-full flex flex-col">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2 ">
            관리자 페이지
          </h2>
          <div className="w-full flex flex-col items-center gap-6 mt-10">
            <Button
              className="w-1/2 h-12 bg-slate-400"
              onClick={handleManageClick}
            >
              판매중인 도서
            </Button>
            <Button
              className="w-1/2 h-12 bg-slate-400"
              onClick={handleAddProductClick}
            >
              판매 도서 추가
            </Button>
            <Button
              className="w-1/2 h-12 bg-slate-400"
              onClick={handleOrderManageClick}
            >
              판매 내역 관리
            </Button>
            <Button className="w-1/2 h-12 bg-slate-400" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ManagementPage;
