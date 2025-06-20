"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PiCookingPot } from "react-icons/pi";
import { MdDeliveryDining } from "react-icons/md";
import { MapPin, Clock, Phone, Mail, ChefHat,Calendar } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: <PiCookingPot className="w-8 h-8" />,
    title: "OutSide Catering",
    description: "Every dish is prepared with love and dedication to authentic Italian flavors.",
  },
  {
    icon: <MdDeliveryDining className="w-8 h-8" />,
    title: "Take Away & Delivery",
    description: "Our recipes have been passed down through generations of Italian families.",
  },
  {
    icon: <ChefHat className="w-8 h-8" />,
    title: "Pysical Restaurant",
    description: "We source the finest ingredients, many imported directly from Italy.",
  },
]

export default function RestaurantAbout() {
  return (
    <div className="min-h-screen bg-white/90">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center  overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-white/95 opacity-50 "
          style={{
            backgroundImage: "url('/images/about/about1.jpg?height=800&width=1200')",
          }}
        ></div>
        <div className="relative z-20 text-center text-white mt-40 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-amber-500 mb-6">Amazima  <span className=" text-gray-900" >Restaurant</span></h1>
          <p className="text-xl md:text-2xl mb-8 font-light">Authentic African Cuisine in the Heart of the City</p>
      
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 1995 by the Rossi family, Bella Vista began as a small trattoria with a simple mission: to
              bring the authentic flavors of Italy to our local community. What started as a family dream has grown into
              a beloved culinary destination.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our recipes are rooted in tradition, passed down through generations of Italian grandmothers. Every sauce
              is simmered with care, every pasta is made fresh daily, and every dish tells a story of our heritage and
              passion for exceptional food.
            </p>
            <div className="flex items-center gap-4 text-amber-600">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-semibold">28 Years of Excellence</span>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Restaurant interior"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-amber-600 mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Location & Contact Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Visit Us</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Italian Street
                    <br />
                    Downtown District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Hours</h3>
                  <p className="text-gray-600">
                    Monday - Thursday: 5:00 PM - 10:00 PM
                    <br />
                    Friday - Saturday: 5:00 PM - 11:00 PM
                    <br />
                    Sunday: 4:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">info@bellavista.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Restaurant exterior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
