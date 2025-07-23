import React from "react";
import { useNavigate } from "react-router-dom";
import restImage from "../assets/rest1.jpg"; // Make sure this image exists

const RestaurantDashboard = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/signup", { state: { role: "restaurant" } });
  };

  return (
    <div
      className="h-screen w-full bg-center bg-cover bg-no-repeat relative flex items-center justify-center text-black"
      style={{
        backgroundImage: `url(${restImage})`,
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Partner with Zomato <br /> and grow your business
        </h1>

        <p className="text-lg sm:text-xl mb-6">
          <span className="text-blue-800 font-semibold">
            0% commission for 1st month!
          </span>{" "}
          Valid for new restaurant partners in select cities
        </p>

        <button
          onClick={handleRegisterClick}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg rounded-lg transition-all duration-300 text-white"
        >
          Register your restaurant
        </button>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
