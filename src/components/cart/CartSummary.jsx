import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CartSummary({ original, savings, pickup, tax, total,cart }) {
  console.log(cart,"cart values to be sent ")
  const navigate = useNavigate()

  const handleCart = async()=>{
    const cartIds = cart.map((item)=>item._id)
    console.log(cartIds,"cartIdss")
    navigate("/user/place-order", { state: cart });
    
  }
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Order summary</h3>
      <div className="space-y-1">
        <div className="flex justify-between text-base">
          <span className="text-gray-500">Original price</span>
          <span className="text-gray-900">₹{original.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-500">Savings</span>
          <span className="text-green-600">-₹{savings}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-500">Store Pickup</span>
          <span className="text-gray-900">₹{pickup}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-500">Tax</span>
          <span className="text-gray-900">₹{tax}</span>
        </div>
        <div className="border-t mt-3 pt-3 flex justify-between text-lg font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">₹{total.toLocaleString()}</span>
        </div>
      </div>
      
        <button onClick={handleCart} className="w-full mt-2 rounded-full bg-blue-600 hover:bg-blue-700 py-3 text-white text-lg font-bold transition focus:outline-none">
          Proceed to Checkout
        </button>
     
      <div className="text-center text-gray-500 text-sm mt-2">
        or{" "}
        <button className="text-blue-700 underline font-semibold hover:no-underline">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
