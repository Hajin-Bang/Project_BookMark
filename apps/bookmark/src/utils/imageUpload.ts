import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const imageUpload = async (file: File): Promise<string | null> => {
  if (!file) return null;

  const fileName = `${file.name.split(".")[0]}_${Date.now()}`; // 파일 이름에 타임스탬프 추가
  const storageRef = ref(storage, `products/${fileName}`); // Firebase 경로 설정

  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
