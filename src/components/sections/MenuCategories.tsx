import Image from "next/image"
import Link from "next/link"

import Appetizers from '/public/assests/img/Appetizers.jpg'
import MainCourse from '/public/assests/img/MainCourse.jpeg'
import Desserts from '/public/assests/img/Desserts.jpeg'
import Beverages from '/public/assests/img/Beverages.jpg'

export default function MenuCategories() {
  const categories = [
    { name: "Appetizers", image: Appetizers, count: 12 },
    { name: "Main Course", image: MainCourse, count: 25 },
    { name: "Desserts", image: Desserts, count: 15 },
    { name: "Beverages", image: Beverages, count: 20 },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Menu Categories</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our diverse menu categories, each crafted with care and attention to detail
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={category.name} className="group cursor-pointer" data-aos="fade-up" data-aos-delay={index * 100}>
              <Link href="/menu">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden">
                    <Image
                    objectFit="content"
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.count} Items</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
