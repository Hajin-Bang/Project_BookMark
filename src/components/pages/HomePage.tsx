import { useAuthStore } from "@/store/auth/useAuthStore";

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <h1>도서 탐색 메인 페이지</h1>
      {user ? (
        <h2>{user.nickname}님 안녕하세요!</h2> // 로그인된 사용자의 nickname 표시
      ) : (
        <h2>로그인을 해주세요.</h2> // 로그인이 안 된 경우
      )}
    </div>
  );
};

export default HomePage;
