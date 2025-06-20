import React, { useState } from "react";
import Image from "next/image";
import { Oval } from 'react-loader-spinner'
import useAddToCart from '../../hooks/useAddToCart';
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/lib/types";



interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
        const[Copied,setCopied] = useState(false)
  const HandleAddToCart = useAddToCart();

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
    <div className="flex flex-col lg:flex-row gap-2 bg-transparent  mt-5 md:mt-10 shadow-md overflow-hidden p-4 dark:bg-dark ">
      
      {/* Product Image */}
      <div className="flex flex-col md:flex-row-reverse  justify-center   md:w-[40%] gap-1   shadow-md">
        
        {product ? (<Card className=" w-[78%] h-[75%] bg-transparent ">
          <CardContent className=" relative bg-transparent rounded-3xl flex items-center justify-center h-auto overflow-hidden ">
            {/* Image */}
            <Image
              src={product.image}
              alt={product.title}
             width={300}
             height={300}
             className=' w-full h-full '
            />

            {/* Text Overlay */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 text-white text-xl font-semibold p-4">
              {product.title}
            </div>
          </CardContent>
        </Card>):(
                <Oval
                  visible={true}
                  height="40"
                  width="40"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                />
        )}

      </div>

      {/* Product Details */}
      <div className="flex flex-col w-full lg:w-2/5 md:mt-7  shadow-md rounded-lg p-4 space-y-4 dark:bg-gray-700">

        <div className="">
          <span className="text-4xl md:text-5xl font-bold">Ugx: {(product.price|| 0).toLocaleString()}</span>
          <span className="text-3xl font-semi-bold text-gray-500 line-through italic">Ugx: { product.price*3}</span>
        </div>

        <div>
          <h1 className="text-gray-600 font-bold dark:text-black ">Product Details:</h1>
          <p className="text-sm text-gray-800 dark:text-white ">{product.description}</p>
        </div>

        <div className="flex flex-col w-full   shadow-md rounded-lg p-4 space-y-4 dark:bg-gray-700">
        <h2 className="text-3xl  font-semibold text-gray-900">
          {product.title}
        </h2>


        <div className="flex  space-x-2">
                <button
          onClick={() => HandleAddToCart(product)}
          className="bg-gold text-white w-full px-4 py-2 rounded-3xl bg-gray-500 hover:bg-yellow-500 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={() => handleShare(`https://shopcheap.vercel.app/product/${product.id}`,`${product.title}`)}
          className=" text-black border border-black w-full px-4 py-2 rounded-3xl hover:border-blue-600 hover:text-white hover:bg-blue-700 transition"
        >
          {Copied?"Link copied successfully":"Share "}
        </button>
        </div>

      </div>

      </div>


    </div>
  );
};

export default ProductCard;
