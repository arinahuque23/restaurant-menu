"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { ArrowLeft, Star, Clock, Users } from "lucide-react";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  price: number;
  rating?: number;
  reviews?: number;
  prepTime?: string;
  serves?: string;
  allergens?: string[];
  ingredients?: string[];
  isVegetarian?: boolean;
  nutritionalInfo?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
  imageUrl?: string;
}

interface Props {
  params: { id: string };
}

export default function MenuDetailsSection({ params }: Props) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!params?.id) return; // ⚠️ এটা না থাকলে undefined দিয়েই রিকোয়েস্ট যাবে

    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/menu/${params.id}`
        );
        setItem(data);
      } catch (err) {
        console.error("Details fetch error ➜", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [params?.id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (!item)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Menu item not found.</p>
      </div>
    );

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </Link>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <Zoom>
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                priority
              />
            </Zoom>
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {item.category}
              </span>
              {item.isVegetarian && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Vegetarian
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>

            {item.rating && (
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-orange-600">
                  {item.rating}
                </span>
                {item.reviews && (
                  <span className="text-gray-600 ml-1">
                    ({item.reviews} reviews)
                  </span>
                )}
              </div>
            )}

            <p className="text-gray-600 mb-6">{item.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {item.prepTime && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-gray-600">{item.prepTime}</span>
                </div>
              )}
              {item.serves && (
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-gray-600">{item.serves}</span>
                </div>
              )}
            </div>

            <p className="text-2xl font-bold text-orange-600 mb-4">
              ${item.price}
            </p>

            {/* Allergens */}
            {item.allergens?.length && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((a) => (
                    <span
                      key={a}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Long Description & Nutrition */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {item.longDescription && (
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {item.longDescription}
              </p>
            </div>
          )}

          {item.nutritionalInfo && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Nutrition Facts</h2>
              {Object.entries(item.nutritionalInfo).map(([k, v]) => (
                <div key={k} className="flex justify-between text-gray-600">
                  <span className="capitalize">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ingredients */}
        {item.ingredients?.length && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="grid md:grid-cols-2 gap-2 list-disc pl-5">
              {item.ingredients.map((ing) => (
                <li key={ing} className="text-gray-600">
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
