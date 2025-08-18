import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaPhoneAlt,
  FaStar,
  FaWifi,
  FaParking,
  FaConciergeBell,
} from "react-icons/fa";
import { FaLeaf, FaDrumstickBite, FaUtensils } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const baseUrl = "http://localhost:5000";


const SingleRestaurant = () => {
    const token = localStorage.getItem("token");
    const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();
  const rest = location.state;
  console.log(rest)

  const [mainImage, setMainImage] = useState(
    rest.image?.[0] || "https://b.zmtcdn.com/data/pictures/default.jpg"
  );

   const fetchMenu = async () => {
    const id = rest._id
     try {
       const res = await axios.get(`${baseUrl}/food-item/rest-items/${id}`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       console.log(res.data,"response from single User")
       setMenuItems(res.data);
     } catch (error) {
       console.error("Error fetching menu:", error);
       toast.error("Failed to fetch menu");
     } 
   };

   useEffect(() => {
     fetchMenu();
   }, []);

  return (
    <div>
      <Header />
      <Navbar />

      <main className="py-8 px-4 md:px-12 bg-[#fafafa] min-h-screen">
        {/* TOP SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Image Gallery */}
          <div>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={mainImage}
                alt="Restaurant"
                className="w-full h-80 object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {rest.image?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumbnail-${i}`}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${
                    mainImage === img
                      ? "border-orange-500"
                      : "border-transparent"
                  } hover:scale-110 transition-transform duration-300`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col justify-between">
            {/* Title + Rating */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-3xl font-bold">{rest.restaurantName}</h1>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <FaStar /> {rest.rating || 4.5}
                </span>
              </div>
              <div className="mb-4">
                {rest.restaurantType === "Vegetarian" ? (
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                    <FaLeaf className="text-green-600" /> Pure Veg
                  </span>
                ) : rest.restaurantType === "Non-Vegetarian" ? (
                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                    <FaDrumstickBite className="text-red-600" /> Non-Veg
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium">
                    <FaUtensils className="text-orange-600" /> Mixed
                  </span>
                )}
              </div>

              {/* Info List */}
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {`${rest.address?.street || "Not Provided"}, ${
                    rest.address?.city || ""
                  }, ${rest.address?.state || ""} - ${rest.address?.zip || ""}`}
                </li>
                <li className="flex items-center gap-2">
                  <FaClock className="text-orange-500" />{" "}
                  {rest.openingHours?.open || "9:00 AM"} -{" "}
                  {rest.openingHours?.close || "11:00 PM"}
                </li>
                <li className="flex items-center gap-2">
                  <FaRupeeSign className="text-orange-500" /> ₹
                  {rest.price || 1400} for two
                </li>
                <li className="flex items-center gap-2">
                  <FaPhoneAlt className="text-orange-500" />{" "}
                  {rest.contact || "+91-9876543210"}
                </li>
              </ul>

              {/* Extra Static Data */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Facilities</h3>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <FaWifi /> Free Wi-Fi
                  </span>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <FaParking /> Parking Available
                  </span>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <FaConciergeBell /> Table Service
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Popular Dishes</h3>
                <p className="text-gray-600 text-sm">
                  Butter Chicken, Paneer Tikka, Garlic Naan, Mutton Rogan Josh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">
            About {rest.restaurantName}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to {rest.restaurantName}, where flavor meets perfection. Our
            team of expert chefs brings authentic recipes to life using fresh,
            locally sourced ingredients. From aromatic curries to sizzling
            grills, every dish is prepared with passion. The warm ambiance and
            top-notch service make it a perfect spot for family dinners, casual
            hangouts, or romantic evenings.
          </p>
        </section>

        {/* MENU SECTION */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Our Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            { menuItems && menuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
              >
                <img
                  src={item.images[0].imageUrl || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-full h-80 object-contain rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm flex-grow">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-orange-500 font-bold">
                    ₹{item.price}
                  </span>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SingleRestaurant;
