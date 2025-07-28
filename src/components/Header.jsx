
import React from 'react';

const Header = () => (
  <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white flex-wrap">
    <div className="flex items-center">
      <img
        src="https://www.reshot.com/preview-assets/icons/KME7TXCDG4/food-addiction-KME7TXCDG4.svg"
        alt="logo"
        className="h-10 w-10"
      />
      <span className="font-bold text-2xl text-red-500 ml-2">
        <span className="text-gray-900">ZOM</span>ETO
      </span>
    </div>

    <div className="flex-1 mx-8 max-w-xl">
      <input
        type="text"
        placeholder="Search for food, restaurants, or cuisines"
        className="w-full px-5 py-2 rounded-full border border-gray-300 text-base shadow-sm"
      />
    </div>

    <div className="flex items-center gap-3">
      <button className="rounded-full border border-gray-300 px-6 py-2 bg-transparent cursor-pointer">Login</button>
      <button className="rounded-full bg-red-500 border-none px-6 py-2 text-white cursor-pointer">Sign Up</button>
    </div>
  </header>
);

export default Header;