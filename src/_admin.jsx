// eslint-disable-next-line no-unused-vars
import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilShareAlt,
  cilSpeedometer,
  cilSettings,
  cilMemory,
  cilPeople,
  cilTags,
  cilNewspaper,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { FaInstagram } from "react-icons/fa6";
const _nav = [
  {
    component: CNavTitle,
    name: "Admin Dashboard",
  },
  {
    component: CNavItem,
    name: "Admin Dashboard",
    to: "/dashboard-admin",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Order Zone",
    to: "/OrderListPage",
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Create Products",
    to: "/CreateProducts",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "F.A.Q",
    to: "/faqPage",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Account Setting",
    to: "/Admin/AccountSetting",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
];
export default _nav;
