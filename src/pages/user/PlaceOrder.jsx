import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:5000";

// Dummy order data (replace with context or props as needed)
const orderSummary = {
  items: [
    {
      id: 1,
      name: "Apple iMac 24'' M3 (2023)",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
      price: 1499,
      qty: 1,
    },
    {
      id: 2,
      name: "iPhone 15 5G (256GB) Gold",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg",
      price: 999,
      qty: 2,
    },
  ],
  subtotal: 3497,
  shipping: 25,
  tax: 199,
  total: 3721,
};

export default function PlaceOrder() {
const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token")
  const location = useLocation()
  console.log(location)
  const cart = location.state

  const navigate = useNavigate()
  // -------------------- STATES --------------------
  // For storing list of saved addresses (from API)
  const [savedAddresses, setSavedAddresses] = useState([]);

  // Currently selected address id in dropdown
  const [selectedAddressId, setSelectedAddressId] = useState("");

  // Address fields for the form
  const [address, setAddress] = useState({
    userName: "",
    street: "",
    city: "",
    postal: "",
    state: "",
    phone: "",
  });

  // Payment method
  const [payment, setPayment] = useState("card");

  // -------------------- API CALL --------------------
  useEffect(() => {
  console.log(user._id)
    const fetchAddresses = async () => {
      try {
       
       const res = await axios.get(`${baseUrl}/users/address/${user._id}`, {
         headers: { Authorization: `Bearer ${token}` },
       });
        console.log(res.data)


      
        setSavedAddresses(res.data);
      } catch (err) {
        console.error("Error fetching addresses", err);
      }
    };

    fetchAddresses();
  }, []);

  // -------------------- EVENT HANDLERS --------------------

  // Order place karne ka button


  // Dropdown change hone par selected address fill kar do
  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);

    const selected = savedAddresses.find((a) => a._id === id);
    if (selected) {
      setAddress({
        userName: selected.userName,
        street: selected.street,
        city: selected.city,
        postal: selected.pincode,
        state: selected.state,
        phone: selected.phoneNumber,
      });
    } else {
      // Agar "--Select--" option ho to fields blank kar do
      setAddress({
        userName: "",
        street: "",
        city: "",
        postal: "",
        state: "",
        phone: "",
      });
    }
  };

   const cartTotal = cart.reduce(
     (sum, item) => sum + Number( item.itemId.price*item.quantity),
     0
   );
// console.log(selectedAddressId,"hhhh");
   
  const handlePlaceOrder = async(e) => {
    e.preventDefault();
    const data = { userId: user._id, addressId: selectedAddressId, cart,total:cartTotal };
    console.log(data,"gdgdg")
    const result = await axios.post(`${baseUrl}/invoice/`,{...data},{
      headers:{Authorization:`Bearer ${token}`}
    })
    console.log(result.data,"hhhhhh")
    if(result.status===200){
      navigate("/user/add-cart");
    }
  };

  // -------------------- JSX START --------------------
  return (
    <section className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Main Form */}
        <form
          className="flex-1 bg-white rounded-xl shadow p-7 space-y-8"
          onSubmit={handlePlaceOrder}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Place your order
          </h2>

          {/* Shipping */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Shipping Address
            </h3>

            {/* Dropdown */}
            <div className="mb-4">
              <select
                className="input"
                value={selectedAddressId}
                onChange={(e) => handleSelectAddress(e.target.value)}
              >
                <option value="">-- Select Saved Address --</option>
                {savedAddresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.street}, {addr.city} , {addr.state}
                  </option>
                ))}
              </select>
            </div>

            {/* Address fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                className="input"
                placeholder="Full Name"
                required
                value={address.userName}
                onChange={(e) =>
                  setAddress({ ...address, userName: e.target.value })
                }
              />
              <input
                type="text"
                className="input"
                placeholder="Phone"
                required
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
              <input
                type="text"
                className="input md:col-span-2"
                placeholder="Street Address"
                required
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <input
                type="text"
                className="input"
                placeholder="City"
                required
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <input
                type="text"
                className="input"
                placeholder="Postal Code"
                required
                value={address.postal}
                onChange={(e) =>
                  setAddress({ ...address, postal: e.target.value })
                }
              />
              <input
                type="text"
                className="input md:col-span-2"
                placeholder="State"
                required
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
          </div>

          {/* Payment */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Payment Method
            </h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">Cash on Delivery</span>
              </label>
            </div>

            {payment === "card" && (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="input md:col-span-2"
                  placeholder="Cardholder Name"
                  required
                />
                <input
                  type="text"
                  className="input md:col-span-2"
                  placeholder="Card Number"
                  required
                />
                <input
                  type="text"
                  className="input"
                  placeholder="MM/YY"
                  required
                />
                <input
                  type="text"
                  className="input"
                  placeholder="CVC"
                  required
                />
              </div>
            )}
          </div> */}

          <button
            className="w-full mt-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold"
            type="submit"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="w-full md:w-[340px] space-y-5">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h3>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item._id} className="flex items-center gap-4 py-3">
                  <img
                    src={item.images[0].imageUrl || ""}
                    alt={item.name || "name"}
                    className="h-12 w-12 object-contain rounded-lg border bg-gray-50"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">
                      {item.itemId.foodName}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900 text-base">
                    ₹{item.itemId.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-5 pt-3 space-y-1 text-base">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">₹{orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-900">₹{orderSummary.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-900">₹{orderSummary.tax}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{cartTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind input style helper */}
      <style>{`
        .input {
          @apply rounded-lg px-3 py-2 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-gray-900 w-full;
        }
      `}</style>
    </section>
  );
}
