// import { Account,Client } from "node-appwrite";
// import { ID } from "node-appwrite";
// import { cookies } from 'next/headers'
// const client = new Client()
// const account = new Account(client);
// export async function CreateUser(username: string, email: string, password: string,phoneNumber: string) {
// try{
//         await account.deleteSession("appwrite-session"); 
//         const user = await account.create(
//                 ID.unique(),
//                 email,
//                 password,
//                 username,
//         );
// await account.createEmailPasswordSession(email, password);
// await account.updatePhone(phoneNumber,password);

// }catch (error) {
//         console.log("Error creating user:", error);
// }
// }


// export async function LogoutUser() {
//   try {
//      const cookieStore = await cookies()
//   cookieStore.delete('appwrite-session')
//   } catch (error) {
//     console.error("Error logging out:", error);
//   }
// }