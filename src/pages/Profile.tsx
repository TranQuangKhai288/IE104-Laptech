import React, { useEffect, useState } from "react";
import * as UserService from "../apis/UserService";
import { useAppContext } from "../provider/StoreProvider";
import { notification } from "antd";
interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  label?: string;
}

interface User {
  name: string;
  birthDate?: Date;
  email: string;
  phone?: string;
  avatar?: string;
  isAdmin?: boolean;
  addresses?: Address[];
}

const Profile: React.FC = () => {
  const { state } = useAppContext();
  const [accountInfo, setAccountInfo] = useState<User | null>();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [newAddress, setNewAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    label: "",
  });
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [errors, setErrors] = useState<any>({});

  const updateUser = async (data: any) => {
    console.log("Data update user", data);
    try {
      const resUpdateUser = await UserService.updateDetailsUser(
        data,
        state.user?.access_token || ""
      );
      console.log("Response update user", resUpdateUser);
      if (resUpdateUser.status === "OK") {
        //Thoong bao cap nhat thanh cong
        notification.success({
          message: "Cập nhật thông tin thành công",
          description: "Thông tin của bạn đã được cập nhật",
        });
        setAccountInfo(resUpdateUser.data);
      } else {
        notification.error({
          message: "Cập nhật thông tin thất bại",
          description: resUpdateUser.message || "Có lỗi xảy ra",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewAddress = async () => {
    if (validateAddress()) {
      setAccountInfo((prev: any) => ({
        ...prev,
        addresses: [...(prev?.addresses || []), newAddress],
      }));
      setNewAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        label: "",
      });
    }
  };

  const editAddress = (index: number) => {
    const updatedAddresses = accountInfo?.addresses?.map((address, i) =>
      i === index ? newAddress : address
    );
    setAccountInfo((prev: any) => ({
      ...prev,
      addresses: updatedAddresses,
    }));
    setIsEditing(null);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      label: "",
    });
  };
  const validateAddress = (): boolean => {
    const errors: any = {};
    if (!newAddress.label) errors.label = "Label is required.";
    if (!newAddress.street) errors.street = "Street is required.";
    if (!newAddress.city) errors.city = "City is required.";
    if (!newAddress.state) errors.state = "State is required.";
    if (!newAddress.postalCode) errors.postalCode = "Postal code is required.";
    if (!newAddress.country) errors.country = "Country is required.";

    // Optional: Additional validation for postal code (example)
    if (newAddress.postalCode && !/^\d+$/.test(newAddress.postalCode)) {
      errors.postalCode = "Postal code must be numeric.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
    const addressToEdit = accountInfo?.addresses?.[index];
    if (addressToEdit) {
      setNewAddress(addressToEdit);
    }
  };

  const handleDelete = (index: number) => {
    const updatedAddresses = accountInfo?.addresses?.filter(
      (_, i) => i !== index
    );
    setAccountInfo((prev: any) => ({
      ...prev,
      addresses: updatedAddresses,
    }));
  };

  const getDetailsUser = async () => {
    if (state.user?.access_token) {
      const resGetUser = await UserService.getDetailsUser(
        state.user.access_token
      );
      console.log("Response get user", resGetUser);
      if (resGetUser.status === "OK") {
        setAccountInfo(resGetUser.data);
      }
    }
  };

  useEffect(() => {
    getDetailsUser();
  }, [state.user?.access_token]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Thông tin cá nhân
      </h2>
      <div className="mb-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => updateUser(accountInfo)}
        >
          Hoàn tất cập nhật
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer relative group"
          >
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : accountInfo?.avatar || "/default-avatar.png"
              }
              alt="Avatar"
              className="w-40 h-40 rounded-full border-4 border-gray-200 mb-4 object-cover"
            />
            <span className="absolute inset-0 bg-black bg-opacity-25 rounded-full opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25m0 0h-7.5M15.75 5.25l-4.5 4.5m0 0l4.5 4.5m-4.5-4.5H21"
                />
              </svg>
            </span>
          </label>
          <p className="text-gray-600 mt-4 font-semibold">
            {accountInfo?.name || "Tên của bạn"}
          </p>
        </div>

        {/* Personal Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Thông tin cá nhân
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={accountInfo?.name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Ngày sinh</label>
              <input
                type="date"
                name="birthDate"
                value={
                  accountInfo?.birthDate
                    ? new Date(accountInfo.birthDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={accountInfo?.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={accountInfo?.phone || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Địa chỉ</h3>
          <div className="space-y-4">
            {accountInfo?.addresses?.map((address, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-md relative"
              >
                {isEditing === index ? (
                  <>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="label"
                        placeholder="Label"
                        value={newAddress.label || ""}
                        onChange={handleAddressChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={newAddress.postalCode}
                        onChange={handleAddressChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <button
                      onClick={() => editAddress(index)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Cập nhật
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 font-medium">
                      {address.label || ""}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {address.street}, {address.city}, {address.state}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {address.postalCode}, {address.country}
                    </p>
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 mr-4"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500"
                    >
                      Xóa
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-gray-700 font-semibold mb-2">
              Thêm địa chỉ mới
            </h4>
            <div className="space-y-2">
              <input
                type="text"
                name="label"
                placeholder="Label"
                value={newAddress.label}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.label && (
                <p className="text-red-500 text-sm">{errors.label}</p>
              )}

              <input
                type="text"
                name="street"
                placeholder="Street"
                value={newAddress.street}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street}</p>
              )}

              <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}

              <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}

              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">{errors.postalCode}</p>
              )}

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={newAddress.country}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            <button
              onClick={addNewAddress}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Thêm địa chỉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
