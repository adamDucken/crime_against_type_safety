//app/components/RegistrationForm.js
"use client";

import Link from 'next/link';
import { useState } from 'react';


export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = '/api/auth/register'; 

    const response = await fetch(apiUrl, {
    // this will fetch app/api/auth/register/route.js
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, name, surname }),
    });

    const result = await response.json();
    setMessage(result.message || result.error); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">Register</h1>

        <form onSubmit={handleSubmit}>
          {/* username input */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full text-black p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* password input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full text-black p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* name input */}
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full text-black p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* surname input */}
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full text-black p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-700 text-center">
            Already have an account?{' '}
            <Link href="/login" className='text-blue-700'>Login here</Link>
        </p>

        {/* display message */}
        {message && (
          <div className="mt-4 text-center text-black">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
