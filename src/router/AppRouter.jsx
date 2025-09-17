import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import RoleRedirect from "./RoleRedirect";

import EmployeeLayout from "../components/layouts/EmployeeLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../components/Dashboard";
import Analytics from "../components/Analytics/Analytics";
import NewEmployeePage from "../components/NewEmployee";
import LoginForm from "../components/Auth/LoginForm";
import AddProduct from "../components/AddProduct";
import ViewProduct from "../components/ViewProduct";
import { useAuth } from "../context/AuthContext"; // ✅ correct path

export default function AppRouter() {
    const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginForm />} />

        {/* Role-based redirect on root */}
        <Route path="/" element={<RoleRedirect />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="view-product/:id" element={<ViewProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="new-user" element={<NewEmployeePage />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Manufacturer routes */}
        <Route
          path="/manufacturer"
          element={
            <ProtectedRoute roles={["manufacturer"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more manufacturer-specific routes here */}
        </Route>

        {/* Errors */}
        {/* <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
