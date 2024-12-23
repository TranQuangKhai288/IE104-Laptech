import React from "react";
import CheckLightBg from "./CheckLightBg";
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../customeHooks/formatCurrency";

const ProductHomeItem: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 rounded-lg bg-white shadow-md transition ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 border-2 border-white cursor-pointer flex flex-col justify-between"
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
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p>Từ:</p>
            <p className="text-gray-500 ml-2 line-through">
              {formatCurrency(parseFloat(product.starting_price))}{" "}
            </p>
          </div>

          <div className="flex flex-row ">
            <p>Còn: </p>
            <p className="text-base ml-2 text-red-500">
              {formatCurrency(product.price || 0)}{" "}
            </p>
          </div>
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
        <div className="text-sm text-gray-500 overflow-hidden flex-grow">
          {product.specifications.slice(0, 5).map((part, index) => (
            <div key={index}>
              {part.type}: {part.title}
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
