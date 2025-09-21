// eslint-disable-next-line no-unused-vars
import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilSettings,
  cibCashapp
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
const _nav = [
  {
    component: CNavTitle,
    name: "User Dashboard",
  },
  {
    component: CNavItem,
    name: "User Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Purchases",
    to: "/userOrders",
    icon: <CIcon icon={cibCashapp} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Setting",
  },
  {
    component: CNavItem,
    name: "Account Setting",
    to: "/AccountSetting",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
];

export default _nav;
