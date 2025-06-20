import { NextResponse,NextRequest } from 'next/server';
import { CreateAdminClient } from "@/lib/appwrite";
import { cookies } from 'next/headers';


export async function POST(request: NextRequest) {
          try {
        const { account } =  CreateAdminClient();
        const { email, password } = await request.json();
         const session= await account.createEmailPasswordSession(email, password);
        //  console.log('Session created:', session);
                         (await cookies()).set("appwrite-session", session.secret, {
                                httpOnly: true,
                                secure:true,
                                sameSite: "strict",
                                maxAge:  Number(session.expire),
                                path: "/",
                        })

    return NextResponse.json({ success: true, message: 'Session Created' }, { status: 200 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}