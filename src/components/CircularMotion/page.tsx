"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"

const carouselItems = [
  {
    id: 1,
    title: "Mountain Adventure",
    description: "Explore breathtaking peaks",
    price: "Starting at $99",
    color: "bg-gradient-to-br from-green-400 to-blue-500",
    image: "/images/sampleImages/IMG-20241025-WA0004.jpg",
  },
  {
    id: 2,
    title: "Ocean Waves",
    description: "Dive into crystal waters",
        price: "Starting at $79",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    image: "/images/sampleImages/IMG-20241025-WA0005.jpg",
  },
  {
    id: 3,
    title: "Desert Safari",
    description: "Journey through golden sands",
        price: "Starting at $59",
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    image: "/images/sampleImages/IMG-20241025-WA0008.jpg",
  },
  {
    id: 4,
    title: "Forest Trail",
    description: "Walk among ancient trees",
        price: "Starting at $49",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    image: "/images/sampleImages/IMG-20241025-WA0019.jpg",
  },
  {
    id: 5,
    title: "City Lights",
    description: "Experience urban energy",
        price: "Starting at $89",
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
    image: "/images/sampleImages/IMG-20241025-WA0030.jpg",
  },
  {
    id: 6,
    title: "Starry Night",
    description: "Gaze at infinite cosmos",
        price: "Starting at $99",
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
    image: "/images/sampleImages/WhatsApp Image 2024-11-04 at 19.00.01_2fd903ea.jpg",
  },
]

export default function CircularMotionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const itemCount = carouselItems.length
  const radius = 400 // Distance from center
  const mobileradius = 300
  const angleStep = (2 * Math.PI) / itemCount

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlay, itemCount])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }
  const truncateString = (text: string, maxLength: number): string => {
                return text.length > maxLength ? text.slice(0, maxLength) + "" : text;
              };

  return (
    <div className="flex  " >
        <div className=" ml-[25%] md:ml-[20%]  -mt-24 z-40  flex ">
      {/* Carousel Container */}
      <div className="  w-[40%] h-[250px] flex items-center justify-center ">
        {/* Central Hub */}
        <div className="absolute w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full shadow-lg z-10 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full shadow-inner"></div>
        </div>

        {/* Rotating Items Container */}
        <div
          className="relative w-full  h-full transition-transform duration-700 ease-in-out"
          // No global rotation needed
        >
          {carouselItems.map((item, index) => {
            // Compute angle so active is at bottom (π/2)
            const angle = ((index - currentIndex) * angleStep) + Math.PI / 2
            const x = Math.cos(angle) * -radius
            const y = Math.sin(angle) * radius
            const isActive = index === currentIndex
            const distanceFromActive = Math.min(
              Math.abs(index - currentIndex),
              itemCount - Math.abs(index - currentIndex),
            )
            const scale = isActive ? 2 : Math.max(0.7, 1 - distanceFromActive * 0.15)
            const opacity = isActive ? 3 : Math.max(0.4, 1 - distanceFromActive * 0.2)

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700 ease-in-out cursor-pointer"
                style={{
                  transform: `
                    translate(${x}px, ${y}px)
                    scale(${scale})
                  `,
                  transformOrigin: "center",
                  left: "50%",
                  top: "50%",
                  marginLeft: "-80px",
                  marginTop: "-60px",
                  opacity: opacity,
                  zIndex: isActive ? 30 : 10 - distanceFromActive,
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <Card
                  className={`w-40 h-40 ${isActive ? "rounded-full shadow-2xl" : "shadow-lg"} rounded-full hover:shadow-2xl transition-shadow`}
                >
                  <CardContent
                    className={` h-full border border-black/40  shadow-2xl  text-white rounded-e-full flex flex-col justify-center items-center text-center`}
                  >
                    <div className="w-full h-full flex items-center justify-center  ">
                        <Image src={item.image}
                        width={100}
                        height={100}
                         alt={item.title} className="w-full h-full object-cover rounded-e-full" />
                    </div>
                 
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Navigation Controls */}
        <div className="absolute flex  flex-col bottom-6 md:bottom-72 left-1/2 transform  -translate-x-1/2 gap-6 md:gap-16" >
                <div className="flex flex-col mb-2 " >
                        <h3 className="text-5xl text-black/50 font-extrabold">{truncateString(carouselItems[currentIndex].title,13)}</h3>
                         <h3 className="text-2xl text-center font-light ">{carouselItems[currentIndex].price}</h3>
                </div>

                <div className="  flex mx-auto gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="rounded-full bg-white/90 hover:bg-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleAutoPlay}
            className="rounded-full bg-white/90 hover:bg-white"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full bg-white/90 hover:bg-white"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
                </div>
                
        </div>

      </div>
      {/* Indicators */}
      {/* <div className="flex justify-center gap-2 mt-6">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div> */}

    </div>
                {/* Active Item Details */}
      <div className="hidden md:flex z-40  bg-amber-500 shadow-2xl text-center  h-[50%] w-[35%] ml-[48%] rounded-bl-3xl rounded-tr-3xl mt-[19%]">
        <Card className="w-full  rounded-bl-3xl rounded-tr-3xl mx-auto">
                <div>
                        <h1 className="font-bold text-2xl" >
                                Product Details
                        </h1>
                </div>
          <CardContent className="p-6">
            <div className="w-50 h-50 mx-auto flex items-center justify-center ">
                        <Image src={carouselItems[currentIndex].image}
                        width={100}
                        height={100}
                         alt={carouselItems[currentIndex].title} className="w-full h-full object-cover  rounded-br-4xl rounded-tl-4xl" />
                    </div>
            <h3 className="text-xl font-bold mb-2">{carouselItems[currentIndex].title}</h3>
            <p className="text-gray-600">{carouselItems[currentIndex].description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}