import React, { useState, useEffect } from "react";
import {
  FaUtensils,
  FaMotorcycle,
  FaUsers,
  FaChartBar,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [data,setData] = useState([])
  const [activeSection, setActiveSection] = useState("dashboard");
  const [restaurantFilter, setRestaurantFilter] = useState("pending");
  const [restaurantStatus, setRestaurantStatus] = useState({
    "Spicy Treat": "pending",
    "Food Fusion": "pending",
    "Tandoori Hub": "active",
    "Urban Bites": "active",
    "Old Kitchen": "removed",
    "BBQ Delight": "removed",
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/admin/status-update",
        {
          restaurantId: id, // your payload
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // replace with your actual token variable
          },
        }
      );

      console.log(res.data); 
      setRestaurantFilter(status)// optional: check the response
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

   useEffect(() => {
     const fetchData = async () => {
       try {
         const res = await axios.get("http://localhost:5000/users/", {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });

        //  console.log(res.data, "dddd");
         setData(res.data); // assuming you're storing the response
       } catch (error) {
         console.error("Error fetching data:", error.message);
       }
     };

     fetchData();
   }, [restaurantFilter]);

   const allRestaurant = data.filter((item) => {
     return item.role === "restaurant"; 
   });

  //  console.log(allRestaurant, "allRestaurant");


    const filtered = allRestaurant.filter(
      (r) =>
        restaurantFilter === "all" ||
        r.status === restaurantFilter
    );
    // console.log(filtered, "fill");

    const dataCount = data.reduce((acc,item)=>{
      acc[item.role] = (acc[item.role]||0)+1
      return acc
    },{})
    const roleCount = Object.entries(dataCount).map((item)=>({
      role:item[0],
      count:item[1]
    }))

    console.log(dataCount)
    console.log(roleCount)

  const restaurantDetails = [
    { name: "Spicy Treat", owner: "Ravi Sharma", address: "Delhi" },
    { name: "Food Fusion", owner: "Anita Kapoor", address: "Mumbai" },
    { name: "Tandoori Hub", owner: "Aman Verma", address: "Lucknow" },
    { name: "Urban Bites", owner: "Neha Singh", address: "Bangalore" },
    { name: "Old Kitchen", owner: "Rohit Das", address: "Chennai" },
    { name: "BBQ Delight", owner: "Karan Thakur", address: "Hyderabad" },
  ];

  const renderDashboard = () => (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {roleCount.map((stat, idx) =>
          stat.role === "admin" ? (
            ""
          ) : (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex flex-col"
            >
              <p className="text-gray-500 dark:text-gray-300">{stat.role}</p>
              <h2 className="text-3xl font-bold text-black dark:text-white">
                {stat.count}
              </h2>
            </div>
          )
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-1 text-black dark:text-white">
          Monthly Target
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Target you’ve set for each month
        </p>
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-20">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <path
                d="M10 90 A90 90 0 0 1 190 90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="15"
              />
              <path
                d="M10 90 A90 90 0 0 1 160 40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="15"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[10%] text-center">
              <p className="text-2xl font-bold text-black dark:text-white">
                85.55%
              </p>
              <p className="text-green-600 text-sm mt-1">+10%</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
            You earn $3287 today, it's higher than last month. Keep up your good
            work!
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6 w-full text-center">
            <div>
              <p className="text-gray-400 text-sm">Target</p>
              <p className="font-bold text-black dark:text-white">
                $20K <span className="text-red-500">↓</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="font-bold text-black dark:text-white">
                $20K <span className="text-green-500">↑</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Today</p>
              <p className="font-bold text-black dark:text-white">
                $20K <span className="text-green-500">↑</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Monthly Sales
        </h3>
        <Bar
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Sales",
                data: [
                  150, 370, 190, 280, 170, 180, 170, 120, 200, 360, 270, 100,
                ],
                backgroundColor: "#7366F1",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
          }}
        />
      </div>
    </div>
  );

  const renderRestaurants = () => {
   


    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            All Restaurants
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
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
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
            <thead>
              <tr className="text-left border-b border-gray-200 text-gray-600 dark:text-gray-300 uppercase text-sm">
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rest) => (
                <tr
                  key={rest.name}
                  className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-black dark:text-white">
                    {rest.restaurantId.restaurantName}
                  </td>
                  <td className="px-6 py-4 text-black dark:text-white">
                    {rest.name}
                  </td>
                  <td className="px-6 py-4 text-black dark:text-white">
                    {`${rest.restaurantId.address?.street}, ${rest.restaurantId.address?.city}, ${rest.restaurantId.address?.state} - ${rest.restaurantId.address?.zip}`}
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
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      {rest.status === "active" ? (
                        ""
                      ) : (
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
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Pemding
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 text-purple-700">Zomato Admin</h1>
        <div className="flex flex-col gap-6 text-lg">
          <button
            onClick={() => setActiveSection("dashboard")}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-purple-600"
          >
            <FaChartBar /> Dashboard
          </button>
          <button
            onClick={() => setActiveSection("restaurants")}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-purple-600"
          >
            <FaUtensils /> All Restaurants
          </button>
          <button className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-purple-600">
            <FaMotorcycle /> All Delivery Boys
          </button>
          <button className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-purple-600">
            <FaUsers /> All Users
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6 xl:p-10 overflow-y-auto">
        {activeSection === "dashboard" && renderDashboard()}
        {activeSection === "restaurants" && renderRestaurants()}
      </div>
    </div>
  );
};

export default AdminDashboard;
