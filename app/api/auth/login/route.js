//app/api/auth/login/route.js
import { Pool } from 'pg';

import { NextResponse } from 'next/server';
import { createSession } from '@/app/lib/sessions';
export const runtime = 'nodejs';
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Call the fn_login_check function
    const result = await pool.query('SELECT fn_login_check($1, $2) AS login_result', [username, password]);
    const loginResult = result.rows[0].login_result;

    if (loginResult !== 'Login was successful.') {
      return NextResponse.json({ error: loginResult }, { status: 401 });
    }

    // If login was successful, get the user ID
    const userResult = await pool.query('SELECT id FROM user_table WHERE username = $1', [username]);
    const userId = userResult.rows[0].id;

    // Create a session
    const sessionId = await createSession(userId);

    // Create a new response
    const response = NextResponse.json({ message: 'Logged in' }, { status: 200 });

    // Set the cookie
    response.cookies.set('session', sessionId, {
      httpOnly: true,
      path: '/',
      maxAge:  5 * 60, // 5 min
    });
    
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}