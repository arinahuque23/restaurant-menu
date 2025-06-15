"use client"
import { useState } from "react"
import { Search, Filter, Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Sample menu data - you'll replace this with API calls later
  const menuItems = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Main Course",
      rating: 4.8,
      isVegetarian: false,
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Tender chicken marinated in spices and grilled in tandoor",
      price: 18.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Main Course",
      rating: 4.9,
      isVegetarian: false,
    },
    {
      id: 3,
      name: "Vegetable Curry",
      description: "Mixed vegetables cooked in aromatic spices and coconut milk",
      price: 14.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Main Course",
      rating: 4.6,
      isVegetarian: true,
    },
    {
      id: 4,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with parmesan cheese and croutons",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Appetizers",
      rating: 4.5,
      isVegetarian: true,
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Desserts",
      rating: 4.7,
      isVegetarian: true,
    },
    {
      id: 6,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice served chilled",
      price: 4.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Beverages",
      rating: 4.4,
      isVegetarian: true,
    },
  ]

  const categories = ["All", "Appetizers", "Main Course", "Desserts", "Beverages"]

  // Filter menu items based on search and category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our delicious selection of carefully crafted dishes
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8" data-aos="fade-up">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                  {item.isVegetarian && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Veg</span>
                  )}
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
                  <div className="flex gap-2">
                    <Link
                      to={`/menu/${item.id}`}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <p className="text-gray-600 text-lg">No menu items found matching your search criteria.</p>
          </div>
        )}

        {/* Add Menu Button */}
        <div className="fixed bottom-8 right-8">
          <Link
            to="/add-menu"
            className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
          >
            <span className="text-2xl">+</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
