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

// State interface
interface State {
  user: User | null;
  cart: Cart | null;
}

// Initial state
const initialState: State = {
  user: null,
  cart: null,
};

// Action types
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

// Context creation
const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

// Reducer function
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
    case "ADD_PRODUCT_TO_CART": {
      if (!state.cart) return state;
      const existingIndex = state.cart.products.findIndex(
        (item) => item.productId._id === action.payload.productId._id
      );
      const updatedProducts = [...state.cart.products];

      if (existingIndex !== -1) {
        updatedProducts[existingIndex].quantity += action.payload.quantity;
      } else {
        updatedProducts.push(action.payload);
      }

      const newTotalPrice = updatedProducts.reduce(
        (total, item) => total + item.quantity * (item.productId.price || 0),
        0
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts,
          totalPrice: newTotalPrice,
        },
      };
    }
    case "REMOVE_PRODUCT_FROM_CART": {
      if (!state.cart) return state;

      const updatedProducts = state.cart.products.filter(
        (item) => item.productId._id !== action.payload.productId._id
      );

      const newTotalPrice = updatedProducts.reduce(
        (total, item) => total + item.quantity * (item.productId.price || 0),
        0
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts,
          totalPrice: newTotalPrice,
        },
      };
    }
    case "UPDATE_AMOUNT": {
      if (!state.cart) return state;

      const updatedProducts = state.cart.products.map((item) =>
        item.productId._id === action.payload.productId._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newTotalPrice = updatedProducts.reduce(
        (total, item) => total + item.quantity * (item.productId.price || 0),
        0
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts,
          totalPrice: newTotalPrice,
        },
      };
    }
    case "UPDATE_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}

// StoreProvider
interface StoreProviderProps {
  children: ReactNode;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Sync user with localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // Sync cart with user
  useEffect(() => {
    const fetchCart = async () => {
      if (state.user?.access_token) {
        try {
          const response = await CartService.getCartUser(
            state.user.access_token
          );
          if (response.status === "OK") {
            dispatch({ type: "SET_CART", payload: response.data });
          }
        } catch (error) {
          console.error("Lỗi khi tải giỏ hàng:", error);
        }
      }
    };
    fetchCart();
  }, [state.user]);

  // Enhanced dispatch for async actions
  const enhancedDispatch = async (action: Action) => {
    try {
      if (action.type === "ADD_PRODUCT_TO_CART") {
        if (state.user?.access_token) {
          const response = await CartService.addToCart(
            state.user.access_token,
            action.payload.productId._id,
            action.payload.quantity
          );
          if (response.status === "OK") {
            notification.success({
              message: "Thành công",
              description: `Đã thêm ${action.payload.productId.name} vào giỏ hàng.`,
            });
            dispatch({ type: "UPDATE_CART", payload: response.data });
          }
        }
      } else if (action.type === "REMOVE_PRODUCT_FROM_CART") {
        if (state.user?.access_token) {
          const response = await CartService.removeFromCart(
            state.user.access_token,
            action.payload.productId._id
          );
          if (response.status === "OK") {
            notification.success({
              message: "Thành công",
              description: `Đã xóa ${action.payload.productId.name} khỏi giỏ hàng.`,
            });
            dispatch({ type: "UPDATE_CART", payload: response.data });
          }
        }
      } else {
        dispatch(action);
      }
    } catch (error) {
      console.error("Lỗi điều phối nâng cao:", error);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch: enhancedDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a StoreProvider");
  }
  return context;
};
