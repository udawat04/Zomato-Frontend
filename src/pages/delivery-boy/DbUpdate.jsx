import React, { useState } from "react";
import DbSidebar from "../../components/DbSidebar";
import axios from "axios";


const baseUrl = "http://localhost:5000";

const DbUpdate = () => {
 
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));

  // Loader state
  const [loading, setLoading] = useState(false);

  // Form data state
  const [user, setUser] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    role: "Delivery Boy",
    images: userData.dbImage || "https://i.pravatar.cc/300",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    if (selectedImage) {
      formData.append("images", selectedImage);
    }

    try {
      const res = await axios.put(
        `${baseUrl}/delivery-boy/db-update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data)

      if (res.status === 200) {
        const updatedUser = res.data.updatedUser || res.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully");
       
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      alert("Server error while updating profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUser({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: "Delivery Boy",
      images: userData.image || "https://i.pravatar.cc/300",
    });
    setSelectedImage(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DbSidebar />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Update Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center justify-center md:w-1/3 bg-gray-50 p-6 rounded-xl shadow-inner">
            <img
              src={
                selectedImage ? URL.createObjectURL(selectedImage) : user.images
              }
              alt={user.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-pink-400 shadow-lg"
            />
            <label className="mt-6 cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow font-semibold transition">
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
            <p className="mt-3 text-sm text-gray-500 text-center">
              JPG, PNG up to 2MB
            </p>
          </div>

          {/* Info Fields */}
          <div className="flex-1 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-gray-600 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 flex gap-4 items-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && (
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
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DbUpdate;
