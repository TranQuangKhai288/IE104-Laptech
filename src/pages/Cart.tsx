import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import * as CartService from "../apis/CartService";
import { useAppContext } from "../provider/StoreProvider";
import { Product } from "../interfaces/Product";

const Cart: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  // Thêm state để quản lý modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const removeProductFromCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (!selectedProduct) return;
    try {
      dispatch({
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: { productId: selectedProduct, quantity: 1 }, // Quantity is not used in reducer
      });
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    } finally {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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
              <span>{state?.cart?.products.length}</span>
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
                {state?.cart?.totalPrice.toLocaleString("vi-VN")} VND
              </span>
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-[rgb(254,52,100)] w-full text-white px-4 py-3 rounded-md hover:bg-[rgb(234,31,79)] transition font-semibold"
          >
            Đặt hàng
          </button>
        </div>
      </div>

      {/* Modal tùy chỉnh */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCancelRemove}
          ></div>
          {/* Modal content */}
          <div className="bg-white rounded-lg p-6 z-10 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">
              Xác nhận xoá sản phẩm
            </h2>
            <p className="mb-4">
              Bạn muốn xoá <strong>{selectedProduct.name}</strong> khỏi giỏ
              hàng?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelRemove}
                className="bg-gray-300 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmRemove}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
