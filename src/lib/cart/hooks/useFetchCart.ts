import { useAuthStore } from "@/store/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "../api";
import { CartItem } from "../types";

export const useFetchCart = () => {
  const { user } = useAuthStore();

  const {
    data: cartItems = [],
    isLoading,
    error,
  } = useQuery<CartItem[]>({
    queryKey: ["cartItems", user?.uid],
    queryFn: () => fetchCartItems(user!),
    enabled: !!user,
  });

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  return { cartItems, totalQuantity, totalPrice, isLoading, error };
};
