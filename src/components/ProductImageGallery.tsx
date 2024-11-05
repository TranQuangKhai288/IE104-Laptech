import React from "react";
import { Image } from "antd";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
}) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center">
        <span className="text-gray-500">No image</span>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Image Preview Group - Không cần ẩn nó nữa */}
      <Image.PreviewGroup items={images}>
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={images[0]}
            alt="Product thumbnail"
            className="w-full h-24 object-cover rounded-lg cursor-pointer transition duration-300 hover:scale-105"
          />
          {images.length > 1 && (
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-tl-lg">
              +{images.length - 1}
            </div>
          )}
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default ProductImageGallery;
