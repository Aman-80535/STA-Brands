// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
// import NotFound from "../pages/NotFound";
import EmployeeLayout from "../components/layouts/EmployeeLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../components/Dashboard";
import Analytics from "../components/Analytics/Analytics";
import NewEmployeePage from "../components/NewEmployee";
import LoginForm from "../components/Auth/LoginForm";
import AddProduct from "../components/AddProduct";
import ViewProduct from "../components/ViewProduct";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        {/* <Route element={<GuestLayout />}> */}
        <Route path="/login" element={<LoginForm />} />
        {/* </Route> */}

        {/*  Manufacturer Routes */}
        <Route
          element={
            <ProtectedRoute roles={["manufacturer"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/" element={<Dashboard />} /> */}
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/admin/new-user" element={<NewEmployeePage />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        {/* Fallback */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
