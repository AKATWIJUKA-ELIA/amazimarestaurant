"use client";
import { SubscribeToNewsletter } from "@/lib/actions";

type SaveResult ={
        success: boolean;
        message?: string;
        status?: number;
}

const useAddEmail = () => {

  const save = async (email: string): Promise<SaveResult> => {
 
      const addEmail = await SubscribeToNewsletter(email);
        if (!addEmail.success) {
          return { success: false, message: addEmail.message, status: addEmail.status };
        }
        return { success: true, message: "Email added successfully", status: 200 };
      }
        return { save };
    
};
export default useAddEmail;

