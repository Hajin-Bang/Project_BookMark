import { db } from "@/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  runTransaction,
  Transaction,
} from "firebase/firestore";

interface OrderItem {
  productId: string;
  quantity: number;
  productPrice: number;
}

export interface CreateOrderParams {
  userId: string;
  orderItems: OrderItem[];
  totalAmount: number;
}

// 상품 재고 감소
export const decreaseProductStock = (
  productSnapshot: DocumentSnapshot,
  quantity: number,
  transaction: Transaction
) => {
  const productData = productSnapshot.data();
  const newQuantity = productData?.productQuantity - quantity;

  if (newQuantity < 1) {
    throw new Error("재고가 부족합니다.");
  }

  const productRef = productSnapshot.ref;
  transaction.update(productRef, {
    productQuantity: newQuantity,
    updatedAt: new Date(),
  });
};

export const addOrderAPI = async (orderData: CreateOrderParams) => {
  const orderCollectionRef = collection(db, "orders");
  const orderRef = doc(orderCollectionRef);

  await runTransaction(db, async (transaction) => {
    const productSnapshots = await Promise.all(
      orderData.orderItems.map((item) =>
        transaction.get(doc(db, "products", item.productId))
      )
    );

    // 재고가 충분한지 확인
    productSnapshots.forEach((productSnapshot, index) => {
      if (!productSnapshot.exists()) {
        throw new Error("상품이 존재하지 않습니다.");
      }

      decreaseProductStock(
        productSnapshot,
        orderData.orderItems[index].quantity,
        transaction
      );
    });

    // 주문 정보 생성
    transaction.set(orderRef, {
      ...orderData,
      createdAt: new Date(),
      status: "pending",
    });
  });
};
