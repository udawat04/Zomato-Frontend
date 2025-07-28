
import React from "react";
import WhyChooseUs from "../../components/WhyChooseUs";
import CategorySlider from "../../components/CategorySlider";
import TopBrandsSlider from "../../components/TopBrandSlider";
import RestaurantCard from "../../components/RestaurantCard";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";

const popularFoods = [
  { name: "Margherita Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
  { name: "Paneer Tikka", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" },
  { name: "Chicken Biryani", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0723c6b?auto=format&fit=crop&w=400&q=80" },
  { name: "Veg Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
  { name: "Gulab Jamun", image: "https://images.unsplash.com/photo-1589308078051-dcdbb1f1234e?auto=format&fit=crop&w=400&q=80" },
];

const featuredRestaurants = [
  { name: "The Urban Tadka", location: "Connaught Place, Delhi", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", cuisines: "North Indian, Mughlai", rating: 4.5 },
  { name: "Burger Bliss", location: "Koramangala, Bangalore", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", cuisines: "American, Fast Food", rating: 4.3 },
  { name: "Royal Biryani", location: "Gachibowli, Hyderabad", image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80", cuisines: "Biryani, Hyderabadi", rating: 4.6 },
  { name: "Sweet Tooth", location: "Park Street, Kolkata", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80", cuisines: "Desserts, Bakery", rating: 4.8 },
];

const UserHomePage = () => {
 

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col">
      {/* Hero with background image and overlay */}

      <Header />
      <Navbar />
      <Banner />

      <CategorySlider />

      <TopBrandsSlider />

      {/* Content section */}
      <div className="flex-1 overflow-auto p-6 max-w-7xl mx-auto">
        {/* Popular Foods */}
        <section className="mb-12 w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Popular Foods
          </h2>
          <div className="flex w-full gap-6 overflow-hidden no-scrollbar  pb-3">
            {popularFoods.map((food) => (
              <div
                key={food.name}
                className="min-w-[180px] bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col items-center"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="rounded-md w-28 h-28 object-cover mb-3"
                />
                <span className="text-gray-800 font-semibold">{food.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Restaurants */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Featured Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredRestaurants.map((rest) => (
              <div
                key={rest.name}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="rounded-t-2xl h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <span className="font-bold text-lg text-gray-700">
                    {rest.name}
                  </span>
                  <span className="text-sm text-gray-500">{rest.location}</span>
                  <span className="text-xs text-gray-400 mt-1">
                    {rest.cuisines}
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
            ))}
          </div>
        </section>

        <section className="mt-10">
          <RestaurantCard />
        </section>

        <section>
          <WhyChooseUs />
        </section>
      </div>

    <Footer/>
    </div>
  );
};

export default UserHomePage;
