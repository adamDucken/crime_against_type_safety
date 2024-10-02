import { NextResponse } from 'next/server';

export async function middleware(request) {
  const session = request.cookies.get('session')?.value;

  // Paths that don't require authentication
  const publicPaths = ['/login', '/register', '/'];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    // If there's no session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Call API route to validate and update session
  const validateResponse = await fetch(new URL('/api/auth/validate-session', request.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId: session }),
  });

  if (!validateResponse.ok) {
    // If session is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { newSessionId } = await validateResponse.json();

  const response = NextResponse.next();

  if (newSessionId) {
    // Update the cookie with the new session ID
    response.cookies.set('session', newSessionId, {
      httpOnly: true,
      path: '/',
      maxAge: 5 * 60, // 5 minutes
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};