//app/dashboard/page.jsx

import LogoutButton from "../components/LogoutButton";

export default function Page() {
  return (
    <div className="flex flex-row mt-2">
        <h1 className="px-2">user feed</h1>
        <LogoutButton/>
    </div>
  );
}