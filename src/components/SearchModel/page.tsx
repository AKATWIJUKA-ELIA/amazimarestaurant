import React from 'react';
import Link from "next/link";
import { BiSearch } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';

interface Product {
        _id: string;
        product_name: string;
        product_cartegory: string;
        // Add other fields as needed
      }

interface SearchModel {
  onClose: () => void;
  products:Product[];
  Focused:boolean
}


const SearchModel: React.FC<SearchModel> = ({ onClose,products,Focused  }) => {

        if (!Focused) return null;

  return (
        <div className="  fade-in-15  fixed md:mx-auto z-50 inset-0 backdrop-blur-lg shadow-2xl/40  flex  md:w-[100%] h-[50%] mt-[38%] md:mt-[14.1406245%]   overflow-auto overflow-x-hidden bg-slate-100/60 dark:bg-dark dark:shadow-gray-800 " onMouseLeave={onClose} >                  
                     
        <div className=" mx-auto px-5  fade-in w-full gap-4"  > 
                        <div className='flex'>
                                <h1 className='font-bold'>
                                        Related Searches
                                </h1>
                        </div>
                <div className='flex flex-col w-full '>
                {products && products.length>0 ? (
                        products.map((product) => (
                                <Link key={product._id} href={`/category/${encodeURIComponent(String(product.product_cartegory))}`} onClick={onClose}  className='flex gap-2' >
                        <div className="flex cursor-pointer w-full rounded-lg mr-2 p-2  slider slide--fast hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                                <h1 className=" flex  animated main">
                                <span id="main" className="animated current">
                                {product.product_name }
                                </span>
                                </h1>
                                <BiSearch className='flex  mt-2 text-2xl md:ml-[80%]'/>
                        </div>
                        </Link>
                        ))
                        ) : (
                                <div className="flex gap-4 h-full">
                                        <Oval
                                        visible={true}
                                        height="40"
                                        width="40"
                                        color="#0000FF"
                                        secondaryColor="#FFD700"
                                        ariaLabel="oval-loading"
                                />
                                Loading . . .
                                </div>
                        // <div className="vertical-line ml-2 fade-in"><h1 className='text-black dark:text-white' >  Sorry!!!, we could&apos;nt find any results for your search. . .</h1></div>

                        )}
                </div>


                </div>
       </div>
      
  );
};

export default SearchModel;