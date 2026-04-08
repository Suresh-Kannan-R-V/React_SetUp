import { useRoutes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./allRouter";
import { Layout as AuthLayout } from "../layout/auth";
import Layout from "../layout/pages";
// import { ProtectedRoute, PublicRoute } from "./middleware";

export const AppRoutes = () => {
  return useRoutes([
    {
      // element: <PublicRoute />,
      children: [
        {
          path: "/auth",
          element: <AuthLayout />,
          children: publicRoutes,
        },
      ],
    },
    {
      // element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Layout />,
          children: privateRoutes,
        },
      ],
    },
  ]);
};
