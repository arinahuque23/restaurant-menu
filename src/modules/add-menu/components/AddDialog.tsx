import { X } from "lucide-react";
import { useState } from "react";

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
const AddDialog = () => {
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

  return (
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
};

export default AddDialog;
