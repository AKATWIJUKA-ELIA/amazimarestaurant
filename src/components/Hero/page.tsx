"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';
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
                name:"Heror",
                src:"https://cheery-cod-687.convex.cloud/api/storage/115cc2cd-79c0-4b3c-bb84-86df5f76e138",
                overlay:"Mid Year Sales Here 😊 "
                },
                {
                        name:"Hero1",
                        src:"https://cheery-cod-687.convex.cloud/api/storage/55199998-af85-4493-af98-d8c3aff3d8dd",
                        overlay:"Grab May Discounts While Offers Last😁🤗"
                },
                {
                        name:"Heror",
                        src:"https://cheery-cod-687.convex.cloud/api/storage/55199998-af85-4493-af98-d8c3aff3d8dd",
                        overlay:"Different Categories For Grabs😂😮"
                },
                {
                        name:"Heror",
                        src:"https://cheery-cod-687.convex.cloud/api/storage/55199998-af85-4493-af98-d8c3aff3d8dd",
                        overlay:"Different Categories For Grabs😂😮"
                },
                  {
                        name:"Hero1",
                        src:"https://cheery-cod-687.convex.cloud/api/storage/55199998-af85-4493-af98-d8c3aff3d8dd",
                        overlay:"Grab May Discounts While Offers Last😁🤗"
                },
                
        ]
                        
  return (
        <div className= 'mt-[20%] md:-mt-10  '  >

        {images && images.length > 0 ? (
                <Carousel opts={{align: "start",loop: true}} plugins={[carousel]} className=" w-[60%] md:w-[50%] md:left-16  bg-transparent  flex items-center justify-center   text-white text-xl font-semibold md:p-2">
        <CarouselContent className=''>
  {images.map((product, index) => (
    <CarouselItem key={index} className=" basis-[200px] md:basis-[200px] shrink-0">
      <div className="p-1">
        <Card className="h-auto bg-transparent w-full">
          <CardContent className="relative  bg-transparent flex rounded-lg items-center justify-center p-6 h-36 overflow-hidden w-full">
            {/* Image */}
            <Link href={`/category/${product.name}`} >
              <Image
                src={product.src ?? ""}
                //       height={100}
                //       width={450}
                alt={product.name}
                fill
                className='object-cover w-full h-full rounded-lg '
              />

              {/* Text Overlay */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 text-white text-xl font-semibold p-4">
                {product.name}
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ))}
        </CarouselContent>
        <CarouselPrevious  className='bg-gray-500/50 h-8 w-8 hover:cursor-pointer  rounded-lg shadow-md' />
        <CarouselNext  className='bg-gray-500/50 h-8 w-8 hover:cursor-pointer  rounded-lg shadow-md'/>
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