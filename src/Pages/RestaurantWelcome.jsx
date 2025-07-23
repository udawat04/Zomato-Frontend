import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaPlus, FaList, FaChartBar } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RestaurantMainPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Static Data (can be replaced with real API data)
  const totalRevenue = 155000;
  const monthlyTarget = 30000;
  const currentMonthRevenue = 26000;

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (in ₹)",
        data: [18000, 22000, 25000, 23000, 27000, 30000],
        backgroundColor: "rgba(168, 85, 247, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `₹${value}`;
          },
        },
      },
    },
  };

  const progressPercent = Math.min((currentMonthRevenue / monthlyTarget) * 100, 100);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10 text-purple-700">Restaurant Panel</h1>

        <div className="flex flex-col gap-6 text-lg">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 text-gray-700 hover:text-purple-600 ${
              activeTab === "dashboard" ? "font-semibold text-purple-700" : ""
            }`}
          >
            <FaChartBar /> Dashboard
          </button>

          <button
            onClick={() => navigate("/add-food")}
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600"
          >
            <FaPlus /> Add Food Item
          </button>

          <button
            onClick={() => navigate("/all-food")}
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600"
          >
            <FaList /> All Food Items
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === "dashboard" && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Total Revenue */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg text-gray-500 font-medium mb-2">Total Revenue</h3>
                <p className="text-2xl font-bold text-purple-700">
                  ₹{totalRevenue.toLocaleString()}
                </p>
              </div>

              {/* Monthly Target */}
              <div className="bg-white p-6 rounded-xl shadow-md col-span-2 sm:col-span-1">
                <h3 className="text-lg text-gray-500 font-medium mb-2">Monthly Target</h3>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-purple-600 h-6 rounded-full text-white text-sm text-center"
                    style={{ width: `${progressPercent}%` }}
                  >
                    {progressPercent.toFixed(0)}%
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  ₹{currentMonthRevenue.toLocaleString()} earned out of ₹{monthlyTarget.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Revenue</h3>
              <Bar data={revenueData} options={revenueOptions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantMainPage;
