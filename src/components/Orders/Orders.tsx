"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Minus, ShoppingCart, Star, Clock, Users } from "lucide-react"
import Image from "next/image"

interface MenuItem {
  id: string
  name: string
  description: string
  basePrice: number
  image: string
  category: string
  rating: number
  prepTime: string
  serves: number
  sizes?: { name: string; price: number }[]
  toppings?: { name: string; price: number; category: string }[]
  customizations?: { name: string; options: { name: string; price: number }[] }[]
}

interface CartItem {
  id: string
  menuItem: MenuItem
  size?: string
  toppings: string[]
  customizations: { [key: string]: string }
  specialInstructions: string
  quantity: number
  totalPrice: number
}

const menuItems: MenuItem[] = [
  {
    id: "pizza-margherita",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil",
    basePrice: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pizza",
    rating: 4.8,
    prepTime: "15-20 min",
    serves: 2,
    sizes: [
      { name: 'Small (10")', price: 0 },
      { name: 'Medium (12")', price: 3 },
      { name: 'Large (14")', price: 6 },
      { name: 'Extra Large (16")', price: 9 },
    ],
    toppings: [
      { name: "Extra Cheese", price: 2, category: "Cheese" },
      { name: "Pepperoni", price: 2.5, category: "Meat" },
      { name: "Mushrooms", price: 1.5, category: "Vegetables" },
      { name: "Bell Peppers", price: 1.5, category: "Vegetables" },
      { name: "Olives", price: 1.5, category: "Vegetables" },
      { name: "Italian Sausage", price: 3, category: "Meat" },
      { name: "Onions", price: 1, category: "Vegetables" },
      { name: "Tomatoes", price: 1.5, category: "Vegetables" },
    ],
    customizations: [
      {
        name: "Crust Type",
        options: [
          { name: "Thin Crust", price: 0 },
          { name: "Thick Crust", price: 1 },
          { name: "Stuffed Crust", price: 3 },
          { name: "Gluten-Free", price: 4 },
        ],
      },
      {
        name: "Sauce",
        options: [
          { name: "Tomato Sauce", price: 0 },
          { name: "White Sauce", price: 1 },
          { name: "BBQ Sauce", price: 1 },
          { name: "Pesto", price: 2 },
        ],
      },
    ],
  },
  {
    id: "burger-classic",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
    basePrice: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Burgers",
    rating: 4.6,
    prepTime: "10-15 min",
    serves: 1,
    sizes: [
      { name: "Single Patty", price: 0 },
      { name: "Double Patty", price: 4 },
      { name: "Triple Patty", price: 7 },
    ],
    toppings: [
      { name: "Bacon", price: 2.5, category: "Meat" },
      { name: "Cheese", price: 1.5, category: "Cheese" },
      { name: "Avocado", price: 2, category: "Vegetables" },
      { name: "Pickles", price: 0.5, category: "Vegetables" },
      { name: "Jalapeños", price: 1, category: "Vegetables" },
      { name: "Fried Onions", price: 1.5, category: "Vegetables" },
    ],
    customizations: [
      {
        name: "Bun Type",
        options: [
          { name: "Regular Bun", price: 0 },
          { name: "Sesame Bun", price: 0.5 },
          { name: "Brioche Bun", price: 1.5 },
          { name: "Gluten-Free Bun", price: 2 },
        ],
      },
      {
        name: "Cooking Style",
        options: [
          { name: "Medium", price: 0 },
          { name: "Medium Rare", price: 0 },
          { name: "Well Done", price: 0 },
        ],
      },
    ],
  },
  {
    id: "pasta-carbonara",
    name: "Pasta Carbonara",
    description: "Creamy pasta with pancetta, eggs, parmesan, and black pepper",
    basePrice: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pasta",
    rating: 4.9,
    prepTime: "12-18 min",
    serves: 1,
    customizations: [
      {
        name: "Pasta Type",
        options: [
          { name: "Spaghetti", price: 0 },
          { name: "Fettuccine", price: 0 },
          { name: "Penne", price: 0 },
          { name: "Gluten-Free Pasta", price: 3 },
        ],
      },
      {
        name: "Protein",
        options: [
          { name: "Pancetta", price: 0 },
          { name: "Bacon", price: 1 },
          { name: "Grilled Chicken", price: 3 },
          { name: "No Protein", price: -2 },
        ],
      },
    ],
    toppings: [
      { name: "Extra Parmesan", price: 2, category: "Cheese" },
      { name: "Truffle Oil", price: 4, category: "Premium" },
      { name: "Black Pepper", price: 0, category: "Seasoning" },
      { name: "Fresh Herbs", price: 1, category: "Herbs" },
    ],
  },
]

