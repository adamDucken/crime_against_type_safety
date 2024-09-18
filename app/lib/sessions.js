//app/lib/sessions.js
import { Pool } from 'pg';
import crypto from 'crypto';

const connectionString = process.env.DATABASE_URL

/*
**TODO**
FOR ENTIRE FILE: you have to implement error handling with try and catch for all fn
**TODO**
*/

const pool = new Pool({
    connectionString 
});

export async function createSession(userId) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 5 * 60 * 1000); 

  try {
    await pool.query(
      'INSERT INTO session_table (session_id, user_id, expires_at, created_at) VALUES ($1, $2, $3, $4)', // TODO have to create sql function for this
      [sessionId, userId, expiresAt, createdAt]
    );
    return sessionId;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
}

/*
**TODO**
have to implement function that updates session updateSession(); it should expect sessionId and extend it for certain time
interact with db update the session_table expires_at column ; returns sessionId, and session data maybe 
**TODO**
*/

export async function getSession(sessionId){ 
  // function that finds session, expects sessionId, returns session data or null
  const result = await pool.query(
    'SELECT * FROM session_table WHERE session_id = $1 AND expires_at > NOW()',
    [sessionId]
  );

  return result.rows[0] || null;
}

export async function deleteSession(sessionId){ 
  //function that deletes session, expects sessionId, returns nothing
  await pool.query('DELETE FROM session_table WHERE session_id = $1', [sessionId]);
}

export async function deleteExpiredSessions(){ 
  //function that deletes expired sessions, expects/returns nothing
  await pool.query('DELETE FROM session_table WHERE expires_at <= NOW()');
  //problem with NOW() needs a fix cuz of different time formats; need to take the functionality to js
}