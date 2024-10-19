import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
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

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p className="cart-empty-message">Giỏ hàng của bạn đang trống.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-description">{item.description}</p>
                  <p className="cart-item-price">
                    Giá: {item.price.toLocaleString("vi-VN")} VND
                  </p>
                  <div className="cart-item-quantity">
                    <label
                      htmlFor={`quantity-${item.id}`}
                      className="cart-item-quantity-label"
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
                      className="cart-item-quantity-input"
                    />
                  </div>
                </div>
              </div>
              <div className="cart-item-actions">
                <button
                  onClick={() => removeProductFromCart(item.id)}
                  className="cart-item-remove-button"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
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
          className="cart-add-button"
        >
          Thêm sản phẩm mới
        </button>
        <button onClick={handleCheckout} className="cart-checkout-button">
          Đặt hàng
        </button>
      </div>

      <div className="cart-total">
        <h3 className="cart-total-text">
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
