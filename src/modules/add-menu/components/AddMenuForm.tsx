import { Upload, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const AddMenuForm = () => {
    const [formData, setFormData] = useState({
       name: "",
       description: "",
       longDescription: "",
       price: "",
       category: "",
       prepTime: "",
       serves: "",
       isVegetarian: false,
       allergens: [] as string[],
       ingredients: [""],
       calories: "",
       protein: "",
       carbs: "",
       fat: "",
     })
   
     const [imagePreview, setImagePreview] = useState<string | null>(null)
   
     const categories = ["Appetizers", "Main Course", "Desserts", "Beverages"]
     const allergenOptions = ["Dairy", "Eggs", "Fish", "Shellfish", "Nuts", "Peanuts", "Soy", "Wheat", "Gluten"]
   
     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
       const { name, value, type } = e.target
       if (type === "checkbox") {
         const checked = (e.target as HTMLInputElement).checked
         setFormData((prev) => ({
           ...prev,
           [name]: checked,
         }))
       } else {
         setFormData((prev) => ({
           ...prev,
           [name]: value,
         }))
       }
     }
   
     const handleAllergenChange = (allergen: string) => {
       setFormData((prev) => ({
         ...prev,
         allergens: prev.allergens.includes(allergen)
           ? prev.allergens.filter((a) => a !== allergen)
           : [...prev.allergens, allergen],
       }))
     }
   
     const handleIngredientChange = (index: number, value: string) => {
       const newIngredients = [...formData.ingredients]
       newIngredients[index] = value
       setFormData((prev) => ({
         ...prev,
         ingredients: newIngredients,
       }))
     }
   
     const addIngredient = () => {
       setFormData((prev) => ({
         ...prev,
         ingredients: [...prev.ingredients, ""],
       }))
     }
   
     const removeIngredient = (index: number) => {
       if (formData.ingredients.length > 1) {
         const newIngredients = formData.ingredients.filter((_, i) => i !== index)
         setFormData((prev) => ({
           ...prev,
           ingredients: newIngredients,
         }))
       }
     }
   
     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0]
       if (file) {
         const reader = new FileReader()
         reader.onload = () => {
           setImagePreview(reader.result as string)
         }
         reader.readAsDataURL(file)
       }
     }
   
     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault()
       // Here you would typically send the data to your backend API
       console.log("Form submitted:", formData)
       alert("Menu item added successfully! (This is just a demo)")
     }
    return (
        <div>
             <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8" data-aos="fade-up">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preparation Time</label>
                <input
                  type="text"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 15-20 mins"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serves</label>
                <input
                  type="text"
                  name="serves"
                  value={formData.serves}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 1-2 persons"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={formData.isVegetarian}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">Vegetarian Item</label>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                placeholder="Brief description of the item"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                placeholder="Detailed description including preparation method, ingredients, etc."
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Image</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
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
                  <p className="text-gray-600 mb-4">Upload an image of your menu item</p>
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

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder={`Ingredient ${index + 1}`}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                + Add Another Ingredient
              </button>
            </div>
          </div>

          {/* Allergens */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Allergens</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allergenOptions.map((allergen) => (
                <label key={allergen} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.allergens.includes(allergen)}
                    onChange={() => handleAllergenChange(allergen)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{allergen}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nutritional Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Nutritional Information</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
                <input
                  type="text"
                  name="protein"
                  value={formData.protein}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="0g"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carbs (g)</label>
                <input
                  type="text"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="0g"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fat (g)</label>
                <input
                  type="text"
                  name="fat"
                  value={formData.fat}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  placeholder="0g"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
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