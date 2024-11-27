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
    name: "Profile",
    path: "/profile",
    icon: AiOutlineUser,
    exact: true,
  },
  {
    name: "My cart",
    path: "/cart",
    icon: AiOutlineShoppingCart,
    exact: true,
  },
  {
    name: "My ordered",
    path: "/ordered",
    icon: AiOutlineOrderedList,
    exact: true,
  },
  {
    name: "Sign out",
    icon: AiOutlineLogout,
    exact: true,
  },
];

export const guestMenu = [
  {
    name: "Sign in",
    path: "/login",
    icon: AiOutlineLogin,
    exact: true,
  },
  {
    name: "Sign up",
    path: "/register",
    icon: AiOutlineUserAdd,
    exact: true,
  },
];
