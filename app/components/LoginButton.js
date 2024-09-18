//app/components/LoginButton.js
"use client";

import Link from "next/link";

//this is not button that is used for submiting in form it is more meant to show in navbar if user is not logged in
export default function LoginButton() {
  return (
    <Link href="/login">
        <button>Login</button>
    </Link>
  );
}