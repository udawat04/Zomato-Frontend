import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";

const Header = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white flex-wrap relative z-50 shadow-sm">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <img
          src="https://www.reshot.com/preview-assets/icons/KME7TXCDG4/food-addiction-KME7TXCDG4.svg"
          alt="logo"
          className="h-10 w-10"
        />
        <span className="font-bold text-2xl text-red-500 ml-2">
          <span className="text-gray-900">ZOM</span>ETO
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-8 max-w-xl">
        <input
          type="text"
          placeholder="Search for food, restaurants, or cuisines"
          className="w-full px-5 py-2 rounded-full border border-gray-300 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 relative">
        {!token ? (
          <>
            <Link
              to="/login"
              className="rounded-full border border-gray-300 px-6 py-2 bg-transparent cursor-pointer hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-red-500 px-6 py-2 text-white cursor-pointer hover:bg-red-600 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-red-400 focus:outline-none transition cursor-pointer"
            >
              <img
                src={user?.image}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-3 w-64 z-50 bg-white border border-gray-200 rounded-xl shadow-xl transform transition-all duration-200 ease-out origin-top-right
              ${
                dropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {/* Profile Section */}
              <div className="flex items-center gap-3 px-4 py-4 border-b bg-gray-50 rounded-t-xl">
                <img
                  src={user?.image}
                  alt="User"
                  className="w-12 h-12 rounded-full border shadow"
                />
                <div>
                  <p className="font-semibold text-gray-800">Hello, {user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              {/* Links */}
              <Link
                to="/user/dashboard"
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 text-gray-700 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FiGrid className="text-lg" />

                <span>Dashboard</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-3 w-full px-5 py-3 hover:bg-red-300 text-gray-700 rounded-b-xl transition"
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
