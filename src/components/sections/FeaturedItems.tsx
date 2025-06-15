import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import GrilledSalmon from '/public/assests/img/GrilledSalmon.jpg'
import ChickenTikka from '/public/assests/img/ChickenTikka.jpg'
import ChocolateLavaCake from '/public/assests/img/ChocolateLavaCake.jpeg'

export default function FeaturedItems() {
  const featuredItems = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
      price: 24.99,
      image: GrilledSalmon,
      rating: 4.8,
      category: "Main Course",
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Tender chicken marinated in spices and grilled in tandoor",
      price: 18.99,
      image:ChickenTikka,
      rating: 4.9,
      category: "Main Course",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      image: ChocolateLavaCake,
      rating: 4.7,
      category: "Dessert",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Items</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our chef's special recommendations that our customers love the most
          </p>
        </div>

        {/* Featured Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden">
              <Image
              objectFit="content"
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                  <Link
                    href={`/menu/${item.id}`}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
