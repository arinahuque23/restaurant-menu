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
  ShoppingCart,
} from "lucide-react";

import OrdersPage from "./orders/page";
import UserPage from "./users/page";
import Reviews from "./reviews/page";
import MenusPage from "./menus/page";
import AddDialog from "@/modules/add-menu/components/AddDialog";

export default function RestaurantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("orders");
  const [showMenuModal, setShowMenuModal] = useState(false);

  const navigation = [
    { name: "Orders", icon: ShoppingCart, route: "orders" },
    { name: "Menu", icon: ChefHat, route: "menu" },
    { name: "Users", icon: Users, route: "users" },
    { name: "Reviews", icon: Star, route: "reviews" },
  ];

  const handleNavigation = (route: string) => {
    setActiveRoute(route);
    setSidebarOpen(false);
  };

  const MenuModal = () => <AddDialog />;

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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {showMenuModal && <MenuModal />}
    </div>
  );
}
