import React, { useState, useEffect } from "react";
import axios from "axios";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">
        Giỏ hàng của bạn
      </h2>

      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Giỏ hàng của bạn trống.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.price.toLocaleString("vi-VN")} VND
                  </p>
                  <p className="text-sm text-gray-500">
                    Số lượng: {item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeProductFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() =>
          addProductToCart({
            id: Math.random().toString(36).substring(2),
            name: "Sản phẩm mới",
            price: 1000000,
            quantity: 1,
            image: "/product.png",
          })
        }
        className="mt-6 w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Thêm sản phẩm mới
      </button>
    </div>
  );
};

export default Cart;
