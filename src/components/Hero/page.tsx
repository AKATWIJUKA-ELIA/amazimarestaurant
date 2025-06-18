"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { MdOutlineFreeBreakfast ,MdLunchDining, } from 'react-icons/md';
import { VeganIcon,Salad, LucideVegan } from 'lucide-react';
import { GiFruitTree } from "react-icons/gi";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Link from 'next/link';
import { Oval } from 'react-loader-spinner';

interface Products {
        approved: boolean;
         product_cartegory: string;
         product_condition: string;
         product_description: string;
         product_image: string[];
         product_name: string;
         product_owner_id: string;
         product_price: string;
         _creationTime: number;
         _id: string;
       }


const MainHero = () => {
  const carousel1 = Autoplay({ delay: 9000 });
  const carousel = Autoplay({ delay: 10000 });
  const [products, setproducts] = useState<Products[]>([]);
  const images = [
                {
                name:"Break",
                icon:MdOutlineFreeBreakfast ,
                overlay:"Mid Year Sales Here 😊 "
                },
                {
                        name:"lunch",
                        icon:MdLunchDining,
                        overlay:"Grab May Discounts While Offers Last😁🤗"
                },
                {
                        name:"salads",
                        icon:Salad,
                        overlay:"Different Categories For Grabs😂😮"
                },
                {
                        name:"fruits",
                        icon:GiFruitTree ,
                        overlay:"Different Categories For Grabs😂😮"
                },
                  {
                        name:"vegan",
                        icon:VeganIcon,
                        overlay:"Grab May Discounts While Offers Last😁🤗"
                },
                
        ]
                        
  return (
        <div className= 'mt-[38%]   '  >

        {images && images.length > 0 ? (
                <Carousel opts={{align: "start",loop: true}} plugins={[carousel]} className=" mx-auto md:ml-5 w-[60%] md:w-[40%] md:left-16  bg-transparent  flex items-center justify-center   text-white text-xl font-semibold md:p-2">
        <CarouselContent className=''>
  {images.map((product, index) => (
    <CarouselItem key={index} className=" basis-[200px] md:basis-[100px] shrink-0">
      <div className="p-1 ">
        <Card className="h-auto  w-20 shadow-none bg-transparent  dark:bg-transparent ">
          <CardContent className="relative  bg-transparent flex  items-center justify-center p-6 h-20 w-20 overflow-hidden  ">
            {/* Image */}
            <div className='flex flex-col justify-center hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-400  p-2 rounded-2xl transition duration-200 hover:cursor-pointer shadow dark:shadow-xl    '>
                <Link href={`/category/${product.name}`} className='flex justify-center' >
              <div className='flex'>
                {<product.icon/>}
              </div>
            </Link>
            <div className='flex'>
                <h1 className='flex z-50'>{product.name}</h1>
            </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ))}
        </CarouselContent>
        <CarouselPrevious  className='bg-gray-500/50 dark:bg-gray-900 h-8 w-8 hover:cursor-pointer  rounded-lg shadow-md' />
        <CarouselNext  className='bg-gray-500/50 dark:bg-gray-900 h-8 w-8 hover:cursor-pointer  rounded-lg shadow-md'/>
        </Carousel>
        ):(
                <Carousel opts={{align: "start",loop: true}} plugins={[carousel]} className=" w-[60%] md:w-[50%] md:left-16  bg-transparent  flex items-center justify-center   text-white text-xl font-semibold md:p-2">
        <CarouselContent className=''>
  {Array.from({ length: 7 }).map((_, idx) => (
    <CarouselItem key={idx} className=" basis-[200px] md:basis-[200px] shrink-0">
      <Card className="  h-28 w-28  rounded-2xl  shadow-2xl">
          <CardContent className=" animate-pulse  flex rounded-lg   h-full w-full overflow-hidden ">
              <div className="flex  opacity-95 w-[100%] h-[100%]  items-center justify-center">
                        <div className="flex ">
                                <Oval
                                        visible={true}
                                        height="30"
                                        width="30"
                                        color="#0000FF"
                                        secondaryColor="#FFD700"
                                        ariaLabel="oval-loading"
                                        />
                        </div>
                                </div>
          </CardContent>
        </Card>
    </CarouselItem>
  ))}
        </CarouselContent>
        <CarouselPrevious className='bg-gray-500/50 h-8 w-8 hover:cursor-pointer  rounded-lg shadow-md' />
        <CarouselNext className='bg-gray-500/50 h-8 w-8 hover:cursor-pointer  rounded-lg shadow-md' />
        </Carousel>
        )}
 
        </div>
  )
}

export default MainHero