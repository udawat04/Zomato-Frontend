import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHourglassHalf, FaArrowRight } from "react-icons/fa";

const PendingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <FaHourglassHalf className="mx-auto text-yellow-400 text-6xl mb-6 animate-pulse" />

        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Your Request is Pending
        </h1>

        <p className="text-gray-600 mb-8">
          We have received your request and it is currently under review. You
          will be notified as soon as your request is approved.
        </p>

        <button
          onClick={handleLogin}
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition"
          aria-label="Go to Login"
        >
          Go to Login <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PendingPage;
