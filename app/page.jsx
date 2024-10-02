//app/page.jsx
"use client";

import LoginButton from "./components/LoginButton";

export default function Page() {

  return (
    <div className="flex flex-row ">
      <h1 className="px-1 ">Home</h1>
      <LoginButton/>
    </div>
  );
}