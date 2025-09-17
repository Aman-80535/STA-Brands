// src/components/layouts/UserLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from '../../services/auth'

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-lg font-bold">User Dashboard</h1>
        <nav className="mt-2 flex space-x-4 justify-center d-flex">
          <a href="/profile" className="mr-4">Profile</a>
          <a href="/orders">Orders</a>
          <button onClick={handleLogout}>LogOut</button>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* Renders user pages here */}
      </main>
    </div>
  );
}
