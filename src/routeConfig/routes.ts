

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
  profile: "/profile",
  checkout: "/checkout",
  productDetail: "/product/product-detail-example"
};

export default routes;
