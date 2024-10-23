import { db } from "@/firebase";
import { User } from "@/store/auth/useAuthStore";
import { CartItem } from "@/store/cart/useCartStore";
import { Product } from "@/store/product/useProductStore";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

export const addCartAPI = async (
  product: Product,
  user: User
): Promise<CartItem> => {
  return await runTransaction(db, async (transaction) => {
    const cartRef = collection(db, "carts", user.uid, "cartItems");
    const newCartItemRef = doc(cartRef);
    const newCartItem: CartItem = {
      ...product,
      productId: product.productId,
      quantity: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    transaction.set(newCartItemRef, newCartItem);
    return newCartItem;
  });
};

export const deleteCartAPI = async (productId: string, user: User) => {
  return await runTransaction(db, async (transaction) => {
    const cartItemRef = doc(db, "carts", user.uid, "cartItems", productId);
    transaction.delete(cartItemRef);
  });
};
