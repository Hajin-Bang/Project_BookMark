import { useState } from "react";

interface ProductCarouselProps {
  images: string[];
  className?: string;
}

const ProductCarousel = ({
  images,
  className = "h-[200px]",
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-neutral-100 w-full overflow-hidden ${className}`}
    >
      {images.length === 0 ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">이미지 없음</span>
        </div>
      ) : (
        <>
          <img
            className="object-contain w-full h-full bg-gray-200"
            src={images[currentIndex]}
            alt={`Product image ${currentIndex}`}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-300 p-1 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 p-1 rounded-full"
              >
                ▶
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCarousel;
