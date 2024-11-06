import { storage } from "@/firebase";
import imageCompression from "browser-image-compression";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const imageCompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
  fileType: "image/webp",
};

export const compressAndConvertImage = async (file: File): Promise<Blob> => {
  return await imageCompression(file, imageCompressionOptions);
};

export const uploadImageToFirebase = async (
  file: Blob,
  fileName: string
): Promise<string> => {
  const storageRef = ref(storage, `images/${fileName}.webp`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteImageFormFirebaes = async (url: string): Promise<void> => {
  const imageRef = ref(storage, url);
  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error(`이미지 삭제 실패: ${url}`, error);
  }
};
