import React, { useState } from "react";
import bgImage from "../assets/rest2.avif"; // ✅ make sure this path is correct

const AddFoodItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("price", formData.price);
    data.append("description", formData.description);
    formData.images.forEach((image) => data.append("images", image));

    fetch("http://localhost:5000/api/food", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert("Food item added successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error uploading food item.");
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Add Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Food Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Type</label>
            <input
              type="text"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
