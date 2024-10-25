import { db } from "@/firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  runTransaction,
  Transaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { CreateOrderParams, OrderItem } from "./types";

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
      status: "주문 완료",
    });
  });
};

export const fetchOrdersAPI = async ({ uid }: { uid: string }) => {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  // 주문 목록에 대한 정보를 모두 가져옴
  const orders = await Promise.all(
    querySnapshot.docs.map(async (docSnapshot) => {
      const data = docSnapshot.data();

      // 주문된 각 상품에 대한 정보를 모두 가져옴
      const items: OrderItem[] = await Promise.all(
        data.orderItems.map(async (item: OrderItem) => {
          // 각 상품에 대한 데이터 참조
          const productDocRef = doc(db, "products", item.productId);
          const productSnapshot = await getDoc(productDocRef);
          const productData = productSnapshot.data();

          if (!productData) {
            throw new Error(`상품 정보를 찾을 수 없습니다: ${item.productId}`);
          }

          // 각 판매자에 대한 정보 참조
          const sellerDocRef = doc(db, "users", productData.sellerId);
          const sellerSnapshot = await getDoc(sellerDocRef);
          const sellerData = sellerSnapshot.data();

          if (!sellerData) {
            throw new Error(
              `판매자 정보를 찾을 수 없습니다: ${productData.sellerId}`
            );
          }

          return {
            productId: item.productId,
            productName: productData.productName,
            productImage: productData.productImage,
            productPrice: item.productPrice,
            quantity: item.quantity,
            sellerName: sellerData.nickname || "판매자 정보 없음",
          };
        })
      );

      return {
        orderId: docSnapshot.id,
        items,
        totalAmount: data.totalAmount,
        createdAt: data.createdAt,
        status: data.status,
      };
    })
  );

  return orders;
};

export const cancelOrderAPI = async (orderId: string) => {
  const orderRef = doc(db, "orders", orderId);

  await updateDoc(orderRef, {
    status: "주문 취소",
    canceledAt: new Date(),
  });
};
