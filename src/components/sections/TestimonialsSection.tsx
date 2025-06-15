import { Star, Quote } from "lucide-react"
import Image from "next/image"

import review1 from '/public/assests/img/review1.png'
import review2 from '/public/assests/img/review2.webp'
export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      content:
        "Amazing food quality and excellent service! The flavors are authentic and the presentation is beautiful. Highly recommended!",
      rating: 5,
      image: review1,
    },
    {
      name: "Mike Chen",
      role: "Regular Customer",
      content:
        "I have been coming here for years and the quality never disappoints. The staff is friendly and the atmosphere is perfect.",
      rating: 5,
      image: review2,
    },
    {
      name: "Emily Davis",
      role: "Event Organizer",
      content:
        "Their catering service for our corporate event was outstanding. Professional, timely, and delicious food that impressed all our guests.",
      rating: 5,
      image: review1,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-lg shadow-lg p-6 relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="bg-orange-600 w-8 h-8 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>

              {/* Customer Info */}
              <div className="flex items-center">
             <Image
              width={100}
              height={100}
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
