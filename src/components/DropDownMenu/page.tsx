import React, {  useEffect, useState } from 'react';
import Link from "next/link";
import { BiX } from 'react-icons/bi';
import useGetCategories from '@/hooks/useGetCategories';
import { Oval } from 'react-loader-spinner';
import { ProductCategory } from '@/lib/types';

interface DropDownMenuProps {
  isvisible: boolean;
  onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ isvisible, onClose,  }) => {
        const [Categories, setCategories] = useState<ProductCategory[]>([])
        const {categories} = useGetCategories()

useEffect(()=>{
        if (categories && Array.isArray(categories)) {
                setCategories(categories)
        } else {
                setCategories([])
        }
}, [categories])

      if (!isvisible) return null;


  return (
      <>
        
        <div className="  fade-in  fixed z-40 inset-0 backdrop-blur-lg shadow-xl flex  w-[70%] md:w-[40%]  md:h-[60%]  mt-[42%] md:mt-[14.2%] rounded-br-3xl  overflow-auto overflow-x-hidden bg-white/85 dark:bg-dark " id="wrapper" onMouseLeave={onClose} >                  
                     
                     <div id="programs">
   
                           <div className='flex '>
                                 <button 
                                       style={{
                                       borderRadius: '50%',
                                       width: '30px',
                                       height: '30px',
                                       backgroundColor: 'black',
                                       borderColor:'black',
                                       color: 'white',
                                       fontSize: '20px',
                                       textAlign: 'center',
                                       lineHeight: '30px',
                                       position: 'absolute',
                                       right: '40px',
                                       top: '20px',
                                       }}
                                       onClick={onClose}>
                                       <span className="text-white text-xl"><BiX className='text-3xl'/></span>
                                 </button>
   
                           </div> 
   
                           <div  className='flex h-full' id="Categories">

                                <div className="ml-12   h-90 overflow-y-auto  "  > 
                                       <h1 className='font-bold dark:text-black text-2xl' > MENU</h1>
                                        <div className='grid grid-cols-2 gap-4' >
                                                {Categories.length > 0 ? (Categories.map((category, _id ) =>
                                                <div key={_id} className=" cursor-pointer mr-2  p-2 slider slide--fast dark:text-black hover:bg-gray-100 dark:hover:bg-gray-300 rounded-lg ">

                                                <Link href={`/category/${encodeURIComponent(category.title)}`}   onClick={onClose}>
                                                <h1   className='animated   main '  > <span id='main' className='animated current   '>{category.title}</span></h1>
                                                </Link>
                                                </div>
                                        )):(<div className="vertical-line ml-2  fade-in "  >
                                                <Oval
                                                        visible={true}
                                                        height="30"
                                                        width="30"
                                                        color="#0000FF"
                                                        secondaryColor="#FFD700"
                                                        ariaLabel="oval-loading"/>
                                                 Loading . . .  </div>)}
                                        </div>
                                
                                
                                </div>

                        </div>  
                     
                     </div>
                     
               </div>
      </>
      
  );
};

export default DropDownMenu;