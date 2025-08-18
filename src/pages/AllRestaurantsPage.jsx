import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import RestaurantCard from '../components/RestaurantCard';
import { toast } from 'react-toastify';
import axios from 'axios';
const baseUrl = "http://localhost:5000";
const AllRestaurantsPage = () => {
    const token = localStorage.getItem("token");
      const [allRestaurants, setAllRestaurants] = useState([]);
     const fetchRestaurant = async () => {
       try {
         const res = await axios.get(`${baseUrl}/rest/`, {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
         console.log(res.data, "fetch restaurants");
         setAllRestaurants(res.data);
       } catch (error) {
         console.error("Error fetching menu:", error);
         toast.error("Failed to fetch menu");
       } 
     };

     useEffect(()=>{
        fetchRestaurant()
     },[])
  return (
    <div>
      <Header />
      <Navbar />

      <main className="py-5 px-4 md:px-8 bg-[#f8f8f8] min-h-screen">
        <RestaurantCard restaurants={allRestaurants} />
      </main>
    </div>
  );
}

export default AllRestaurantsPage