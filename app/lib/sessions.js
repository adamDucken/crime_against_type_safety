//app/lib/sessions.js
import { Pool } from 'pg';
import crypto from 'crypto';

const connectionString = process.env.DATABASE_URL


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


export async function getSession(sessionId) {
  try {
    const result = await pool.query('SELECT * FROM session_table WHERE session_id = $1', [sessionId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting session:', error);
    throw new Error('Failed to get session');
  }
}
export async function deleteSession(sessionId){ 
  //function that deletes session, expects sessionId, returns nothing
  try {
    const res = await pool.query('DELETE FROM session_table WHERE session_id = $1', [sessionId]);
    return res.rowCount
  } catch (error) {
    console.error("Error accured while trying to delete db session: ",error)
    throw new Error("Failed to delete db session")
  }
}

export async function deleteExpiredSessions(){ 
  //function that deletes expired sessions, expects/returns nothing
  try {
    await pool.query('SELECT fn_session_cleanup()');
  } catch (error) {
    console.error("Error acccured while trying to cleanup sessions:", error)
    throw new Error("Failed to cleanup sessions")
  }
}