import { createBrowserRouter } from "react-router-dom";
import { AuthRoot, WorkingApp } from "./App";
import ForgortPassword from "./pages/auth/forgortPassword";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import ResetPassword from "./pages/auth/resetPassword";
import Dashboard from "./pages/dashboard";
import Error404 from "./pages/errors/404";
import History from "./pages/history";
import HomePage from "./pages/home";
import Map from "./pages/map";

export const router = createBrowserRouter([
  {
    path: "/auth", // Absolute path for auth pages
    element: <AuthRoot />,
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
    path: "/", // Absolute path for home page
    element: <HomePage />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  {
    path: "/dashboard", // Absolute path for dashboard
    element: <WorkingApp />, // Parent route for authenticated pages
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Dashboard />, // Default route for dashboard
      },
      {
        path: "history", // Nested route for history
        element: <History />,
      },
      {
        path: "map", // Nested route for map
        element: <Map />,
      },
    ],
  },

  {
    path: "*", // Catch-all for undefined routes
    element: <Error404 />,
  },
]);
