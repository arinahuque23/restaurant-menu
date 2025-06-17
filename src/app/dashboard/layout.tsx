"use client";

import type React from "react";

import { useState } from "react";
import {
  ChefHat,
  Users,
  Star,
  Menu,
  X,
  Search,
  Bell,
  Plus,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
} from "lucide-react";
import OrdersPage from "./orders/page";
import UserPage from "./users/page";
import Reviews from "./reviews/page";
import MenusPage from "./menus/page";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  status: string;
}

interface MenuFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  status: string;
}

export default function RestaurantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("orders");
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuFormData>({
    name: "",
    category: "",
    price: "",
    description: "",
    status: "Available",
  });

  const navigation = [
    { name: "Orders", icon: ShoppingCart, route: "orders" },
    { name: "Menu", icon: ChefHat, route: "menu" },
    { name: "Users", icon: Users, route: "users" },
    { name: "Reviews", icon: Star, route: "reviews" },
  ];

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: "$18.99",
      description: "Fresh tomatoes, mozzarella, basil",
      status: "Available",
    },
    {
      id: 2,
      name: "Chicken Burger",
      category: "Burgers",
      price: "$14.99",
      description: "Grilled chicken, lettuce, tomato",
      status: "Available",
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Salads",
      price: "$12.99",
      description: "Romaine lettuce, parmesan, croutons",
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "Pasta Carbonara",
      category: "Pasta",
      price: "$16.99",
      description: "Creamy pasta with bacon and eggs",
      status: "Available",
    },
  ]);

  const handleNavigation = (route: string) => {
    setActiveRoute(route);
    setSidebarOpen(false);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      status: "Available",
    });
    setShowMenuModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.replace("$", ""),
      description: item.description,
      status: item.status,
    });
    setShowMenuModal(true);
  };

  const closeModal = () => {
    setShowMenuModal(false);
    setEditingItem(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      status: "Available",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      // Edit existing item
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formData.name,
                category: formData.category,
                price: `$${formData.price}`,
                description: formData.description,
                status: formData.status,
              }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: Math.max(...menuItems.map((item) => item.id)) + 1,
        name: formData.name,
        category: formData.category,
        price: `$${formData.price}`,
        description: formData.description,
        status: formData.status,
      };
      setMenuItems((prev) => [...prev, newItem]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === "Available"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const MenuModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingItem ? "Edit Menu Item" : "Add Menu Item"}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select category</option>
              <option value="Pizza">Pizza</option>
              <option value="Burgers">Burgers</option>
              <option value="Salads">Salads</option>
              <option value="Pasta">Pasta</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter item description"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              {editingItem ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeRoute) {
      case "orders":
        return <OrdersPage />;

      case "menu":
        return <MenusPage />;

      case "users":
        return <UserPage />;

      case "reviews":
        return <Reviews />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-orange-600">Tasty Bites</h1>
          <button
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6">
          <div className="px-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.route)}
                className={`${
                  activeRoute === item.route
                    ? "bg-orange-50 border-orange-500 text-orange-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center w-full px-3 py-2 text-sm font-medium border-l-4 mb-1 rounded-r-md transition-colors`}
              >
                <item.icon
                  className={`${
                    activeRoute === item.route
                      ? "text-orange-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  } mr-3 h-5 w-5`}
                />
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 capitalize">
                {activeRoute}
              </h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-48 lg:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Menu Modal */}
      {showMenuModal && <MenuModal />}
    </div>
  );
}
