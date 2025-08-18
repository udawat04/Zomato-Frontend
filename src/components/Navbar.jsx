import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Menu", path: "/user/menu" },
  { label: "Offers", path: "/user/offers" },
  { label: "Restaurants", path: "/user/all-restaurants" },
];

const Navbar = ({ cartNumber }) => {
  const location = useLocation();
  console.log(cartNumber, "ysjjfknn");

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
      <div className="absolute right-10 cursor-pointer">
        <Link to={"/user/add-cart"} className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/34/34568.png"
            alt="cart"
            className="w-6 h-6"
          />
          {cartNumber > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
              {cartNumber}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
