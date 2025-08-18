/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import WhyChooseUs from "../../components/WhyChooseUs";
import CategorySlider from "../../components/CategorySlider";
import TopBrandsSlider from "../../components/TopBrandSlider";
import RestaurantCard from "../../components/RestaurantCard";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const baseUrl = "http://localhost:5000";



const UserHomePage = () => {
   const [allRestaurants, setAllRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
      const [foodItems, setFoodItems] = useState([]);
      // const [filteredItems, setFilteredItems] = useState([]);
      const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("token");


   const fetchRestaurant = async () => {
     try {
       const res = await axios.get(`${baseUrl}/rest/`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       console.log(res.data,"fetch restaurants")
     
       const filterRestaurant = res.data.filter((item)=>item.status==="active")
       console.log(filterRestaurant,"filter restaurants")
       setAllRestaurants(filterRestaurant);
     } catch (error) {
       console.error("Error fetching menu:", error);
       toast.error("Failed to fetch menu");
     } finally {
       setLoading(false);
     }
   };
 
    const fetchfoodItems = async () => {
       try {
         const res = await axios.get(`${baseUrl}/food-item/`);
         const allItems = res.data;
         setFoodItems(allItems);
 
         // Extract unique categories
        const uniqueCategories = Object.values(
          allItems.reduce((acc, item) => {
            const category = item.category || "Uncategorized";
            if (!acc[category]) {
              acc[category] = { category, images: item.images };
            }
            return acc;
          }, {})
        );

    
       
        
         setCategories(uniqueCategories);
       } catch (error) {
         console.error("Error fetching menu:", error);
       }
     };
   
   useEffect(() => {
     fetchRestaurant();
     fetchfoodItems()
     
   }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col">
      {/* Hero with background image and overlay */}

      <Header />
      <Navbar />
      <Banner />

      <CategorySlider categories={categories} />

      <TopBrandsSlider restaurants={allRestaurants} />

      {/* Content section */}
      <div className="flex-1 overflow-auto p-6 max-w-7xl mx-auto">
        {/* Featured Restaurants */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Featured Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allRestaurants.map((rest, index) => (
              <Link
                key={index}
                to={`/user/restaurant/${rest._id}`}
                state={rest}
              >
                <div className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col">
                  <img
                    src={
                      rest.image[0] ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        rest.restaurantName
                      )}`
                    }
                    alt={rest.name}
                    className="rounded-t-2xl h-48 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <span className="font-bold text-lg text-gray-700">
                      {rest.restaurantName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {rest.address?.street},{rest.address?.city},
                      {rest.address?.state}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {rest.restaurantType}
                    </span>
                    <div className="mt-3 flex items-center">
                      <span className="bg-green-500 text-white font-semibold px-3 py-1 rounded mr-2">
                        {rest.rating} ★
                      </span>
                      <span className="text-gray-500 text-xs">Ratings</span>
                    </div>
                    <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
                      View Menu
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <WhyChooseUs />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default UserHomePage;
