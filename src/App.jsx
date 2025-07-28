import React from "react";
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RestaurantMenu from "./pages/restaurant/RestaurantMenu";
import AddFoodItem from "./pages/restaurant/AddFoodItem";
import RestaurantTodayOrder from "./pages/restaurant/RestaurantTodayOrder";
import RestaurantTotalRevenue from "./pages/restaurant/RestaurantTotalRevenue";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RestaurantWelcome from "./pages/restaurant/RestaurantWelcome";
import UserHomePage from "./pages/user/UserHomePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import UserEditProfile from "./pages/user/UserEditProfile";
import UserAddressAdd from "./pages/user/UserAddressAdd";
import UserOrderHistory from "./pages/user/UserOrderHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserMenuPage from "./pages/user/UserMenuPage";
import HomePage from "./pages/others/HomePage";
import PendingPage from "./pages/others/PendingPage";
import RejectedPage from "./pages/others/RejectedPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth route  */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/pending" element={<PendingPage />} />
        <Route path="/rejected" element={<RejectedPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/home" element={<UserHomePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/edit-profile" element={<UserEditProfile />} />
        <Route path="/user/add-address" element={<UserAddressAdd />} />
        <Route path="/user/order-history" element={<UserOrderHistory />} />
        <Route path="/user/menu" element={<UserMenuPage />} />

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
};

export default App;


