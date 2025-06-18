import { Account,Client, Databases, ID } from "appwrite";

const client = new Client()
const account = new Account(client);
export async function CreateUser(username: string, email: string, password: string,phoneNumber: string) {
try{
        await account.deleteSession("appwrite-session"); 
        const user = await account.create(
                ID.unique(),
                email,
                password,
                username,
        );
await account.createEmailPasswordSession(email, password);
await account.updatePhone(phoneNumber,password);

}catch (error) {
        console.log("Error creating user:", error);
}
}

export default async function getCategories(){
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_API_END_POINT || "") // Your API Endpoint
            .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || ""); // Your project ID
        const databases = new Databases(client);
        try {
                const response = await databases.listDocuments(
                        process.env.NEXT_PUBLIC_DATABASE_ID || "",
                        process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID || ""
                );
                console.log("Fetched categories:", response.documents);
                return response.documents;
        } catch (error) {
                console.error("Error fetching categories:", error);
                throw error;
        }
        
} 

