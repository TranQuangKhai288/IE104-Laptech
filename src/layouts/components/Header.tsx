import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Modal } from "antd";
import { guestMenu, userMenu } from "./menuApp";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import Search from "./SearchComponent";
import { useAppContext } from "../../provider/StoreProvider";
import { Tooltip } from "antd";
import { GoLocation } from "react-icons/go"; 


const Header: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { user, cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(cart.length);
  console.log("User:", user);
  console.log("Cart:", cart);
  const handleClickCart = () => {
    navigate("/cart");
  };

  const handleMenuItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    } else {
      Modal.confirm({
        title: "Đăng xuất",
        content: "Bạn có chắc muốn đăng xuất?",
        onOk: () => {
          dispatch({ type: "CLEAR_USER" });
          navigate("/");
        },
      });
    }
  };

  return (
    <header className="flex max-h-16 items-center justify-center bg-white relative w-full border-b">
      <div className="flex items-center w-4/5 my-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="">
            <img
              src={require("../../assets/logo.png")}
              alt="Store Logo"
              className="h-14"
            />
          </div>
        </Link>

        {/* Search Component */}
        <div className="flex-1 mx-4">
          <Search />
        </div>
        {/* Address */}
        <div>
          <Tooltip title="Khu Phố 6, Phường Linh Trung, TP Thủ Đức" placement="bottom">
            <button className="flex items-center text-gray-600 hover:text-blue-600 mr-10">
              <GoLocation size={28} className="mr-1"/>Địa chỉ cửa hàng
            </button>
          </Tooltip>
        </div>
        {/* User Account and Cart */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <div
            className="relative items-center justify-center cursor-pointer p-3 mr-4 bg-[#f6f9fc] rounded-full"
            onClick={handleClickCart}
          >
            <FiShoppingCart size={18} className="text-black mr-1" />
            {cartItemsCount > 0 && (
              <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full px-2 py-0.5 text-[10px]">
                {cartItemsCount}
              </span>
            )}
          </div>

          {/* User Menu */}
          <Popover
            content={
              user?._id
                ? userMenu.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <item.icon size={24} className="mr-2 text-blue-500" />
                      <p>{item.name}</p>
                    </div>
                  ))
                : guestMenu.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <item.icon size={24} className="mr-2 text-blue-500" />
                      <p>{item.name}</p>
                    </div>
                  ))
            }
            trigger="click"
            placement="bottom"
          >
            <div className="flex items-center cursor-pointer">
              {user?.avatar ? (
                <img
                  alt="avatar"
                  src={user.avatar}
                  className="w-10 h-10 rounded-full mr-2"
                />
              ) : (
                <AiOutlineUser size={28} className="mr-2" />
              )}
              {user?.name ? (
                <div className="truncate max-w-[100px]">{user.name}</div>
              ) : (
                <div>Tài Khoản</div>
              )}
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
