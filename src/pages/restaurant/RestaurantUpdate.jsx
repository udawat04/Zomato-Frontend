import React, { useState } from "react";
import RestSidebar from "../../components/RestSidebar";
import axios from "axios";
const baseUrl = "http://localhost:5000";

const RestaurantUpdate = () => {
  const { restaurant } = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token")

  const [rest, setUpdateRest] = useState({
    restaurantName: restaurant.restaurantName,
    ownerName: restaurant.ownerName,
    email: restaurant.email,
    phone: restaurant.phone,
    street: restaurant.street,
    city: restaurant.city,
    state: restaurant.state,
    zip: restaurant.zip,
    restaurantType: restaurant.restaurantType,
    open: restaurant.open,
    close: restaurant.close,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateRest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async(e)=>{
e.preventDefault()
console.log(rest,"data to be updated")
const result = await axios.put(
  `${baseUrl}/rest/update`,
  { ...rest },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
console.log(result,"result")
}

  return (
    <div className="flex h-screen bg-gray-100">
      <RestSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-yellow-600 mb-6">
            Update Restaurant Details
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantName"
                value={rest.restaurantName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Restaurant Name"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={rest.ownerName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Owner Name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={rest.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={rest.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Phone Number"
              />
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={rest.street}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Street"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={rest.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="City"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={rest.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="State"
              />
            </div>

            {/* Zip */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                name="zip"
                value={rest.zip}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Zip"
              />
            </div>

            {/* Restaurant Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Type
              </label>
              <input
                type="text"
                name="restaurantType"
                value={rest.restaurantType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Type"
              />
            </div>

            {/* Open / Close Time */}
            <div className="flex gap-4 col-span-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Open Time
                </label>
                <input
                  type="time"
                  name="open"
                  value={rest.open}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Close Time
                </label>
                <input
                  type="time"
                  name="close"
                  value={rest.close}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
              >
                Update Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantUpdate;
