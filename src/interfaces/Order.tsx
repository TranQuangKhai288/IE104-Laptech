export interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    specifications: {
      cpu: string;
      ram: string;
      storage: string;
      color: string;
    };
    productId: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
    _id: string;
  }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingFee: number;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
