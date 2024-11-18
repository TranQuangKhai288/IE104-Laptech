export interface Product {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  subCategory?: string;
  brand?: string;
  url?: string;
  price?: number;
  starting_price: string;
  sale_percentage: number;
  stock?: number;
  images: Array<string>;

  colors?: { title: string; hex: string }[];
  specifications: { type: string; title: string; description: string }[];
  gift_value: string;
  reviews: Array<any>;
  averageRating: number;
}
