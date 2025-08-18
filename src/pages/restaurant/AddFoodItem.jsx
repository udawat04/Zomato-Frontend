import React, { useState, useRef } from "react";
import {
  FaUtensils,
  FaTag,
  FaMoneyBillWave,
  FaRegFileImage,
  FaAlignLeft,
  FaPlus,
  FaList,
  FaLeaf,
  FaUtensilSpoon,
} from "react-icons/fa";
import RestSidebar from "../../components/RestSidebar";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000";

const AddFoodItem = () => {
  const [food, setFood] = useState({
    foodName: "",
    price: "",
    description: "",
    category: "",
    foodType: "",
    isVeg: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");



  function handleChange(e) {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    setFood((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("foodName", food.foodName);
      formData.append("price", food.price);
      formData.append("description", food.description);
      formData.append("category", food.category);
      formData.append("foodType", food.foodType);
      formData.append("isVeg", food.isVeg);

      food.images.forEach((img) => formData.append("images", img));

      const result = await axios.post(`${baseUrl}/food-item/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        toast.success("Successfully Created");
        setFood({
          foodName: "",
          price: "",
          description: "",
          category: "",
          foodType: "",
          isVeg: "",
          images: [],
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error("Error Occurred");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RestSidebar />
      <div className="flex-1 p-6 flex justify-center bg-gray-50 min-h-max">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl w-full max-w-fit mx-auto flex flex-col lg:flex-row lg:flex-wrap gap-6 p-6"
        >
          <h2 className="w-full text-2xl font-bold mb-2 text-center text-gray-800 flex items-center justify-center gap-2">
            <FaPlus className="text-yellow-500" />
            Add Food Item
          </h2>

          {/* Food Name */}
          <div className="w-full lg:w-1/3">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaUtensils />
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="e.g. Margherita Pizza"
              value={food.foodName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Food Type */}
          <div className="w-full lg:w-1/3">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaUtensilSpoon />
              Food Type
            </label>
            <select
              name="foodType"
              value={food.foodType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            >
              <option value="">Select Food Type</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Street Food">Street Food</option>
              <option value="Main Course">Main Course</option>
              <option value="Beverage">Beverage</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Price */}
          <div className="w-full lg:w-1/3">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaMoneyBillWave />
              Price
            </label>
            <input
              type="number"
              name="price"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="e.g. 199"
              value={food.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Category */}
          <div className="w-full lg:w-1/3">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaList />
              Category
            </label>
            <input
              type="text"
              name="category"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="e.g. Pizza Burger Pullav"
              value={food.category}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Veg / Non-Veg */}
          <div className="w-full lg:w-1/3">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaLeaf />
              Veg / Non-Veg
            </label>
            <select
              name="isVeg"
              value={food.isVeg}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            >
              <option value="">Select</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaAlignLeft />
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Short description..."
              value={food.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          {/* Images */}
          <div className="w-full">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaRegFileImage />
              Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 py-2"
            />
            {food.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {food.images.map((file, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-yellow-100 border border-yellow-300 px-2 py-1 rounded text-xs text-gray-700"
                  >
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg mt-2 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
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
                Submitting...
              </>
            ) : (
              "Add Item"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
