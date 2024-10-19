import { useAuthStore } from "@/store/auth/useAuthStore";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>도서 탐색 메인 페이지</h1>
      {user ? (
        <div>
          <h2>{user.nickname}님 안녕하세요!</h2>{" "}
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
      ) : (
        <h2>로그인을 해주세요.</h2>
      )}
    </div>
  );
};

export default HomePage;
