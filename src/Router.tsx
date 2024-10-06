import { createBrowserRouter } from "react-router-dom";

import { AppRoot, WorkingApp } from "./App";
import ForgortPassword from "./pages/auth/forgortPassword";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import ResetPassword from "./pages/auth/resetPassword";
import Dashboard from "./pages/dashboard";
import Error404 from "./pages/errors/404";
import History from "./pages/history";
import HomePage from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "auth",
    // element: <AnonymousRoot />,
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
    element: <AppRoot />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        // path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <Error404 />,
  },

  {
    path: "dashboard",
    element: <WorkingApp />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "map",
        element: <History />,
      },
    ],
  },
]);
