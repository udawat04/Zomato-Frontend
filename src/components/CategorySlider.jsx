import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";

// Images import
import pizza from "../assets/pizza.avif";
import burger from "../assets/burger.avif";
import vegmeal from "../assets/veg-meal.avif";
import cake from "../assets/cake.avif";
import rolls from "../assets/rolls.avif";
import thali from "../assets/thali.avif";

const categories = [
  { label: "Pizza", img: pizza },
  { label: "Burger", img: burger },
  { label: "Veg Meal", img: vegmeal },
  { label: "Cake", img: cake },
  { label: "Rolls", img: rolls },
  { label: "Thali", img: thali },
  { label: "Thali", img: thali },
];

const CategorySlider = () => (
  <div className="w-full bg-[#f8f8f8] py-15 shadow-sm">
    <div className="w-[40%] flex justify-center ">
      <h2 className="text-black text-3xl md:text-4xl font-semibold mb-4 drop-shadow-lg ">
        Inspiration for your first order
      </h2>
    </div>
    <div className="w-full flex items-center justify-between py-10">
      {/* Left Arrow - OUTSIDE image slider */}
      <button
        className="slider-prev-btn ml-[1%] flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white shadow transition"
        aria-label="Previous"
        type="button"
      >
        <FaChevronLeft size={22} />
      </button>

      {/* Slider in middle, between buttons */}
      <div className="flex w-[90%]">
        <Swiper
          slidesPerView={6}
          // spaceBetween={24}  // You may set spaceBetween if needed
          modules={[Navigation]}
          navigation={{
            nextEl: ".slider-next-btn",
            prevEl: ".slider-prev-btn",
            disabledClass: "opacity-40 cursor-not-allowed",
          }}
          className="w-full py-10"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.label} className="flex justify-center">
              <div className="flex flex-col items-center">
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="md:w-[100px] md:h-[100px] lg:w-[160px] lg:h-[160px] object-cover rounded-full shadow-xl"
                  style={{ background: "#f5f5f5" }}
                />
                <span className="text-gray-800 text-xl font-medium mt-3">
                  {cat.label}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Arrow - OUTSIDE image slider */}
      <button
        className="slider-next-btn mr-[2%] flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white shadow transition"
        aria-label="Next"
        type="button"
      >
        <FaChevronRight size={22} />
      </button>
    </div>
  </div>
);

export default CategorySlider;
