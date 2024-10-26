import React, { useState } from "react";
import axios from "axios";
import CartItem from "../components/CartItem";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "sample1",
      name: "Laptop ThinkPad X1 Carbon",
      price: 32000000,
      quantity: 1,
      image: "/images/thinkpad-x1-carbon.png",
      description: "Intel i7, 16GB RAM, 512GB SSD, Nhập khẩu",
    },
    {
      id: "sample2",
      name: "Tai nghe Sony WH-1000XM4",
      price: 8000000,
      quantity: 2,
      image: "/images/sony-wh-1000xm4.jpg",
      description: "Chống ồn chủ động, Bluetooth 5.0",
    },
    {
      id: "sample3",
      name: "Bàn phím cơ Keychron K2",
      price: 2500000,
      quantity: 1,
      image: "/images/keychron-k2.png",
      description: "Switch Gateron Brown, Layout 75%, Bluetooth",
    },
    {
      id: "sample4",
      name: "Laptop Lenovo Legion 5 Pro",
      price: 40000000,
      quantity: 1,
      image: "/images/legion-5-pro.png",
      description: "AMD Ryzen 7, 16GB RAM, 1TB SSD, RTX 3060, Nhập khẩu",
    },
  ]);

  const addProductToCart = async (product: CartItem) => {
    try {
      const response = await axios.post("/api/products", product);
      setCartItems((prevItems) => [...prevItems, response.data]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const removeProductFromCart = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col w-full mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h2>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 lg:pr-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-500">
                Giỏ hàng của bạn đang trống.
              </p>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    ...item,
                    onQuantityChange: (newQuantity: number) =>
                      handleQuantityChange(item.id, newQuantity),
                    onRemove: () => removeProductFromCart(item.id),
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side - Order summary */}
        <div className="lg:w-1/3 lg:h-72 lg:pl-4 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h3>
          <div className="border-b pb-4 mb-4">
            <p className="flex justify-between text-gray-700">
              <span>Tổng sản phẩm:</span>
              <span>{cartItems.length}</span>
            </p>
            <p className="flex justify-between text-gray-700">
              <span>Tổng tiền:</span>
              <span>{totalAmount.toLocaleString("vi-VN")} VND</span>
            </p>
          </div>
          <button
            onClick={() =>
              addProductToCart({
                id: Math.random().toString(36).substring(2),
                name: "Sản phẩm mới",
                price: 1000000,
                quantity: 1,
                image: "/product.png",
                description: "Mô tả sản phẩm mới",
              })
            }
            className="bg-blue-500 w-full text-white px-4 py-3 rounded-md mb-4 hover:bg-blue-600"
          >
            Thêm sản phẩm mới
          </button>
          <button
            // onClick={handleCheckout}
            className="bg-green-500 w-full text-white px-4 py-3 rounded-md hover:bg-green-600"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;