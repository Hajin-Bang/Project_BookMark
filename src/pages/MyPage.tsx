import { authStatusType, Layout } from "@/components/common/components/Layout";
import { NavigationBar } from "@/components/common/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth/useAuthStore";

const MyPage = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <Layout authStatus={authStatusType.ONLY_BUYER}>
      <NavigationBar />
      <main className="w-full flex flex-col items-center gap-6 mt-12 px-8">
        <div className="w-full flex flex-col">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-2 ">
            마이페이지
          </h2>
          <div className="w-full flex flex-col items-center gap-6 mt-10">
            <Button className="w-1/2 h-12 bg-slate-400">구매 내역 보기</Button>
            <Button className="w-1/2 h-12 bg-slate-400" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default MyPage;
