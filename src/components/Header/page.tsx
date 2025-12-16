'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { BsList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
import DropDownMenu from '../DropDownMenu/page';
import Link from 'next/link';
import { useAppSelector } from '@/hooks';
import { Input } from '../ui/input';
import SearchModel from '../SearchModel/page';
import { BiX } from 'react-icons/bi';
import { Carousel, CarouselContent, } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { usePathname } from 'next/navigation';
import {useData} from  '../../app/DataContext';
import useGetAllProducts from '@/hooks/useGetAllProducts';
import { Product } from '@/lib/types';


const Header = () => {
         const {data} = useData()
           const { data: products,  } = useGetAllProducts()
        const cartitem = useAppSelector(state => state.cart.items);
        const Cart = cartitem?.reduce((total, item) => total + (item.quantity || 0), 0)
        const [Hovered,setHovered] = useState(false)
        const [sticky, setSticky] = useState(false);
        const [Focused, setFocused] = useState(false)
         const [showlowerBar, setshowlowerBar] = useState(true)
        const [searchTerm, setSearchTerm] = useState('');
        
        const [filteredProducts, setFilteredProducts] = useState<Product []>([]);
        const carousel = Autoplay({ delay: 6000})

        // const truncateString = (text: string, maxLength: number): string => {
        //         return text.length > maxLength ? text.slice(0, maxLength) + " . . ." : text;
        //       };
        const pathname = usePathname()
        useEffect(()=>{
                if(pathname ==="/sign-up" || pathname === "/sign-in" || pathname==="/cart" || pathname === "/profile" || pathname.includes("administrator")){
                        setshowlowerBar(false)
                }
                else{
                        setshowlowerBar(true)
                }
        },[pathname])

        // console.log(pathname)
        const showDropDownMenu=()=>{
                setHovered(true)
        }
        const forceBlur = () => {
                document.getElementById("inputsearch")?.blur();
              };
        const HandleClose =()=>{
                setSearchTerm("")
                setFocused(false)
                forceBlur()
        }
        

  
        useEffect(() => {
                const results = products?.filter((product) =>
                  product.category.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if(results && results.length>0){
                        setFilteredProducts(results);
                }else
                setFilteredProducts([]);
              }, [searchTerm, products]);


        const handleStickyNavbar = () => {
                if (window.scrollY >= 100) {
                  setSticky(true);
                } else {
                  setSticky(false);
                }
              };
              useEffect(() => {
                window.addEventListener("scroll", handleStickyNavbar);
                return () => {
                  window.removeEventListener("scroll", handleStickyNavbar);
                };
              }, []); 
        //         flex    border border-gray-300 
  return (
    <>
    <div className={` fixed  top-0 left-0 z-40 flex flex-col py-3 w-full  bg-white/70 opacity-95 text-black gap-1 dark:bg-gray-900 dark:text-white
            ${sticky ? "bg-transparent  !fixed !z-[9999] ! bg-opacity-100 shadow-sticky backdrop-blur-lg  fades-in transition ": "absolute" }`
      }>
        <div className='flex w-[100%] gap-18  ' >
                <div className='flex gap-6 md:ml-20   w-[70%] ' >
                        <div className='flex rounded-md   md:w-[40%]'>
                                <div className=' mx-auto  ' >
                                        <Link href="/">
                                <Image className='rounded-md h-16 w-64' src="/images/Logo1.png" alt='logo' width='200' height="100">
                                </Image>
                                </Link>
                                </div>
                        </div>

                        <div className='hidden mt-2 md:flex w-[90%] p-auto '>
                                <Input value={searchTerm}
                                id='inputsearch'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                 onFocus={()=>{setFocused(true)}}
                                 type="text"
                                  className=' flex p-5 h-10 rounded-full border   border-gray-500 w-[100%] dark:bg-black dark:text-white ' 
                                  placeholder='Search Categories & product names'  />
                                  { searchTerm.length>1 && (<BiX onClick={HandleClose} className="absolute hover:cursor-pointer border top-[16%] right-[41%]  bg-gray-100 text-dark text-3xl   rounded-lg"/>)}
                        </div>

                        <div className='hidden md:flex gap-6  items-center text-2xl font-bold  ' >

                                <Link href="/offer">
                                        <h1 className="hidden md:flex whitespace-nowrap overflow-hidden text-ellipsis  ">Offers</h1>
                                </Link>
                                <Link href="/about">
                                        <h1 className="hidden md:flex whitespace-nowrap overflow-hidden text-ellipsis  ">About</h1>
                                </Link>
                        </div>

                </div>

                <div className='flex gap-8 ml-2 mr-4  md:ml-10  '>
                        <div className='flex gap-4  items-center ' >
                       
                        </div>
                        <div className="flex items-center gap-2 py-1 hover:cursor-pointer">

                        {data && data.User?.name? (
                                <div className='flex' >
                                        <div className="hidden lg:flex  bg-white dark:text-gray-900 hover:bg-gray-200 transition duration-100 border border-gray-300 rounded-3xl">
                                                <div className='flex mt-1 font-sans dark:text-dark px-2 '>
                                                        <Link href="/profile" className='flex font-bold   ' >
                                                        {data?.User?.name}
                                                        </Link>
                                                </div>
                                                <div className='flex rounded-full' >
                                                        <Image src={"/images/images.png"} width={35} height={35} alt='profile picture' className="rounded-full" />
                                                </div>
                                        </div>
                                        {/* For small screens */}
                                        <div className="flex lg:hidden ">
                                                <Link href="/sign-in" className='flex ' >
                                                 <Image src={"/images/images.png"} width={100} height={50} alt='profile picture' className="rounded-full" />
                                                </Link>
                                        </div>

                                </div> ):(
                                <div>
                                        <div className="hidden md:flex items-center gap-1">
                                                <Link href="/sign-in" className='flex gap-3' >
                                                <VscAccount className="text-2xl" />
                                                <h1>Sign in</h1>
                                                </Link>
                                                {/* <SignInButton mode="modal"  /> */}
                                        </div>

                                        <div className="flex md:hidden items-center gap-1">
                                                <Link href="/sign-in" className='flex gap-3' >
                                                <button className="p-2 rounded bg-transparent ">
                                                <VscAccount className="text-2xl" />
                                                </button>
                                        </Link>
                                        </div>
                                </div>
                        )}
                        </div>
                        <Link href="/cart" className="flex items-center gap-2 relative group hover:cursor-pointer">
                                <div className="relative">
                                <CiShoppingCart className="text-2xl font-bold" />
                                {Cart ? (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {Cart}
                                </span>
                                ) : null}
                                </div>
                                <h1 className="font-bold hidden md:flex  ">Cart</h1>
                        </Link>
                </div>
        </div>
        <Separator className='dark:bg-black'/>
        
        {showlowerBar ? (
           <>
           <div className='flex md:hidden  w-[100%] p-auto '>
        <Input value={searchTerm}
                                id='inputsearchmobile'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                 onFocus={()=>{setFocused(true)}}
                                 type="text"
                                  className='flex p-5 h-10 rounded-full border border-gray-600 w-[100%]' 
                                  placeholder='Search Categories & product names'  />
                                  { searchTerm.length>1 && (<BiX onClick={HandleClose} className="absolute border right-8  bg-gray-100 text-dark text-3xl   rounded-lg"/>)}
        </div>

        <div className='flex ml-5  h-30 items-center md:ml-32  ' >
                
        <div className=' hidden md:flex items-center flex-nowrap gap-4 ' >
                <div className=' gap-6  items-center text-2xl font-bold ' onMouseOver={()=>showDropDownMenu()} >
                                <Link href="/menu" className='flex gap-2 items-center ' >
                                <BsList  />
                                        <h1 className="hidden md:flex whitespace-nowrap overflow-hidden text-ellipsis">Our Menu</h1>
                                </Link>
                                
                </div>
                <div className='flex gap-6 ml-5 items-center ' >
                        <div className='flex ' >
                                        <h1 className='flex text-3xl font-semibold'>
                                                Feeling Hungry ? 
                                        </h1>
                        </div>
                        <div className='flex flex-col hover:cursor-pointer' >
                                <h1 className=' text-3xl font-extrabold' >
                                        <Link href="/order" >
                                        PLACE YOUR ODER NOW
                                        </Link>
                                </h1>
                                <h1 className=' flex text-center dark:text-white text-gray-900 '>
                                Deliveries are now Available around Kampala
                                </h1>
                        </div>
                </div>
        </div >

        
<div className='hidden md:flex ml-5 gap-14'>
  {data  ? (
   <div>

   </div>
  ) : (
    Array.from({ length: 4 }).map((_, idx) => (
      <div
        key={idx}
        className=" cursor-pointer rounded-xl p-2 bg-gray-200 dark:bg-gray-700 animate-pulse w-24 h-6 my-1"
      />
    ))
  )}
</div>


              <div className="flex md:hidden ml-3 w-[27%] h-8  bg-gray-100 dark:bg-transparent rounded-lg items-center justify-center p-1 overflow-hidden">
                        <Carousel
                        opts={{ align: "start", loop: true }}
                        plugins={[carousel]}
                        className="w-full max-w-full h-6 "
                        >
                        <CarouselContent className="w-full">
                        { data ? (
                                <div></div>
                        ):(
                                <div className='animate-pulse' />
                        )}
                        </CarouselContent>
                        </Carousel>
                </div>

        </div>
           </>     
        ):(<div>
 
        </div>) }
       


    </div>
    <DropDownMenu isvisible={Hovered} onClose={() => setHovered(false)} />
   {  searchTerm.length>1 ? (<SearchModel Focused={Focused} products={filteredProducts ||[]} onClose={HandleClose} />):("")}
  {/*    {  UserDrawer ? (<UserModel  onClose={HandleClose} />):("")} */}
    </>
  )
}

export default Header