import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import provinces from "../data/provinces.json";
import { CartItemType } from "../pages/Cart"; // Import từ file đã khai báo hoặc định nghĩa lại nếu cần

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutItems = location.state?.selectedItems || [];

  // Tính tổng tiền thanh toán
  const totalAmount = checkoutItems.reduce(
    (total: number, item: CartItemType) => total + item.price * item.quantity,
    0
  );

  // Hàm xử lý thanh toán
  const handlePayment = () => {
    alert("Thanh toán thành công!");
    navigate("/"); // Chuyển hướng về trang chủ sau khi thanh toán thành công
  };

  return (
    <div className="flex flex-col w-full mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold mb-6">Xác nhận thanh toán</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Thông tin người nhận</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Số điện thoại
            </label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Chọn khu vực
            </label>
            <select className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500">
              <option>Chọn khu vực</option>
              {provinces.map((province: string, index: number) => (
                <option key={index}>{province}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Địa chỉ nhận hàng
            </label>
            <input
              type="text"
              placeholder="Nhập địa chỉ cụ thể"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Có thể là số nhà, tên đường, tòa nhà. VD: Số 53 Thái Hà
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4">Thông tin đơn hàng</h3>

        {checkoutItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500">
              Không có sản phẩm nào để thanh toán.
            </p>
          </div>
        ) : (
          <div className="mb-6">
            {checkoutItems.map((item: CartItemType) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-600">
                      Giá: {item.price.toLocaleString("vi-VN")} VND
                    </p>
                    <p className="text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800">
                  {(item.price * item.quantity).toLocaleString("vi-VN")} VND
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t pt-4">
          <p className="flex justify-between text-gray-700 text-xl font-bold">
            <span>Tổng cộng:</span>
            <span style={{ color: "#fe3464" }}>
              {totalAmount.toLocaleString("vi-VN")} VND
            </span>
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 bg-green-500 w-full text-white px-4 py-3 rounded-md hover:bg-green-600 transition font-semibold"
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default Checkout;
