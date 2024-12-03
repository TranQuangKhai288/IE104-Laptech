import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
// export const adminMenu = [
//   {
//     name: "Profile",
//     path: "/profile",
//     icon: AiOutlineUser,
//     exact: true,
//   },
//   {
//     name: "Dashboard",
//     path: "/system/admin",
//     icon: RxDashboard,
//     exact: true,
//   },
//   {
//     name: "Sign out",
//     icon: AiOutlineLogout,
//     exact: true,
//   },
// ];

export const userMenu = [
  {
    name: "Hồ sơ",
    path: "/profile",
    icon: AiOutlineUser,
    exact: true,
  },
  {
    name: "Giỏ hàng của tôi",
    path: "/cart",
    icon: AiOutlineShoppingCart,
    exact: true,
  },
  {
    name: "Đơn hàng của tôi",
    path: "/ordered",
    icon: AiOutlineOrderedList,
    exact: true,
  },
  {
    name: "Đăng xuất",
    icon: AiOutlineLogout,
    exact: true,
  },
];

export const guestMenu = [
  {
    name: "Đăng nhập",
    path: "/login",
    icon: AiOutlineLogin,
    exact: true,
  },
  {
    name: "Đăng ký",
    path: "/register",
    icon: AiOutlineUserAdd,
    exact: true,
  },
];
