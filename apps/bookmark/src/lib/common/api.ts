import { storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const uploadImageToFirebase = async (
  file: Blob,
  fileName: string
): Promise<string> => {
  const storageRef = ref(storage, `images/${fileName}.webp`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteImageFromFirebase = async (url: string): Promise<void> => {
  const imageRef = ref(storage, url);
  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error(`이미지 삭제 실패: ${url}`, error);
  }
};
