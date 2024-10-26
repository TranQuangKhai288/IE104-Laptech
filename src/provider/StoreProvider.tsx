"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

// Định nghĩa kiểu cho sản phẩm trong giỏ hàng
interface CartItem {
  productId: string; // ID sản phẩm
  quantity: number; // Số lượng sản phẩm
}

// Định nghĩa kiểu cho người dùng
interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  phone: string;
  access_token: string;
  refresh_token: string;
}

// Định nghĩa kiểu cho state
interface State {
  user: User | null; // Người dùng
  cart: CartItem[]; // Giỏ hàng
}

// Khởi tạo state ban đầu
const initialState: State = {
  user: null,
  cart: [],
};

// Định nghĩa kiểu cho action
type Action =
  | {
      type: "SET_USER";
      payload: User;
    }
  | { type: "CLEAR_USER" }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }; // Sử dụng productId để xóa

// Tạo context
const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

// Khởi tạo reducer để quản lý state
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
      };
    case "ADD_TO_CART":
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case "REMOVE_FROM_CART":
      // Xóa sản phẩm khỏi giỏ hàng
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };
    default:
      return state;
  }
}

// Tạo UserProvider để cung cấp state cho các component con
interface UserProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Lấy user từ localStorage
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });
    }
  }, []);

  useEffect(() => {
    // Lưu thông tin user vào localStorage mỗi khi state.user thay đổi
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  useEffect(() => {
    // Lưu giỏ hàng vào localStorage mỗi khi state.cart thay đổi
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook để truy cập context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an UserProvider");
  }
  return context;
};
