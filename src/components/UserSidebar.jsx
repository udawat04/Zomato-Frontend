import { useState } from "react";
import {
  FaUtensils,
  FaListAlt,
  FaClipboardList,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

export default function UserSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-white shadow-lg flex flex-col justify-between
      ${isOpen ? "w-64" : "w-20"} transition-all duration-300 p-4`}
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
            Go
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
            to="/user/dashboard"
            icon={<MdDashboard size={22} />}
            text="Dashboard"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/user/edit-profile"
            icon={<FaUtensils size={20} />}
            text="Edit Profile"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/user/add-address"
            icon={<FaClipboardList size={20} />}
            text="Add Address"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/user/order-history"
            icon={<FaListAlt size={20} />}
            text="Order History"
            isOpen={isOpen}
          />
          <SidebarNavLink
            to="/user/current-order"
            icon={<FaListAlt size={20} />}
            text="Current Order"
            isOpen={isOpen}
          />
        </nav>
      </div>

      {/* Logout */}
      <div className="space-y-3">
        <SidebarNavLink
          onClick={handleLogout}
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
 * SidebarNavLink: If "to" is provided, behaves like NavLink.
 * If only onClick is provided, behaves like a button.
 */
function SidebarNavLink({
  to,
  onClick,
  icon,
  text,
  isOpen,
  className = "",
  activeClassName = "bg-yellow-400 text-white",
}) {
  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150";

  // If "to" is provided, render NavLink
  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${baseClasses} ${
            isActive ? activeClassName : "text-gray-700 hover:bg-gray-100"
          } ${className}`
        }
        title={!isOpen ? text : undefined}
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

  // Otherwise render a button (for actions like Logout)
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} text-gray-700 hover:bg-gray-100 ${className}`}
      title={!isOpen ? text : undefined}
    >
      {icon}
      {isOpen && (
        <span className="text-sm font-medium transition-all duration-200">
          {text}
        </span>
      )}
    </button>
  );
}
