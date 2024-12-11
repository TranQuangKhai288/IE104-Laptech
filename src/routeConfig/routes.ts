

// src/routes.ts
const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  productDetail: "/product-details/:id", // Route cố định cho trang chi tiết sản phẩm
  productWithType: "/product/:type", // Route động cho các loại sản phẩm
  search: "/search",
  admin: "/admin",
  customer: "/admin/customers",
  supplier: "/admin/suppliers",
  product: "/admin/products",
  customerDept: "/admin/dept",
  order: "/admin/order-management",
  warning: "/admin/warning",
  record: "/admin/record",
  security: "/admin/security",
  cart: "/cart",
  ordered: "/ordered",
  profile: "/profile",
  checkout: "/checkout",
  
};

export default routes;
