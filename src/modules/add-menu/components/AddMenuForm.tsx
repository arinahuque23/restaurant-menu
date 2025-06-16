import { Allergen } from "@/shared/enum/allergenoptions.enum";
import axios from "axios";
import { Upload, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const categories = ["Appetizers", "Main Course", "Desserts", "Beverages"];
const allergenOptions = Object.values(Allergen);

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
};

const AddMenuForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
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
        formData.append("upload_preset", "menu-img-upload"); // must match Cloudinary preset
        formData.append("cloud_name", "ditevim6o");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/ditevim6o/image/upload",
          { method: "POST", body: formData }
        );
        const fileData = await res.json();
        imageUrl = fileData.secure_url;
      }

      const fullData = { ...data, imageUrl };

      const response = await axios.post(
        "http://localhost:5000/api/menu",
        fullData
      );
      alert("Menu item added!");
      console.log(response.data);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8"
        data-aos="fade-up"
      >
        {/* BASIC INFORMATION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Basic Information
          </h2>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Image</h2>
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
            {allergenOptions.map((allergen) => (
              <label key={allergen} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAllergens.includes(allergen)}
                  onChange={() => toggleAllergen(allergen)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{allergen}</span>
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
  );
};

export default AddMenuForm;
