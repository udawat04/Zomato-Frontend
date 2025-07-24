import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/zomato.avif";
import axios from "axios";
const baseUrl = "http://localhost:5000";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) return;
    const res = await axios.post(`${baseUrl}/users/login`, {
      ...formData,
    });
    console.log(res.data, "user logged in");
    localStorage.setItem("token",res.data.token)
    if (res.data.user.role === "restaurant") {
      navigate("/restaurant/dashboard");
    } 
    else if (res.data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (res.data.user.role === "user") {
      navigate("/home");
    } else if (res.data.user.role === "delivery-boy") {
      navigate("/delivery-boy/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url(${bgImage})`, // ✅ Make sure this image exists in public/assets/
        }}
      ></div>

      {/* Semi-transparent Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Centered Login Box */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
          <button
            className="absolute top-2 right-3 text-xl font-bold"
            onClick={() => navigate("/")}
          >
            ×
          </button>

          <h2 className="text-2xl font-semibold mb-4">Log in</h2>

          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-3 mb-3 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            className="w-full p-3 mb-3 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded text-white bg-red-500 hover:bg-red-600"
          >
            Log in
          </button>

          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <span
              className="text-red-500 font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
