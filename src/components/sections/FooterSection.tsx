import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function FooterSection() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Tasty Bites</h3>
            <p className="text-gray-300 mb-4">
              Serving delicious and authentic food since 2003. Experience the best flavors in town with our carefully
              crafted menu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Appetizers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Main Course
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Desserts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Beverages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>123 Food Street</p>
              <p>New York, NY 10001</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: info@tastybites.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 Tasty Bites. All rights reserved. Made with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  )
}
