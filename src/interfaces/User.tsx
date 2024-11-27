export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  defaultAddress: string;
  phone: string;
  access_token: string;
  refresh_token: string;
}
