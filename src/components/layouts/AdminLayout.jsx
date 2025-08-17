// src/components/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../Dashboard/Header/Header";

export default function AdminLayout() {
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Header />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> 
      </main>
    </div>
  );
}
