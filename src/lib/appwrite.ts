import { Account,Client } from "node-appwrite";

const CreateAdminClient = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_API_END_POINT || "") 
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || "")
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY || "");

    return {
        get account() {
            return new Account(client);
        }
    };
}
const createSessionClient = async(request: any) => {
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