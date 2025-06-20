import { Account,Client, ID } from "appwrite";
import { CreateAdminClient } from "./appwrite";
import { Query } from "node-appwrite";
const client = new Client()
const account = new Account(client);

const  {databases} = CreateAdminClient();

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
        try {
                const response = await databases.listDocuments(
                        process.env.NEXT_PUBLIC_DATABASE_ID || "",
                        process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID || ""
                );
                // console.log("Fetched categories:", response.documents);
                return response.documents;
        } catch (error) {
                console.error("Error fetching categories:", error);
                throw error;
        }
} 

export async function SubscribeToNewsletter(email: string) {

    try {
        const emailExists = await databases.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID || "",
                process.env.NEXT_PUBLIC_NEWSLETTER_COLLECTION_ID || "",
                [Query.equal("email", email)]
        )
        if (emailExists.documents.length > 0) {
            console.log("Email already subscribed:", email);
            return {
                success: false,
                message: "Email already subscribed",
                status: 409
            }
        }
        await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID || "",
            process.env.NEXT_PUBLIC_NEWSLETTER_COLLECTION_ID || "",
            ID.unique(),
            {email: email},
        );
        return {
                success: true,
                message: "Subscription successful",
                status: 200
        };
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return {
            success: false,
            message: "Subscription failed",
            status: 500
        };
    }
}

export async function getAllProducts(){
        try {
                const response = await databases.listDocuments(
                        process.env.NEXT_PUBLIC_DATABASE_ID || "",
                        process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID || ""
                );
                console.log("Fetched products:", response.documents);
                return response.documents.map((product: any) => ({
                        id: product.$id,
                        title:product.title,
                        description: product.description,
                        category: product.category, 
                        price: parseFloat(product.price) || 0,
                        image: product.image,
                }));
        } catch (error) {
                console.error("Error fetching products:", error);
                throw error;
        }
}

export async function getProductById(productId: string) {
    try {
        const response = await databases.getDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID || "",
            process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID || "",
            productId
        );
        return {
            id: response.$id,
            title: response.title,
            description: response.description,
            category: response.category,
            price: parseFloat(response.price) || 0,
            image: response.image,
        };
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
}

export async function getProductsByIds( ids: string[]) {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID || "",
            process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID || "",
            [Query.equal("$id", ids)]
        );
        return response.documents.map((product: any) => ({
            id: product.$id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: parseFloat(product.price) || 0,
            image: product.image,
        }));
    
}
