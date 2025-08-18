import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const AdminDeliveryBoy = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [statusFilter, setStatusFilter] = useState("all");
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
  
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        "http://localhost:5000/admin/db-status",
        { dbId: id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData()
      setData((prev) => prev.map((d) => (d._id === id ? { ...d, status } : d)));
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const allDeliveryBoys = data.filter((item) => item.role === "delivery-boy");
  const filtered = allDeliveryBoys.filter(
    (d) => statusFilter === "all" || d.status === statusFilter
  );

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">All Delivery Boys</h1>

        {/* Status filter buttons */}
        <div className="flex gap-4 mb-6">
          {["all", "pending", "active", "removed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-white ${
                statusFilter === status
                  ? "bg-purple-700"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="text-left border-b text-gray-600 uppercase text-sm">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((boy) => (
                <tr key={boy._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{boy.name}</td>
                  <td className="px-6 py-4">{boy.email}</td>
                  <td className="px-6 py-4">{boy.phone || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        boy.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : boy.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {boy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex gap-2 justify-center">
                    {boy.status !== "active" && (
                      <button
                        onClick={() =>
                          handleStatusChange(boy.deliveryBoyId, "active")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Active
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handleStatusChange(boy.deliveryBoyId, "removed")
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(boy.deliveryBoyId, "pending")
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

export default AdminDeliveryBoy;
