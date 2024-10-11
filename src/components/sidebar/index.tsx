import { Link, useLocation, useNavigate } from "react-router-dom";

import { FileText, House, MapTrifold, SignOut } from "@phosphor-icons/react";

import { useCtxt } from "../../context/authContext/userContext";

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

  const mainNavlink: NavLink[] = [
    {
      icon: (
        <House
          size={20}
          color="white"
        />
      ),
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: (
        <FileText
          size={20}
          color="white"
        />
      ),
      name: "History",
      path: "/dashboard/history",
    },
    {
      icon: (
        <MapTrifold
          size={20}
          color="white"
        />
      ),
      name: "Map",
      digit: "10",
      path: "/dashboard/map",
    },
  ];
  const { logout } = useCtxt();
  const navigate = useNavigate();
  const logUserOut = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <aside
      className={`bg-gray-800/50 p-2 lg:p-4  flex flex-row lg:flex-col items-center justify-between lg:h-screen lg:w-[15%] w-full h-auto lg:border-r border-b`}>
      <div className="lg:space-y-4 w-full">
        <div className="flex flex-row lg:flex-col gap-1 lg:mt-4 w-full justify-around lg:justify-start">
          {mainNavlink.map((item, index) => {
            const isActive = whenActive === item.path;
            return (
              <div
                key={index}
                className="w-full lg:w-auto">
                <div
                  className={`flex items-center justify-between gap-4 p-2 rounded group cursor-pointer w-full ${
                    isActive ? "bg-ihsan" : ""
                  }`}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 w-full">
                    <div className={`${isActive ? "text-urise-main" : ""}`}>
                      {item.icon}
                    </div>
                    <p
                      className={`text-sm ${
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
      <div className={`cursor-pointer hidden md:block`}>
        <p
          className={`flex gap-1 items-center cursor-pointer lg:justify-start`} onClick={logUserOut}>
          <SignOut
            size={20}
            color="white"
          />
          Logout
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
