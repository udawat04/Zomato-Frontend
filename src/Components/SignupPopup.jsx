/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const baseUrl = "http://localhost:5000";

const SignupPopup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    agreed: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "user"; // default role

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const canSubmit =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.agreed;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    console.log("Submitting:", formData, "Role:", role);

    if (role === "restaurant") {
      const res = await axios.post(`${baseUrl}/rest/create`, {
        ...formData,
      });
      console.log(res.data, "restaurant signup data");
      navigate("/login");
    } else if (role === "delivery") {
      const res = await axios.post(`${baseUrl}/delivery-boy/create`, {
        ...formData,
      });
      console.log(res.data, "delivery-boy signup data");
      navigate("/login");
    } else {
      const res = await axios.post(`${baseUrl}/users/create`, {
        ...formData,
      });
      console.log(res.data, "User signup data");
      navigate("/login");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-xl font-bold"
          onClick={() => {role === "restaurant"
            ? navigate("/restaurant-dashboard")
            : navigate("/");}}
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {role === "restaurant"
            ? "Restaurant Owner Sign up"
            : role === "delivery"
            ? "Delivery Boy Sign up"
            : "User Sign up"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          onChange={handleChange}
          value={formData.name}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          onChange={handleChange}
          value={formData.email}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          onChange={handleChange}
          value={formData.phone}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          onChange={handleChange}
          value={formData.password}
        />

        <div className="flex items-start mb-3">
          <input
            type="checkbox"
            name="agreed"
            onChange={handleChange}
            className="mt-1 mr-2"
            checked={formData.agreed}
          />
          <p className="text-sm text-gray-600">
            I agree to Zomato’s{" "}
            <span className="text-red-500 font-semibold cursor-pointer">
              Terms of Service
            </span>
            ,{" "}
            <span className="text-red-500 font-semibold cursor-pointer">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="text-red-500 font-semibold cursor-pointer">
              Content Policies
            </span>
          </p>
        </div>

        <button
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={`w-full py-3 rounded text-white ${
            canSubmit
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Create account
        </button>

        <div className="my-3 text-center text-gray-400">or</div>

        <button className="w-full py-3 border rounded flex items-center justify-center gap-2">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-red-500 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPopup;
