//app/dashboard/page.jsx

import LogoutButton from "../components/LogoutButton";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">
          Dashboard
        </h1>
          <LogoutButton />
    </div>
  );
}
