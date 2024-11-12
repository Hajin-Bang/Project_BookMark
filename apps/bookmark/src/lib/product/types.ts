import { FieldValue } from "firebase/firestore";

export interface Product {
  productId: string;
  sellerId: string;
  productName: string;
  productAuthor: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: string;
  productImage: string[];
  createdAt: string | FieldValue | Date;
  updatedAt: string | FieldValue | Date;
}
