export interface Product {
  _id: string;
  url: string;
  images: Array<string>;
  name: string;
  starting_price: string;
  sale_percentage: number;
  colors: { hex: string }[];
  specifications: { title: string; description: string }[];
  gift_value: string;
}
