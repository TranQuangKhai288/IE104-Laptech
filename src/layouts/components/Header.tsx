import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Modal } from "antd"; // Import Modal từ Ant Design
import { adminMenu, guestMenu, userMenu } from "./menuApp";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi"; // Biểu tượng giỏ hàng
import Search from "./SearchComponent";
import Cart from "./Cart"; // Import Cart component

interface User {
  id?: number;
  isAdmin?: boolean;
  avatar?: string;
  name?: string;
}

const Header: React.FC = () => {
  const user: User = {}; // Lấy thông tin người dùng từ API hoặc context
  const navigate = useNavigate();
  const [cartItemsCount, setCartItemsCount] = useState(0); // Khởi tạo số lượng sản phẩm trong giỏ hàng
  const [isCartModalVisible, setCartModalVisible] = useState(false); // Trạng thái modal

  // Hàm hiển thị modal giỏ hàng
  const showCartModal = () => {
    setCartModalVisible(true);
  };

  // Hàm đóng modal giỏ hàng
  const handleCartModalClose = () => {
    setCartModalVisible(false);
  };

  const handleMenuItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <header className="flex items-center justify-center bg-white relative w-full border-b">
      <div className="flex items-center w-4/5 my-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="store_logo_text" alt="Store Logo" className="w-48 h-auto" />
        </Link>

        {/* Search Component */}
        <div className="flex-1 mx-4">
          <Search />
        </div>

        {/* User Account and Cart */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <div className="relative cursor-pointer" onClick={showCartModal}>
            <FiShoppingCart size={28} className="text-blue-500" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 text-xs">
                {cartItemsCount}
              </span>
            )}
          </div>

          {/* User Menu */}
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

      {/* Modal Giỏ Hàng */}
      <Modal
        title="Giỏ Hàng"
        visible={isCartModalVisible}
        onCancel={handleCartModalClose}
        footer={null}
      >
        <Cart updateCartItemsCount={setCartItemsCount} />
      </Modal>
    </header>
  );
};

export default Header;
