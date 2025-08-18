import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle, FaArrowRight } from "react-icons/fa";

const RejectedPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <FaTimesCircle className="mx-auto text-red-500 text-6xl mb-6 animate-bounce" />

        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Your Request Was Rejected
        </h1>

        <p className="text-gray-600 mb-8">
          Unfortunately, your request has been declined. Please contact our
          support team if you believe this was a mistake or wish to try again.
        </p>

        <button
          onClick={handleLogin}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition"
          aria-label="Go to Login"
        >
          Go to Login <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default RejectedPage;
