import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import * as CartService from "../apis/CartService";
import { useAppContext } from "../provider/StoreProvider";
import { Product } from "../interfaces/Product";

const Cart: React.FC = () => {
  const { state, dispatch } = useAppContext();
  // const [cartItems, setCartItems] = useState<CartItemType[]>();
  const navigate = useNavigate();
  const removeProductFromCart = async (productId: Product) => {
    const isConfirmed = window.confirm(
      `Bạn muốn xoá ${productId.name} khỏi giỏ hàng?`
    );
    if (!isConfirmed) return;
    try {
      dispatch({
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: { productId: productId, quantity: 1 }, //Quantity is not used in reducer
      });
      // await axios.delete(`/api/products/${id}`);
      // setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  const handleQuantityChange = (productId: Product, newQuantity: number) => {
    dispatch({
      type: "UPDATE_AMOUNT",
      payload: { productId: productId, quantity: newQuantity },
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="flex flex-col w-full mx-auto px-8">
      <h2 className="text-3xl font-bold mb-6">Giỏ Hàng</h2>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 lg:pr-4">
          {state?.cart?.products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-500">
                Giỏ hàng của bạn đang trống.
              </p>
            </div>
          ) : (
            <div>
              {state?.cart?.products.map((item) => (
                <CartItem
                  key={item.productId._id}
                  item={item}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(item.productId, newQuantity)
                  }
                  onRemove={() => removeProductFromCart(item.productId)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side - Order summary */}
        <div className="lg:w-1/3 lg:h-80 lg:pl-4 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-md sticky top-4">
          <h3 className="text-2xl font-semibold mb-6">Tóm tắt đơn hàng</h3>
          <div className="border-b pb-6 mb-6">
            <p className="flex justify-between text-gray-700">
              <span>Tổng sản phẩm:</span>
              <span>{state?.cart?.products.length || 0} </span>
            </p>
            <p className="flex justify-between text-gray-700">
              <span>Tổng cộng:</span>
              <span
                style={{
                  color: "#fe3464",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "30px",
                }}
              >
                {state?.cart?.totalPrice.toLocaleString("vi-VN") || 0} VND
              </span>
            </p>
          </div>
          {/* <button
            onClick={addProductToCart}
            className="bg-blue-500 w-full text-white px-4 py-3 rounded-md mb-4 hover:bg-blue-600 transition"
          >
            Thêm sản phẩm mới
          </button> */}
          <button
            onClick={handleCheckout}
            className="bg-[rgb(254,52,100)] w-full text-white px-4 py-3 rounded-md hover:bg-[rgb(234,31,79)] transition font-semibold"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
