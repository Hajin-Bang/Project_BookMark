import { db } from "@/firebase";
import { CartItem } from "@/store/cart/useCartStore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { UserData } from "../auth/types";
import { Product } from "../product/types";

export const addCartAPI = async (
  product: Product,
  user: UserData
): Promise<CartItem> => {
  return await runTransaction(db, async (transaction) => {
    const newCartItemRef = doc(
      db,
      "carts",
      user.uid,
      "cartItems",
      product.productId
    );
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

export const deleteCartAPI = async (
  productId: string,
  userId: string | undefined
) => {
  try {
    if (!userId) {
      console.error("사용자 인증 안됨");
      return;
    }

    const cartItemRef = doc(db, "carts", userId, "cartItems", productId);
    await deleteDoc(cartItemRef);
  } catch (error) {
    console.error(`상품 ID: ${productId} 삭제 중 오류 발생`, error);
    throw error;
  }
};

export const fetchCartItems = async (user: UserData): Promise<CartItem[]> => {
  const cartRef = collection(db, "carts", user.uid, "cartItems");
  const cartSnapshot = await getDocs(cartRef);
  const cartItems: CartItem[] = cartSnapshot.docs.map(
    (doc) => doc.data() as CartItem
  );

  return cartItems;
};

export const updateCartQuantityAPI = async (
  productId: string,
  user: UserData,
  newQuantity: number
): Promise<void> => {
  const cartItemRef = doc(db, "carts", user.uid, "cartItems", productId);

  return await runTransaction(db, async (transaction) => {
    const cartItemSnapshot = await transaction.get(cartItemRef);
    if (!cartItemSnapshot.exists()) {
      throw new Error("해당 장바구니 항목이 존재하지 않습니다.");
    }

    transaction.update(cartItemRef, { quantity: newQuantity });
  });
};
