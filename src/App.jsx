import React from 'react'
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RestaurantMenu from './pages/restaurant/RestaurantMenu'
import AddFoodItem from './pages/restaurant/AddFoodItem'
import RestaurantTodayOrder from './pages/restaurant/RestaurantTodayOrder'
import RestaurantTotalRevenue from './pages/restaurant/RestaurantTotalRevenue'
import HomePage from './pages/others/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import RestaurantWelcome from './pages/restaurant/RestaurantWelcome'
import UserHomePage from './pages/user/UserHomePage'
import AdminDashboard from './pages/admin/AdminDashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth route  */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/home" element={<UserHomePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />



        {/* Restaurant Routes  */}
        <Route path="/restaurant/welcome" element={<RestaurantWelcome />} />

        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/menu" element={<RestaurantMenu />} />
        <Route path="/restaurant/add/food-item" element={<AddFoodItem />} />
        <Route
          path="/restaurant/today-order"
          element={<RestaurantTodayOrder />}
        />
        <Route
          path="/restaurant/total-revenue"
          element={<RestaurantTotalRevenue />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App