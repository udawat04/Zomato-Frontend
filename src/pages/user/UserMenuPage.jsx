import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000";

const UserMenuPage = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFoodType, setSelectedFoodType] = useState("All");
  const [priceSort, setPriceSort] = useState("Low to High");
  const token = localStorage.getItem("token");

  const fetchfoodItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/food-item/`);
      const allItems = res.data;

      const allFilterItems = allItems.filter((item)=> item.status==="active")

      setFoodItems(allFilterItems);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(allItems.map((item) => item.category || "Uncategorized")),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const result = await axios.get(`${baseUrl}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartData = result.data.map((cart) => ({
        itemId: cart.itemId._id,
        cartId: cart._id,
      }));
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    fetchfoodItems();
    fetchCart();
  }, []);

  // Filtering logic
  useEffect(() => {
    let items = [...foodItems];

    if (selectedCategory !== "All") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (selectedFoodType !== "All") {
      items = items.filter((item) => item.isVeg === selectedFoodType);
    }

    if (priceSort === "Low to High") {
      items.sort((a, b) => Number(a.price) - Number(b.price));
    } else {
      items.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredItems(items);
  }, [foodItems, selectedCategory, selectedFoodType, priceSort]);

  const handleCart = async (id) => {
     if (!token) {
       // User not logged in → redirect
       toast.info("Please login to add items to your cart");
       navigate("/login");
       return;
     }
    const data = { userId: user._id, itemId: id };
    try {
      const result = await axios.post(`${baseUrl}/cart/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.status === 200) {
        toast.success("Successfully Added");
        setCartItems((prev) => [
          ...prev,
          { itemId: id, cartId: result.data._id },
        ]);
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      const result = await axios.delete(`${baseUrl}/cart/remove`, {
        data: { cartId },
      });

      if (result.status === 200) {
        toast.success("Successfully Deleted");
        setCartItems((prev) => prev.filter((ct) => ct.cartId !== cartId));
      }
    } catch (error) {
      console.error("Error deleting from cart", error);
      toast.error("Failed to delete item from cart");
    }
  };
  console.log(filteredItems,"kfkfk")

  return (
    <div className="font-sans">
      <Header />
      <Navbar cartNumber={cartItems.length} />

      <main className="py-5 px-4 md:px-8 bg-[#f8f8f8] min-h-screen">
        {/* FILTER SECTION */}
        <div className="flex flex-wrap md:flex-nowrap justify-between mb-8 bg-white px-5 py-4 rounded-xl shadow-sm gap-4">
          <div>
            <label className="font-semibold mr-2">Categories:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 rounded border border-gray-300"
            >
              <option>All</option>
              {categories.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Food Type:</label>
            <select
              value={selectedFoodType}
              onChange={(e) => setSelectedFoodType(e.target.value)}
              className="py-1.5 px-3 rounded border border-gray-300"
            >
              <option>All</option>
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Sort by Price:</label>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="py-1.5 px-3 rounded border border-gray-300"
            >
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>
        </div>

        {/* FOOD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          { filteredItems.map((item) => {
            const foundCart = cartItems.find((ct) => ct.itemId === item._id);
           
            return (
              <div
                key={item._id}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center"
              >
                {/* Only wrap image + text with Link */}
                <Link
                  to={`/user/food-item/${item._id}`}
                  state={item}
                  className="w-full"
                >
                  <img
                    src={item.images?.[0]?.imageUrl || ""}
                    alt={item.foodName || ""}
                    className="w-full h-40 rounded-lg mb-3 object-fill"
                  />
                  <h4 className="mt-1 mb-1 text-base font-semibold text-center">
                    {item.foodName}
                  </h4>
                  <p className="font-bold text-orange-500">
                    ₹ {Number(item.price).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </Link>

                {/* Buttons kept outside Link */}
                {foundCart ? (
                  <button
                    onClick={() => handleDeleteCart(foundCart.cartId)}
                    className="bg-green-500 text-white cursor-not-allowed mt-3 py-2 px-5 rounded-lg font-medium transition-colors"
                  >
                    In Cart
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent link click
                      handleCart(item._id, item.foodName);
                    }}
                    className="bg-orange-500 text-white hover:bg-orange-600 mt-3 py-2 px-5 rounded-lg font-medium transition-colors"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default UserMenuPage;
