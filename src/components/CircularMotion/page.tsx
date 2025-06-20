"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import useGetAllProducts from "@/hooks/useGetAllProducts"
import Link from "next/link"

const carouselItems = [
  {
    id: 1,
    title: "Mountain Adventure",
    description: `Explore breathtaking peaks Explore breathtaking peaks Explore 
    Explore breathtaking peaksExplore breathtaking peaksExplore breathtaking peaksExplore 
    breathtaking peaksbreathtaking peaks Explore breathtaking peaks Explore breathtaking peaks Explore breathtaking peak
    s1`,
    price: "Starting at $99",
    color: "bg-gradient-to-br from-green-400 to-blue-500",
    image: "/images/sampleImages/fry.jpg",
  },
  {
    id: 2,
    title: "Ocean Waves",
    description: ` Dive into crystal watersDive into crystal watersDive into crystal watersDive into crystal watersDive into crystal waters
    Dive into crystal watersDive into crystal watersDive into crystal watersDive into crystal watersDive into crystal watersDive into crystal waters`,
    price: "Starting at $79",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    image: "/images/sampleImages/slads.jpg",
  },
  {
    id: 3,
    title: "Desert Safari",
    description: `"Journey through golden sands "Journey through golden sands""Journey through golden sands""Journey through golden sands""Journey through golden sands""Journey through golden sands""Journey throu
    gh golden sands""Journey through golden sands""Journey through golden sands""Journey through golden sands"`,
    price: "Starting at $59",
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    image: "/images/sampleImages/fooood.jpg",
  },
  {
    id: 4,
    title: "Forest Trail",
    description: `Walk among ancient treesWalk among ancient treesWa
    Walk among ancient treesWalk among ancient treeslk among ancient treesWalk among ancient treesWalk am
    ong ancient treesWalk among ancient treesWalk among ancient treesWalk among ancient trees`,
    price: "Starting at $49",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    image: "/images/sampleImages/foods.jpg",
  },
  {
    id: 5,
    title: "City Lights",
    description: `"Journey through golden sands "Journey through golden sands""Journey through golden sands""Journey through golden sands"Experience  urban energy`,
    price: "Starting at $89",
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
    image: "/images/sampleImages/pan.jpg",
  },
  {
    id: 6,
    title: "Starry Night",
    description: `Gaze"Journey through golden sands""Journey through golden sands""Journey thr
    ough golden sands""Journey through golden sands""Journey through golden sands"
     at infinite cosmos`,
    price: "Starting at $99",
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
    image: "/images/sampleImages/spice.jpg",
  },
]

export default function CircularMotionCarousel() {
  const { data: products, isLoading } = useGetAllProducts()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Use fallback data if products is not available yet
  const displayProducts = products && products.length > 0 ? products : carouselItems
  const itemCount = displayProducts.length
  const radius = 400 // Distance from center
  const angleStep = (2 * Math.PI) / itemCount

  useEffect(() => {
    if (!isAutoPlay || itemCount === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlay, itemCount])

  const handlePrevious = () => {
    if (itemCount > 0) {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
    }
  }

  const handleNext = () => {
    if (itemCount > 0) {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  const truncateString = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + "" : text
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative top-[30%] flex items-center justify-center h-96 ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="text-white mt-4 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }


  // Don't render if no items
  if (itemCount === 0) {
    return (
      <div className="relative top-[30%] flex items-center justify-center h-96 bg-gray-500">
        <div className="text-center text-white">
          <p className="text-lg">No products available</p>
        </div>
      </div>
    )
  }

  // Ensure currentIndex is within bounds
  const safeCurrentIndex = Math.min(currentIndex, itemCount - 1)
  const currentProduct = displayProducts[safeCurrentIndex]

  return (
    <div className="relative top-[30%] flex flex-col md:flex-row mx-auto bg-amber-500">
      {displayProducts.map((item, index) => {
        // Compute angle so active is at bottom (π/2)
        const angle = (index - safeCurrentIndex) * angleStep + Math.PI / 2
        const x = Math.cos(angle) * -radius
        const y = Math.sin(angle) * radius
        const isActive = index === safeCurrentIndex
        const distanceFromActive = Math.min(
          Math.abs(index - safeCurrentIndex),
          itemCount - Math.abs(index - safeCurrentIndex),
        )
        const scale = isActive ? 2 : Math.max(0.7, 1 - distanceFromActive * 0.15)
        const opacity = isActive ? 3 : Math.max(0.4, 1 - distanceFromActive * 0.2)

        return (
          <div
            key={item.id}
            className="absolute bottom-36 left-60 transition-all duration-700 ease-in-out cursor-pointer"
            style={{
              transform: `
                translate(${x}px, ${y}px)
                scale(${scale})
              `,
              transformOrigin: "center",
              opacity: opacity,
              zIndex: isActive ? 30 : 10 - distanceFromActive,
            }}
            onClick={() => setCurrentIndex(index)}
          >
            <Card
              className={`w-40 h-40 ${isActive ? "rounded-full shadow-2xl" : "shadow-lg"} rounded-full hover:shadow-2xl transition-shadow`}
            >
              {isActive?( <Link href={`/product/${item.id}`} >
              
              <CardContent
                className={`border border-black/40 shadow-2xl/90 text-white rounded-full flex flex-col justify-center items-center text-center`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={item.image || "/placeholder.svg?height=160&width=160"}
                    width={100}
                    height={100}
                    alt={item.title || "Product"}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </CardContent></Link>):(
                <CardContent
                className={`border border-black/40 shadow-2xl/90 text-white rounded-full flex flex-col justify-center items-center text-center`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={item.image || "/placeholder.svg?height=160&width=160"}
                    width={100}
                    height={100}
                    alt={item.title || "Product"}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </CardContent>
              )}
            </Card>
          </div>
        )
      })}

      {/* Navigation Controls */}
      <div className="absolute left-[40%] top-60 w-[30%] flex flex-col transform gap-6">
        <div className="flex flex-col text-center mb-2">
          <h3 className="text-7xl text-black/50 font-extrabold">
            {currentProduct?.title ? truncateString(currentProduct.title, 13) : "Loading..."}
          </h3>
          <h3 className="text-2xl font-light dark:text-black">Starts at: {currentProduct?.price || "Price not available"}</h3>
        </div>

        <div className="flex mx-auto gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="rounded-full bg-white/90 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleAutoPlay}
            className="rounded-full bg-white/90 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full bg-white/90 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-300"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Active Item Details */}
      <div className="fixed top-[35%] right-5 h-[60%] md:flex z-40 bg-amber-500 shadow-2xl/90 text-center rounded-bl-3xl rounded-tr-3xl">
        <Card className="w-full rounded-bl-3xl rounded-tr-3xl mx-auto">
          <div>
            <h1 className="font-bold text-2xl">Product Details</h1>
          </div>
          <CardContent className="p-3 h-[90%] gap-6 justify-center flex">
            <div className="w-40 h-40 flex items-center justify-center">
              <Image
                src={currentProduct?.image || "/placeholder.svg?height=160&width=160"}
                width={100}
                height={100}
                alt={currentProduct?.title || "Product"}
                className="w-full h-full object-cover rounded-br-4xl rounded-tl-4xl"
              />
            </div>
            <div className="flex flex-col w-60 -mt-3">
              <h3 className="text-xl font-bold mb-2">{currentProduct?.title || "Product Name"}</h3>
              <p className="text-gray-600 font-medium text-start">
                {currentProduct?.description
                  ? truncateString(currentProduct.description, 400)
                  : "Product description not available"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
