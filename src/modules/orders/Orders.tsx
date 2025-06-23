"use client";
import { useState } from "react";
import {
  ChefHat,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
  time: string;
  date: string;
  phone: string;
  address?: string;
  type: "Dine-in" | "Takeaway" | "Delivery";
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#ORD001",
      customer: "John Doe",
      items: "Margherita Pizza x2, Caesar Salad x1",
      total: "$49.97",
      status: "Preparing",
      time: "2 min ago",
      date: "2024-01-15",
      phone: "+1 234-567-8901",
      address: "123 Main St, City",
      type: "Delivery",
    },
    {
      id: "#ORD002",
      customer: "Jane Smith",
      items: "Chicken Burger x1, Fries x1",
      total: "$18.99",
      status: "Ready",
      time: "5 min ago",
      date: "2024-01-15",
      phone: "+1 234-567-8902",
      type: "Takeaway",
    },
    {
      id: "#ORD003",
      customer: "Mike Johnson",
      items: "Pasta Carbonara x1, Garlic Bread x1",
      total: "$22.99",
      status: "Delivered",
      time: "15 min ago",
      date: "2024-01-15",
      phone: "+1 234-567-8903",
      address: "456 Oak Ave, City",
      type: "Delivery",
    },
    {
      id: "#ORD004",
      customer: "Sarah Wilson",
      items: "Caesar Salad x2, Iced Tea x2",
      total: "$29.98",
      status: "Pending",
      time: "1 min ago",
      date: "2024-01-15",
      phone: "+1 234-567-8904",
      type: "Dine-in",
    },
    {
      id: "#ORD005",
      customer: "Tom Brown",
      items: "Fish & Chips x1, Cola x1",
      total: "$16.99",
      status: "Cancelled",
      time: "30 min ago",
      date: "2024-01-15",
      phone: "+1 234-567-8905",
      type: "Takeaway",
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getOrderStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Preparing":
        return "bg-blue-100 text-blue-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Delivered":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderTypeColor = (type: Order["type"]) => {
    switch (type) {
      case "Dine-in":
        return "bg-blue-100 text-blue-800";
      case "Takeaway":
        return "bg-orange-100 text-orange-800";
      case "Delivery":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <select className="px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none =">
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none ">
              <option value="">All Types</option>
              <option value="Dine-in">Dine-in</option>
              <option value="Takeaway">Takeaway</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter((order) => order.status === "Pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Preparing</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    orders.filter((order) => order.status === "Preparing")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Ready</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.filter((order) => order.status === "Ready").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Cancelled</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    orders.filter((order) => order.status === "Cancelled")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.phone}
                        </div>
                        {order.address && (
                          <div className="text-xs text-gray-400">
                            {order.address}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getOrderTypeColor(
                          order.type
                        )}`}
                      >
                        {order.type}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.total}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as Order["status"]
                          )
                        }
                        className={`text-xs font-semibold rounded-full px-2.5 py-0.5 border-0 focus:ring-2 focus:ring-orange-500 ${getOrderStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-orange-600 hover:text-orange-900 p-1 rounded-md hover:bg-orange-50 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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

export default Orders;
