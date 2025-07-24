import React, { useState } from "react";
import {
  FaUtensils,
  FaTag,
  FaMoneyBillWave,
  FaRegFileImage,
  FaAlignLeft,
  FaPlus,
} from "react-icons/fa";
import RestSidebar from "../../components/RestSidebar";

const AddFoodItem = () => {
  const [food, setFood] = useState({
    foodName: "",
    type: "",
    price: "",
    description: "",
    images: [],
  });

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

  function handleSubmit(e) {
    e.preventDefault();
    // You can add your submit logic here
    alert(JSON.stringify(food, null, 2));
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
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

          {/* Type */}
          <div className="w-full lg:w-1/3">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaTag />
              Type
            </label>
            <input
              type="text"
              name="type"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="e.g. Veg, Non-Veg, Dessert"
              value={food.type}
              onChange={handleChange}
              required
            />
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
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg mt-2 transition"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