const categories = ["All", "Pizza", "Burgers", "Pasta", "Salads", "Desserts"]

export default function CustomOrders() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [customization, setCustomization] = useState({
    size: "",
    toppings: [] as string[],
    customizations: {} as { [key: string]: string },
    specialInstructions: "",
    quantity: 1,
  })

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const calculateItemPrice = (
    item: MenuItem,
    size: string,
    toppings: string[],
    customizations: { [key: string]: string },
  ) => {
    let price = item.basePrice

    // Add size price
    if (size && item.sizes) {
      const sizeOption = item.sizes.find((s) => s.name === size)
      if (sizeOption) price += sizeOption.price
    }

    // Add toppings price
    if (item.toppings) {
      toppings.forEach((toppingName) => {
        const topping = item.toppings!.find((t) => t.name === toppingName)
        if (topping) price += topping.price
      })
    }

    // Add customizations price
    if (item.customizations) {
      Object.entries(customizations).forEach(([customName, optionName]) => {
        const custom = item.customizations!.find((c) => c.name === customName)
        if (custom) {
          const option = custom.options.find((o) => o.name === optionName)
          if (option) price += option.price
        }
      })
    }

    return price
  }

  const openCustomization = (item: MenuItem) => {
    setSelectedItem(item)
    setCustomization({
      size: item.sizes ? item.sizes[0].name : "",
      toppings: [],
      customizations: {},
      specialInstructions: "",
      quantity: 1,
    })
  }

  const addToCart = () => {
    if (!selectedItem) return

    const totalPrice =
      calculateItemPrice(selectedItem, customization.size, customization.toppings, customization.customizations) *
      customization.quantity

    const cartItem: CartItem = {
      id: `${selectedItem.id}-${Date.now()}`,
      menuItem: selectedItem,
      size: customization.size,
      toppings: customization.toppings,
      customizations: customization.customizations,
      specialInstructions: customization.specialInstructions,
      quantity: customization.quantity,
      totalPrice,
    }

    setCart([...cart, cartItem])
    setSelectedItem(null)
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0)
  }

  const handleToppingChange = (toppingName: string, checked: boolean) => {
    if (checked) {
      setCustomization((prev) => ({
        ...prev,
        toppings: [...prev.toppings, toppingName],
      }))
    } else {
      setCustomization((prev) => ({
        ...prev,
        toppings: prev.toppings.filter((t) => t !== toppingName),
      }))
    }
  }

  const handleCustomizationChange = (customName: string, optionName: string) => {
    setCustomization((prev) => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [customName]: optionName,
      },
    }))
  }

  return (
    <div className="min-h-screen  bg-white/50 backdrop-blur-3xl">
      {/* Header */}
      <div className="bg-white  shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between mt-52 items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Custom Orders</h1>
              <p className="text-gray-600 mt-1">Customize your perfect meal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                  <Star className="w-3 h-3 mr-1" />
                  {item.rating}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{item.name}</span>
                  <span className="text-lg font-bold text-green-600">${item.basePrice.toFixed(2)}</span>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.prepTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Serves {item.serves}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => openCustomization(item)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Customize & Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Customize {selectedItem?.name}</DialogTitle>
                      <DialogDescription>Make it exactly how you want it</DialogDescription>
                    </DialogHeader>

                    {selectedItem && (
                      <div className="space-y-6">
                        {/* Quantity */}
                        <div>
                          <Label className="text-base font-semibold">Quantity</Label>
                          <div className="flex items-center gap-3 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                setCustomization((prev) => ({
                                  ...prev,
                                  quantity: Math.max(1, prev.quantity - 1),
                                }))
                              }
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-lg font-semibold w-8 text-center">{customization.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                setCustomization((prev) => ({
                                  ...prev,
                                  quantity: prev.quantity + 1,
                                }))
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Size Selection */}
                        {selectedItem.sizes && (
                          <div>
                            <Label className="text-base font-semibold">Size</Label>
                            <RadioGroup
                              value={customization.size}
                              onValueChange={(value) =>
                                setCustomization((prev) => ({
                                  ...prev,
                                  size: value,
                                }))
                              }
                              className="mt-2"
                            >
                              {selectedItem.sizes.map((size) => (
                                <div key={size.name} className="flex items-center space-x-2">
                                  <RadioGroupItem value={size.name} id={size.name} />
                                  <Label htmlFor={size.name} className="flex-1 cursor-pointer">
                                    <div className="flex justify-between">
                                      <span>{size.name}</span>
                                      <span className="text-green-600 font-medium">
                                        {size.price > 0 ? `+$${size.price.toFixed(2)}` : "Free"}
                                      </span>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        )}

                        {/* Customizations */}
                        {selectedItem.customizations?.map((custom) => (
                          <div key={custom.name}>
                            <Label className="text-base font-semibold">{custom.name}</Label>
                            <RadioGroup
                              value={customization.customizations[custom.name] || ""}
                              onValueChange={(value) => handleCustomizationChange(custom.name, value)}
                              className="mt-2"
                            >
                              {custom.options.map((option) => (
                                <div key={option.name} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option.name} id={`${custom.name}-${option.name}`} />
                                  <Label htmlFor={`${custom.name}-${option.name}`} className="flex-1 cursor-pointer">
                                    <div className="flex justify-between">
                                      <span>{option.name}</span>
                                      <span className="text-green-600 font-medium">
                                        {option.price > 0
                                          ? `+$${option.price.toFixed(2)}`
                                          : option.price < 0
                                            ? `-$${Math.abs(option.price).toFixed(2)}`
                                            : "Free"}
                                      </span>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}

                        {/* Toppings */}
                        {selectedItem.toppings && (
                          <div>
                            <Label className="text-base font-semibold">Toppings</Label>
                            <div className="mt-2 space-y-2">
                              {selectedItem.toppings.map((topping) => (
                                <div key={topping.name} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={topping.name}
                                    checked={customization.toppings.includes(topping.name)}
                                    onCheckedChange={(checked) => handleToppingChange(topping.name, checked as boolean)}
                                  />
                                  <Label htmlFor={topping.name} className="flex-1 cursor-pointer">
                                    <div className="flex justify-between">
                                      <span>{topping.name}</span>
                                      <span className="text-green-600 font-medium">+${topping.price.toFixed(2)}</span>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Special Instructions */}
                        <div>
                          <Label htmlFor="instructions" className="text-base font-semibold">
                            Special Instructions
                          </Label>
                          <Textarea
                            id="instructions"
                            placeholder="Any special requests or dietary restrictions..."
                            value={customization.specialInstructions}
                            onChange={(e) =>
                              setCustomization((prev) => ({
                                ...prev,
                                specialInstructions: e.target.value,
                              }))
                            }
                            className="mt-2"
                          />
                        </div>

                        {/* Price Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total Price:</span>
                            <span className="text-green-600">
                              $
                              {(
                                calculateItemPrice(
                                  selectedItem,
                                  customization.size,
                                  customization.toppings,
                                  customization.customizations,
                                ) * customization.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Button onClick={addToCart} className="w-full" size="lg">
                          Add to Cart - $
                          {(
                            calculateItemPrice(
                              selectedItem,
                              customization.size,
                              customization.toppings,
                              customization.customizations,
                            ) * customization.quantity
                          ).toFixed(2)}
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
