import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar/index";
import { RootState } from "./lib";

// AuthRoot component for unauthenticated routes (login, registration, etc.)
function AuthRoot() {
  const { isLoggedIn } = useSelector((state: RootState) => state.authSlice);

  // If logged in, redirect to dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />; // Render child routes (login, register, etc.)
}

// WorkingApp component for authenticated routes (dashboard, etc.)
function WorkingApp() {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.authSlice);

  // Redirect to login if not logged in
  if (!isLoggedIn && !user) {
    return <Navigate to="/auth/login" />;
  }

  // Render sidebar, navbar, and child routes for authenticated pages
  return (
    <div className="h-screen flex flex-col lg:flex-row dashBg max-w-screen-x">
      <Sidebar />

      {/* Main content area should be scrollable */}
      <main className="flex-grow overflow-y-auto">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export { WorkingApp, AuthRoot };
