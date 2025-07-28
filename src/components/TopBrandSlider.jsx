import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";

// Brand image imports
import kanha from "../assets/kanha.avif";
import harishankar from "../assets/harishankar.avif";
import agarwal from "../assets/agarwal.avif";
import burgerfarm from "../assets/burgerfarm.avif";
import dominos from "../assets/dominos.avif";
import rominus from "../assets/rominus.avif";

// Brands array
const brands = [
  { logo: kanha, name: "Kanha", time: "24 min" },
  { logo: harishankar, name: "Harishankar Veg Restro", time: "29 min" },
  { logo: agarwal, name: "Agarwal Caterers", time: "29 min" },
  { logo: burgerfarm, name: "Burger Farm", time: "21 min" },
  { logo: dominos, name: "Domino's Pizza", time: "24 min" },
  { logo: rominus, name: "Rominus Pizza And Burger", time: "22 min" },
];

const TopBrandsSlider = () => (
  <div className="w-full  py-15 shadow-sm rounded-xl">
    <div className="w-[40%] flex justify-center mx-auto">
      <h2 className="text-black text-3xl md:text-4xl font-semibold mb-4 drop-shadow-lg">
        Top brands for you
      </h2>
    </div>
    <div className="w-full flex items-center justify-between py-10">
      {/* Left Arrow (unique class) */}
      <button
        className="brands-slider-prev-btn ml-[1%] flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white shadow transition"
        aria-label="Previous"
        type="button"
      >
        <FaChevronLeft size={22} />
      </button>
      {/* Swiper Slider */}
      <div className="flex w-[90%]">
        <Swiper
          slidesPerView={5}
          modules={[Navigation]}
          navigation={{
            nextEl: ".brands-slider-next-btn",
            prevEl: ".brands-slider-prev-btn",
            disabledClass: "opacity-40 cursor-not-allowed",
          }}
          className="w-full py-10"
        >
          {brands.map((brand, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <div className="flex flex-col items-center">
                {/* Circle logo */}
                <div className="flex flex-col items-center justify-center bg-white w-[180px] h-[180px] rounded-full shadow-xl">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] object-cover rounded-2xl "
                  />
                </div>
                {/* Name */}
                <span className="mt-3 text-gray-800 text-[16px] font-medium text-center leading-tight">
                  {brand.name}
                </span>
                {/* Timing */}
                <span className="mt-1 text-[13px] text-gray-400 text-center">
                  {brand.time}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Right Arrow (unique class) */}
      <button
        className="brands-slider-next-btn mr-[2%] flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white shadow transition"
        aria-label="Next"
        type="button"
      >
        <FaChevronRight size={22} />
      </button>
    </div>
  </div>
);

export default TopBrandsSlider;
