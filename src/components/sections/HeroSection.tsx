"use client"
import Image from "next/image"
import Link from "next/link"
import banner from '/public/assests/img/imageBanner1.jpg'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Delicious Food
              <span className="block text-yellow-300">Awaits You</span>
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Experience the finest dining with our carefully crafted menu featuring fresh ingredients and authentic
              flavors that will delight your taste buds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors text-center"
              >
                View Menu
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                Order Now
              </button>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div data-aos="fade-left">
            <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
              <Image
              
                src={banner}
                objectFit="content"
                alt="Delicious Food"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
