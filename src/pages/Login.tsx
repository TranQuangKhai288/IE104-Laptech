import React, { useState } from "react";
import * as UserService from "../apis/UserService";
import * as CartService from "../apis/CartService";
import { notification } from "antd";
import { useAppContext } from "../provider/StoreProvider";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("Password:", password);

    try {
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
          message: "Login success",
          description: "You have successfully logged in",
        });
        if (user.isAdmin) {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        notification.error({
          message: "Login failed",
          description: response.message || "Unknown error occurred",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        notification.error({
          message: "Error",
          description: err.message, // Sử dụng thông điệp từ lỗi
        });
      } else {
        notification.error({
          message: "Error",
          description: "An unexpected error occurred.",
        });
      }
      console.error("Error logging in:", err);
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
          Login
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
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
