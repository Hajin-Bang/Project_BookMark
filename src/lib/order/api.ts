import { db } from "@/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDocs,
  orderBy,
  query,
  runTransaction,
  Transaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { CreateOrderParams } from "./types";

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

// 주문 생성 및 재고 감소 트랜잭션 처리
export const addOrderAPI = async (orderData: CreateOrderParams) => {
  const orderCollectionRef = collection(db, "orders");
  const orderRef = doc(orderCollectionRef);

  // 트랜잭션 실행
  await runTransaction(db, async (transaction) => {
    const productSnapshots = await Promise.all(
      orderData.orderItems.map(async (item) => {
        const productRef = doc(db, "products", item.productId);
        const productDoc = await transaction.get(productRef);

        if (!productDoc.exists()) {
          throw new Error(`상품이 존재하지 않습니다: ${item.productId}`);
        }

        decreaseProductStock(productDoc, item.quantity, transaction);

        const productData = productDoc.data();

        return {
          productId: item.productId,
          productName: item.productName ?? "상품 이름 없음",
          productPrice: item.productPrice ?? 0,
          quantity: item.quantity ?? 1,
          productImage: item.productImage || [],
          sellerId: productData?.sellerId ?? "알 수 없는 판매자",
        };
      })
    );

    const sellerIds = Array.from(
      new Set(productSnapshots.map((productItem) => productItem.sellerId))
    );

    const cleanedOrderData = {
      userId: orderData.userId ?? "알 수 없는 사용자",
      orderItems: productSnapshots,
      totalAmount: orderData.totalAmount ?? 0,
      createdAt: new Date(),
      status: "주문 완료",
      sellerIds,
    };

    transaction.set(orderRef, cleanedOrderData);
  });
};

export const fetchOrdersAPI = async ({
  userId,
  sellerId,
}: {
  userId?: string;
  sellerId?: string;
}) => {
  const ordersRef = collection(db, "orders");

  if (!userId && !sellerId) {
    throw new Error("userId 또는 sellerId 중 하나는 필요합니다.");
  }

  const condition = userId
    ? where("userId", "==", userId)
    : where("sellerIds", "array-contains", sellerId);
  const q = query(ordersRef, condition, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    return {
      orderId: docSnapshot.id,
      items: data.orderItems || [],
      totalAmount: data.totalAmount,
      createdAt: data.createdAt,
      status: data.status,
    };
  });
};

export const cancelOrderAPI = async (orderId: string) => {
  const orderRef = doc(db, "orders", orderId);

  await updateDoc(orderRef, {
    status: "주문 취소",
    canceledAt: new Date(),
  });
};

export const updateOrderStatusAPI = async (
  orderId: string,
  newStatus: string
) => {
  const orderRef = doc(db, "orders", orderId);

  await updateDoc(orderRef, {
    status: newStatus,
    updatedAt: new Date(),
  });
};
