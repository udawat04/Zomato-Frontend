import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaDrumstickBite,
  FaUtensils,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaClock,
  FaShoppingCart,
} from "react-icons/fa";

const SingleFoodItemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location,"location from single food item")
  const food = location.state;
  const [mainImage, setMainImage] = useState(food?.images?.[0]?.imageUrl || "");

  if (!food) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Food item not found
      </div>
    );
  }

  // Food type Icon
  const typeIcon =
    food.isVeg === "Veg" ? (
      <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium shadow">
        <FaLeaf className="text-green-600 text-lg" /> Pure Veg
      </span>
    ) : food.isVeg === "Non-Veg" ? (
      <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium shadow">
        <FaDrumstickBite className="text-red-600 text-lg" /> Non-Veg
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium shadow">
        <FaUtensils className="text-orange-600 text-lg" /> Mixed
      </span>
    );

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <Header />
      <Navbar />

      <main className="py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Left Side */}
          <div className="h-full flex flex-col " >
            <img
              src={mainImage}
              alt={food.foodName}
              className="w-full h-[300px] my-auto object-contain rounded-lg shadow-xl  transform hover:scale-[1.02] transition duration-300"
            />

            {food.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 hide-scrollbar">
                {food.images.map((img, idx) => {
                  const imageUrl = img.imageUrl || img;
                  return (
                    <img
                      key={idx}
                      src={imageUrl}
                      alt={`preview-${idx}`}
                      onClick={() => setMainImage(imageUrl)}
                      className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition transform hover:scale-110 hover:shadow-md
                        ${
                          mainImage === imageUrl
                            ? "border-yellow-500 shadow-lg"
                            : "border-transparent"
                        }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div>
            {/* Title + Type */}
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-gray-800">
                {food.foodName}
              </h1>
              {typeIcon}
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-yellow-600 mb-2">
              ₹{food.price}
            </p>

            {/* Description */}
            <p className="text-gray-700 mb-4 leading-relaxed">
              {food.description || "No description available."}
            </p>

            {/* Category/Type + Add to Cart button row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              {/* Left: Category & Food Type */}
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  <strong>Category:</strong> {food.category}
                </p>
                <p>
                  <strong>Food Type:</strong> {food.foodType}
                </p>
              </div>

              {/* Right: Add to Cart */}
              <button className="flex items-center cursor-pointer gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>

            {/* Restaurant Details */}
            <div className="bg-gradient-to-r from-gray-100 to-yellow-50 p-5 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold mb-3 text-gray-800">
                🍽 Restaurant
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-2 text-sm text-gray-700">
                  <p className="font-medium text-lg">
                    {food.restaurant?.restaurantName}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUser className="text-yellow-600" />{" "}
                    {food.restaurant?.ownerName}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-green-600" />{" "}
                    {food.restaurant?.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />{" "}
                    {food.restaurant?.address?.street || ""},{" "}
                    {food.restaurant?.address?.city || ""}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />{" "}
                    {food.restaurant?.openingHours?.open || "N/A"} -{" "}
                    {food.restaurant?.openingHours?.close || "N/A"}
                  </p>
                  <p>
                    Type:{" "}
                    <span className="font-medium">
                      {food.restaurant?.restaurantType}
                    </span>
                  </p>
                </div>

                {food.restaurant?.image?.[0] && (
                  <img
                    className="w-32 h-32 rounded-lg object-cover shadow-md"
                    src={food.restaurant.image[0]}
                    alt="Restaurant"
                  />
                )}
              </div>

              <button
                onClick={() =>
                  navigate(`/user/restaurant/${food.restaurantId}`, {
                    state: food.restaurant,
                  })
                }
                className="mt-4 px-5 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 hover:shadow-md transform hover:scale-105 transition"
              >
                View Restaurant →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleFoodItemPage;
