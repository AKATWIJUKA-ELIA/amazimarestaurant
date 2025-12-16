import { Account,Client,Databases,Storage } from "node-appwrite";
import { NextRequest } from "next/server";

const CreateAdminClient = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_API_END_POINT || "") 
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || "")
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY || "");

    return {
        get account() {
            return new Account(client);
        },
          get databases() {
      return new Databases(client)
    },
    get storage() {
      return new Storage(client)
    },
    };
}
const createSessionClient = async(request: NextRequest) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_API_END_POINT || "") // Your API Endpoint
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || ""); // Your project ID

        const sessionCookie = request.cookies.get("appwrite-session")
        if (sessionCookie) {
                client.setSession(sessionCookie.value); 
        }

    return {
        get account() {
            return new Account(client);
        }
    };

}
export { CreateAdminClient, createSessionClient };