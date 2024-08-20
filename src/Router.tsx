import { createBrowserRouter } from "react-router-dom";

import ForgortPassword from "./pages/auth/forgortPassword";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import ResetPassword from "./pages/auth/resetPassword";
import Error404 from "./pages/errors/404";

export const Router = createBrowserRouter([
  {
    path: "auth",
    element: <AnonymousRoot />,
    errorElement: <Error404 />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "forgot-password",
        element: <ForgortPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <Error404 />,
  },
]);
