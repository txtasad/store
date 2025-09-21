import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const AdminDashboard = React.lazy(() =>
  import("./views/AdminPage/AdminDashboard")
);
const ProjectSetting = React.lazy(() =>
  import("./views/AdminPage/ProjectSetting")
);
const AccountSetting = React.lazy(() =>
  import("./views/pages/PageAccountSetting/AccountSetting")
);
const UserFeature = React.lazy(() =>
  import("./views/pages/UserFeature/UserFeature")
);
const AllUserDataList = React.lazy(() =>
  import("./views/AdminPage/AllUserDataList")
);
const AffiliateSetting = React.lazy(() =>
  import("./views/AdminPage/AffiliateSetting")
);
const CreateProductsList = React.lazy(() =>
  import("./views/AdminPage/CreateProductsList")
);
const CreateProducts = React.lazy(() =>
  import("./views/AdminPage/CreateProducts")
);
const OrderPage = React.lazy(() => import("./views/pages/OrderPage/OrderPage"));
const CreateBlogPage = React.lazy(() =>
  import("./views/AdminPage/CreateBlogPage")
);
const BloggingPage = React.lazy(() => import("./views/AdminPage/BloggingPage"));
const OrderListPage = React.lazy(() =>
  import("./views/AdminPage/OrderListPage")
);
const ConformOrder = React.lazy(() => import("./views/AdminPage/ConformOrder"));
const PaidUserPage = React.lazy(() => import("./views/AdminPage/PaidUserPage"));
const FAQPage = React.lazy(() => import("./views/AdminPage/FAQPage"));
const AdminAccount = React.lazy(() =>
  import("./views/AdminPage/AccountSetting")
);
const SmtpSettingPage = React.lazy(() =>
  import("./views/AdminPage/SmtpSetting")
);
const Success = React.lazy(() =>
  import("./views/pages/PaymentPage/PaymentSuccess")
);
const Cancel = React.lazy(() =>
  import("./views/pages/PaymentPage/PaymentCancel")
);

const routes = [
  { path: "/dashboard", name: "Dashboard", element: <Dashboard /> },
  {
    path: "/dashboard-admin",
    name: "Admin Dashboard",
    element: <AdminDashboard />,
  },
  { path: "/Payment/Cancel", name: "paymentCancel", element: <Cancel /> },
  { path: "/Payment/Success", name: "paymentSuccess", element: <Success /> },
  {
    path: "/AccountSetting",
    name: "Account Setting",
    element: <AccountSetting />,
  },
  {
    path: "/userOrders",
    name: "My Orders",
    element: <UserFeature />,
  },
  {
    path: "/checkout/orderPage",
    name: "Order Checkout Page",
    element: <OrderPage />
  },
  {
    path: "/Admin/AccountSetting",
    name: "Admin Account Setting",
    element: <AdminAccount />,
  },
  {
    path: "/AllUserDataList",
    name: "All User Data List",
    element: <AllUserDataList />,
  },
  {
    path: "/AffiliateSetting",
    name: "Affiliate Setting",
    element: <AffiliateSetting />,
  },
  {
    path: "/CreateProducts",
    name: "Create Products",
    element: <CreateProductsList />,
  },
  {
    path: "/CreateNewProduct",
    name: "Create New Product",
    element: <CreateProducts />,
  },
  {
    path: "/CreateBlogPage",
    name: "Create Blog Page",
    element: <CreateBlogPage />,
  },
  {
    path: "/BloggingPage",
    name: "Create Blog Page",
    element: <BloggingPage />,
  },
  {
    path: "/OrderListPage",
    name: "Order List Page",
    element: <OrderListPage />,
  },
  {
    path: "/ConformOrder/:id",
    name: "Conform Order",
    element: <ConformOrder />,
  },
  { path: "/PaidUserPage", name: "Paid User Page", element: <PaidUserPage /> },
  {
    path: "/SmtpSettingPage",
    name: "SmtpSettingPage",
    element: <SmtpSettingPage />,
  },
  { path: "/faqPage", name: "FAQ Page", element: <FAQPage /> },
  {
    path: "/ProjectSetting",
    name: "SocialMediaSetting",
    element: <ProjectSetting />,
  },
];

export default routes;
