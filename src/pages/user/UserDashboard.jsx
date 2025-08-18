import React, { useEffect, useState } from "react";
import UserSidebar from "../../components/UserSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://localhost:5000"

const UserDashboard = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [userData,setUserData] = useState(null)
    useEffect(()=>{
        const fetchData = async()=>{
            const result = await axios.get(`${baseUrl}/users/`, {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            });
            console.log(result.data,"hfsks")
            setUserData(result.data)
            localStorage.setItem("user",JSON.stringify(result.data))
        }
        fetchData()
    },[])
  
    if (!userData) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }
  const user = {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.addresses[0] || "",
    joined: "Jan 15, 2024",
    image: userData.image || "https://i.pravatar.cc/300", // replace with dynamic image URL
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          User Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex justify-center w-20 h-20 md:w-1/3">
            <img
              src={user.image}
              alt={user.name}
              className="md:w-40 md:h-40 rounded-full object-cover shadow"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 w-full md:w-2/3 ">
            <h2 className="md:text-xl text-sm font-bold text-gray-700 mb-4">
              {user.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm md:text-xl">Email</p>
                <p className="text-gray-800 text-[11px] md:text-lg font-medium">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm md:text-xl">Phone</p>
                <p className="text-gray-800 text-[11px] md:text-lg font-medium">
                  +91 {user.phone}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm md:text-xl">Address</p>
                <p className="text-gray-800 text-[11px] md:text-lg font-medium">
                  {user.address.street} , {user.address.city} ,{" "}
                  {user.address.state}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm md:text-xl">Joined On</p>
                <p className="text-gray-800 text-[11px] md:text-lg font-medium">
                  {user.joined}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/user/edit-profile")}
              className="mt-6 cursor-pointer text-[11px] md:text-xl px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
