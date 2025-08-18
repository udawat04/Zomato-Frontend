
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const AdminRestaurant = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [restaurantFilter, setRestaurantFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        "http://localhost:5000/admin/status-update",
        { restaurantId: id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) =>
        prev.map((r) => (r.restaurantId?._id === id ? { ...r, status } : r))
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const allRestaurant = data.filter((item) => item.role === "restaurant");
  const filtered = allRestaurant.filter(
    (r) => restaurantFilter === "all" || r.status === restaurantFilter
  );

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">All Restaurants</h1>

        <div className="flex gap-4 mb-6">
          {["all", "pending", "active", "removed"].map((status) => (
            <button
              key={status}
              onClick={() => setRestaurantFilter(status)}
              className={`px-4 py-2 rounded-lg text-white ${
                restaurantFilter === status
                  ? "bg-purple-700"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="text-left border-b text-gray-600 uppercase text-sm">
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rest) => (
                <tr key={rest._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {rest.restaurantId?.restaurantName}
                  </td>
                  <td className="px-6 py-4">{rest.name}</td>
                  <td className="px-6 py-4">
                    {`${rest.restaurantId?.address?.street}, ${rest.restaurantId?.address?.city}, ${rest.restaurantId?.address?.state} - ${rest.restaurantId?.address?.zip}`}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rest.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : rest.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex gap-2 justify-center">
                    {rest.status !== "active" && (
                      <button
                        onClick={() =>
                          handleStatusChange(rest.restaurantId._id, "active")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Active
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handleStatusChange(rest.restaurantId._id, "rejected")
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(rest.restaurantId._id, "pending")
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      Pending
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRestaurant;
