import { useAuthStore } from "@/store/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersAPI } from "../api";

export const useFetchOrder = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["orders", user?.uid],
    queryFn: ({ queryKey }) => {
      const userId = queryKey[1] as string; // queryKey의 두 번째 값이 user?.uid
      if (!userId) {
        throw new Error("로그인이 필요합니다.");
      }
      return fetchOrdersAPI({ uid: userId });
    },
    enabled: !!user,
  });
};
