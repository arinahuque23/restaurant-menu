import { Clock, Truck, Users, Award } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quick and efficient service without compromising on quality",
    },
    {
      icon: Truck,
      title: "Home Delivery",
      description: "Fresh food delivered hot to your doorstep within 30 minutes",
    },
    {
      icon: Users,
      title: "Catering",
      description: "Perfect catering solutions for your events and celebrations",
    },
    {
      icon: Award,
      title: "Quality Food",
      description: "Premium ingredients and authentic recipes for the best taste",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We provide exceptional services to make your dining experience memorable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={service.title} className="text-center group" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <IconComponent className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
