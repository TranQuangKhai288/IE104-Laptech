import config from "../routeConfig";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Dashboard from "../pages/Dashboard";
import Customer from "../pages/Customer";
import Supplier from "../pages/Supplier";
import CustomerDept from "../pages/CustomerrDept";
import Calendar from "../pages/Calendar";
import Warning from "../pages/Warning";
import RecordCamera from "../pages/RecordCamera";
import CombinedLayout from "../layouts/CombinedLayout";
import NotFoundPage from "../pages/NotFoundPage";
import Nothing from "../layouts/Nothing";
import HeaderLayout from "../layouts/HeaderLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Product from "../pages/Product";
import { Profiler } from "react";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import path from "path";

const routes = [
  {
    path: "*",
    component: NotFoundPage,
    layout: Nothing,
  },

  {
    path: config.routes.login,
    component: Login,
    layout: Nothing,
  },

  {
    path: config.routes.home,
    component: Home,
    layout: CombinedLayout,
  },
  {
    path: config.routes.cart,
    component: Cart,
    layout: HeaderLayout,
  },
  {
    path: config.routes.admin,
    component: Dashboard,
    layout: DefaultLayout,
  },

  {
    path: config.routes.customer,
    component: Customer,
    layout: DefaultLayout,
  },

  {
    path: config.routes.supplier,
    component: Supplier,
    layout: DefaultLayout,
  },

  {
    path: config.routes.product,
    component: Product,
    layout: DefaultLayout,
  },

  {
    path: config.routes.customerDept,
    component: CustomerDept,
    layout: DefaultLayout,
  },

  {
    path: config.routes.calendar,
    component: Calendar,
    layout: DefaultLayout,
  },
  {
    path: config.routes.warning,
    component: Warning,
    layout: DefaultLayout,
  },

  {
    path: config.routes.record,
    component: RecordCamera,
    layout: DefaultLayout,
  },

  {
    path: config.routes.profile,
    component: Profile,
    layout: HeaderLayout
  }
];

export { routes };
