import { Product } from "./Product";

export interface CartItemType {
  productId: Product;
  quantity: number;
}
export interface Cart {
  _id: string;
  user: string;
  products: CartItemType[];
  totalPrice: number;
  status: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}
