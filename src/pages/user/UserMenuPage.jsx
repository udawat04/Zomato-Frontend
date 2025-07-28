import React from "react";
import salmon from "../../assets/agarwal.avif";
import soup from "../../assets/burger.avif";
import ramen from "../../assets/cake.avif";
import dumplings from "../../assets/dominos.avif";
import bruschetta from "../../assets/dosa.avif";
import burger from "../../assets/burger.avif";
import lemon from "../../assets/pizza.avif";
import cream from "../../assets/cake.avif";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";


const UserMenuPage = () => {
  const foodItems = [
    { id: 1, name: "Salmon with Vegetables", price: 24.99, image: salmon },
    { id: 2, name: "Classic Tomato Soup", price: 24.99, image: soup },
    { id: 3, name: "Shrimp Ramen", price: 24.99, image: ramen },
    { id: 4, name: "Dumplings with Pork", price: 24.99, image: dumplings },
    {
      id: 5,
      name: "Sicilian Vegetable Bruschetta",
      price: 24.99,
      image: bruschetta,
    },
    { id: 6, name: "Signature Burger", price: 24.99, image: burger },
    { id: 7, name: "Salmon in Lemon Sauce", price: 24.99, image: lemon },
    { id: 8, name: "Cheese Cream Soup", price: 24.99, image: cream },
  ];

  const menuCategories = [
    { label: "All Menus", icon: "📖" },
    { label: "Main Course", icon: "🍲" },
    { label: "Dessert", icon: "🧁" },
    { label: "Snack", icon: "🍕" },
    { label: "Gelato", icon: "🍦" },
    { label: "Coffee", icon: "☕" },
  ];

  return (
    <div className="font-sans">
      <Header/>
      <Navbar/>

      <main className="py-5 px-4 md:px-8 bg-[#f8f8f8] min-h-screen">
        {/* FILTER SECTION */}
        <div className="flex flex-wrap md:flex-nowrap justify-between mb-8 bg-white px-5 py-4 rounded-xl shadow-sm gap-4">
          <div>
            <label className="font-semibold mr-2">Categories:</label>
            <select className="py-1.5 px-3 rounded border border-gray-300">
              <option>All</option>
              <option>Asian</option>
              <option>Italian</option>
              <option>Healthy</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Food Type:</label>
            <select className="py-1.5 px-3 rounded border border-gray-300">
              <option>All</option>
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Sort by Price:</label>
            <select className="py-1.5 px-3 rounded border border-gray-300">
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>
        </div>

        {/* MENU CATEGORY ICONS */}
        <div className="flex gap-4 mb-10 overflow-x-auto">
          {menuCategories.map((cat, i) => (
            <div
              key={i}
              className={`
                flex flex-col items-center justify-center min-w-[90px] w-[100px] 
                px-5 py-4 rounded-xl shadow 
                ${
                  i === 0
                    ? "bg-orange-50 border-2 border-orange-500 text-orange-500 font-bold"
                    : "bg-white border border-gray-100 text-gray-600 font-medium"
                }
                cursor-pointer
                transition
              `}
            >
              <div className="text-[22px]">{cat.icon}</div>
              <span className="mt-1 text-[13px]">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* FOOD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full rounded-lg mb-3 object-cover"
              />
              <h4 className="mt-1 mb-1 text-base font-semibold text-center">
                {item.name}
              </h4>
              <p className="font-bold text-orange-500">
                $ {item.price.toFixed(2)}
              </p>
              <button className="mt-3 bg-orange-500 text-white py-2 px-5 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserMenuPage;
