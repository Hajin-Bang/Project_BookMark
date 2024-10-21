import { useAuthStore } from "@/store/auth/useAuthStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  ONLY_SELLER: "ONLY_SELLER",
  ONLY_BUYER: "ONLY_BUYER",
  COMMON: "COMMON",
};

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
  authStatus?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName = "",
  authStatus = authStatusType.COMMON,
}) => {
  const { isLogin, user, loading } = useAuthStore();

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 화면 표시
  }

  // 로그인 필요하고 로그인 안 되어 있으면 로그인 페이지로 이동
  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to="/signin" />;
  }

  // 로그인하지 않은 유저가 접근 가능한 페이지(로그인 페이지 등)
  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={user?.isSeller ? "/manage" : "/"} />;
  }

  // 판매자 전용 페이지 접근 시, 판매자가 아니면 리다이렉트
  if (authStatus === authStatusType.ONLY_SELLER) {
    if (!isLogin) {
      return <Navigate to="/signin" />;
    }
    if (isLogin && !user?.isSeller) {
      return <Navigate to="/" />;
    }
  }

  // 구매자 전용 페이지 접근 시, 구매자가 아니면 리다이렉트
  if (authStatus === authStatusType.ONLY_BUYER) {
    if (!isLogin) {
      return <Navigate to="/signin" />;
    }
    if (isLogin && user?.isSeller) {
      return <Navigate to="/manage" />;
    }
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen ">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
