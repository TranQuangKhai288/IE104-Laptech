import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, message } from "antd";
import { useAppContext } from "../provider/StoreProvider";
import * as OrderService from "../apis/OrderService";
import * as UserService from "../apis/UserService";

const { Option } = Select;

const Checkout: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [form] = Form.useForm(); // Dùng Form.useForm để có thể truy cập các phương thức của form

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin người dùng sau khi có access_token
    const getUserInfo = async () => {
      if (state?.user?.access_token) {
        const res = await UserService.getDetailsUser(
          state?.user?.access_token || ""
        );
        console.log("User info response:", res);
        if (res && res.status === "OK") {
          const address = res.data.addresses[0];
          const userInfo = {
            fullName: res.data.name,
            phone: res.data.phone || "",
            city: res.data?.city || "",
            detailAddress:
              (address?.street || "") +
              "" +
              (address?.city || "") +
              "" +
              (address?.state || ""),
          };
          console.log("User info:", userInfo);
          // Cập nhật lại các giá trị trong form bằng Form.setFieldsValue
          form.setFieldsValue(userInfo);
        }
      }
    };
    getUserInfo();
  }, [state?.user?.access_token, form]); // Thêm form vào dependency array để tránh cảnh báo
  // Xử lý khi submit form
  const onFinish = async (values: any) => {
    const data = {
      items: state.cart?.products,
      shippingAddress: {
        fullName: values.fullName,
        phone: values.phone,
        city: values.city,
        detailAddress: values.detailAddress,
      },
      paymentMethod: values.paymentMethod,
      notes: values.notes,
      couponCode: values.couponCode,
    };
    const response = await OrderService.createAOrder(
      data,
      state?.user?.access_token || ""
    );
    console.log("Order response:", response);
    if (response && response.status === "OK") {
      message.success("Đặt hàng thành công!");
      // Clear cart after successful order
      dispatch({ type: "CLEAR_CART" });
      navigate("/ordered");
    } else {
      message.error("Đặt hàng thất bại. Vui lòng thử lại sau!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Thông tin không hợp lệ:", errorInfo);
    message.error("Vui lòng kiểm tra lại thông tin!");
  };

  return (
    <div className="flex flex-col w-full mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold mb-6">Xác nhận thanh toán</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Thông tin người nhận</h3>

        <Form
          form={form} // Liên kết form với hook form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* Họ và Tên */}
          <Form.Item
            className="mb-1"
            label={<span className="text-gray-700 font-medium">Họ và tên</span>}
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
              { min: 2, message: "Họ và tên phải dài hơn 2 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          {/* Số điện thoại */}
          <Form.Item
            className="mb-1"
            label={
              <span className="text-gray-700 font-medium">Số điện thoại</span>
            }
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại phải gồm 10 chữ số!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          {/* Chọn khu vực */}
          <Form.Item
            className="mb-1"
            label={
              <span className="text-gray-700 font-medium">
                Chọn khu vực(Khu vực cửa hàng đặt mua)
              </span>
            }
            name="city"
            rules={[{ required: true, message: "Vui lòng chọn khu vực!" }]}
          >
            <Select placeholder="Chọn khu vực">
              {[
                "Hà Nội",
                "TP. Hồ Chí Minh",
                "Đà Nẵng",
                "Hải Phòng",
                "Cần Thơ",
                "Bình Dương",
                "Khánh Hòa",
              ].map((area) => (
                <Option key={area} value={area}>
                  {area}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Địa chỉ */}
          <Form.Item
            className="mb-1"
            label={
              <span className="text-gray-700 font-medium">
                Địa chỉ nhận hàng
              </span>
            }
            name="detailAddress"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="Nhập địa chỉ cụ thể (VD: Số 53 Thái Hà)"
            />
          </Form.Item>

          {/* Hiển thị danh sách sản phẩm */}
          <h3 className="text-2xl font-semibold mb-4">Thông tin đơn hàng</h3>
          {state.cart?.products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-500">
                Không có sản phẩm nào để thanh toán.
              </p>
            </div>
          ) : (
            <div className="mb-6">
              {state.cart?.products.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.productId.images[0] || ""}
                      alt={item.productId.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">
                        {item.productId.name}
                      </h4>
                      <p className="text-gray-600">
                        Giá:{" "}
                        {item.productId.price
                          ? item.productId.price.toLocaleString("vi-VN")
                          : "N/A"}{" "}
                        VND
                      </p>
                      <p className="text-gray-600">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {item.productId.price
                      ? item.productId.price.toLocaleString("vi-VN")
                      : "N/A"}{" "}
                    VND
                  </div>
                </div>
              ))}
            </div>
          )}

          <h3 className="text-2xl font-semibold my-4">Thông tin thanh toán</h3>

          {/* Phương thức thanh toán */}
          <Form.Item
            className="mb-1"
            label={
              <span className="text-gray-700 font-medium">
                Phương thức thanh toán
              </span>
            }
            name="paymentMethod"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán",
              },
            ]}
          >
            <Select placeholder="Chọn phương thức thanh toán">
              {[
                { label: "Thanh toán khi nhận hàng", value: "COD" },
                { label: "Chuyển khoản ngân hàng", value: "banking" },
                { label: "Thẻ tín dụng", value: "credit_card" },
                { label: "Ví điện tử Momo", value: "momo" },
                { label: "Ví điện tử ZaloPay", value: "zalopay" },
              ].map((method) => (
                <Option key={method.label} value={method.value}>
                  {method.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Ghi chú đơn hàng */}
          <Form.Item
            className="mb-1"
            label={
              <span className="text-gray-700 font-medium">
                Ghi chú đơn hàng (nếu có)
              </span>
            }
            name="notes"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={2} placeholder="Nhập ghi chú đơn hàng" />
          </Form.Item>

          {/* Mã giảm giá */}
          <Form.Item
            className="mb-1"
            label={
              <span className="text-gray-700 font-medium">
                Mã giảm giá (nếu có)
              </span>
            }
            name="couponCode"
            rules={[{ required: false }]}
          >
            <Input placeholder="Nhập mã giảm giá" />
          </Form.Item>

          {/* Tổng cộng */}
          <div className="pt-4">
            <p className="flex justify-between text-gray-700 text-xl font-bold">
              <span>Tổng cộng:</span>
              <span style={{ color: "#fe3464" }}>
                {state.cart?.totalPrice.toLocaleString("vi-VN")} VND
              </span>
            </p>
          </div>

          {/* Nút thanh toán */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="mt-6 bg-green-500 w-full text-white px-4 py-3 rounded-md hover:bg-green-600 transition font-semibold"
              size="large"
            >
              Xác nhận thanh toán
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
