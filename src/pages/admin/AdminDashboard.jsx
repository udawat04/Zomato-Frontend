import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data)
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const dataCount = data.reduce((acc, item) => {
    acc[item.role] = (acc[item.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(dataCount).map(([role, count], idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">{role}</p>
              <h2 className="text-3xl font-bold">{count}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
