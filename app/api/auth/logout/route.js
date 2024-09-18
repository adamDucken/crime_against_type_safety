//app/api/auth/logout/route.js
import { deleteSession } from '@/app/lib/sessions';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
    //this api rn is called by // app/components/LogoutButton.js in future smth else also might call it idk
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('session');

    if (!session) {
      return NextResponse.json({ message: 'No active session' }, { status: 400 });
    }

    const sessionId = session.value;
    await deleteSession(sessionId);
    // this is deleteSession() helper function located in app/lib/sessions.js it takes sessionId and deletes the record from db

    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

    // deleting cookie from browser using next js built in functionality
    response.cookies.set('session', '', {
      httpOnly: true,
      sameSite: 'None', // change from 'None' to 'Lax' for better security in production if needed
      secure:  false,// secure it in production process.env.NODE_ENV === 'production', if needed
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}