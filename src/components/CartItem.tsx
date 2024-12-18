import React from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { CartItemType } from "../interfaces/Cart";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  console.log(item.productId, "item");
  return (
    <div className="flex items-center p-14 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src={item?.productId?.images[0]}
        alt={item?.productId?.name}
        className="w-40 h-40 object-contain mr-12 "
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{item.productId.name}</h3>
        <p className="bg-gray-200 px-2 rounded-md text-gray-800 mb-2 inline-block">
          {item.productId.description}
        </p>
        <p
          className="text-h4 text-secondary font-semibold"
          style={{
            color: "#fe3464",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "30px",
          }}
        >
          {item.productId.price
            ? item.productId.price.toLocaleString("vi-VN")
            : "N/A"}{" "}
          VND
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
          className="text-gray-600 p-2 rounded-full hover:bg-gray-200"
        >
          <FaMinus />
        </button>
        <input
          type="text"
          value={item.quantity}
          readOnly
          className="mx-2 w-10 text-center border border-gray-300 rounded"
        />
        <button
          onClick={() => onQuantityChange(item.quantity + 1)}
          className="text-gray-600 p-2 rounded-full hover:bg-gray-200"
        >
          <FaPlus />
        </button>
        <button
          onClick={onRemove}
          className="text-red-500 ml-4 p-2 rounded-full hover:bg-red-100"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
