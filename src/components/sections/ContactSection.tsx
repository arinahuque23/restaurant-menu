import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get in touch with us for reservations, catering, or any questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div data-aos="fade-right">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                  <p className="text-gray-600">
                    123 Food Street, Culinary District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                  <p className="text-gray-600">info@tastybites.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Hours</h4>
                  <p className="text-gray-600">
                    Mon - Thu: 11:00 AM - 10:00 PM
                    <br />
                    Fri - Sat: 11:00 AM - 11:00 PM
                    <br />
                    Sun: 12:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left">
            <form className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Message</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 mb-4"
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 mb-6"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
