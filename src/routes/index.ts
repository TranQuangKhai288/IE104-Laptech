import config from "../routeConfig";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Customer from "../pages/Customer";
import Supplier from "../pages/Supplier";
import CustomerDept from "../pages/CustomerrDept";
import Calendar from "../pages/Calendar";
import Security from "../pages/Security";
import Warning from "../pages/Warning";
import RecordCamera from "../pages/RecordCamera";

import NotFoundPage from "../pages/NotFoundPage";
import Nothing from "../layouts/Nothing";
import HeaderLayout from "../layouts/HeaderLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Product from "../pages/Product";
import { Profiler } from "react";
import Profile from "../pages/Profile";

const routes = [
  {
    path: "*",
    component: NotFoundPage,
    layout: Nothing,
  },
  {
    path: config.routes.home,
    component: Home,
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
    path: config.routes.security,
    component: Security,
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
