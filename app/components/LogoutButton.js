// app/components/LogoutButton.js
'use client';

import Link from 'next/link';

//this button is component that can be showed to user when it is logged in, and wants to logout
export default function LogoutButton() {
  const handleLogout = async () => {
    // it makes a request to API located in api/auth/logout/route.js to clear the session cookie
    await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include', // include cookies in the request
    });
  };

  return (
    <Link href="/login">
      <button onClick={handleLogout}>Logout</button>
    </Link>
  );
}
