import React, { useState, useEffect } from "react";
import axios from "axios";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC<{ updateCartItemsCount: (count: number) => void }> = ({
  updateCartItemsCount,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "sample1",
      name: "Laptop ThinkPad X1 Carbon",
      price: 32000000,
      quantity: 1,
      image: "/laptop-thinkpad-x1-carbon.png",
    },
    {
      id: "sample2",
      name: "Tai nghe Sony WH-1000XM4",
      price: 8000000,
      quantity: 2,
      image: "/sony-wh-1000xm4.png",
    },
    {
      id: "sample3",
      name: "Bàn phím cơ Keychron K2",
      price: 2500000,
      quantity: 1,
      image: "/keychron-k2.png",
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setCartItems((prevItems) => {
          const updatedItems = [...prevItems, ...response.data];
          updateCartItemsCount(updatedItems.length);
          return updatedItems;
        });
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [updateCartItemsCount]);

  useEffect(() => {
    updateCartItemsCount(cartItems.length);
  }, [cartItems, updateCartItemsCount]);

  const addProductToCart = async (product: CartItem) => {
    try {
      const response = await axios.post("/api/products", product);
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems, response.data];
        updateCartItemsCount(updatedItems.length);
        return updatedItems;
      });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const removeProductFromCart = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        updateCartItemsCount(updatedItems.length);
        return updatedItems;
      });
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-4">
        Giỏ hàng của bạn
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Giỏ hàng của bạn đang trống.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Giá: {item.price.toLocaleString("vi-VN")} VND
                  </p>
                  <div className="mt-2">
                    <label
                      htmlFor={`quantity-${item.id}`}
                      className="mr-2 text-sm text-gray-600"
                    >
                      Số lượng:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-16 p-1 text-center border rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => removeProductFromCart(item.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-end">
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
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="mt-10 p-4 border-t">
        <h3 className="text-xl font-bold text-gray-800">
          Tổng tiền:{" "}
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toLocaleString("vi-VN")}{" "}
          VND
        </h3>
      </div>
    </div>
  );
};

export default Cart;
