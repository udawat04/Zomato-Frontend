import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPopup from "./Components/LoginPopup";
import SignupPopup from "./Components/SignupPopup";
import Home from "./Components/Home";
import RestaurantDashboard from "./Components/Restaurant-Dashboard";
import AdminDashboard from "./Components/AdminPanel";
import RestaurantMainPage from "./Pages/RestaurantWelcome";
import AddFoodItem from "./Pages/AddFoodItem";



function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPopup />} />
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/admin" element={<AdminDashboard/>} />
         <Route path="/rest-welcome" element={<RestaurantMainPage/>} />
          <Route path="/add-food" element={<AddFoodItem/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
