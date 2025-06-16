"use client"

import { useAppSelector } from "@/hooks"
import { useState } from "react"
import AccountManagement from "@/components/UserProfile/Profile"

const Profile=()=> {
        const User = useAppSelector((state)=>state.user.user)
   
        const [isopen, setisOpen] = useState(true);

        const toggleSidebar = () => {
          setisOpen(prev => !prev);
        };
  return (
    <div className=" mt-[8%]  px-5 mx-5 bg-gray-300" >
        <AccountManagement />
    </div>
  )
}
export default Profile
