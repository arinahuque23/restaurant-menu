"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Check if current route is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              Tasty Bites
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${isActive("/") ? "text-orange-600" : "text-gray-700"} hover:text-orange-600 transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`${isActive("/menu") ? "text-orange-600" : "text-gray-700"} hover:text-orange-600 transition-colors`}
            >
              Menu
            </Link>
            <Link
              href="/add-menu"
              className={`${isActive("/add-menu") ? "text-orange-600" : "text-gray-700"} hover:text-orange-600 transition-colors`}
            >
              Add Menu
            </Link>
             <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-orange-500 transition-colors">
              <Search size={20} />
            </button>

            {/* User Icon */}
            <Link href='/login' className="text-orange-500 transition-colors">
              <User size={20} />
            </Link>

            {/* Cart Icon with Badge */}
            <button className="relative text-orange-500 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-orange-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
       

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-orange-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 text-gray-700 hover:text-orange-600"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/add-menu"
                className="block px-3 py-2 text-gray-700 hover:text-orange-600"
                onClick={() => setIsOpen(false)}
              >
                Add Menu
              </Link>
   
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


