import React, { useState } from "react";
import * as UserService from "../apis/UserService";
import { notification } from "antd";
import { useAppContext } from "../provider/StoreProvider";
import { useNavigate } from "react-router-dom";

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  ariaDescribedBy: string;
}

const InputField: React.FC<FieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  ariaDescribedBy,
}) => (
  <div>
    <label className="block text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
        error ? "border-red-500" : ""
      }`}
      aria-describedby={ariaDescribedBy}
    />
    {error && (
      <p id={ariaDescribedBy} className="text-red-500 text-sm mt-1">
        {error}
      </p>
    )}
  </div>
);

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: typeof errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name.trim()) newErrors.name = "Tên không được để trống.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ.";
    // if (
    //   formData.password.length < 8 ||
    //   !/[A-Z]/.test(formData.password) ||
    //   !/[a-z]/.test(formData.password) ||
    //   !/\d/.test(formData.password) ||
    //   !/[@$!%*?&#]/.test(formData.password)
    // ) {
    //   newErrors.password =
    //     "Mật khẩu phải ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    // }
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await UserService.registerUser(formData);
      if (response.status === "OK") {
        notification.success({
          message: "Đăng ký thành công",
          description: "Tài khoản của bạn đã được tạo thành công.",
        });
        dispatch({ type: "SET_USER", payload: response.data });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        notification.error({
          message: "Đăng ký thất bại",
          description: response.message || "Có lỗi xảy ra.",
        });
      }
    } catch (err) {
      notification.error({
        message: "Lỗi",
        description:
          err instanceof Error ? err.message : "Có lỗi không mong muốn.",
      });
      console.error("Error registering user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#deeff7]">
      <img
        src={require("../assets/LogoLaptech.jpeg")}
        alt="Store Logo"
        className="absolute top-16 w-96 object-contain"
      />
      <div className="absolute w-full max-w-md mt-64 p-6 bg-transparent rounded shadow-md z-20">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Đăng ký tài khoản
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <InputField
            label="Tên của bạn"
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
            ariaDescribedBy="nameError"
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            ariaDescribedBy="emailError"
          />
          <InputField
            label="Mật khẩu"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
            ariaDescribedBy="passwordError"
          />
          <InputField
            label="Nhập lại mật khẩu"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
            ariaDescribedBy="confirmPasswordError"
          />
          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md ${
              isSubmitting
                ? "cursor-not-allowed bg-blue-300"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>
          <div className="mt-4 text-center">
            <p>
              Bạn đã có sẵn tài khoản?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Đăng nhập
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
