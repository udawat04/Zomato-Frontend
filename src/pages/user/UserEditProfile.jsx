import React, { useState } from "react";
import UserSidebar from "../../components/UserSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000";

const UserEditProfile = () => {
  const navigate = useNavigate();

  // User data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Loader states separately for each form
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  // User info state
  const [user, setUser] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    role: "Customer",
    images: userData.image || "https://i.pravatar.cc/300",
  });
 

  // Image
  const [selectedImage, setSelectedImage] = useState(null);

  // Handlers for user info inputs
  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Submit user info form (name, email, phone, image)
  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    setLoadingUserInfo(true);

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    if (selectedImage) {
      formData.append("images", selectedImage);
    }

    try {
      const res = await axios.put(`${baseUrl}/users/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        const updatedUser = res.data.updatedUser || res.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully");
        navigate("/user/dashboard");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      alert("Server error while updating profile");
      console.error(err);
    } finally {
      setLoadingUserInfo(false);
    }
  };

  // Cancel handlers (reset to initial state)
  const handleUserCancel = () => {
    setUser({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: "Customer",
      images: userData.image || "https://i.pravatar.cc/300",
    });
    setSelectedImage(null);
  };



  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>

        {/* User Info Form */}
        <form
          onSubmit={handleUserInfoSubmit}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8 mb-12"
        >
          {/* Profile image and upload */}
          <div className="flex flex-col items-center justify-center md:w-1/3 bg-gray-50 p-6 rounded-xl shadow-inner">
            <div className="relative">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : user.images
                }
                alt={user.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-pink-400 shadow-lg"
              />
            </div>

            {/* Upload button */}
            <div className="mt-6">
              <label className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow font-semibold transition">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedImage(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
            <p className="mt-3 text-sm text-gray-500 text-center">
              JPG, PNG up to 2MB
            </p>
          </div>

          {/* User info fields */}
          <div className="flex-1 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-gray-600 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleUserChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleUserChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleUserChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 flex gap-4 items-center mt-4">
              <button
                type="submit"
                disabled={loadingUserInfo}
                className={`flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition ${
                  loadingUserInfo ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loadingUserInfo && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loadingUserInfo ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                disabled={loadingUserInfo}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
                onClick={handleUserCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        {/* Address Editing Form */}
        {/* <form
          onSubmit={handleAddressSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Edit Address
          </h2>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
              Select Address
            </label>
            <select
              value={selectedAddressIndex}
              onChange={(e) => setSelectedAddressIndex(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            >
              {addresses.map((_, i) => (
                <option key={i} value={i}>
                  Address {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={addresses[selectedAddressIndex]?.street || ""}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={addresses[selectedAddressIndex]?.city || ""}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={addresses[selectedAddressIndex]?.state || ""}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                landmark
              </label>
              <input
                type="text"
                name="landmark"
                value={addresses[selectedAddressIndex]?.landmark || ""}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              disabled={loadingAddress}
              className={`bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition ${
                loadingAddress ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loadingAddress ? "Saving..." : "Save Address"}
            </button>
            <button
              type="button"
              disabled={loadingAddress}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
              onClick={handleAddressCancel}
            >
              Cancel
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default UserEditProfile;
