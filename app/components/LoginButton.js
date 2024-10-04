//app/components/LoginButton.js
"use client";

import Link from "next/link";

//this is not button that is used for submiting in form it is more meant to show in navbar if user is not logged in
export default function LoginButton() {
  return (
    <Link href="/login">
        <button className="w-full bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Login</button>
    </Link>
  );
}