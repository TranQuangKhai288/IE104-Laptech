import React, { useEffect, useState } from "react";
import { useAppContext } from "../provider/StoreProvider";

// Define the User type
interface User {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  defaultAddress?: string;
  ward?: string;
  district?: string;
  city?: string;
}

const Profile: React.FC = () => {
  const { state } = useAppContext();
  const [accountInfo, setAccountInfo] = useState<User | null>(state.user);

  const [avatar, setAvatar] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  useEffect(() => {
    setAccountInfo(state.user);
  }, [state.user]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Thông tin tài khoản</h2>

      {/* Flex container for cards */}
      <div className="flex space-x-4">
        {/* Avatar Card */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
          <div className="flex justify-center items-center h-full mb-4 relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="flex flex-col items-center cursor-pointer relative group"
            >
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : accountInfo?.avatar || ""
                }
                alt="Avatar"
                className="w-56 h-56 rounded-full border border-gray-300 mb-2"
              />
              <span className="absolute inset-0 bg-gray-700 opacity-0 transition-opacity duration-200 group-hover:opacity-30 rounded-full"></span>
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {/* Camera icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 7.5h15l-1.5 9H6l-1.5-9zm3.75 10.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 hover:opacity-0"></span>
            </label>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Thông tin tài khoản</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tên của bạn</label>
            <input
              type="text"
              name="name"
              value={accountInfo?.name || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={accountInfo?.phone || ""}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={accountInfo?.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          <div className="flex justify-center mb-6">
            <button className="w-2/3 bg-blue-500 mt-5 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Address Card */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Địa chỉ</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Số nhà, đường</label>
            <input
              type="text"
              name="defaultAddress"
              value={accountInfo?.defaultAddress || ""}
              onChange={handleChange}
              placeholder="Nhập số nhà, đường"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Xã, phường</label>
            <select
              name="ward"
              //   value={accountInfo.ward}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            >
              <option value="Xã An Phú">Xã An Phú</option>
              <option value="Phường Bình Thạnh">Phường Bình Thạnh</option>
              <option value="Phường Tân Định">Phường Tân Định</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quận, huyện</label>
            <select
              name="district"
              //   value={accountInfo.district}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            >
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 2">Quận 2</option>
              <option value="Quận 3">Quận 3</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Tỉnh, thành phố</label>
            <select
              name="city"
              //   value={accountInfo.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            >
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
