import React from "react";
import DbSidebar from "../../components/DbSidebar";

const DbDashboard = () => {
  // Static demo data
  const recentDeliveries = [
    { id: 1, orderId: "ORD-101", customer: "John Doe", status: "Delivered" },
    { id: 2, orderId: "ORD-102", customer: "Alice Smith", status: "Pending" },
    { id: 3, orderId: "ORD-103", customer: "Michael Lee", status: "Cancelled" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DbSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Deliveries
            </h2>
            <p className="text-3xl font-bold mt-2">120</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600">
              Pending Deliveries
            </h2>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-600">
              Cancelled Orders
            </h2>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
        </div>

        {/* Recent Deliveries Table */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Deliveries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-6 py-3 border-b">Order ID</th>
                  <th className="px-6 py-3 border-b">Customer</th>
                  <th className="px-6 py-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 border-b">{delivery.orderId}</td>
                    <td className="px-6 py-3 border-b">{delivery.customer}</td>
                    <td className="px-6 py-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          delivery.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : delivery.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {delivery.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DbDashboard;
