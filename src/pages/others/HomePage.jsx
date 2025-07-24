import React from "react";
import { useNavigate } from "react-router-dom";
import zomato from "../../assets/zomato.avif";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${zomato})` }}
    >
      {/* Overlay: allows image to show through, keeps content readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0" />

      {/* Navigation Bar */}
      <header className="relative z-10 w-full flex justify-between items-center px-8 pt-6">
        <div className="flex items-center gap-2 select-none">
          <span className="font-extrabold text-3xl md:text-4xl text-white tracking-wide">
            zomato
          </span>
        </div>
        <div className="flex gap-4 md:gap-6">
          <button
            onClick={() => navigate("/restaurant/welcome")}
            className="bg-transparent text-white px-5 py-2 rounded-lg font-medium hover:bg-white/10 transition"
          >
            Add restaurant
          </button>
          <button
            onClick={() => navigate("/signup", { state: { role: "delivery" } })}
            className="bg-transparent text-white px-5 py-2 rounded-lg font-medium hover:bg-white/10 transition"
          >
            Delivery boy
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-pink-500 font-bold px-5 py-2 rounded-lg transition hover:bg-pink-50"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup", { state: { role: "user" } })}
            className="bg-pink-500 text-white font-bold px-5 py-2 rounded-lg transition hover:bg-pink-600"
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Centered Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center h-[90vh]">
        <h1 className="text-white font-extrabold text-4xl md:text-7xl drop-shadow-lg mb-2 tracking-tight">
          Discover the best food & drinks in India
        </h1>
        <p className="text-base md:text-xl text-gray-200 font-light mb-8 max-w-2xl mx-auto">
          Explore restaurants, cafés, and bars right from your home.
        </p>

        {/* Explore Food Button */}
        <button
          className="mt-2 mb-10 bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition"
          onClick={() => navigate("/home")}
        >
          Explore Food
        </button>
      </main>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-200 text-xs font-light z-10 tracking-wide select-none">
        © {new Date().getFullYear()} Zomato Replica. For demo purposes only.
      </footer>
    </div>
  );
};

export default HomePage;
