//app/page.jsx
"use client";

import LoginButton from "./components/LoginButton";

export default function Page() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">
          Home
        </h1>
      <LoginButton/>
    </div>
  );
}