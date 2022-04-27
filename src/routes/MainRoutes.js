import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);
const News = Loadable(lazy(() => import("views/news/index")));
const Images = Loadable(lazy(() => import("views/images/index")));

const Videos = Loadable(lazy(() => import("views/videos/index")));

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import("views/utilities/Typography"))
);
const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("views/utilities/MaterialIcons"))
);
const UtilsTablerIcons = Loadable(
  lazy(() => import("views/utilities/TablerIcons"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/images",
      element: <Images />,
    },
    {
      path: "/videos",
      element: <Videos />,
    },
    {
      path: "/news",
      element: <News />,
    },
    {
      path: "/utils/util-typography",
      element: <UtilsTypography />,
    },
    {
      path: "/utils/util-color",
      element: <UtilsColor />,
    },
    {
      path: "/utils/util-shadow",
      element: <UtilsShadow />,
    },
    {
      path: "/icons/tabler-icons",
      element: <UtilsTablerIcons />,
    },
    {
      path: "/icons/material-icons",
      element: <UtilsMaterialIcons />,
    },
  ],
};

export default MainRoutes;
