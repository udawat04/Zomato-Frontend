// components/Banner.jsx
import React from "react";
import banner from "../assets/banner1.png"

const Banner = () => (
  <section className="bg-red-50 flex items-center justify-between px-8 py-12 gap-5 flex-wrap md:flex-nowrap">
    <div className="w-full md:w-1/2">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-0">
        Easy Bites – Order Online,{" "}
        <span className="text-red-500">Eat Happy!</span>
      </h1>
      <p className="font-semibold text-lg mt-4">
        Satisfy your cravings effortlessly.
      </p>
      <p className="text-gray-500 mt-2 max-w-md">
        Seamless online ordering for a delicious journey, bringing your favorite
        flavors right to your door.
      </p>
      <button className="mt-6 bg-red-500 border-none rounded-full px-8 py-3 text-white font-semibold text-base cursor-pointer">
        ORDER NOW
      </button>
    </div>
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src={banner}
        alt="Delivery"
        className="w-11/12 h-auto object-contain"
      />
    </div>
  </section>
);

export default Banner;
