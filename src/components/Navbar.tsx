"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import userAvatar from "../../public/assests/img/review1.png"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser:any) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setDropdownOpen(false)
  }

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

            <div className="flex items-center space-x-4 relative">
              {/* Search Icon */}
              <button className="text-orange-500 transition-colors">
                <Search size={20} />
              </button>

              {/* User Icon or Avatar */}
              {user ? (
                <div className="relative">
                  <Image
                    src={userAvatar}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer border border-orange-500"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="text-orange-500 transition-colors">
                  <User size={20} />
                </Link>
              )}

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
