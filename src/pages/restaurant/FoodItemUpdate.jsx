import React, { useState } from "react";
import RestSidebar from "../../components/RestSidebar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000";

const FoodItemUpdate = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem("token");
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState({
    foodName: item.foodName,
    foodType: item.foodType,
    price: item.price,
    category: item.category,
    isVeg: item.isVeg,
    description: item.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItems({ ...foodItems, [name]: value });
  };

  const handleSubmit = async (e) => {
   try {
     e.preventDefault();
     setLoading(true);
     const formData = new FormData();

     Object.entries(foodItems).forEach(([key, value]) => {
       formData.append(key, value);
     });

     selectedImages.forEach((item) => {
       if (item?.file && item?.id) {
         formData.append("images", item.file);
         formData.append("imageIds", item.id);
       }
     });

     const result = await axios.put(
       `${baseUrl}/food-item/update-items/${item._id}`,
       formData,
       {
         headers: { Authorization: `Bearer ${token}` },
       }
     );

     console.log(result.data, "Updated");
     if (result.status === 200) {
       setLoading(false);
       toast.success("Successfully Updated")
       navigate("/restaurant/menu");
       
     }
   } catch (error) {
    setLoading(false)
   toast.error(
     error?.response?.data?.message || error.message || "Something went wrong"
   );

   }
  };
console.log(selectedImages,"sss")
  return (
    <div className="h-screen flex bg-gray-100">
      <RestSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">
            Update Food Item
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Text Inputs - Two Columns */}
            {[
              { label: "Food Name", name: "foodName" },
              { label: "Food Type", name: "foodType" },
              { label: "Price", name: "price", type: "number" },
              { label: "Category", name: "category" },
              { label: "Veg / Non-Veg", name: "isVeg" },
              { label: "Description", name: "description" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={foodItems[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

            {/* Full-Width Image Section */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Images
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {item?.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 flex flex-col items-center shadow-sm bg-gray-50 relative"
                  >
                    <img
                      src={
                        selectedImages[idx]?.file
                          ? URL.createObjectURL(selectedImages[idx].file)
                          : img.imageUrl
                      }
                      className="w-24 h-24 object-cover rounded-md mb-4"
                      alt="preview"
                    />

                    {/* File Input */}
                    <label className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-1 rounded cursor-pointer  transition-all text-sm">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const id = img._id;
                          const updateImage = [...selectedImages];
                          updateImage[idx] = { file, id };
                          setSelectedImages(updateImage);
                        }}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodItemUpdate;
