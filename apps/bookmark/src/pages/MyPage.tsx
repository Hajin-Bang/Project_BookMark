import LogoutModal from "@/components/auth/LogoutModal";
import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import Button from "@design-system/button/Button";
import { useModalContext } from "@design-system/modal/ModalContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalContext();

  const handleLogout = () => {
    openModal();
  };

  const handleOrderList = () => {
    navigate("/orders");
  };
  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div className="w-full flex flex-col">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2 ">
            마이페이지
          </h2>
          <div className="ml-56 mr-56 flex flex-col items-center gap-6 mt-10">
            <Button
              onClick={handleOrderList}
              full
              priority="custom"
              className="bg-slate-400 text-white hover:bg-slate-500"
            >
              구매 내역 보기
            </Button>
            <Button
              full
              onClick={handleLogout}
              priority="custom"
              className="bg-slate-400 text-white hover:bg-slate-500"
            >
              로그아웃
            </Button>
          </div>
        </div>
      </main>

      <LogoutModal />
    </Layout>
  );
};

export default MyPage;
