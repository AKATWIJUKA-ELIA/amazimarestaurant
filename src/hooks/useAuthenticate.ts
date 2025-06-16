"use client"
import { AuthenticateUser } from "@/lib/actions";

const useAuthenticate = () => {
    const Authenticate = async (email: string | "",password:string) => {
      try {
              const response = await AuthenticateUser(email,password)
              const res = await response?.json();
        if(!res.success){
        return { success: false, message:res.message };
        }
        return { success: true, status: 201, message: 'Success' };
                } catch (error) {
                        return { success: false, status: 500, message: `Internal Server Error ${error}` };
                }
    };

  return {Authenticate };
};

export default useAuthenticate;