import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurants }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 py-8">
    {restaurants.map((rest) => (
      <Link to={`/user/restaurant/${rest._id}`} state={rest}>
        <div
          key={rest._id}
          className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={
                rest.image?.[0] ||
                "https://b.zmtcdn.com/data/pictures/2/100262/c10ac3c3ed2c0d92e278226b0e1ba745_o2_featured_v2.jpg"
              }
              alt={rest.name}
              className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
            />
            {/* Discount */}
            {rest.discount && (
              <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-sm">
                {rest.discount}
              </span>
            )}
            {/* Promoted Tag */}
            {rest.promoted && (
              <span className="absolute top-3 right-3 bg-white text-gray-700 text-[11px] font-medium px-2 py-[2px] rounded-md shadow-sm">
                Promoted
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg truncate">
                {rest.restaurantName}
              </h3>
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-[2px] rounded-full shadow-sm">
                {rest.rating || 4.5}
              </span>
            </div>
            <p className="text-gray-500 text-sm truncate mb-2">
              {rest.restaurantType}
            </p>
            <div className="flex justify-between items-center text-gray-600 text-sm font-medium">
              <span className="text-orange-500 font-semibold">
                ₹{rest.price || 1400} for two
              </span>
              <span>
                {rest.openingHours?.open} - {rest.openingHours?.close}
              </span>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default RestaurantCard;
