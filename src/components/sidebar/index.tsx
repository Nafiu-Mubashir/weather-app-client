import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FileText, House, MapTrifold, SignOut } from "@phosphor-icons/react";

import { AppDispatch } from "../../lib";
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
    dispatch(LogoutAction());
    navigate("/auth/login");
  };

  return (
    <aside
      className={`bg-gray-800/50 p-2 lg:p-4 flex flex-row lg:flex-col items-center justify-between  lg:h-screen lg:w-[15%] w-full h-auto lg:border-r border-b`}>
      <div className="lg:space-y-4 w-full">
        <div className="flex flex-row lg:flex-col gap-12 lg:mt-4 w-full lg:gap-2 lg:justify-start">
          {mainNavlink.map((item, index) => {
            const isActive = whenActive === item.path;
            return (
              <div
                key={index}
                className="w-ful lg:w-auto">
                <div
                  className={`flex bg-green-500 items-center justify-between gap-4 p-2 rounded group cursor-pointer w-ful ${
                    isActive ? "bg-ihsan" : ""
                  }`}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 w-full">
                    <div className={`${isActive ? "text-urise-main" : ""}`}>
                      {item.icon}
                    </div>
                    <p
                      className={`text-sm hidden md:block capitalize ${
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
        className={`flex bg-green-500 gap-1 items-center cursor-pointer lg:justify-start w-ful lg:w-full rounded p-2`}
        onClick={logUserOut}>
        <SignOut
          size={20}
          color="white"
        />
        <p className={`hidden md:block`}>{t("logout")}</p>{" "}
        {/* Translate "Logout" */}
      </div>
    </aside>
  );
};

export default Sidebar;
