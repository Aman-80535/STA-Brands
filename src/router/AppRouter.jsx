// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
// import NotFound from "../pages/NotFound";
import EmployeeLayout from "../components/layouts/EmployeeLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../components/Dashboard";
import Analytics from "../components/Analytics/Analytics";

export default function AppRouter() {
//   const { role } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        {/* <Route element={<GuestLayout />}>
          <Route path="/home" element={<Login />} />
        </Route> */}

        {/* User Routes */}
        <Route
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        {/* Fallback */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
