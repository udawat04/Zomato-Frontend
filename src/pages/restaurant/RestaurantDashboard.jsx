
// import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { FaPlus, FaList, FaChartBar } from "react-icons/fa";
// import Sidebar from "../../components/Sidebar";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const RestaurantDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
// //   const navigate = useNavigate();

//   // Static Data (can be replaced with real API data)
//   const totalRevenue = 155000;
//   const monthlyTarget = 30000;
//   const currentMonthRevenue = 26000;

//   const revenueData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Revenue (in ₹)",
//         data: [18000, 22000, 25000, 23000, 27000, 30000],
//         backgroundColor: "rgba(168, 85, 247, 0.7)",
//         borderRadius: 6,
//       },
//     ],
//   };

//   const revenueOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       y: {
//         ticks: {
//           callback: function (value) {
//             return `₹${value}`;
//           },
//         },
//       },
//     },
//   };

//   const progressPercent = Math.min((currentMonthRevenue / monthlyTarget) * 100, 100);

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar/>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto p-8">
//         {activeTab === "dashboard" && (
//           <>
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

//             {/* Cards Section */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {/* Total Revenue */}
//               <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h3 className="text-lg text-gray-500 font-medium mb-2">Total Revenue</h3>
//                 <p className="text-2xl font-bold text-purple-700">
//                   ₹{totalRevenue.toLocaleString()}
//                 </p>
//               </div>

//               {/* Monthly Target */}
//               <div className="bg-white p-6 rounded-xl shadow-md col-span-2 sm:col-span-1">
//                 <h3 className="text-lg text-gray-500 font-medium mb-2">Monthly Target</h3>
//                 <div className="w-full bg-gray-200 rounded-full h-6">
//                   <div
//                     className="bg-purple-600 h-6 rounded-full text-white text-sm text-center"
//                     style={{ width: `${progressPercent}%` }}
//                   >
//                     {progressPercent.toFixed(0)}%
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-2">
//                   ₹{currentMonthRevenue.toLocaleString()} earned out of ₹{monthlyTarget.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             {/* Revenue Chart */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Revenue</h3>
//               <Bar data={revenueData} options={revenueOptions} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantDashboard

import { FaSearch, FaBell, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import RestSidebar from "../../components/RestSidebar";


const pieData = [
  { name: "Asian Food", value: 763, color: "#F97316" },
  { name: "Fast Food", value: 321, color: "#EF4444" },
  { name: "Western Food", value: 69, color: "#22C55E" },
];

const RestaurantDashboard = () => (
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar on the left */}
    <RestSidebar/>

    {/* Dashboard Content */}
    <div className="flex-1 p-6">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-md px-3 py-1 shadow-sm">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm bg-transparent"
            />
          </div>
          <FaEnvelope className="text-gray-500 cursor-pointer" />
          <FaBell className="text-gray-500 cursor-pointer" />
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-full w-8 h-8"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Income" value="$12,890,00" />
        <StatCard title="Income" value="$4345,00" indicator="+15%" green />
        <StatCard title="Expense" value="$2890,00" indicator="-10%" red />
        <button className="bg-yellow-400 text-white font-semibold rounded-lg px-4 py-2 hover:bg-yellow-500 transition w-full">
          Withdraw <FaArrowRight className="inline ml-2" />
        </button>
      </div>

      {/* Charts and Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm">
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="text-sm text-gray-500 font-medium">Order Total</h3>
              <p className="text-xl font-bold">25,307</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 font-medium">Target</h3>
              <p className="text-xl font-bold">3,982</p>
            </div>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
          <img
            src="/mnt/data/3643a8dd-dcbc-46f8-a570-9cc44e1f969e.jpg"
            alt="Chart"
            className="w-full h-60 object-cover rounded-lg"
          />
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <h4 className="text-sm text-gray-500 font-medium">Performance</h4>
            <p className="text-2xl font-bold text-yellow-400 mt-2">+15%</p>
            <p className="text-xs text-gray-400 mt-1">
              Lorem ipsum dolor sit amet, adipiscing elit.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <StatItem title="Total Orders Complete" value="2,678" />
            <StatItem title="Order Delivered" value="1,234" />
            <StatItem title="Order Cancelled" value="123" />
            <StatItem title="Order Pending" value="432" />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h4 className="text-sm text-gray-600 font-semibold mb-3">
              Popular Food
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={60}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-1 text-sm">
              {pieData.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    {item.name}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Small reusable components
const StatCard = ({ title, value, indicator, green, red }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <p className="text-xl font-bold text-gray-800">{value}</p>
    {indicator && (
      <p
        className={`text-xs font-semibold ${
          green ? "text-green-500" : red ? "text-red-500" : ""
        }`}
      >
        {indicator}
      </p>
    )}
  </div>
);

const StatItem = ({ title, value }) => (
  <div className="flex justify-between text-sm text-gray-700">
    <span>{title}</span>
    <span className="font-bold">{value}</span>
  </div>
);

export default RestaurantDashboard;
