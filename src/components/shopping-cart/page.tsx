"use client"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/hooks"
import { Oval } from 'react-loader-spinner'
import useReduceCart from "@/hooks/useReduceCart"
import useIncreaseCart from "@/hooks/useIncreaseCart"
import useDeleteCart from "@/hooks/useDeleteCart"
import useGetProductsByIds from "@/hooks/useGetProductsByIds";
import Link from "next/link"
import { useEffect, useState } from "react"
import { Product } from "@/lib/types"


const ShoppingCart= ()=> {
        const cart = useAppSelector((state) => state.cart.items);
        const ReduceCart = useReduceCart()
        const IncreaseCart = useIncreaseCart()
        const Delete = useDeleteCart()
        const itemCount = cart?.reduce((total, item) => total + (item.quantity || 0), 0)
        const[Copied,setCopied] = useState(false)

        // console.log("Cart is ", cart)
        const productIds = cart.map((item) => item.product_id);
        // console.log("product ids", productIds)
        const { data: products, loading: isLoading } = useGetProductsByIds(productIds.flatMap(id=>id));
        const [loading,setLoading] = useState(isLoading)
        // console.log("Products : ",products)
        useEffect(() => {
                if (cart.length === 0 ||cart.length > 0) {
                        setLoading(false);
                }
        }, [cart]);
        
        const itemQuantity = (id: string) => {
                const item = cart.find((item) => item.product_id === id);
                return item ? item.quantity : 0; // Return 0 if not found
            };

        const Product = (products: Product[]) => {
                return products.map((p) => ({
                    ...p, // Spread the existing product fields
                    total: Number(p.price) * itemQuantity(p.id) // Add total field
                }));
            };
        const validProducts = products.filter((p) => p !== null);
        const NewProduct = Product(validProducts)

        const subtotal = () => {
                return NewProduct.reduce((total, product) => total + (product.total || 0), 0);
            };
        // Retrieve the Quantity of individual Products
        const HandleQuantity = (id:string)=>{
                const CartQuantity = cart.map((item) => item.product_id === id ? item.quantity:"")
                return CartQuantity
        }

          const handleCopy = (link:string) => {
        if (typeof window === "undefined"){
                return
        }
                navigator.clipboard.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              
                
      };

      const handleShare = (link: string,name:string) => {
        if (navigator.share) {
          navigator
            .share({
              title: `"Check out  ${name} on ShopCheap!`,
              text: "Hey, take a look at this:",
              url: link,
            })
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.error("Error sharing", error));
        } else {
                handleCopy(link)
                alert("Sharing not supported on this device. Try copying the link instead.");
        }
      };




  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-4  ">
      <div className="lg:w-3/4 bg-slate-100 p-6 rounded border border-gray-200 dark:bg-gray-800 dark:border-gray-800 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <span className="text-right hidden md:flex">Price</span>
        </div>
        <Separator className="mb-6" />

        
        {cart.length === 0 ?(
                <div className="text-center text-gray-500">Your cart is empty</div>
        ):loading ? (
                <Oval
                                            visible={true}
                                            height="80"
                                            width="80"
                                            color="#0000FF"
                                            secondaryColor="#ddd"
                                            ariaLabel="oval-loading"
                                            wrapperStyle={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100vh",
                                            }}
                                            wrapperClass=""
                                            />
            ): (NewProduct.map((item) => (
          <div key={item.id} className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 w-32 h-32">
              <Link href={`/product/${item.id}`}>
              <Image
                src={item.image || "/placeholder.svg?height=150&width=150"} 
                alt={item.title}
                width={150}
                height={150}
                className="object-contain"
                />
              </Link>
              </div>

              <div className="flex-grow">
                <h2 className="text-lg font-medium">{item.title}</h2>
                {/* <p className="text-sm text-green-600 mt-1">{"In Stock" : "Out of Stock"}</p> */}

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                      onClick={() => ReduceCart(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center">{HandleQuantity(item.id)}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                      onClick={() => IncreaseCart(item.id)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button className="text-sm text-blue-500 hover:underline" onClick={() => Delete(item.id)}>
                    Delete
                  </button>

                  {/* <span className="text-sm text-blue-500 hover:underline cursor-pointer">Save for later</span> */}

                  {/* <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                    Compare with similar items
                  </span> */}

                  <span className="text-sm text-blue-500 hover:underline cursor-pointer" onClick={() => handleShare(`https://shopcheap.vercel.app/product/${item.id}`,`${item.title}`)} >{Copied?"Link copied successfully":"Share "}</span>
                </div>
              </div>

              <div className="text-right font-bold md:w-24">Shs:{item.total}</div>
            </div>
          </div>
        )))}

        <div className="text-right text-lg font-bold">
          Subtotal 
          ({itemCount} items): Shs:{subtotal().toFixed(2)}
        </div>
      </div>

      <div className="lg:w-1/4">
        <div className="bg-white p-4 rounded border border-gray-200 mb-6 dark:bg-gray-500 dark:border-gray-500">
          <div className="text-lg font-bold mb-4">
            Subtotal
             ({itemCount} items) Shs:{subtotal().toFixed(2)}
          </div>

          <Button className="w-full bg-gold border hover:bg-yellow-500 text-dark font-medium rounded-full">
            Proceed to checkout
          </Button>
        </div>

        <div className="bg-white p-4 rounded border border-gray-200 dark:bg-gray-500 dark:border-gray-500 ">
          <h2 className="text-lg font-bold mb-4">New international customers purchased</h2>

          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="w-24 h-24 flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="FUJIFILM Instax Mini"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-blue-500 hover:underline cursor-pointer">FUJIFILM Instax Mini...</p>
                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                <p className="text-xs">106,453</p>
                <div>
                  <span className="text-red-600">-30%</span>
                  <span className="text-lg font-bold ml-1">
                    $14<sup>74</sup>
                  </span>
                </div>
                <p className="text-xs">($0.74/Count)</p>
                <p className="text-xs">List: $20.99</p>
                <p className="text-xs">Get it Apr 23 - May 6</p>
                <button className="text-xs text-blue-500 hover:underline mt-1">See all buying options</button>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <div className="w-24 h-24 flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Pokemon TCG"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-blue-500 hover:underline cursor-pointer">Pokemon TCG: Scarlet...</p>
                <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                <p className="text-xs">396</p>
                <div>
                  <span className="text-lg font-bold">
                    $169<sup>99</sup>
                  </span>
                </div>
                <p className="text-xs">Get it as soon as Tuesday, Apr 22</p>
                <p className="text-xs">$50.41 shipping</p>
                <button className="text-xs bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full px-3 py-1 mt-1">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShoppingCart;