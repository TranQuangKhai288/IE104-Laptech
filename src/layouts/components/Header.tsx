import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "antd";
import { adminMenu, guestMenu, userMenu } from "./menuApp";
import { AiOutlineUser } from "react-icons/ai";
import Search from "./SearchComponent";

interface User {
  id?: number;
  isAdmin?: boolean;
  avatar?: string;
  name?: string;
}

const Header: React.FC = () => {
  const user: User = {}; // Lấy thông tin người dùng từ API hoặc context
  const navigate = useNavigate();

  const handleMenuItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <header className="flex items-center justify-center bg-white relative w-full border-b">
      <div className="flex items-center w-4/5 my-2">
        <Link to="/" className="flex items-center">
          <img src="store_logo_text" alt="Store Logo" className="w-48 h-auto" />
        </Link>
        <div className="flex-1 mx-4">
          <Search />
        </div>
        <div className="flex items-center space-x-4">
          <Popover
            content={
              user?.isAdmin
                ? adminMenu.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <item.icon size={24} className="mr-2" />
                      <p>{item.name}</p>
                    </div>
                  ))
                : user?.id
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
