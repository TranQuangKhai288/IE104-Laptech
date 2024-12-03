"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { notification } from "antd";

import * as CartService from "../apis/CartService";
import { User } from "../interfaces/User";
import { Cart, CartItemType } from "../interfaces/Cart";
import { Product } from "../interfaces/Product";

// Định nghĩa kiểu cho sản phẩm trong giỏ hàng

// Định nghĩa kiểu cho người dùng

// Định nghĩa kiểu cho trạng thái (state)

interface State {
  user: User | null; // Người dùng
  cart: Cart | null; // Giỏ hàng
}

// Khởi tạo trạng thái ban đầu
const initialState: State = {
  user: null,
  cart: null,
};

// Định nghĩa kiểu cho hành động (action)
type Action =
  | { type: "SET_USER"; payload: User } // Thiết lập người dùng
  | { type: "CLEAR_USER" } // Xóa người dùng
  | { type: "SET_CART"; payload: Cart } // Thiết lập giỏ hàng
  | { type: "CLEAR_CART" } // Xóa giỏ hàng
  | { type: "ADD_PRODUCT_TO_CART"; payload: CartItemType } // Thêm sản phẩm vào giỏ hàng
  | { type: "REMOVE_PRODUCT_FROM_CART"; payload: CartItemType } // Xóa sản phẩm khỏi giỏ hàng
  | {
      type: "UPDATE_AMOUNT";
      payload: {
        productId: Product; // Sản phẩm
        quantity: number; // Số lượng
      };
    } // Cập nhật số lượng
  | { type: "UPDATE_CART"; payload: Cart }; // Cập nhật giỏ hàng

// Tạo ngữ cảnh (context)
const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

