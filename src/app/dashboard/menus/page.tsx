import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";

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

interface FormValues {
  name: string;
  category: string;
  price: number;
  description: string;
  status: string;
  ingredients: { value: string }[];
}

const MenusPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      description: "",
      status: "Available",
      ingredients: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const openAddModal = () => {
    reset({
      name: "",
      category: "",
      price: 0,
      description: "",
      status: "Available",
      ingredients: [{ value: "" }],
    });
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    const ingredientsArray =
      Array.isArray(item.ingredients) && typeof item.ingredients[0] === "string"
        ? item.ingredients.map((ing) => ({ value: ing }))
        : item.ingredients;

    setEditingItem(item);
    reset({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      status: item.status || "Available",
      ingredients: ingredientsArray as { value: string }[],
    });
    setImagePreview(item.imageUrl || null);
    setShowModal(true);
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
      let imageUrl = editingItem?.imageUrl || "";

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
    } catch (err) {
      console.error("Save error", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("name", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Item Name"
              />
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Price"
              />
              <input
                {...register("category", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Category"
              />
              <textarea
                {...register("description", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Short Description"
              />
              <select
                {...register("status")}
                className="w-full p-2 border rounded"
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <div>
                <label className="block mb-1">Image</label>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center border-dashed border-2 border-gray-300 rounded p-4">
                    <Upload className="mx-auto text-gray-400 w-6 h-6 mb-2" />
                    <p className="text-gray-500 mb-2">Upload an image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="upload-image"
                    />
                    <label
                      htmlFor="upload-image"
                      className="bg-orange-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1">Ingredients</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      {...register(`ingredients.${index}.value`)}
                      className="flex-1 p-2 border rounded"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ value: "" })}
                  className="text-orange-600 font-medium"
                >
                  + Add Ingredient
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Save
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
