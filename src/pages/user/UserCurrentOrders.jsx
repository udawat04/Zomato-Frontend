import React, { useEffect, useState } from "react";
import UserSidebar from "../../components/UserSidebar";
import axios from "axios";
import moment from "moment";
import {
  FaChevronDown,
  FaChevronUp,
  FaLocationArrow,
  FaStar,
} from "react-icons/fa";

const baseUrl = "http://localhost:5000";

const statusColors = {
  accepted: "bg-green-100 text-green-700 border border-green-300",
  pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  rejected: "bg-red-100 text-red-700 border border-red-300",
};

const UserCurrentOrders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/order/all-order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              No current orders
            </div>
          ) : (
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400">
                  <th className="py-4 px-3 text-left text-white font-semibold">
                    Order
                  </th>
                  <th className="py-4 px-3 text-left text-white font-semibold">
                    Status
                  </th>
                  <th className="py-4 px-3 text-left text-white font-semibold">
                    Date
                  </th>
                  <th className="py-4 px-3 text-left text-white font-semibold">
                    Time
                  </th>
                  <th className="py-4 px-3 text-left text-white font-semibold">
                    Address
                  </th>
                  <th className="py-4 px-3 text-left text-white font-semibold">
                    Total
                  </th>
                  <th className="py-4 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <React.Fragment key={order._id}>
                    {/* Main Row */}
                    <tr className="hover:bg-orange-50 transition">
                      <td className="px-3 py-4 font-semibold">
                        Order #{idx + 1}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[order.status] || ""
                          }`}
                        >
                          {order.status === "accepted"
                            ? "Food is Preparing"
                            : order.status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        {moment(order.date).format("DD MMM YYYY")}
                      </td>
                      <td className="px-3 py-4">
                        {moment(order.date).format("hh:mm A")}
                      </td>
                      <td className="px-3 py-4 flex items-center gap-2">
                        <FaLocationArrow className="text-orange-500" />
                        {order.addressId?.street}, {order.addressId?.city}
                      </td>
                      <td className="px-3 py-4 text-orange-500 font-bold">
                        ₹{order.itemId.price}
                      </td>
                      <td className="px-3 py-4 text-right">
                        <button
                          onClick={() =>
                            setOpenOrder(
                              openOrder === order._id ? null : order._id
                            )
                          }
                          className="bg-orange-100 text-orange-500 rounded-full p-2 shadow hover:bg-orange-200"
                        >
                          {openOrder === order._id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Details */}
                    {openOrder === order._id && (
                      <tr>
                        <td colSpan={7} className="p-0 bg-orange-50">
                          <div className="px-6 py-4 bg-white border-t border-orange-200">
                            <div className="flex justify-between items-center border border-gray-100 rounded-xl p-4 mb-4 hover:shadow-md transition">
                              {/* Food Info */}
                              <div className="flex items-center gap-4 w-1/2">
                                <img
                                  src={order.images[0]?.imageUrl}
                                  alt={order.itemId.foodName}
                                  className="w-14 h-14 rounded-lg border object-cover"
                                />
                                <div>
                                  <div className="font-semibold text-gray-800">
                                    {order.itemId.foodName}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    x{order.quantity} • ₹{order.itemId.price}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {order.itemId.isVeg}
                                  </div>
                                </div>
                              </div>
                              {/* Restaurant Info */}
                              <div className="w-1/2 border-l pl-6">
                                <div className="font-semibold text-gray-800 ">
                                  {order.restId?.restaurantName ||
                                    "Unknown Restaurant"}
                                </div>
                                <div className="flex items-center text-xs gap-1 text-gray-600 mt-1">
                                  <FaStar
                                    className="text-orange-400"
                                    size={12}
                                  />
                                  <span>{order.restId?.rating || "5.0"}</span>
                                  <span>
                                    • {order.restId?.reviews || "1k+ reviews"}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {order.restId?.address?.street},{" "}
                                  {order.restId?.address?.city}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Delivery Time:{" "}
                                  {order.restId?.delivery || "10 min"}
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 border-t pt-3 flex justify-between items-center">
                              <div>
                                <span className="font-semibold">Status:</span>{" "}
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    statusColors[order.invoiceId?.status] || ""
                                  }`}
                                >
                                  {order?.status}
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-orange-500">
                                ₹{order.itemId.price}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCurrentOrders;
