import React from "react";
import { useNavigate } from "react-router-dom";
import zomato from "../assets/zomato.avif";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative text-white"
      style={{
        backgroundImage: `url(${zomato})`,
      }}
    >
      {/* Top Navbar */}
      <div className="absolute top-0 right-0 p-6 flex gap-6 text-lg font-medium">
        <button
          onClick={() => navigate("/restaurant-dashboard")}
          className="hover:underline"
        >
          Add restaurant
        </button>
        <button
          onClick={() => navigate("/signup", { state: { role: "delivery" } })}
          className="hover:underline"
        >
          Delivery boy
        </button>
        <button
          onClick={() => navigate("/signup", { state: { role: "admin" } })}
          className="hover:underline"
        >
          Admin
        </button>
        <button
          onClick={() => navigate("/login")}
          className="hover:underline"
        >
          Log in
        </button>
        <button
          onClick={() => navigate("/signup", { state: { role: "user" } })}
          className="hover:underline"
        >
          Sign up
        </button>
      </div>

      {/* Center Text */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-6xl font-bold mb-4">zomato</h1>
        <p className="text-2xl">Find the best restaurants, cafés and bars in India</p>
      </div>
    </div>
  );
};

export default Home;
