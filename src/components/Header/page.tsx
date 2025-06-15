'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { BsList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
// import DropDownMenu from '../DropDownMenu/page';
// import ImageSearchModal from '../ImageSearchModal/page';
import Link from 'next/link';
import { useAppSelector } from '@/hooks';
import { Input } from '../ui/input';
// import SearchModel from '../SearchModel/page';
import { BiX } from 'react-icons/bi';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { usePathname } from 'next/navigation';
import { MdPhotoCamera } from "react-icons/md";
// import UserModel from '../UserModel/page';
// import {useData} from  '../../app/DataContext';
// import useGenerateEmbeddings from '@/hooks/useGenerateEmbeddings';
// import useVectorSearch from '@/hooks/useVectorSearch';

const Header = () => {
        const data:any[] = []
        const cartitem = useAppSelector(state => state.cart.items);
        const User = useAppSelector(state =>state.user.user)
        const Cart = cartitem?.reduce((total, item) => total + (item.quantity || 0), 0)
        const [Hovered,setHovered] = useState(false)
        const [sticky, setSticky] = useState(false);
        const [Focused, setFocused] = useState(false)
         const [showlowerBar, setshowlowerBar] = useState(true)
        const [searchTerm, setSearchTerm] = useState('');
        const [showImageModal, setShowImageModal] = useState(false);
        // const [filteredProducts, setFilteredProducts] = useState(data.Products.product || []);
        const [UserDrawer, setUserDrawer] = useState(false);
        
        // console.log("Data from DataContext :",data.Products)
        // const {Embed} = useGenerateEmbeddings();
        // const vectorSearchHook = useVectorSearch();
        // const vectorSearch = vectorSearchHook?.vectorSearch;

        const [comingSoon, setcomingSoon] = useState(false)
        const carousel = Autoplay({ delay: 6000})

        const truncateString = (text: string, maxLength: number): string => {
                return text.length > maxLength ? text.slice(0, maxLength) + " . . ." : text;
              };
        const pathname = usePathname()
        useEffect(()=>{
                if(pathname ==="/sign-up" || pathname === "/sign-in" || pathname === "/profile" || pathname.includes("administrator")){
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
                setShowImageModal(false)
                setUserDrawer(false)
        }
        const HandleComing = ()=>{
                setcomingSoon(true)
        }

        const handleImageSearch = () =>{
                setShowImageModal(true)
        }
        // useEffect(() => {
        //         const results = data.Products.product?.filter((product) =>
        //           product.product_cartegory.toLowerCase().includes(searchTerm.toLowerCase())
        //         );
        //         if(results && results.length>0){
        //                 setFilteredProducts(results);
        //         }else
        //         setFilteredProducts([]);
                //  ============================================================
                // VECTOR SEARCH IMPLEMENTATIOIN
                // =============================================================
                // const Search = async (search:string)=>{
                //         // console.log("Searchresults :" , search)
                //         const results = await Embed(search)
                //         // console.log(results)
                //         if(!results.success){
                //                 setFilteredProducts([])
                //                 return
                //         }
                //         const data = results.data
                //         if (vectorSearch) {
                //                const searchResults = await vectorSearch(data??[]);
                //                setFilteredProducts(searchResults)
                //         }

                // }
                // Search(searchTerm)
                //  ============================================================
                // VECTOR SEARCH IMPLEMENTATIOIN
                // =============================================================
                
        //       }, [searchTerm, data.Products.product]);


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
    <div className={` fixed  top-0 left-0 z-40 flex flex-col py-3 w-full  bg-white/90 opacity-95 text-black gap-1 dark:bg-dark dark:text-white
            ${sticky ? "bg-transparent  !fixed !z-[9999] ! bg-opacity-100 shadow-sticky backdrop-blur-lg fade-in !transition ": "absolute" }`
      }>
        <div className='flex w-[100%] gap-18 ' >
                <div className='flex gap-12 w-[60%]' >
                        <div className='flex rounded-md ml-5'>
                                <Link href="/">
                                <Image className='rounded-md h-10' src="/images/Logo1.png" alt='logo' width='200' height="100">
                                </Image>
                                </Link>
                        </div>

                        <div className='hidden md:flex w-[100%] p-auto '>
                                <Input value={searchTerm}
                                id='inputsearch'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                 onFocus={()=>{setFocused(true)}}
                                 type="text"
                                  className=' flex p-5 h-10 rounded-full border   border-gray-500 w-[100%] dark:bg-black dark:text-white ' 
                                  placeholder='Search Categories & product names'  />
                                  { searchTerm.length>1 ? (<BiX onClick={HandleClose} className="absolute hover:cursor-pointer border top-[16%] right-[41%]  bg-gray-100 text-dark text-3xl   rounded-lg"/>):(<MdPhotoCamera onClick={handleImageSearch}  className="absolute hover:cursor-pointer top-[16%]   right-[41%]  bg-gray-100 text-black/70 dark:text-white/70 dark:bg-transparent text-3xl " />)}
                        </div>
                </div>

                <div className='flex gap-4 md:gap-8 ml-10 '>
                        <div className='flex gap-4  items-center ' >
                        <div className='flex hover:cursor-pointer' onMouseEnter={HandleComing} onMouseLeave={()=>setcomingSoon(false)} > {comingSoon
                        ?(<h1 className=" hidden md:flex whitespace-nowrap text-gold font-bold overflow-hidden text-ellipsis">Coming Soon</h1>)
                        :(<h1 className=" hidden md:flex whitespace-nowrap overflow-hidden text-ellipsis">Mobile App</h1>)}
                        </div>
                        {/* <div className='flex hover:cursor-pointer ' >EN /UG.</div> */}
                        </div>
                        <div className="flex items-center gap-2 py-1 hover:cursor-pointer">
                        {/* <SignedIn>
                        <div className="hidden lg:block bg-white rounded-3xl">
                        <UserButton showName  />
                        </div>

                        For small screens
                        <div className="block lg:hidden">
                        <UserButton />
                        </div>
                        <Link href="/profile">
                        <button >
                        Dashboard
                        </button>
                        </Link>
                        
                        </SignedIn> */}

                        {User ? (
                                <div className='flex' >
                                        <div className="hidden lg:flex  bg-white hover:bg-gray-200 transition duration-100 border border-gray-300 rounded-3xl">
                                                <div className='flex mt-1 font-sans dark:text-dark px-2 ' onClick={()=>setUserDrawer(true)} >
                                                        {User.Username}
                                                </div>
                                                <div className='flex rounded-full' >
                                                        <Image src={User.profilePicture?User.profilePicture:"/images/images.png"} width={35} height={35} alt='profile picture' className="rounded-full" />
                                                </div>
                                        </div>
                                        {/* For small screens */}
                                        <div className="flex lg:hidden ">
                                                <Link href="/sign-in" className='flex ' >
                                                 <Image src={User.profilePicture?User.profilePicture:"/images/images.png"} width={100} height={50} alt='profile picture' className="rounded-full" />
                                                </Link>
                                        </div>

                                        <Link href="/profile" className='flex p-1'>
                                        <button >
                                        Dashboard
                                        </button>
                                        </Link>
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

                        {/* <SignedOut>
                        <div className="hidden md:flex items-center gap-1">
                        <VscAccount className="text-2xl" />
                        <SignInButton mode="modal"  />
                        </div>
                        <div className="flex md:hidden items-center gap-1">
                        
                        <SignInButton mode="modal"  >
                        <button className="p-2 rounded bg-transparent ">
                        Replace this with an icon or keep it empty for no text
                        <VscAccount className="text-2xl" />
                        </button>
                        </SignInButton>
                        </div>
                        </SignedOut> */}
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
                                  { searchTerm.length>1 ? (<BiX onClick={HandleClose} className="absolute border right-8  bg-gray-100 text-dark text-3xl   rounded-lg"/>):(<MdPhotoCamera onClick={handleImageSearch}  className="absolute hover:cursor-pointer top-[45%]   right-12  bg-gray-100 text-black/70 dark:text-white/70 dark:bg-transparent text-3xl " />)}
        </div>

        <div className='flex ml-5  md:ml-32  ' >
                
        <div className='flex flex-nowrap gap-4 ' >
                <div className='flex rounded-xl   p-1 bg-gray-100 hover:cursor-pointer hover:bg-gray-100 gap-2 dark:bg-transparent dark:hover:bg-gray-700'   onMouseOver={showDropDownMenu} >
                         <BsList className=' font-bold text-2xl ' /> <h1 className='flex '>Categories</h1>
                </div  >
                <div className='flex rounded-full   p-2   hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' onMouseOver={() => setHovered(false)} >
                        <Link className='hidden md:flex' href="/post" >Sell Something?</Link>
                        <Link className='flex md:hidden' href="/post" >sell ?</Link>
                </div>
        </div >

        
<div className='hidden md:flex ml-5 gap-14'>
  {data && data.length>0 ? (
   <div>

   </div>
  ) : (
    Array.from({ length: 7 }).map((_, idx) => (
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
    {/* {  searchTerm.length>1 ? (<SearchModel Focused={Focused} products={filteredProducts ||[]} onClose={HandleClose} />):("")}
    {  UserDrawer ? (<UserModel  onClose={HandleClose} />):("")} */}
    </>
  )
}

export default Header