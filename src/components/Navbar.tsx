// "use client"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Menu, X } from "lucide-react"
// import { useState } from "react"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const pathname = usePathname()

//   // Check if current route is active
//   const isActive = (path: string) => {
//     if (path === "/" && pathname === "/") return true
//     if (path !== "/" && pathname.startsWith(path)) return true
//     return false
//   }

//   return (
//     <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="text-2xl font-bold text-orange-600">
//               Tasty Bites
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link
//               href="/"
//               className={`${isActive("/") ? "text-orange-600" : "text-gray-700"} hover:text-orange-600 transition-colors`}
//             >
//               Home
//             </Link>
//             <Link
//               href="/menu"
//               className={`${isActive("/menu") ? "text-orange-600" : "text-gray-700"} hover:text-orange-600 transition-colors`}
//             >
//               Menu
//             </Link>
//             <Link
//               href="/add-menu"
//               className={`${isActive("/add-menu") ? "text-orange-600" : "text-gray-700"} hover:text-orange-600 transition-colors`}
//             >
//               Add Menu
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-orange-600">
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
//               <Link
//                 href="/"
//                 className="block px-3 py-2 text-gray-700 hover:text-orange-600"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/menu"
//                 className="block px-3 py-2 text-gray-700 hover:text-orange-600"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Menu
//               </Link>
//               <Link
//                 href="/add-menu"
//                 className="block px-3 py-2 text-gray-700 hover:text-orange-600"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Add Menu
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  Globe,
  Hamburger,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDessertsOpen, setIsDessertsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const pathname = usePathname();

  // Check if current route is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-bold text-orange-500">Testy</span>
              <span className="text-xs text-orange-300 -mt-1">Bites</span>
            </Link>
          </div>
          <Link
            href="/menu"
            className="px-3 py-3 text-white hover:text-orange-500 flex items-center gap-1 "
            onClick={() => setIsOpen(false)}
          >
            MENU
            <Hamburger className="text-orange-500" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative">
              <Link
                href="/fastfood"
                className={`${
                  isActive("/fastfood") ? "text-orange-500" : "text-white"
                } hover:text-orange-500 transition-colors flex items-center space-x-1`}
              >
                <span>FASTFOOD</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              </Link>
            </div>

            <div className="relative">
              <Link
                href="/categories"
                className={`${
                  isActive("/categories") ? "text-orange-500" : "text-white"
                } hover:text-orange-500 transition-colors flex items-center space-x-1`}
              >
                <span>CATEGORIES</span>
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  HOT
                </span>
              </Link>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsDessertsOpen(!isDessertsOpen)}
                className={`${
                  isActive("/desserts") ? "text-orange-500" : "text-white"
                } hover:text-orange-500 transition-colors flex items-center space-x-1`}
              >
                <span>DESSERTS</span>
                <ChevronDown size={16} />
              </button>
              {isDessertsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg py-2">
                  <Link
                    href="/desserts/cakes"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Cakes
                  </Link>
                  <Link
                    href="/desserts/ice-cream"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Ice Cream
                  </Link>
                  <Link
                    href="/desserts/pastries"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Pastries
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`${
                  isActive("/products") ? "text-orange-500" : "text-white"
                } hover:text-orange-500 transition-colors flex items-center space-x-1`}
              >
                <span>PRODUCTS</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  NEW
                </span>
                <ChevronDown size={16} />
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg py-2">
                  <Link
                    href="/products/beverages"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Beverages
                  </Link>
                  <Link
                    href="/products/snacks"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Snacks
                  </Link>
                  <Link
                    href="/products/specials"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Specials
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/pizza"
              className={`${
                isActive("/pizza") ? "text-orange-500" : "text-white"
              } hover:text-orange-500 transition-colors`}
            >
              PIZZA
            </Link>
            <Link
              href="/menu"
              className="block px-3 py-2 text-white hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              MENU
            </Link>

            <Link
              href="/contact"
              className={`${
                isActive("/contact") ? "text-orange-500" : "text-white"
              } hover:text-orange-500 transition-colors`}
            >
              CONTACT US
            </Link>

            <Link
              href="/blog"
              className={`${
                isActive("/blog") ? "text-orange-500" : "text-white"
              } hover:text-orange-500 transition-colors`}
            >
              BLOG
            </Link>
          </div>

          {/* Right Side Utilities */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-white hover:text-orange-500 transition-colors">
              <Search size={20} />
            </button>

            {/* User Icon */}
            <button className="text-white hover:text-orange-500 transition-colors">
              <User size={20} />
            </button>

            {/* Cart Icon with Badge */}
            <button className="relative text-white hover:text-orange-500 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-700">
              <Link
                href="/fastfood"
                className="block px-3 py-2 text-white hover:text-orange-500 flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                <span>FASTFOOD</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 text-white hover:text-orange-500 flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                <span>CATEGORIES</span>
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  HOT
                </span>
              </Link>
              <Link
                href="/desserts"
                className="block px-3 py-2 text-white hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                DESSERTS
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 text-white hover:text-orange-500 flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                <span>PRODUCTS</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  NEW
                </span>
              </Link>
              <Link
                href="/pizza"
                className="block px-3 py-2 text-white hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                PIZZA
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 text-white hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-white hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                CONTACT US
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-white hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                BLOG
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
