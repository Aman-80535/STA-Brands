// src/components/layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-lg font-bold">User Dashboard</h1>
        <nav>
          <a href="/profile" className="mr-4">Profile</a>
          <a href="/orders">Orders</a>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* Renders user pages here */}
      </main>
    </div>
  );
}
