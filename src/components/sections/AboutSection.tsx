import Image from "next/image";

import aboutresturant from "/public/assests/img/about-resturant.jpeg"

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div data-aos="fade-right">
             <Image
              src={aboutresturant}
              alt="About Us"
              objectFit="content"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right - Content */}
          <div data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Our Restaurant</h2>
            <p className="text-gray-600 text-lg mb-6">
              For over 20 years, we have been serving authentic and delicious meals to our community. Our passion for
              food and commitment to quality ingredients makes every dish special.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              From traditional recipes passed down through generations to modern culinary innovations, we create
              memorable dining experiences for every guest who walks through our doors.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">20+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">500+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
