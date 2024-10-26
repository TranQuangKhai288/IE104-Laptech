import React from "react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<{ item: CartItemProps }> = ({ item }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      item.onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex justify-start items-center p-5 mb-5 bg-white rounded-lg shadow-md">
      <div className="flex gap-12 flex-grow items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-[140px] h-[120px] object-cover rounded-lg"
        />
        <div>
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="bg-gray-200 px-3 py-2 rounded-md text-gray-700 mt-2 inline-block">
            {item.description}
          </p>
          <p className="text-lg text-gray-700 mt-3">
            Giá: {item.price.toLocaleString("vi-VN")} VND
          </p>
          <div className="mt-5 text-sm">
            <label htmlFor={`quantity-${item.id}`}>Số lượng:</label>
            <input
              id={`quantity-${item.id}`}
              type="number"
              value={item.quantity}
              min={1}
              onChange={handleQuantityChange}
              className="w-[70px] p-2 ml-3 border rounded-md"
            />
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={item.onRemove}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
