import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Menu", path: "/user/menu" },
  { label: "Offers", path: "/offers" },
  { label: "Foods", path: "/foods" },
  { label: "Restaurants", path: "/restaurants" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="px-8 py-3 flex justify-between items-center border-b border-gray-200 bg-white relative">
      <div className="flex gap-8 mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.label}
              className={`
                font-medium cursor-pointer
                ${
                  isActive
                    ? "text-orange-500 font-bold border-b-2 border-orange-500"
                    : "text-gray-800"
                }
                hover:text-orange-500 transition
                pb-1
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div
        className="absolute right-10 cursor-pointer"
        onClick={() => alert(`You have ${3} items in your cart`)}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/34/34568.png"
          alt="cart"
          className="w-6 h-6"
        />
      </div>
    </nav>
  );
};

export default Navbar;
