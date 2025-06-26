"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  type MenuItem,
  type FormValues,
  categories,
  allergenOptions,
} from "@/shared/interface/menu";

interface MenuFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues, imageFile: File | null) => Promise<void>;
  editingItem: MenuItem | null;
}

export default function MenuFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
}: MenuFormModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFormSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data, imageFile);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        const ingredientsArray = editingItem.ingredients?.map((ing) => ({
          value: ing,
        })) || [{ value: "" }];

        reset({
          name: editingItem.name,
          category: editingItem.category,
          price: editingItem.price,
          description: editingItem.description,
          longDescription: editingItem.longDescription || "",
          prepTime: editingItem.prepTime || "",
          serves: editingItem.serves || "",
          isVegetarian: editingItem.isVegetarian || false,
          allergens: editingItem.allergens || [],
          calories: editingItem.calories || undefined,
          protein: editingItem.protein || "",
          carbs: editingItem.carbs || "",
          fat: editingItem.fat || "",
          status: editingItem.status,
          ingredients: ingredientsArray,
          reason: "",
        });
        setImagePreview(editingItem.imageUrl || null);
        setImageFile(null);
      } else {
        // Completely reset form for new items
        reset({
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
        });
        setImageFile(null);
        setImagePreview(null);
      }
    }
  }, [editingItem, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      <div
        className="bg-white rounded-xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col"
        style={{ zIndex: 10000 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      pattern="[0-9]*\.?[0-9]*"
                      {...register("price", {
                        required: true,
                        validate: (value) => {
                          const num = Number.parseFloat(String(value));
                          return !isNaN(num) && num >= 0;
                        },
                      })}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9.]/g, "");
                        const parts = value.split(".");
                        if (parts.length > 2) {
                          value = parts[0] + "." + parts.slice(1).join("");
                        }
                        if (parts[1] && parts[1].length > 2) {
                          value = parts[0] + "." + parts[1].substring(0, 2);
                        }
                        e.target.value = value;
                        setValue("price", Number.parseFloat(value) || 0);
                      }}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register("category", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
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
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preparation Time
                  </label>
                  <input
                    {...register("prepTime")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., 10-15min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serves
                  </label>
                  <input
                    {...register("serves")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., 2 persons"
                  />
                </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  {...register("description", { required: true })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  placeholder="Brief description of the item"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description
                </label>
                <textarea
                  {...register("longDescription")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  placeholder="Detailed description including preparation method, ingredients, etc."
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Image
              </h3>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
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
                      className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
                    >
                      Choose Image
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Ingredients
              </h3>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      {...register(`ingredients.${index}.value` as const)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
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
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Ingredient
                </button>
              </div>
            </div>

            {/* Allergens */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Allergens
              </h3>
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

            {/* Nutritional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Nutritional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calories
                  </label>
                  <input
                    {...register("calories")}
                    type="number"
                    min="0"
                    placeholder="150"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Protein (g)
                  </label>
                  <input
                    {...register("protein")}
                    placeholder="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carbs (g)
                  </label>
                  <input
                    {...register("carbs")}
                    placeholder="18"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fat (g)
                  </label>
                  <input
                    {...register("fat")}
                    placeholder="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t bg-gray-50 -mx-6 px-6 py-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingItem
                  ? "Update Item"
                  : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
