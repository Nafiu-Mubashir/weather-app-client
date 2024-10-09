import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar/index";
import { useCtxt } from "./context/authContext/userContext";

// AppRoot component
function AppRoot() {
  const { isAuthenticated, checkAuthFromCookies } = useCtxt();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated from cookies on mount
    checkAuthFromCookies();
  }, []);

  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

// WorkingApp component
function WorkingApp() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const { isAuthenticated } = useCtxt();
  console.log(isAuthenticated, "Token");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Ensure the main scrolls and sidebar is fixed
  return (
    <div className="h-screen flex flex-col lg:flex-row dashBg max-w-screen-x">
      {/* Sidebar */}
      {/* <div className="lg:h-screen border border-gray-300 max-w-screen-x "> */}
        <Sidebar />
      {/* </div> */}

      {/* Main content area should be scrollable */}
      <main className="flex-grow overflow-y-auto">
        <Navbar
          setUnit={setUnit}
          unit={unit}
        />
        <Outlet />
      </main>
    </div>
  );
}

export { WorkingApp, AppRoot };
