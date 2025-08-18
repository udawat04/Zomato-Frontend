import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const AdminUsers = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
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
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        "http://localhost:5000/admin/user-status",
        { userId: id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) => prev.map((u) => (u._id === id ? { ...u, status } : u)));
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const allUsers = data.filter((item) => item.role === "user");
  const filtered = allUsers.filter(
    (u) => statusFilter === "all" || u.status === statusFilter
  );

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">All Users</h1>

        {/* Status filter buttons */}
        <div className="flex gap-4 mb-6">
          {["all", "active", "removed"].map((status) => (
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
              {filtered.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex gap-2 justify-center">
                    {user.status !== "active" && (
                      <button
                        onClick={() => handleStatusChange(user._id, "active")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Active
                      </button>
                    )}
                    <button
                      onClick={() => handleStatusChange(user._id, "removed")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Remove
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

export default AdminUsers;
