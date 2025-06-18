import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center  h-screen gap-4 bg-gray-100/50">
      <div className="flex flex-col gap-4 " >
        <h1 className="text-6xl  text-red-600 font-extrabold ">404 - Page Not Found</h1>
      <p className="mt-4 font-semibold text-2xl font-sans text-center text-gray-600"> Sorry, The page you are looking for does not exist.</p>
      </div>
    <Link href="/" >
    <div className="flex mt-5 " >
          <Button className=" hover:cursor-pointer" >
               <Home/> Go  Home
      </Button>
    </div>
    </Link>
    </div>
  );
}