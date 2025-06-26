"use client";

import { Edit, Trash2 } from "lucide-react";
import type { MenuItem } from "@/shared/interface/menu";

interface MenuTableProps {
  menuItems: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string, name: string) => void;
}

export default function MenuTable({
  menuItems,
  onEdit,
  onDelete,
}: MenuTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-900">
                Image
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">
                Category
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">
                Price
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">
                Description
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {menuItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{item.category}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ${item.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status?.toLowerCase() === "available"
                        ? "bg-green-100 text-green-800"
                        : item.status?.toLowerCase() === "out of stock"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs">
                  <p className="line-clamp-2">{item.description}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit item"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(item._id, item.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {menuItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No menu items found. Add your first item to get started.
          </p>
        </div>
      )}
    </div>
  );
}
