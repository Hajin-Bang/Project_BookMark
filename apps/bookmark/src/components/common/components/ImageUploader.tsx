import { useImageUploader } from "@/hooks/useImageUploader";
import Input from "@design-system/input/Input";
import { useEffect } from "react";

type ImageUploaderProps = {
  onImageChange: (urls: string[]) => void;
  initialImages?: string[];
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageChange,
  initialImages = [],
}) => {
  const { imageURLs, firebaseImageURLs, uploadImages, removeImage } =
    useImageUploader(initialImages);

  useEffect(() => {
    onImageChange(firebaseImageURLs);
  }, [firebaseImageURLs, onImageChange]);

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
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">사진을 추가해주세요</p>
      )}
      <div className="absolute bottom-0 w-full p-2">
        <Input
          full
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => uploadImages(e.target.files)}
          className=" text-white cursor-pointer"
        />
      </div>
    </div>
  );
};
