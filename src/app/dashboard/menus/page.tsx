import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

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

const MenusPage = () => {
  const [showMenuModal, setShowMenuModal] = useState(false);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
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
  const [formData, setFormData] = useState<MenuFormData>({
    name: "",
    category: "",
    price: "",
    description: "",
    status: "Available",
  });

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
  const handleDelete = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === "Available"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </button>
        </div>

        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
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
                {menuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.price}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-orange-600 hover:text-orange-900 p-1 rounded-md hover:bg-orange-50 transition-colors"
                          title="Edit item"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete item"
                        >
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

export default MenusPage;
