//app/api/auth/logout/route.js
import { deleteSession } from '@/app/lib/sessions';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';



export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ message: 'No active session' }, { status: 400 });
    }

    const sessionId = sessionCookie.value;
    const deletedCount = await deleteSession(sessionId);

    if (deletedCount === 1) {
      console.log('Deleted DB session');
    } else {
      console.log('No active DB session found');
    }

    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

    response.cookies.set('session', '', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}