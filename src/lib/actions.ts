import { Client, Account, ID } from "appwrite";
import { NextResponse } from "next/server";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_API_END_POINT || "") // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID ||"");                 // Your project ID

const account = new Account(client);
export async function CreateUser(username: string, email: string, password: string,phoneNumber: string) {
try{
        await account.deleteSession("current"); 
        const user = await account.create(
                ID.unique(),
                email,
                password,
                username,
        );
await account.createEmailPasswordSession(email, password);
await account.updatePhone(phoneNumber,password);

return NextResponse.json({ success: true, message:  `User${user.name} was created Successfully` }, { status: 200 });
}catch (error) {
        console.log("Error creating user:", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
}
}

export async function AuthenticateUser(email: string, password: string) {
        
        try {
                const session= await account.createEmailPasswordSession(email, password);
                const user = await account.get();
                console.log("user is", user);
                return NextResponse.json({ success: true, message: `Login successful`, status:200 });
        } catch (error) {
                console.log("Error authenticating user:", error);
                return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" ,status: 500});
                        }
}
export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user; 
  } catch (error) {
    // Not logged in or session expired
    return null;
  }
}
export async function LogoutUser() {
  try {
    await account.deleteSession("current");
    return NextResponse.json({ success: true, message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 });
  }
}