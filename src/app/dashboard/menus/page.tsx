"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import type { MenuItem, FormValues } from "@/shared/interface/menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuTable from "@/modules/menus/MenuTable";
import MenuFormModal from "@/modules/menus/MenuFormDialog";
import ConfirmationModal from "@/modules/menus/ConfirmationModal";

export default function MenusPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    itemId: string;
    itemName: string;
  }>({
    isOpen: false,
    itemId: "",
    itemName: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Fetch error", err);
      toast.error("Failed to load menu items. Please refresh the page.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: FormValues, imageFile: File | null) => {
    try {
      let imageUrl = "";

      if (imageFile) {
        toast.info("Uploading image...", { autoClose: 2000 });
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
        imageUrl: imageUrl || editingItem?.imageUrl || "",
        ingredients: data.ingredients.map((i) => i.value).filter(Boolean),
        rating: 4.9,
      };

      if (editingItem) {
        await axios.put(
          `http://localhost:5000/api/menu/${editingItem._id}`,
          fullData
        );
        toast.success(`"${data.name}" has been updated successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await axios.post("http://localhost:5000/api/menu", fullData);
        toast.success(`"${data.name}" has been created successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setShowModal(false);
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to save menu item. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      itemId: id,
      itemName: name,
    });
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/menu/${deleteConfirmation.itemId}`
      );
      toast.success(
        `"${deleteConfirmation.itemName}" has been deleted successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      fetchMenuItems();
      setDeleteConfirmation({ isOpen: false, itemId: "", itemName: "" });
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Failed to delete menu item. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, itemId: "", itemName: "" });
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Menu Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your restaurant menu items
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Menu Item
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading menu items...</div>
          </div>
        ) : (
          <MenuTable
            menuItems={menuItems}
            onEdit={handleEdit}
            onDelete={(id, name) => handleDelete(id, name)}
          />
        )}

        {/* Modal */}
        <MenuFormModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          editingItem={editingItem}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteConfirmation.isOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          title="Delete Menu Item"
          message={`Are you sure you want to delete "${deleteConfirmation.itemName}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          isLoading={isDeleting}
        />

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
