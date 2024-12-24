import React, { useState } from "react";
import * as UserService from "../apis/UserService";
import { notification } from "antd";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await UserService.forgotPassword(email);
      console.log("Response forgot password", response);

      if (response.status === "OK") {
        notification.success({
          message: "Yêu cầu thành công",
          description: "Mật khẩu mới đã được gửi đến email của bạn.",
        });
        //navigate to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        setIsSubmitting(false);
      } else {
        notification.error({
          message: "Yêu cầu thất bại",
          description: response.message || "Đã xảy ra lỗi không xác định",
        });
        setIsSubmitting(false);
      }
    } catch (err) {
      setIsSubmitting(false);

      if (err instanceof Error) {
        notification.error({
          message: "Lỗi",
          description: err.message, // Sử dụng thông điệp từ lỗi
        });
      } else {
        notification.error({
          message: "Lỗi",
          description: "Đã xảy ra lỗi không mong muốn.",
        });
      }
      console.error("Lỗi quên mật khẩu:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#deeff7]">
      <img
        src={require("../assets/LogoLaptech.jpeg")}
        alt="Store Logo"
        className="absolute top-16 w-96 object-contain"
      />
      <div className="absolute w-full max-w-md mt-32 p-6 bg-transparent rounded shadow-md z-20">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Quên Mật Khẩu
        </h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md ${
              isSubmitting
                ? "cursor-not-allowed bg-blue-300"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Gửi yêu cầu"}
          </button>

          {/* // Add a link back to Login page */}

          <div className="mt-4 text-center">
            <p>
              Đã nhớ mật khẩu?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Đăng nhập ngay
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
