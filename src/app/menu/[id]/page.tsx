import { ArrowLeft, Star, Clock, Users } from "lucide-react"
import Link from "next/link"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Image from "next/image"

import MenuDetailsClient from "./MenuDetailsClient"

import GrilledSalmon from '/public/assests/img/GrilledSalmon.jpg'
import ChickenTikka from '/public/assests/img/ChickenTikka.jpg'
import FreshOrangeJuice from '/public/assests/img/FreshOrangeJuice.jpg'
import CaesarSalad from '/public/assests/img/CaesarSalad.jpg'
import VegetableCurry from '/public/assests/img/VegetableCurry.jpg'
import ChocolateLavaCake from '/public/assests/img/ChocolateLavaCake.jpeg'


async function getMenuItem(id: string) {
  return {
    id: Number.parseInt(id),
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon grilled to perfection with herbs and lemon. Served with roasted vegetables and garlic mashed potatoes.",
    longDescription:
      "Our signature grilled salmon is prepared with the finest Atlantic salmon, marinated in a blend of fresh herbs including dill, parsley, and thyme. The fish is grilled to perfection, maintaining its tender texture while developing a beautiful char. Accompanied by seasonal roasted vegetables and creamy garlic mashed potatoes, this dish represents the perfect balance of flavors and nutrition.",
    price: 24.99,
    image: GrilledSalmon,
    category: "Main Course",
    rating: 4.8,
    reviews: 156,
    prepTime: "15-20 mins",
    serves: "1 person",
    isVegetarian: false,
    allergens: ["Fish", "Dairy"],
    ingredients: [
      "Fresh Atlantic Salmon (200g)",
      "Mixed herbs (dill, parsley, thyme)",
      "Lemon",
      "Garlic mashed potatoes",
      "Seasonal roasted vegetables",
      "Olive oil",
      "Sea salt and black pepper",
    ],
    nutritionalInfo: {
      calories: 450,
      protein: "35g",
      carbs: "25g",
      fat: "22g",
    },
  }
}

export default async function MenuDetailsPage({ params }: { params: { id: string } }) {
  const menuItem = await getMenuItem(params.id)

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6" data-aos="fade-right">
          <Link href="/menu" className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div data-aos="fade-right">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
             <Zoom>
              <Image
              objectFit="cover"
                src={menuItem.image || "/placeholder.svg"}
                alt={menuItem.name}
                className="w-full h-96 object-cover"
              />
              </Zoom>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {menuItem.category}
                </span>
                {menuItem.isVegetarian && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Vegetarian
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div data-aos="fade-left">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{menuItem.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold ml-1 text-orange-600">{menuItem.rating}</span>
                    <span className="text-gray-600 ml-1">({menuItem.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">{menuItem.description}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-gray-600">{menuItem.prepTime}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-gray-600">{menuItem.serves}</span>
                </div>
              </div>

              {/* Client Component for Interactive Features */}
              <MenuDetailsClient menuItem={menuItem} />

              {/* Allergens */}
              {menuItem.allergens.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Allergens:</h3>
                  <div className="flex flex-wrap gap-2">
                    {menuItem.allergens.map((allergen) => (
                      <span key={allergen} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2" data-aos="fade-up">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{menuItem.longDescription}</p>
            </div>
          </div>

          {/* Nutritional Info */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutrition Facts</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories</span>
                  <span className="font-semibold">{menuItem.nutritionalInfo.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-semibold">{menuItem.nutritionalInfo.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs</span>
                  <span className="font-semibold">{menuItem.nutritionalInfo.carbs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fat</span>
                  <span className="font-semibold">{menuItem.nutritionalInfo.fat}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-8" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {menuItem.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  <span className="text-gray-600">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
