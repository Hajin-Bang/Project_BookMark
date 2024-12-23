import { db, storage } from "@/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
  OrderByDirection,
  serverTimestamp,
  doc,
  updateDoc,
  runTransaction,
  Transaction,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Product } from "./types";
import { deleteObject, ref } from "firebase/storage";

export const addProductAPI = async (product: Product): Promise<Product> => {
  const productRef = collection(db, "products");

  return await runTransaction(db, async (transaction: Transaction) => {
    const newDocRef = doc(productRef);

    const newProductData = {
      ...product,
      productId: newDocRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    transaction.set(newDocRef, newProductData);

    return newProductData;
  });
};

export const fetchProducts = async (
  options: {
    category?: string;
    order?: string;
    sellerId?: string;
    productId?: string;
    limit?: number;
  },
  pageParam: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  products: Product[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const productRef = collection(db, "products");

    const [orderField, orderDirection] = options.order?.split("/") || [
      "createdAt",
      "desc",
    ];

    let q = query(
      productRef,
      orderBy(orderField, orderDirection as OrderByDirection)
    );

    // 카테고리 필터
    if (options.category) {
      q = query(q, where("productCategory", "==", options.category));
    }

    // 판매자 필터
    if (options.sellerId) {
      q = query(q, where("sellerId", "==", options.sellerId));
    }

    // 특정 상품 ID
    if (options.productId) {
      q = query(q, where("productId", "==", options.productId));
    }

    // 페이지네이션
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    // 개수 제한
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const querySnapshot = await getDocs(q);
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    const products: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Product;
      const createdAt = (data.createdAt as Timestamp)?.toDate();
      const updatedAt = (data.updatedAt as Timestamp)?.toDate();

      return {
        ...data,
        productId: doc.id,
        createdAt,
        updatedAt,
      } as Product;
    });

    return { products, lastVisible };
  } catch (error) {
    console.error("Firestore 쿼리 중 오류 발생:", error);
    return { products: [], lastVisible: null };
  }
};

export const updateProductAPI = async (product: Partial<Product>) => {
  const productRef = doc(db, "products", product.productId!);

  const existingProductSnapshot = await getDoc(productRef);
  if (!existingProductSnapshot.exists()) {
    throw new Error("수정할 상품을 찾을 수 없습니다.");
  }

  const existingProductData = existingProductSnapshot.data();
  const existingImageUrls: string[] = existingProductData.productImage || [];
  const newImageUrls: string[] = product.productImage || [];

  // 삭제된 이미지 URL 찾기
  const imagesToDelete = existingImageUrls.filter(
    (url) => !newImageUrls.includes(url)
  );

  // Firebase Storage에서 삭제된 이미지 파일 제거
  const deleteImagePromises = imagesToDelete.map(async (url) => {
    const imageRef = ref(storage, url);
    try {
      await deleteObject(imageRef);
    } catch (error) {
      console.error(`이미지 삭제 실패: ${url}`, error);
    }
  });

  await Promise.all(deleteImagePromises);

  await updateDoc(productRef, {
    ...(product.productName && { productName: product.productName }),
    ...(product.productAuthor && { productAuthor: product.productAuthor }),
    ...(product.productPrice && { productPrice: product.productPrice }),
    ...(product.productQuantity && {
      productQuantity: product.productQuantity,
    }),
    ...(product.productDescription && {
      productDescription: product.productDescription,
    }),
    ...(product.productCategory && {
      productCategory: product.productCategory,
    }),
    ...(product.productImage && { productImage: product.productImage }),
    updatedAt: new Date(),
  });

  const updatedDoc = await getDoc(productRef);
  if (updatedDoc.exists()) {
    return {
      ...updatedDoc.data(),
      productId: updatedDoc.id,
    } as Product;
  } else {
    throw new Error("업데이트된 제품 데이터를 찾을 수 없습니다.");
  }
};

export const fetchProductDetailsAPI = async (
  productId: string
): Promise<Product | null> => {
  try {
    const productDocRef = doc(db, "products", productId);
    const productDoc = await getDoc(productDocRef);

    if (!productDoc.exists()) {
      console.error("해당 상품이 존재하지 않습니다.");
      return null;
    }

    const data = productDoc.data();

    return {
      ...data,
      productId: productDoc.id,
    } as Product;
  } catch (error) {
    console.error("상품 조회 중 오류 발생", error);
    return null;
  }
};

export const deleteProductAPI = async (productId: string) => {
  const productRef = doc(db, "products", productId);
  const productSnapshot = await getDoc(productRef);

  if (!productSnapshot.exists()) {
    throw new Error("삭제할 상품을 찾을 수 없습니다.");
  }

  const productData = productSnapshot.data();
  const imageUrls: string[] = productData.productImage || [];

  const deleteImagePromises = imageUrls.map(async (url) => {
    const imageRef = ref(storage, url);
    try {
      await deleteObject(imageRef);
    } catch (error) {
      console.error(`이미지 삭제 실패 ${url}`, error);
    }
  });

  await Promise.all(deleteImagePromises);

  await deleteDoc(productRef);

  return productId;
};
