import { createSessionClient } from "@/lib/appwrite";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request:NextRequest) {
 
        const { account } =  await createSessionClient(request);
        try{
        const user = await account.get();
        return NextResponse.json({ success: true, user,message:"Success" }, { status: 200 });
        }catch(error) {
                console.error("Error fetching current user:", error);
                return NextResponse.json({ success: false,user:null, message: "Failed to fetch current user" }, { status: 500 });
        }
}
