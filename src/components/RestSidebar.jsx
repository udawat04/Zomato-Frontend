import { useState } from "react";
import {
  FaUtensils,
  FaListAlt,
  FaClipboardList,
  FaStar,
  FaCog,
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function RestSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={` h-screen bg-white shadow-lg flex flex-col justify-between
      ${isOpen ? "w-64" : "w-20"} transition-all duration-300 p-4 `}
    >
      <div>
        {/* Toggle button */}
        <button
          className="mt-2 mb-6 flex items-center justify-center w-full focus:outline-none"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <FaBars size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <span
            className={`text-yellow-500 text-2xl font-bold transition-all duration-300 ${
              isOpen ? "" : "text-lg text-center"
            }`}
          >
            Go{" "}
            {!isOpen && (
              <span className="text-2xl font-bold text-gray-800 ml-1 transition-all duration-300">
                Meal
              </span>
            )}
          </span>
          {isOpen && (
            <span className="text-2xl font-bold text-gray-800 ml-1 transition-all duration-300">
              Meal
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <SidebarNavLink
            to="/restaurant/dashboard"
            icon={<MdDashboard size={22} />}
            text="Dashboard"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/restaurant/menu"
            icon={<FaUtensils size={20} />}
            text="Menu"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/restaurant/add/food-item"
            icon={<FaClipboardList size={20} />}
            text="Add Food Item"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/restaurant/today-order"
            icon={<FaListAlt size={20} />}
            text="Today Order"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/restaurant/total-revenue"
            icon={<FaCog size={20} />}
            text="Total Revenue"
            isOpen={isOpen}
          />
        </nav>
      </div>

      {/* Profile and Logout section */}
      <div className="space-y-3">
        <SidebarNavLink
          to="/profile"
          icon={<FaUserCircle size={20} />}
          text="Profile"
          isOpen={isOpen}
        />
        <SidebarNavLink
          to="/logout"
          icon={<FaSignOutAlt size={20} />}
          text="Logout"
          isOpen={isOpen}
          className="text-red-600"
          activeClassName="bg-red-500 text-white"
        />
      </div>
    </div>
  );
}

/**
 * SidebarNavLink wraps NavLink from react-router-dom to handle active styling
 */
function SidebarNavLink({
  to,
  icon,
  text,
  isOpen,
  className = "",
  activeClassName = "bg-yellow-400 text-white",
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150 ${
          isActive ? activeClassName : "text-gray-700 hover:bg-gray-100"
        } ${className}`
      }
      title={!isOpen ? text : undefined} // tooltip on collapse
    >
      {icon}
      {isOpen && (
        <span className="text-sm font-medium transition-all duration-200">
          {text}
        </span>
      )}
    </NavLink>
  );
}
