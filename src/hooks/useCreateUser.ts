import { NextResponse } from "next/server";
import { CreateUser } from "@/lib/actions";
interface user {
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,

}
const useCreateUser = () => {

        const createUser = async (User:user) =>{
                try{
                const res = await CreateUser(User.username, User.email, User.passwordHash, User.phoneNumber);
                
                 if(!res?.success){
                        return NextResponse.json({ success: false, message: res?.message }, { status: 400 });
                }
                return NextResponse.json({ success: true, message:res?.message }, { status: 200 });
                }catch(error){
                        return NextResponse.json( { success: false, message: `${error}Unexpected Error try Again later` });
                        
                }
        }
        return { createUser };
 }
 export default useCreateUser;