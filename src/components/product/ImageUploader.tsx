import { useState, useEffect } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Input } from "../ui/input";
import { storage } from "@/firebase";

type ImageUploaderProps = {
  onImageChange: (urls: string[]) => void;
  initialImages?: string[];
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageChange,
  initialImages = [],
}) => {
  const [imageURLs, setImageURLs] = useState<string[]>(initialImages);
  const [firebaseImageURLs, setFirebaseImageURLs] = useState<string[]>([]);

  useEffect(() => {
    if (initialImages.length > 0) {
      setImageURLs(initialImages);
      setFirebaseImageURLs(initialImages);
    }
  }, [initialImages]);

  useEffect(() => {
    onImageChange(firebaseImageURLs);
  }, [firebaseImageURLs, onImageChange]);

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newImageUrls: string[] = [];
    const firebaseUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const blobUrl = URL.createObjectURL(file); // 미리보기용 blob URL 생성
      newImageUrls.push(blobUrl);

      try {
        const firebaseUrl = await uploadImageToFirebase(file);
        firebaseUrls.push(firebaseUrl);
      } catch (error) {
        console.error("이미지 업로드 중 에러:", error);
      }
    }

    setImageURLs((prevURLs) => [...prevURLs, ...newImageUrls]);
    setFirebaseImageURLs((prevURLs) => [...prevURLs, ...firebaseUrls]);
  };

  const handleImageRemove = async (index: number) => {
    const imageUrlToDelete = firebaseImageURLs[index];

    // 배열에서 이미지 제거 먼저 처리
    const updatedImageURLs = imageURLs.filter((_, i) => i !== index);
    const updatedFirebaseImageURLs = firebaseImageURLs.filter(
      (_, i) => i !== index
    );

    setImageURLs(updatedImageURLs);
    setFirebaseImageURLs(updatedFirebaseImageURLs);

    // Firebase에서 이미지 삭제 처리
    try {
      const imageRef = ref(storage, imageUrlToDelete);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("이미지 삭제 중 에러 발생:", error);
      return;
    }
  };

  return (
    <div className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center">
      {imageURLs.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 mb-2">
          {imageURLs.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url ? url : undefined}
                alt={`미리보기 이미지 ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <button
                className="absolute top-0 right-1 bg-slate-400 text-white p-1"
                onClick={() => handleImageRemove(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">사진을 추가해주세요</p>
      )}
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="absolute bottom-0 w-full text-center text-white p-2 rounded-b-md cursor-pointer"
      />
    </div>
  );
};
