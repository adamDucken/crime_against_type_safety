//app/components/LoginForm.js
"use client"

import Link from 'next/link';
import {useState} from 'react';
import { useRouter } from 'next/navigation'


// this is form that is showed for user in /app/login/page.jsx it accepts user input and calls login api on submit
export default function LoginForm(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter()
    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiUrl = '/api/auth/login'; 
        const response = await fetch(apiUrl, {
        // this will fetch app/api/auth/login/route.js
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({username, password}),
        
        });

        const result = await response.json();
        
        setMessage(result.message || result.error);
        if (result.message == 'Logged in'){
            router.push('/dashboard')
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-4 text-center text-blue-900'>Login</h1>
            <form onSubmit={handleSubmit}>
                {/* username input */}
                <div className='mb-4'>
                    <label className='block text-gray-700'>Username</label>
                    <input
                        type="text"
                        className='w-full text-black p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {/* password input */}
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input
                        type="password" 
                        className='w-full text-black p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}    
                        required
                    />
                </div>
                {/* submit button */}
                <button type='submit'
                className='w-full bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition'>
                    Login
                </button>
            </form>
            <p className="mt-4 text-gray-700 text-center">
            Don't have account?{' '}
            <Link href="/register" className='text-blue-700'>Register here</Link>
            </p>

            {/* display message */}
            {message && (
                <div className='mt-4 text-center text-black'>
                    {message}
                </div>
            )}
            </div>  
        </div>
    );
}