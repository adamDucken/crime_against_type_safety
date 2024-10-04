// app/api/auth/session/route.js
import { NextResponse } from 'next/server';
import { getSession, createSession, deleteSession, deleteExpiredSessions } from '@/app/lib/sessions';

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    const dbSession = await getSession(sessionId);

    if (!dbSession) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
    
    //delete the old session
    await deleteSession(sessionId)
    //delete expired sessions
    await deleteExpiredSessions()

    //TODO - should create function that ensures one user cant have more than one session active in db
    
    if (new Date() < new Date(dbSession.expires_at)) {
      // If the session is not expired, create a new one
      const newSessionId = await createSession(dbSession.user_id);
      return NextResponse.json({ newSessionId }, { status: 200 });
    }

    // If the session is valid, return OK
    return NextResponse.json({ message: 'Session is valid' }, { status: 200 });
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}