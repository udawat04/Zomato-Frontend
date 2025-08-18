import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";



const TopBrandsSlider = ({ restaurants }) => (
  <div className="w-full  py-15 shadow-sm rounded-xl">
    <div className="max-w-6xl mx-auto">
      <div className="w-[50%] flex justify-center ">
        <h2 className="text-black text-3xl md:text-4xl font-semibold mb-4 drop-shadow-lg">
          Top Restaurant brands for you
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
            slidesPerView={4}
            
            modules={[Navigation]}
            navigation={{
              nextEl: ".brands-slider-next-btn",
              prevEl: ".brands-slider-prev-btn",
              disabledClass: "opacity-40 cursor-not-allowed",
            }}
            className="w-full py-10"
          >
            {restaurants.map((brand, idx) => (
              <SwiperSlide key={idx} className="flex justify-center">
                <div className="flex flex-col items-center">
                  {/* Circle logo */}
                  <div className="flex flex-col items-center justify-center bg-white w-[180px] h-[180px] rounded-2xl hover:scale-110 cursor-pointer transition-all shadow-xl">
                    <img
                      src={
                        brand.image[0] ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          brand.restaurantName
                        )}`
                      }
                      className="md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] object-cover rounded-xl "
                      alt=""
                    />
                  </div>
                  {/* Name */}
                  <span className="mt-3 text-gray-800 text-[16px] font-medium text-center leading-tight">
                    {brand.restaurantName}
                  </span>
                  {/* Timing */}
                  <span className="mt-1 text-[13px] text-gray-400 text-center">
                    {brand.openingHours.open} to {brand.openingHours.close}
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
  </div>
);

export default TopBrandsSlider;
