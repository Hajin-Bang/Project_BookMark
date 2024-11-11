import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/lib/common/api";
import { compressAndConvertImage } from "@/lib/common/utils";
import { useEffect, useState } from "react";

export const useImageUploader = (initialImages: string[] = []) => {
  const [imageURLs, setImageURLs] = useState<string[]>(initialImages);
  const [firebaseImageURLs, setFirebaseImageURLs] = useState<string[]>([]);

  useEffect(() => {
    if (initialImages.length > 0) {
      setImageURLs(initialImages);
      setFirebaseImageURLs(initialImages);
    }
  }, [initialImages]);

  const uploadImages = async (files: FileList | null) => {
    if (!files) return;

    const newImageUrls: string[] = [];
    const firebaseUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const compressedImage = await compressAndConvertImage(file);

        const blobUrl = URL.createObjectURL(compressedImage);
        newImageUrls.push(blobUrl);

        const firebaseUrl = await uploadImageToFirebase(
          compressedImage,
          file.name.split(".")[0]
        );
        firebaseUrls.push(firebaseUrl);
      } catch (error) {
        console.error("이미지 업로드 중 에러 발생:", error);
      }
    }

    setImageURLs((prevURLs) => [...prevURLs, ...newImageUrls]);
    setFirebaseImageURLs((prevURLs) => [...prevURLs, ...firebaseUrls]);
  };

  const removeImage = async (index: number) => {
    const imageUrlToDelete = firebaseImageURLs[index];
    const updatedImageURLs = imageURLs.filter((_, i) => i !== index);
    const updatedFirebaseImageURLs = firebaseImageURLs.filter(
      (_, i) => i !== index
    );

    setImageURLs(updatedImageURLs);
    setFirebaseImageURLs(updatedFirebaseImageURLs);

    try {
      await deleteImageFromFirebase(imageUrlToDelete);
    } catch (error) {
      console.error("이미지 삭제 중 에러 발생:", error);
    }
  };

  return { imageURLs, firebaseImageURLs, uploadImages, removeImage };
};
