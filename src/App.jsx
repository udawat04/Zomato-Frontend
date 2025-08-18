// import React, { useState } from 'react'
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RestaurantMenu from './pages/restaurant/RestaurantMenu'
import AddFoodItem from './pages/restaurant/AddFoodItem'
import RestaurantTodayOrder from './pages/restaurant/RestaurantTodayOrder'
import RestaurantTotalRevenue from './pages/restaurant/RestaurantTotalRevenue'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import RestaurantWelcome from './pages/restaurant/RestaurantWelcome'
import UserHomePage from './pages/user/UserHomePage'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserDashboard from './pages/user/UserDashboard'
import UserEditProfile from './pages/user/UserEditProfile'
import UserAddressAdd from './pages/user/UserAddressAdd'
import UserOrderHistory from './pages/user/UserOrderHistory'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserMenuPage from './pages/user/UserMenuPage'
import AddToCart from "./pages/user/AddToCart"
import ProtectedRoutes from './pages/ProtectedRoutes'
import PlaceOrder from './pages/user/PlaceOrder'
import PendingPage from './pages/PendingPage'
import RejectedPage from './pages/RejectedPage'
import Navbar from './components/Navbar'
import FoodItemUpdate from './pages/restaurant/FoodItemUpdate'
import RestaurantUpdate from './pages/restaurant/RestaurantUpdate'
import OfferPage from './pages/OfferPage'
import AllRestaurantsPage from './pages/AllRestaurantsPage'
import SingleRestaurant from './pages/SingleRestaurant'
import SingleFoodItemPage from './pages/SingleFoodItemPage'
import UserCurrentOrders from './pages/user/UserCurrentOrders'
import DbDashboard from './pages/delivery-boy/DbDashboard'
import AdminRestaurant from './pages/admin/AdminRestaurant'
import AdminDeliveryBoy from './pages/admin/AdminDeliveryBoy'
import AdminUsers from './pages/admin/AdminUsers'
import DbUpdate from './pages/delivery-boy/DbUpdate'

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
        <Route path="/admin/restaurants" element={<AdminRestaurant />} />
        <Route path="/admin/delivery-boy" element={<AdminDeliveryBoy />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/edit-profile" element={<UserEditProfile />} />
        <Route path="/user/add-address" element={<UserAddressAdd />} />
        <Route path="/user/order-history" element={<UserOrderHistory />} />
        <Route path="/user/current-order" element={<UserCurrentOrders />} />
        <Route path="/user/menu" element={<UserMenuPage />} />
        <Route path="/user/offers" element={<OfferPage />} />
        <Route path="/user/all-restaurants" element={<AllRestaurantsPage />} />
        <Route path="/user/restaurant/:id" element={<SingleRestaurant />} />
        <Route path="/user/food-item/:id" element={<SingleFoodItemPage />} />
        <Route
          path="/user/add-cart"
          element={
            <ProtectedRoutes>
              <AddToCart />
            </ProtectedRoutes>
          }
        />
        <Route path="/pending" element={<PendingPage />} />
        <Route path="/rejected" element={<RejectedPage />} />
        <Route
          path="/user/place-order"
          element={
            <ProtectedRoutes>
              <PlaceOrder />
            </ProtectedRoutes>
          }
        />

        {/* Restaurant Routes  */}
        <Route path="/restaurant/welcome" element={<RestaurantWelcome />} />

        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/menu" element={<RestaurantMenu />} />
        <Route path="/restaurant/add/food-item" element={<AddFoodItem />} />
        <Route path="/restaurant/edit-item" element={<FoodItemUpdate />} />
        <Route path="/restaurant/update" element={<RestaurantUpdate />} />
        <Route
          path="/restaurant/today-order"
          element={<RestaurantTodayOrder />}
        />
        <Route
          path="/restaurant/total-revenue"
          element={<RestaurantTotalRevenue />}
        />
      <Route path='/delivery-boy/dashboard' element={<DbDashboard/>}/>
      <Route path='/delivery-boy/update' element={<DbUpdate/>}/>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App