"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";

interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  status: string;
  imageUrl?: string;
  ingredients?: string[];
}

type FormValues = {
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  category: string;
  prepTime?: string;
  serves?: string;
  isVegetarian: boolean;
  allergens: string[];
  ingredients: { value: string }[];
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
  status: string;
  reason?: string;
  rating?: number;
};

const categories = ["Appetizer", "Main Course", "Dessert", "Beverage"];
const allergenOptions = ["Gluten", "Peanuts", "Dairy"];

const MenusPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, control, watch, setValue, reset } =
    useForm<FormValues>({
      defaultValues: {
        name: "",
        description: "",
        longDescription: "",
        price: 0,
        category: "",
        prepTime: "",
        serves: "",
        isVegetarian: false,
        allergens: [],
        ingredients: [{ value: "" }],
        calories: undefined,
        protein: "",
        carbs: "",
        fat: "",
        status: "Available",
        reason: "",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const selectedAllergens = watch("allergens");

  const toggleAllergen = (allergen: string) => {
    const updated = selectedAllergens.includes(allergen)
      ? selectedAllergens.filter((a) => a !== allergen)
      : [...selectedAllergens, allergen];
    setValue("allergens", updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "menu-img-upload");
        formData.append("cloud_name", "ditevim6o");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/ditevim6o/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const fileData = await res.json();
        imageUrl = fileData.secure_url;
      }

      const fullData = {
        ...data,
        imageUrl,
        ingredients: data.ingredients.map((i) => i.value),
        rating: 4.9,
      };

      if (editingItem) {
        await axios.put(
          `http://localhost:5000/api/menu/${editingItem._id}`,
          fullData
        );
      } else {
        await axios.post("http://localhost:5000/api/menu", fullData);
      }

      setShowModal(false);
      fetchMenuItems();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const openAddModal = () => {
    reset();
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    const ingredientsArray = item.ingredients?.map((ing) => ({
      value: ing,
    })) || [{ value: "" }];
    reset({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      status: item.status,
      ingredients: ingredientsArray,
    });
    setImagePreview(item.imageUrl || null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Menu Management</h1>
        <button
          onClick={openAddModal}
          className="bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          <Plus className="inline mr-1" /> Add Menu Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {menuItems.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 font-semibold">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">${item.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status?.toLowerCase() === "available"
                        ? "bg-green-100 text-green-700"
                        : item.status?.toLowerCase() === "out of stock"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status || "Unknown"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm line-clamp-2 max-w-xs">
                  {item.description}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 text-black rounded-md w-[90%] max-w-2xl overflow-y-auto max-h-screen">
            <h2 className="text-lg font-bold mb-4">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} data-aos="fade-up">
              {/* BASIC INFORMATION */}
              <div className="mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      {...register("name", { required: true })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register("price", { required: true })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      {...register("category", { required: true })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preparation Time
                    </label>
                    <input
                      {...register("prepTime")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="e.g., 15-20 mins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serves
                    </label>
                    <input
                      {...register("serves")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="e.g., 1-2 persons"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("isVegetarian")}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Vegetarian Item
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder="Brief description of the item"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    {...register("longDescription")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder="Detailed description including preparation method, ingredients, etc."
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Image
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        Upload an image of your menu item
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
                      >
                        Choose Image
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* INGREDIENTS */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Ingredients
                </h2>
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3">
                      <input
                        {...register(`ingredients.${index}.value` as const)}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append({ value: "" })}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    + Add Another Ingredient
                  </button>
                </div>
              </div>

              {/* ALLERGENS */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Allergens
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allergenOptions?.map((allergen) => (
                    <label key={allergen} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAllergens?.includes(allergen)}
                        onChange={() => toggleAllergen(allergen)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {allergen}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* NUTRITION */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Nutritional Information
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <input
                    {...register("calories")}
                    type="number"
                    placeholder="Calories"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    {...register("protein")}
                    placeholder="Protein (g)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    {...register("carbs")}
                    placeholder="Carbs (g)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    {...register("fat")}
                    placeholder="Fat (g)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 justify-end">
                <Link
                  href="/menu"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Add Menu Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenusPage;
