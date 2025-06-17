import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST() {

  try {
     const cookieStore = await cookies()
     cookieStore.delete('appwrite-session')
    return NextResponse.json({ success: true, message: 'Session deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}