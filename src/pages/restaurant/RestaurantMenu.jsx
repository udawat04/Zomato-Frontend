import React, { useEffect, useState } from "react";
import RestSidebar from "../../components/RestSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000";

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | active | inactive
  const [view, setView] = useState("table"); // table | card
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const fetchMenu = async () => {
    const id = user.restaurant._id;
    try {
      const res = await axios.get(`${baseUrl}/food-item/rest-items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
      toast.error("Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Filtered data
  const filteredItems = menuItems.filter((item) => {
    if (filter === "active") return item.status === "active";
    if (filter === "inactive") return item.status === "inactive";
    return true;
  });

  // Toggle status
  const handleStatusToggle = async (id, currentStatus) => {
    // console.log(id,"ksjds")
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.put(
        `${baseUrl}/food-item/status-update`,
        { FoodItemId:id,
          status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Item ${newStatus}`);
      // Update state locally
      setMenuItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      toast.error("Failed to update status");
      console.log(err)
    }
  };

  const TabFilters = () => (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2">
        {["all", "active", "inactive"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === f
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={() => setView(view === "table" ? "card" : "table")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Switch to {view === "table" ? "Card" : "Table"} View
      </button>
    </div>
  );

 const TableView = () => (
   <div className="overflow-x-auto">
     <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-xl">
       <thead className="bg-yellow-50">
         <tr>
           <th className="px-3 py-3 border font-semibold text-gray-700">#</th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Food
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Type
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Price
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Description
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Image
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Status
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Restaurant
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Owner
           </th>
           <th className="px-3 py-3 border font-semibold text-gray-700">
             Edit
           </th>
         </tr>
       </thead>
       <tbody>
         {filteredItems.map((item, index) => (
           <tr
             key={item._id}
             className="text-center hover:bg-yellow-50 transition"
           >
             <td className="px-3 py-3 border">{index + 1}</td>
             <td className="px-3 py-3 border font-semibold">{item.foodName}</td>
             <td className="px-3 py-3 border">{item.type}</td>
             <td className="px-3 py-3 border">₹{item.price}</td>
             <td className="px-3 py-3 border max-w-xs truncate">
               {item.description}
             </td>
             <td className="px-3 py-3 border">
               {item.images && item.images.length > 0 && (
                 <div className="relative flex items-center justify-center">
                   <img
                     src={item.images[0].imageUrl}
                     alt={item.images[0].imageName}
                     className="w-12 h-12 object-cover rounded border"
                   />
                   {item.images.length > 1 && (
                     <span className="absolute top-0 right-0 bg-blue-600 text-xs text-white px-2 py-0.5 rounded-full shadow">
                       +{item.images.length - 1}
                     </span>
                   )}
                 </div>
               )}
             </td>
             <td className="px-3 py-3 border">
               <button
                 onClick={() => handleStatusToggle(item._id, item.status)}
                 className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${
                    item.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
               >
                 {item.status || "inactive"}
               </button>
             </td>
             <td className="px-3 py-3 border">
               {item.restaurant?.restaurantName}
             </td>
             <td className="px-3 py-3 border">{item.restaurant?.ownerName}</td>
             <td className="px-3 py-3 border">
               <button
                 onClick={() =>
                   navigate("/restaurant/edit-item", { state: item })
                 }
                 className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
               >
                 Edit
               </button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );

 const CardView = () => (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
     {filteredItems.map((item) => (
       <div
         key={item._id}
         className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col relative group transition hover:shadow-xl"
       >
         <div className="relative h-48 bg-gray-100 flex justify-center items-center">
           {item.images && item.images.length > 0 ? (
             <>
               <img
                 src={item.images[0].imageUrl}
                 alt={item.images[0].imageName}
                 className="h-44 w-44 object-cover rounded-lg"
               />
               {item.images.length > 1 && (
                 <span className="absolute top-2 right-2 bg-blue-600 text-xs text-white px-2 py-1 rounded-full">
                   +{item.images.length - 1}
                 </span>
               )}
             </>
           ) : (
             <span className="text-gray-400">No Image</span>
           )}
         </div>
         <div className="flex-1 p-4 flex flex-col gap-1">
           <h2 className="font-bold text-lg">{item.foodName}</h2>
           <div className="flex justify-between items-center text-gray-600 mb-1">
             <span className="text-xs bg-yellow-100 rounded-full px-2">
               {item.type}
             </span>
             <span className="font-semibold text-green-700">₹{item.price}</span>
           </div>
           <p className="text-xs text-gray-500 mb-2 truncate">
             {item.description}
           </p>
           <div className="text-xs text-gray-600 mb-1">
             <strong>Restaurant:</strong> {item.restaurant?.restaurantName}
           </div>
           <div className="flex gap-2 mt-1 items-center">
             <button
               onClick={() => handleStatusToggle(item._id, item.status)}
               className={`py-1 px-3 rounded-full text-xs font-semibold
                ${
                  item.status === "active"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }
              `}
             >
               {item.status || "inactive"}
             </button>
             <button
               onClick={() =>
                 navigate("/restaurant/edit-item", { state: item })
               }
               className="py-1 px-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition text-xs font-semibold"
             >
               Edit
             </button>
           </div>
         </div>
       </div>
     ))}
   </div>
 );


  return (
    <div className="flex min-h-screen bg-gray-50">
      <RestSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Menu Items</h1>
        <TabFilters />
        {loading ? (
          <p>Loading...</p>
        ) : filteredItems.length === 0 ? (
          <p>No menu items found.</p>
        ) : view === "table" ? (
          <TableView />
        ) : (
          <CardView />
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
