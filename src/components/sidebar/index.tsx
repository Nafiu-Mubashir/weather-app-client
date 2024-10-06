import { MouseEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FileText,
  House,
  List,
  MapTrifold,
  SignOut,
} from "@phosphor-icons/react";

// Define the types for props
interface SidebarProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

interface NavLink {
  icon: JSX.Element;
  name: string;
  path: string;
  subLinks?: {
    name: string;
    path: string;
  }[];
  digit?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarCollapsed,
  toggleSidebar,
}) => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const location = useLocation();
  const whenActive = location.pathname;

  const toggleUserManagementDropdown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  const mainNavlink: NavLink[] = [
    {
      icon: (
        <House
          size={20}
          color="#3e3d3b"
        />
      ),
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: (
        <FileText
          size={20}
          color="#3e3d3b"
        />
      ),
      name: "History",
      path: "/dashboard/history",
    },
    {
      icon: (
        <MapTrifold
          size={20}
          color="#3e3d3b"
        />
      ),
      name: "Map",
      path: "/dashboard/map",
      digit: "10",
    },
  ];

  return (
    <aside
      className={`bg-glass p-4 md:flex flex-col justify-between transition-all duration-300 hidden h-screen ${
        isSidebarCollapsed ? "md:w-16 " : "w-[20%] "
      }`}
      // onMouseEnter={toggleSidebar}
    >
      <div className="space-y-4">
        <List
          size={25}
          color="#3e3d3b"
          onClick={toggleSidebar}
          className="cursor-pointer"
        />
        <div className="flex flex-col mt-4 gap-1">
          {mainNavlink.map((item, index) => {
            const isActive = whenActive === item.path;
            return (
              <div key={index}>
                <div
                  className={`flex items-center ${
                    isSidebarCollapsed ? "justify-center" : "justify-between"
                  } gap-4 p-2 rounded group cursor-pointer ${
                    isActive
                      ? "bg-ihsan"
                      : "hover:bg-black/40 hover:backdrop-blur-md hover:border hover:border-black/50 hover:text-white"
                  }`}
                  onClick={
                    item.subLinks ? toggleUserManagementDropdown : undefined
                  }>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 flex-grow">
                    <div className={`${isActive ? "text-urise-main" : ""}`}>
                      {item.icon}
                    </div>
                    {!isSidebarCollapsed && (
                      <p
                        className={`text-sm ${
                          isActive ? "text-urise-main" : ""
                        }`}>
                        {item.name}
                      </p>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`space-y-2 cursor-pointer ${
          isSidebarCollapsed ? "text-center" : "p-2"
        }`}>
        <p
          className={`flex gap-1 items-center cursor-pointer ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}>
          <SignOut
            size={20}
            color="#3e3d3b"
          />
          {!isSidebarCollapsed && "Logout"}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
