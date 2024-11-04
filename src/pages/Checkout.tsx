import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

interface CheckoutItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

const Checkout: React.FC = () => {
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItemType[]>([
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

  const navigate = useNavigate();

  // Tính tổng tiền thanh toán
  const totalAmount = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
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
              <option>An Giang</option>
              <option>Bà Rịa - Vũng Tàu</option>
              <option>Bạc Liêu</option>
              <option>Bắc Kạn</option>
              <option>Bắc Giang</option>
              <option>Bắc Ninh</option>
              <option>Bến Tre</option>
              <option>Bình Dương</option>
              <option>Bình Định</option>
              <option>Bình Phước</option>
              <option>Bình Thuận</option>
              <option>Cà Mau</option>
              <option>Cao Bằng</option>
              <option>Cần Thơ</option>
              <option>Đà Nẵng</option>
              <option>Đắk Lắk</option>
              <option>Đắk Nông</option>
              <option>Điện Biên</option>
              <option>Đồng Nai</option>
              <option>Đồng Tháp</option>
              <option>Gia Lai</option>
              <option>Hà Giang</option>
              <option>Hà Nam</option>
              <option>Hà Nội</option>
              <option>Hà Tĩnh</option>
              <option>Hải Dương</option>
              <option>Hải Phòng</option>
              <option>Hậu Giang</option>
              <option>Hòa Bình</option>
              <option>Hưng Yên</option>
              <option>Khánh Hòa</option>
              <option>Kiên Giang</option>
              <option>Kon Tum</option>
              <option>Lai Châu</option>
              <option>Lâm Đồng</option>
              <option>Lạng Sơn</option>
              <option>Lào Cai</option>
              <option>Long An</option>
              <option>Nam Định</option>
              <option>Nghệ An</option>
              <option>Ninh Bình</option>
              <option>Ninh Thuận</option>
              <option>Phú Thọ</option>
              <option>Phú Yên</option>
              <option>Quảng Bình</option>
              <option>Quảng Nam</option>
              <option>Quảng Ngãi</option>
              <option>Quảng Ninh</option>
              <option>Quảng Trị</option>
              <option>Sóc Trăng</option>
              <option>Sơn La</option>
              <option>Tây Ninh</option>
              <option>Thái Bình</option>
              <option>Thái Nguyên</option>
              <option>Thanh Hóa</option>
              <option>Thừa Thiên Huế</option>
              <option>Tiền Giang</option>
              <option>TP. Hồ Chí Minh</option>
              <option>Trà Vinh</option>
              <option>Tuyên Quang</option>
              <option>Vĩnh Long</option>
              <option>Vĩnh Phúc</option>
              <option>Yên Bái</option>
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
            {checkoutItems.map((item) => (
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
