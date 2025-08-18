import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/zomato.avif";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000";

const Login = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // fetch coordinates
  const getCoordinates = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoordinates({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        (err) => reject(err.message)
      );
    });

  // update delivery boy location
  const updateDeliveryBoyLocation = async (id, latitude, longitude, token) => {
    try {
     const res =  await axios.put(
        `${baseUrl}/delivery-boy/update-location/${id}`,
        { dbId: id, latitude, longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res,"Delivery boy location updated successfully");

    } catch (err) {
      console.error("Failed to update location:", err);
    }
  };

  // login
  const handleLogin = async () => {
    try {
      if (!formData.email || !formData.password) {
        toast.error("Please enter email and password");
        return;
      }

      // get user location first
      const { latitude, longitude } = await getCoordinates();

      const res = await axios.post(`${baseUrl}/users/login`, formData);
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("coordinates",coordinates)

      const showToastAndNavigate = (message, path) => {
        toast.success(message);
        navigate(path);
      };

      if (user.role === "restaurant") {
        if (user.status === "pending")
          return (
            toast.error("Your request is pending.") || navigate("/pending")
          );
        if (user.status === "rejected")
          return (
            toast.error("Your request is rejected.") || navigate("/rejected")
          );
        if (user.status === "active")
          return showToastAndNavigate(
            "Login successful!",
            "/restaurant/dashboard"
          );
        toast.error("Invalid restaurant status");
      } else if (user.role === "admin") {
        showToastAndNavigate("Login successful!", "/admin/dashboard");
      } else if (user.role === "user") {
        showToastAndNavigate("Login successful!", "/home");
      } else if (user.role === "delivery-boy") {
        if (user.status === "pending")
          return (
            toast.error("Your request is pending.") || navigate("/pending")
          );
        if (user.status === "rejected")
          return (
            toast.error("Your request is rejected.") || navigate("/rejected")
          );
        if (user.status === "active") {
          // update location in backend
          await updateDeliveryBoyLocation(user.deliveryBoyId, latitude, longitude, token);
          return showToastAndNavigate(
            "Login successful!",
            "/delivery-boy/dashboard"
          );
        }
        toast.error("Invalid delivery-boy status");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errMsg =
        error.response?.data?.message || "Login failed. Try again.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
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
            type="password"
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
