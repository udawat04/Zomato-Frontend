import React, { useEffect, useState } from "react";
import RestSidebar from "../../components/RestSidebar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

const baseUrl = "http://localhost:5000";

// Status pill colors
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  "on the way": "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
};

// Action buttons
const statusButtons = [
  {
    value: "pending",
    label: "🕒 Pending",
    color: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  {
    value: "accepted",
    label: "✅ Accepted",
    color: "bg-green-500 hover:bg-green-600 text-white",
  },
  {
    value: "rejected",
    label: "❌ Rejected",
    color: "bg-red-500 hover:bg-red-600 text-white",
  },
];

const RestaurantTodayOrder = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);

  const fetchRestOrder = async () => {
    try {
      const result = await axios.get(`${baseUrl}/invoice`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(result.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders. Please try again.");
    }
  };

  const updateStatus = async (orderIds, newStatus) => {
    try {
      const result = await axios.put(
        `${baseUrl}/order/update-order-status`,
        { orderIds, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (result.status === 200) {
        fetchRestOrder();
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Error updating order status.");
    }
  };

  useEffect(() => {
    fetchRestOrder();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RestSidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-5 rounded-2xl shadow-md mb-6">
          <h1 className="text-3xl font-bold">📦 Today's Orders</h1>
          <p className="text-sm opacity-90 mt-1">
            Orders placed on {moment().format("DD MMM YYYY")}
          </p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-x-auto">
          <table className="w-full min-w-[1000px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 border-b border-purple-500">
                <th className="py-4 w-10 rounded-tl-2xl"></th>
                <th className="py-4 font-semibold tracking-wide text-white text-base">
                  Customer
                </th>
                <th className="py-4 font-semibold tracking-wide text-white text-base">
                  Status
                </th>
                <th className="py-4 font-semibold tracking-wide text-white text-base">
                  Date
                </th>
                <th className="py-4 font-semibold tracking-wide text-white text-base">
                  Time
                </th>
                <th className="py-4 font-semibold tracking-wide text-white text-base">
                  Total
                </th>
                <th className="py-4 w-12 rounded-tr-2xl"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {orders.map((order, idx) => {
                const totalPrice = order.orders.reduce(
                  (sum, o) =>
                    sum + Number(o.quantity) * Number(o.item?.price || 0),
                  0
                );

                const currentStatus = order?.orders[0]?.status || "pending";
                const orderIds = order.orders.map((o) => o._id);

                // Filter logic: If accepted → show only pending + rejected
                const filteredButtons =
                  currentStatus === "accepted"
                    ? statusButtons.filter((btn) =>
                        ["pending", "rejected"].includes(btn.value)
                      )
                    : statusButtons.filter(
                        (btn) => btn.value !== currentStatus
                      );

                return (
                  <React.Fragment key={order._id}>
                    {/* MAIN ROW */}
                    <tr
                      className={`transition-all ${
                        openIdx === idx ? "bg-purple-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-4 w-10 text-center">{idx + 1}</td>
                      <td className="py-4 font-semibold text-center">
                        {order.users?.name || "Unknown"}
                      </td>

                      {/* Current Status */}
                      <td className="py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColors[currentStatus] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </td>

                      <td className="py-4 text-center">
                        {moment(new Date(order.date)).format("DD MMM YYYY")}
                      </td>
                      <td className="py-4 text-center">
                        {moment(new Date(order.date)).format("hh : mm  A")}
                      </td>
                      <td className="py-4 text-purple-500 font-bold text-center">
                        ₹{totalPrice}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() =>
                            setOpenIdx(openIdx === idx ? null : idx)
                          }
                          className="bg-purple-100 text-purple-500 rounded-full p-2 shadow hover:bg-purple-200 transition-all"
                        >
                          {openIdx === idx ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED ROW */}
                    {openIdx === idx && (
                      <tr>
                        <td
                          colSpan={7}
                          className="p-0 border-none bg-purple-100"
                        >
                          <div className="bg-white rounded-b-2xl border-t border-purple-200 px-8 py-8">
                            <div className="font-semibold text-lg mb-6 text-gray-800">
                              Order Details
                            </div>

                            {order.orders.map((o, i) => (
                              <div
                                key={i}
                                className="flex justify-between gap-6 border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
                              >
                                {/* Food Info */}
                                <div className="flex items-center gap-4 w-1/2">
                                  <img
                                    src={
                                      o.images?.[0]?.imageUrl ||
                                      o.itemId?.image?.[0]
                                    }
                                    className="w-14 h-14 rounded-lg border object-cover"
                                    alt={o.item?.foodName}
                                  />
                                  <div>
                                    <div className="font-semibold text-gray-800 text-base">
                                      {o.item?.foodName}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      x{o.quantity} • ₹{o.item?.price}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-600 italic">
                                      {o.item?.description ||
                                        "No description available"}
                                    </div>
                                  </div>
                                </div>

                                {/* Customer Info */}
                                <div className="w-1/2 border-l pl-6">
                                  <div className="font-semibold text-gray-800 text-sm">
                                    Customer: {order.users?.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Email: {order.users?.email}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Phone: {order.users?.phone}
                                  </div>

                                  <div className="mt-3 text-xs text-gray-600">
                                    <div>
                                      <strong>Address:</strong>
                                    </div>
                                    <div>
                                      {order?.address?.street},{" "}
                                      {order?.address?.city},{" "}
                                      {order?.address?.state} -{" "}
                                      {order?.address?.pincode}
                                    </div>
                                    <div>
                                      Landmark: {order?.address?.landmark}
                                    </div>
                                    <div>
                                      Type: {order?.address?.addressType}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Footer Summary with Status Buttons */}
                            <div className="mt-6 flex justify-between items-center border-t pt-4">
                              <div className="flex items-center gap-3">
                                {filteredButtons.map((btn) => (
                                  <button
                                    key={btn.value}
                                    onClick={() =>
                                      updateStatus(orderIds, btn.value)
                                    }
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold shadow ${btn.color}`}
                                  >
                                    {btn.label}
                                  </button>
                                ))}
                              </div>
                              <div className="text-2xl font-bold text-purple-500">
                                ₹{totalPrice}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTodayOrder;
