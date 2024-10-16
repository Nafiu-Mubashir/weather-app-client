import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FileText,
  House,
  List,
  MapTrifold,
  SignOut,
} from "@phosphor-icons/react";

import logo from "../../assets/logo.webp";
import { AppDispatch, RootState } from "../../lib";
import { LogoutAction } from "../../lib/action/authAction";

// Define the NavLink interface
interface NavLink {
  icon: JSX.Element;
  name: string;
  path: string;
  digit?: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const whenActive = location.pathname;
  const { t } = useTranslation(); // Use the translation hook

  const mainNavlink: NavLink[] = [
    {
      icon: (
        <House
          size={20}
          color="white"
        />
      ),
      name: t("dashboard"), // Translate the "Dashboard" text
      path: "/dashboard",
    },
    {
      icon: (
        <FileText
          size={20}
          color="white"
        />
      ),
      name: t("history"), // Translate the "History" text
      path: "/dashboard/history",
    },
    {
      icon: (
        <MapTrifold
          size={20}
          color="white"
        />
      ),
      name: t("map"), // Translate the "Map" text
      digit: "10",
      path: "/dashboard/map",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logUserOut = () => {
    dispatch(LogoutAction()); // Dispatch the logout action
    navigate("/auth/login"); // Redirect the user to the login page
  };

  // State for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle the sidebar's collapsed state
  };

    const user = useSelector(
      (state: RootState) => state.weatherSlice.weatherData?.userInfo
    );

  return (
    <div className="lg:flex lg:flex-col lg:h-screen lg:w-[15%]">
      {/* Hamburger Button for sm and md screens */}
      <div className="lg:hidden p-2 flex justify-between items-center bg-gray-800/50">
        <img
          src={logo}
          className="h-[45px] w-[45px] rounded-full"
          alt="logo"
        />
        <button onClick={toggleSidebar}>
          <List
            size={30}
            color="white"
          />
        </button>
      </div>

      {/* Sidebar and Overlay */}
      <div>
        {/* Sidebar */}
        <aside
          className={`bg-gray-800/50 p-2 lg:p-4 flex flex-col items-center justify-between h-screen w-[70%] md:w-[40%] lg:w-full shadow shadow-slate-300 fixed lg:static z-40 top-0 left-0 transition-transform duration-300 transform
          ${
            isCollapsed ? "translate-x-0 p-4" : "-translate-x-full"
          } lg:translate-x-0`}>
          <div className="lg:space-y-4 w-full flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <img
                src={logo}
                className="h-[50px] w-[50px] m-auto rounded-full"
              />
              <div className="font-bold">
                <p>Welcome,</p> 
                <p>{`${user?.firstName} ${user?.lastName}`}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:mt-4 w-full lg:gap-2 lg:justify-start">
              {mainNavlink.map((item, index) => {
                const isActive = whenActive === item.path;
                return (
                  <div
                    key={index}
                    className="w-full lg:w-auto">
                    <div
                      className={`flex items-center justify-between gap-4 p-2 rounded group cursor-pointer w-full ${
                        isActive ? "bg-green-500" : "bg-green-500/30"
                      }`}
                      onClick={toggleSidebar}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 w-full">
                        <div className={`${isActive ? "text-urise-main" : ""}`}>
                          {item.icon}
                        </div>
                        <p
                          className={`text-sm capitalize ${
                            isActive ? "text-urise-main" : "text-white"
                          }`}>
                          {item.name}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="flex bg-green-500 gap-1 items-center cursor-pointer lg:justify-start w-full lg:w-full rounded p-2"
            onClick={logUserOut}>
            <SignOut
              size={20}
              color="white"
            />
            <p className="">{t("logout")}</p> {/* Translate "Logout" */}
          </div>
        </aside>

        {/* Overlay for small and medium screens */}
        {isCollapsed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar} // Close sidebar when overlay is clicked
          ></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
