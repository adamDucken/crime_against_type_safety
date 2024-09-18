//app/api/register/route.js
import pg from 'pg';

const { Client } = pg;

const connectionString = process.env.DATABASE_URL

export async function POST(req) {
  //this api is called by app/components/RegistrationForm.js
  const client = new Client({
    connectionString,
  });
  
  try {
    const body = await req.json();
    const { username, password, name, surname } = body;

    if (!username || !password || !name || !surname) {
      return new Response(JSON.stringify({ error: 'Username, password, name, and surname are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await client.connect();

    // call the fn_create_user function it is on sql server stored function
    // it expects username, password, name, surname and returns id
    const query = `SELECT fn_create_user($1, $2, $3, $4) AS result`;
    const values = [username, password, name, surname];
    const result = await client.query(query, values);
    // console.log(result)
    
    // get the result from the function call, you can console log result to see why i did this
    const message = result.rows[0].result;

    // if the result indicates the user already exists
    if (message.includes('already exists')) {
      return new Response(JSON.stringify({ error: message }), {
        status: 409, // conflict status code
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error during registration:', error);

    return new Response(JSON.stringify({ error: error.message || 'Registration failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  } finally {
    await client.end();
  }
}