// Khởi tạo reducer để quản lý trạng thái (state)
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null, cart: null };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: null };
    case "ADD_PRODUCT_TO_CART":
      console.log("Thêm sản phẩm vào giỏ hàng", action.payload);
      if (!state.cart) return state; // Không làm gì nếu giỏ hàng chưa được khởi tạo
      const existingProductIndex = state.cart.products.findIndex(
        (item) => item.productId._id === action.payload.productId._id
      );
      if (existingProductIndex !== -1) {
        console.log("Sản phẩm đã tồn tại");
        const updatedProducts = [...state.cart.products];
        updatedProducts[existingProductIndex].quantity +=
          action.payload.quantity;
        // Cập nhật tổng giá tiền trong giỏ hàng
        const newTotalPrice =
          state.cart.totalPrice +
          updatedProducts[existingProductIndex].quantity *
            (updatedProducts[existingProductIndex].productId?.price || 0);
        console.log("Tổng giá mới", newTotalPrice);
        return {
          ...state,
          cart: {
            ...state.cart,
            totalPrice: newTotalPrice,
            products: updatedProducts,
          },
        };
      } else {
        console.log("Thêm sản phẩm mới");
        // Cập nhật tổng giá tiền trong giỏ hàng
        const newTotalPrice =
          state.cart.totalPrice +
          action.payload.quantity * (action.payload.productId.price || 0);
        return {
          ...state,
          cart: {
            ...state.cart,
            totalPrice: newTotalPrice,
            products: [...state.cart.products, action.payload],
          },
        };
      }
    case "REMOVE_PRODUCT_FROM_CART":
      console.log("Xóa sản phẩm khỏi giỏ hàng", action.payload);
      if (!state.cart) return state; // Không làm gì nếu giỏ hàng chưa được khởi tạo

      // Lọc sản phẩm
      const updatedProducts = state.cart.products.filter(
        (item) => item.productId._id !== action.payload.productId._id
      );
      const newTotalPrice =
        state.cart.totalPrice -
        action.payload.quantity * (action.payload.productId.price || 0);
      return {
        ...state,
        cart: {
          ...state.cart,
          totalPrice: newTotalPrice,
          products: updatedProducts,
        },
      };
    case "UPDATE_AMOUNT":
      if (!state.cart) return state; // Không làm gì nếu giỏ hàng chưa được khởi tạo

      // Cập nhật số lượng sản phẩm
      const updatedAmountProduct = state.cart.products.map((item) => {
        if (item.productId._id === action.payload.productId._id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });
      console.log("Sản phẩm sau khi cập nhật số lượng", updatedAmountProduct);
      // Cập nhật tổng giá tiền trong giỏ hàng
      const newTotalPriceAmount = updatedAmountProduct.reduce(
        (total, item) => total + item.quantity * (item.productId?.price || 0),
        0
      );
      console.log("Tổng giá mới sau cập nhật", newTotalPriceAmount);
      return {
        ...state,
        cart: {
          ...state.cart,
          totalPrice: newTotalPriceAmount,
          products: updatedAmountProduct,
        },
      };

    case "UPDATE_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}

// Tạo StoreProvider để cung cấp trạng thái (state) cho các component con
interface StoreProviderProps {
  children: ReactNode;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });
    }
  }, []);

  // Lưu thông tin người dùng vào localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // Đồng bộ giỏ hàng khi người dùng đăng nhập
  useEffect(() => {
    const syncCart = async () => {
      if (state.user?.access_token) {
        try {
          const response = await CartService.getCartUser(
            state.user.access_token
          );
          if (response.status === "OK" || response.status === 200) {
            dispatch({ type: "SET_CART", payload: response.data });
          } else {
            console.error("Không thể lấy giỏ hàng:", response);
          }
        } catch (error) {
          console.error("Lỗi khi lấy giỏ hàng:", error);
        }
      }
    };
    syncCart();
  }, [state.user]);

  // Lưu thông tin giỏ hàng vào localStorage
  useEffect(() => {
    if (state.cart) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [state.cart]);

  // Tùy chỉnh dispatch với API

  const enhancedDispatch = async (action: Action) => {
    if (action.type === "ADD_PRODUCT_TO_CART") {
      try {
        if (state.user?.access_token && state.cart) {
          const response = await CartService.addToCart(
            state.user.access_token,
            action.payload.productId._id,
            action.payload.quantity
          );
          console.log("Phản hồi thêm vào giỏ hàng", response);
          if (response.status === "OK" || response.status === 200) {
            // Hiển thị thông báo
            notification.success({
              message: `Thành công`,
              description: `Đã thêm ${action.payload.quantity} ${action.payload.productId.name} vào giỏ hàng`,
            });
            // Cập nhật trạng thái dựa trên phản hồi từ API
            dispatch({ type: "UPDATE_CART", payload: response.data });
          } else {
            console.error("Thêm sản phẩm vào giỏ hàng thất bại:", response);
          }
        } else {
          console.error(
            "Người dùng chưa được xác thực hoặc giỏ hàng chưa được khởi tạo!"
          );
        }
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    } else if (action.type === "REMOVE_PRODUCT_FROM_CART") {
      try {
        if (state.user?.access_token && state.cart) {
          const response = await CartService.removeFromCart(
            state.user.access_token,
            action.payload.productId._id
          );
          console.log("Phản hồi xóa sản phẩm", response);
          if (response.status === "OK" || response.status === 200) {
            // Hiển thị thông báo
            notification.success({
              message: `Thành công`,
              description: `Đã xóa ${action.payload.productId.name} khỏi giỏ hàng`,
            });
            // Cập nhật trạng thái dựa trên phản hồi từ API
            dispatch({ type: "UPDATE_CART", payload: response.data });
          } else {
            console.error("Xóa sản phẩm khỏi giỏ hàng thất bại:", response);
          }
        } else {
          console.error(
            "Người dùng chưa được xác thực hoặc giỏ hàng chưa được khởi tạo!"
          );
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      }
    } else if (action.type === "UPDATE_AMOUNT") {
      dispatch(action);
      const response = await CartService.updateCart(
        state.user?.access_token || "",
        action.payload.productId._id,
        action.payload.quantity
      );
      console.log("Phản hồi cập nhật giỏ hàng", response);
      // Cập nhật số lượng trong giỏ hàng
    } else {
      dispatch(action);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch: enhancedDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook tùy chỉnh để truy cập context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext phải được sử dụng trong StoreProvider");
  }
  return context;
};
