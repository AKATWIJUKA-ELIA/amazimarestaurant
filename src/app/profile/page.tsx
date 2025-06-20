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
    <div className=" mt-[8%]  p-5 mx-10 rounded-2xl bg-gray-300" >
        <AccountManagement />
    </div>
  )
}
export default Profile
