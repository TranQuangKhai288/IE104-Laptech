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

// Định nghĩa kiểu cho state

interface State {
  user: User | null; // Người dùng
  cart: Cart | null; // Giỏ hàng
}

// Khởi tạo state ban đầu
const initialState: State = {
  user: null,
  cart: null,
};

// Định nghĩa kiểu cho action
type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "CLEAR_USER" }
  | { type: "SET_CART"; payload: Cart }
  | { type: "CLEAR_CART" }
  | { type: "ADD_PRODUCT_TO_CART"; payload: CartItemType }
  | { type: "REMOVE_PRODUCT_FROM_CART"; payload: CartItemType }
  | {
      type: "UPDATE_AMOUNT";
      payload: {
        productId: Product;
        quantity: number;
      };
    }
  | { type: "UPDATE_CART"; payload: Cart };

// Tạo context
const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

// Khởi tạo reducer để quản lý state
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
      console.log("ADD_PRODUCT_TO_CART", action.payload);
      if (!state.cart) return state; // Không làm gì nếu cart chưa được khởi tạo
      const existingProductIndex = state.cart.products.findIndex(
        (item) => item.productId._id === action.payload.productId._id
      );
      if (existingProductIndex !== -1) {
        console.log("-1");
        const updatedProducts = [...state.cart.products];
        updatedProducts[existingProductIndex].quantity +=
          action.payload.quantity;
        //update total price in cart
        const newTotalPrice =
          state.cart.totalPrice +
          updatedProducts[existingProductIndex].quantity *
            (updatedProducts[existingProductIndex].productId?.price || 0);
        console.log("newTotalPrice", newTotalPrice);
        return {
          ...state,
          cart: {
            ...state.cart,
            totalPrice: newTotalPrice,
            products: updatedProducts,
          },
        };
      } else {
        console.log("0");
        //update total price in cart
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
      console.log("EMOVE_PRODUCT_FROM_CART", action.payload);
      if (!state.cart) return state; // Không làm gì nếu cart chưa được khởi tạo

      // filter product
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
      if (!state.cart) return state; // Không làm gì nếu cart chưa được khởi tạo

      // filter product
      const updatedAmountProduct = state.cart.products.map((item) => {
        if (item.productId._id === action.payload.productId._id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });
      console.log("updatedAmountProduct", updatedAmountProduct);
      //update total price in cart
      const newTotalPriceAmount = updatedAmountProduct.reduce(
        (total, item) => total + item.quantity * (item.productId?.price || 0),
        0
      );
      console.log("newTotalPriceAmount", newTotalPriceAmount);
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

// Tạo UserProvider để cung cấp state cho các component con
interface StoreProviderProps {
  children: ReactNode;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Lấy thông tin user từ localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });
    }
  }, []);

  // Lưu thông tin user vào localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // Đồng bộ giỏ hàng khi user đăng nhập
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
            console.error("Failed to fetch cart:", response);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
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

  // Custom dispatch với API

  const enhancedDispatch = async (action: Action) => {
    if (action.type === "ADD_PRODUCT_TO_CART") {
      try {
        if (state.user?.access_token && state.cart) {
          const response = await CartService.addToCart(
            state.user.access_token,
            action.payload.productId._id,
            action.payload.quantity
          );
          console.log("response add to cart", response);
          if (response.status === "OK" || response.status === 200) {
            //Hiển thị thông báo
            notification.success({
              message: `Successfully`,
              description: `Added ${action.payload.quantity} ${action.payload.productId.name} to cart`,
            });
            // Cập nhật state dựa trên response từ API
            dispatch({ type: "UPDATE_CART", payload: response.data });
          } else {
            console.error("Failed to add product to cart:", response);
          }
        } else {
          console.error("User not authenticated or cart not initialized!");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else if (action.type === "REMOVE_PRODUCT_FROM_CART") {
      try {
        if (state.user?.access_token && state.cart) {
          const response = await CartService.removeFromCart(
            state.user.access_token,
            action.payload.productId._id
          );
          console.log("response remove from cart", response);
          if (response.status === "OK" || response.status === 200) {
            //Hiển thị thông báo
            notification.success({
              message: `Successfully`,
              description: `Removed ${action.payload.productId.name} from cart`,
            });
            // Cập nhật state dựa trên response từ API
            dispatch({ type: "UPDATE_CART", payload: response.data });
          } else {
            console.error("Failed to remove product from cart:", response);
          }
        } else {
          console.error("User not authenticated or cart not initialized!");
        }
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    } else if (action.type === "UPDATE_AMOUNT") {
      dispatch(action);
      const response = await CartService.updateCart(
        state.user?.access_token || "",
        action.payload.productId._id,
        action.payload.quantity
      );
      console.log("response update cart", response);
      // update amount in cart
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

// Custom hook để truy cập context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an UserProvider");
  }
  return context;
};
