import LogoutModal from "@/components/auth/LogoutModal";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { useModalState } from "@/hooks/useModalState";
import Button from "@design-system/button/Button";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModalState();

  const handleManageClick = () => navigate("/manage");
  const handleAddProductClick = () => navigate("/manage/add");
  const handleOrderManageClick = () => navigate("/manage/orders");

  return (
    <Layout authStatus={authStatusType.ONLY_SELLER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div className="w-full flex flex-col">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2 ">
            관리자 페이지
          </h2>
          <div className="ml-56 mr-56 flex flex-col items-center gap-6 mt-10">
            <Button
              full
              priority="custom"
              className="bg-slate-400 text-white hover:bg-slate-500"
              onClick={handleManageClick}
            >
              판매중인 도서
            </Button>
            <Button
              full
              priority="custom"
              className="bg-slate-400 text-white hover:bg-slate-500"
              onClick={handleAddProductClick}
            >
              판매 도서 추가
            </Button>
            <Button
              full
              priority="custom"
              className="bg-slate-400 text-white hover:bg-slate-500"
              onClick={handleOrderManageClick}
            >
              판매 내역 관리
            </Button>
            <Button
              full
              priority="custom"
              className="bg-slate-400 text-white hover:bg-slate-500"
              onClick={openModal}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </main>

      <LogoutModal open={isOpen} onOpenChange={closeModal} />
    </Layout>
  );
};

export default Management;
