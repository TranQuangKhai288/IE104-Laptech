

// src/routes.ts
const routes = {
  home: "/",
  login: "/login",
  register: "/register",

  // laptop: "/laptop",
  // laptopoffice: "/laptop/office",
  // laptopgaming: "/laptop/gaming",
  // laptopultrathin: "/laptop/ultra-thin",
  // laptop2in1: "/laptop/2-in-1",
  // laptopworkstation: "/laptop/workstation",
  // laptopbudget: "/laptop/budget",
  // personalcomputer: "/personal-computer",
  // phone: "/phone",
  // tablet: "/tablet",
  // accessories: "/accessories",
  productDetail: "/product-details/:id", // Route cố định cho trang chi tiết sản phẩm
  productWithType: "/product/:type", // Route động cho các loại sản phẩm


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
