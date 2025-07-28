import React from "react";


const restaurants = [
  {
    img: "https://b.zmtcdn.com/data/pictures/2/100262/c10ac3c3ed2c0d92e278226b0e1ba745_o2_featured_v2.jpg",
    promoted: true,
    discount: "50% OFF",
    name: "Swastik Pavitra Bhojnalaya",
    rating: "4.2",
    cuisine: "North Indian",
    price: "₹150 for one",
    time: "24 min",
  },
  {
    img: "https://b.zmtcdn.com/data/pictures/chains/6/100756/f06cf41f8fe738a3b1d1fcd125ede6cc_o2_featured_v2.jpg",
    promoted: false,
    discount: "50% OFF",
    name: "Agarwal Caterers",
    rating: "4.4",
    cuisine: "Mithai, Street Food, Baker...",
    price: "₹100 for one",
    time: "29 min",
  },
  {
    img: "https://b.zmtcdn.com/data/pictures/5/102695/9c9c756f9a91d7d08ca54f16e7e19da2_o2_featured_v2.jpg",
    promoted: true,
    discount: "₹100 OFF",
    name: "Thali And More",
    rating: "4.3",
    cuisine: "North Indian, Chinese, Fas...",
    price: "₹500 for one",
    time: "19 min",
  },

  {
    img: "https://b.zmtcdn.com/data/pictures/chains/8/102148/c243579d71b25bd8d717c6c46783c7f2_o2_featured_v2.jpg",
    promoted: false,
    discount: "30% OFF",
    name: "Domino's Pizza",
    rating: "4.0",
    cuisine: "Pizza, Italian, Fast Food",
    price: "₹200 for one",
    time: "31 min",
  },
  {
    img: "https://b.zmtcdn.com/data/pictures/0/100910/fddddb17a4b7f04175636dba7294c0f9_o2_featured_v2.jpg",
    promoted: true,
    discount: "Flat ₹75 OFF",
    name: "Burger King",
    rating: "4.2",
    cuisine: "Burger, American",
    price: "₹150 for one",
    time: "20 min",
  },
  {
    img: "https://b.zmtcdn.com/data/pictures/3/19838923/865644c657795bfe203fcc3826f6ef11_o2_featured_v2.jpg",
    promoted: false,
    discount: "₹75 OFF",
    name: "Kanha Sweets & Restaurant",
    rating: "4.6",
    cuisine: "Sweets, Mithai, North Indian",
    price: "₹80 for one",
    time: "27 min",
  },
  {
    img: "https://b.zmtcdn.com/data/pictures/5/100105/51e2e8230a40752b7018f7367fa13dfa_o2_featured_v2.jpg",
    promoted: false,
    discount: "60% OFF",
    name: "Burger Farm",
    rating: "4.5",
    cuisine: "Burger, Fast Food, Beverages",
    price: "₹120 for one",
    time: "22 min",
  },
  {
    img: "https://b.zmtcdn.com/data/pictures/chains/9/20748099/24c0a766f4255793aebef95491f76217_o2_featured_v2.jpg",
    promoted: true,
    discount: "20% OFF",
    name: "Rominus Pizza",
    rating: "4.1",
    cuisine: "Pizza, Pasta, Fast Food",
    price: "₹250 for one",
    time: "23 min",
  },
  {
    img: "https://b.zmtcdn.com/data/pictures/chains/8/100148/aa9ea14e0cfd11ea4e89ce34d2f68c66_o2_featured_v2.jpg",
    promoted: false,
    discount: "Save ₹50",
    name: "Shree Balaji Bhojnalaya",
    rating: "4.0",
    cuisine: "Pure Veg, North Indian",
    price: "₹90 for one",
    time: "25 min",
  },
];

const RestaurantCard = () => (
  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap:6 py-8 overflow-x-auto">
    {restaurants.map((rest) => (
      <div
        key={rest.name}
        className="relative md:w-[400px] min-w-[125px] bg-white rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer
                hover:brightness-100 hover:grayscale-0 hover:drop-shadow-2xl hover:shadow-2xl "
      >
        <img
          src={rest.img}
          alt={rest.name}
          className="w-[90%] mx-auto md:h-[250px] object-cover rounded-2xl mt-3"
        />
        {/* Discount */}
        {rest.discount && (
          <span className="absolute top-3 left-3 bg-[#3b82f6] text-white text-xs font-semibold px-2 py-1 rounded">
            {rest.discount}
          </span>
        )}
        {/* Promoted Tag */}
        {rest.promoted && (
          <span className="absolute top-3 left-24 bg-gray-200 text-gray-600 text-[11px] font-medium px-2 py-[2px] rounded-sm">
            Promoted
          </span>
        )}
        <div className="p-4">
          <div className="flex items-center mb-1 gap-2">
            <span className="font-semibold text-lg truncate">{rest.name}</span>
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-[2px] rounded">
              {rest.rating}
            </span>
          </div>
          <div className="text-gray-600 text-[15px] truncate mb-1">
            {rest.cuisine}
          </div>
          <div className="flex justify-between items-center text-gray-500 text-[15px] font-medium">
            <span>{rest.price}</span>
            <span>{rest.time}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RestaurantCard;
