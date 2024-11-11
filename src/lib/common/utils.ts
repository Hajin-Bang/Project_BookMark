import imageCompression from "browser-image-compression";

const imageCompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
  fileType: "image/webp",
};

export const compressAndConvertImage = async (file: File): Promise<Blob> => {
  return await imageCompression(file, imageCompressionOptions);
};
