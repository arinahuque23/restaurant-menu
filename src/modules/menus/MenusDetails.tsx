"use client";
import PrivateRoute from "@/shared/private-routes/PrivateRoute";
import { Heart } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface MenuDetailsClientProps {
  menuItem: MenuItem;
}

const MenusDetails = ({ menuItem }: MenuDetailsClientProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  return (
    <PrivateRoute>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-orange-600">
            ${menuItem.price}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-1 border-x ">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
            Add to Cart - ${(menuItem.price * quantity).toFixed(2)}
          </button>
          <button className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            <Heart />
          </button>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MenusDetails;
