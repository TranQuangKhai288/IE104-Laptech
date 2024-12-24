import React, { useState } from "react";
import * as UserService from "../apis/UserService";
import { notification } from "antd";
import { useAppContext } from "../provider/StoreProvider";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirect = window.location.search;
  console.log("redirect", redirect);
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("Password:", password);

    try {
      setIsSubmitting(true);
      const response = await UserService.loginUser({ email, password });
      console.log("Response login user", response);

      if (response.status === "OK") {
        const user = {
          ...response.data,
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        };
        dispatch({ type: "SET_USER", payload: user });

        notification.success({
          message: "Đăng nhập thành công",
          description: "Bạn đã đăng nhập vào Laptech thành công",
        });

        setIsSubmitting(false);
        if (user.isAdmin) {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        } else {
          if (redirect) {
            const redirectUrl = redirect.split("=")[1];
            navigate(redirectUrl);
          } else {
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        }
      } else {
        notification.error({
          message: "Đăng nhập thất bại",
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
      console.error("Lỗi đăng nhập:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#deeff7]">
      <a href="/" className="absolute top-16">
        <img
          src={require("../assets/LogoLaptech.jpeg")}
          alt="Store Logo"
          className="w-96 object-contain"
        />
      </a>
      <div className="absolute w-full max-w-md mt-32 p-6 bg-transparent rounded shadow-md z-20">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Đăng nhập
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end items-center" style={{ margin: 2 }}>
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline "
            >
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full py-2 font-semibold text-white bg-blue-500 rounded-md ${
              isSubmitting
                ? "cursor-not-allowed bg-blue-300"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
            style={{ margin: 0 }}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          {/* // Add a link to the Register page */}

          <div className="mt-4 text-center">
            <p>
              Bạn chưa có tài khoản?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
