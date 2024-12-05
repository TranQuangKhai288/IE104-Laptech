import React from "react";
import CheckLightBg from "./CheckLightBg";
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";

const ProductHomeItem: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 rounded-lg bg-white shadow-md transition ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 border-2 border-white block cursor-pointer flex flex-col justify-between h-full"
      onClick={() => {
        navigate(`/product-details/${product._id}`);
      }}
    >
      <div className="flex flex-col flex-grow">
        <img
          src={product.images[0]}
          alt=""
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        {/* Name */}
        <div className="font-bold mb-2 line-clamp-2 h-12 overflow-hidden">
          {product.name}
        </div>
        {/* Price and Sale */}
        <div className="flex flex-row space-x-2">
          <div>Chỉ từ</div>
          <div className="font-bold text-red-500">
            {Number(product.starting_price).toLocaleString("vi-VN")}
          </div>
          {product.sale_percentage > 0 && (
            <div className="text-sm rounded bg-[#FFEAEA] px-1 text-red-500">
              -{product.sale_percentage}%
            </div>
          )}
        </div>

        {/* Colors */}
        <div className="flex flex-row space-x-2 mt-2">
          <div>Màu</div>
          {product.colors &&
            product.colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center justify-end border-2 border-[#adadad] rounded-md w-5 h-5"
              >
                <CheckLightBg bgColor={color.hex} />
              </div>
            ))}
        </div>
        <hr className="my-4 border-b-1 border-gray-300" />
        {/* Specifications */}
        <div className="text-sm text-gray-500 h-32 overflow-hidden flex-grow">
          {product.specifications.map((part, index) => (
            <div key={index}>
              {part.title}: {part.description}
            </div>
          ))}
        </div>
      </div>

      {/* Gift */}
      {Object.keys(product.gift_value).length > 0 && (
        <div>
          <hr className="my-4 border-b-1 border-gray-300" />
          <div className="underline">Quà tặng {product.gift_value}</div>
        </div>
      )}
    </div>
  );
};

export default ProductHomeItem;
