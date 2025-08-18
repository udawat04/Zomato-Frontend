import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaLocationArrow,
} from "react-icons/fa";
import UserSidebar from "../../components/UserSidebar";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:5000";

const statusColors = {
  accepted: "bg-green-100 text-green-700 border border-green-300",
  pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  rejected: "bg-red-100 text-red-700 border border-red-300",
};

const OrderTable = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${baseUrl}/invoice`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(result.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex">
      <UserSidebar />

      <div className="flex-1">
        <div className="max-w-6xl mx-auto my-10 p-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading orders...
            </div>
          ) : (
            <table className="w-full min-w-[900px] border-separate border-spacing-0">
              <thead>
                <tr className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 border-b border-orange-500">
                  <th className="py-4 w-10 rounded-tl-2xl"></th>
                  <th className="py-4 font-semibold tracking-wide text-white text-base">
                    Menu
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
                    Address
                  </th>
                  <th className="py-4 font-semibold tracking-wide text-white text-base">
                    Total
                  </th>
                  <th className="py-4 font-semibold tracking-wide text-white text-base">
                    Payment Method
                  </th>
                  <th className="py-4 w-12 rounded-tr-2xl"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {orders.map((order, idx) => (
                  <React.Fragment key={order._id}>
                    {/* MAIN ROW */}
                    <tr
                      className={`transition-all ${
                        openIdx === idx ? "bg-orange-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-4 w-10"></td>
                      <td className="py-4 font-semibold">Order #{idx + 1}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[order?.orders[0]?.status] || ""
                          }`}
                        >
                          {order?.orders[0]?.status === "accepted"
                            ? "Food is Preparing"
                            : order?.orders[0]?.status}
                        </span>
                      </td>
                      <td className="py-4">
                        {moment(new Date(order.date)).format("DD MMM YYYY")}
                      </td>
                      <td className="py-4">
                        {moment(new Date(order.date)).format("hh : mm  A")}
                      </td>
                      <td className="py-4 flex items-center justify-center gap-2">
                        <FaLocationArrow className="text-orange-500" />
                        <span className="font-semibold">
                          {order.address.street} , {order.address.city}
                        </span>
                      </td>
                      <td className="py-4 text-orange-500 font-bold">
                        ₹{order.total}
                      </td>
                      <td className="py-4 flex justify-center">
                        {order.payment || "Cash"}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() =>
                            setOpenIdx(openIdx === idx ? null : idx)
                          }
                          className="bg-orange-100 text-orange-500 rounded-full p-2 shadow hover:bg-orange-200 transition-all"
                          aria-label="Details"
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
                          colSpan={9}
                          className="p-0 border-none bg-orange-100"
                        >
                          <div className="bg-white rounded-b-2xl border-t border-orange-200 px-8 py-8">
                            <div className="font-semibold text-lg mb-6 text-gray-800">
                              Order Details
                            </div>

                            {order.orders.length ? (
                              <div className="space-y-6">
                                {order.orders.map((items, i) => (
                                  <div
                                    key={i}
                                    className="flex justify-between items-center border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
                                  >
                                    {/* Food Info */}
                                    <Link
                                      to={`/user/food-item/${items._id}`}
                                      state={{
                                        ...items.item,
                                        restaurant: items.restaurant,
                                        images: items.images,
                                      }}
                                      className="flex cursor-pointer items-center gap-4 w-1/2"
                                    >
                                      <img
                                        src={items.images[0]?.imageUrl}
                                        className="w-14 h-14 rounded-lg border object-cover"
                                        alt={items.item.foodName}
                                      />
                                      <div>
                                        <div className="font-semibold text-gray-800 text-base">
                                          {items.item.foodName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          x{items.quantity} • ₹
                                          {items.item.price}
                                        </div>
                                        <div className="mt-1 text-xs text-gray-600 italic">
                                          {items.item.description ||
                                            "No description available"}
                                        </div>
                                      </div>
                                    </Link>

                                    {/* Restaurant Info */}
                                    <div className="w-1/2 border-l pl-6">
                                      <div className="font-semibold text-gray-800 text-sm">
                                        {items.restaurant?.restaurantName ||
                                          "Unknown Restaurant"}
                                      </div>
                                      <div className="flex items-center text-xs gap-1 text-gray-600 mt-1">
                                        <FaStar
                                          className="text-orange-400"
                                          size={12}
                                        />
                                        <span>
                                          {items.restaurant?.rating || "5.0"}
                                        </span>
                                        <span>
                                          •{" "}
                                          {items.restaurant?.reviews ||
                                            "1k+ reviews"}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        {items.restaurant?.address?.street},{" "}
                                        {items.restaurant?.address?.city}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        Delivery Time:{" "}
                                        {items.restaurant?.delivery || "10 min"}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-gray-400">No items</div>
                            )}

                            {/* Footer Summary */}
                            <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                              {/* Order Info */}
                              <div className="space-y-2 text-sm text-gray-600">
                                <div>
                                  <span className="font-semibold">Status:</span>{" "}
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      statusColors[order?.orders[0]?.status] ||
                                      ""
                                    }`}
                                  >
                                    {order?.orders[0]?.status === "accepted"
                                      ? "Food is Preparing"
                                      : order?.orders[0]?.status}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Order Date:
                                  </span>{" "}
                                  {moment(new Date(order.date)).format(
                                    "DD MMM YYYY"
                                  )}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Order Time:
                                  </span>{" "}
                                  {moment(new Date(order.date)).format(
                                    "hh:mm A"
                                  )}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Payment Method:
                                  </span>{" "}
                                  {order.payment || "Cash"}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Delivery Address:
                                  </span>{" "}
                                  {order.address?.street}, {order.address?.city}
                                </div>
                              </div>

                              {/* Total + Cancel Button */}
                              <div className="flex flex-col items-end gap-3">
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Total Amount
                                  </div>
                                  <div className="text-2xl font-bold text-orange-500">
                                    ₹{order.fullTotal || order.total}
                                  </div>
                                </div>
                                <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg shadow hover:bg-red-200 text-sm font-semibold">
                                  Cancel Order
                                </button>
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

export default OrderTable;
