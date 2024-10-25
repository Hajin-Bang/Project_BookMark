import { db } from "@/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  setDoc,
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

export const addOrderAPI = async (orderData: CreateOrderParams) => {
  const orderCollectionRef = collection(db, "orders");
  const orderRef = doc(orderCollectionRef);

  const productSnapshots = await Promise.all(
    orderData.orderItems.map(async (item) => {
      const productDoc = await getDoc(doc(db, "products", item.productId));

      if (!productDoc.exists()) {
        throw new Error(`상품이 존재하지 않습니다: ${item.productId}`);
      }

      const productData = productDoc.data();

      if (!productData?.sellerId) {
        throw new Error(`상품의 판매자 ID가 없습니다: ${item.productId}`);
      }

      return {
        productId: item.productId,
        productName: item.productName ?? "상품 이름 없음",
        productPrice: item.productPrice ?? 0,
        quantity: item.quantity ?? 1,
        productImage: item.productImage || [],
        sellerId: productData.sellerId ?? "알 수 없는 판매자",
      };
    })
  );

  const sellerIds = Array.from(
    new Set(productSnapshots.map((productItem) => productItem.sellerId))
  );

  // 주문 데이터 생성
  const cleanedOrderData = {
    userId: orderData.userId ?? "알 수 없는 사용자",
    orderItems: productSnapshots.map((productItem) => ({
      productId: productItem.productId,
      productName: productItem.productName,
      productPrice: productItem.productPrice,
      quantity: productItem.quantity,
      sellerId: productItem.sellerId,
      productImage: productItem.productImage,
    })),
    totalAmount: orderData.totalAmount ?? 0,
    createdAt: new Date(),
    status: "주문 완료",
    sellerIds,
  };

  await setDoc(orderRef, cleanedOrderData);
};

export const fetchOrdersAPI = async ({
  userId,
  sellerId,
}: {
  userId?: string;
  sellerId?: string;
}) => {
  if (userId) {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const orders = querySnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        orderId: docSnapshot.id,
        items: data.orderItems || [],
        totalAmount: data.totalAmount,
        createdAt: data.createdAt,
        status: data.status,
      };
    });

    return orders;
  } else if (sellerId) {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("sellerIds", "array-contains", sellerId));
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
        status: data.status,
        createdAt: data.createdAt,
      };
    });
  } else {
    throw new Error("userId 또는 sellerId 중 하나는 필요합니다.");
  }
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
