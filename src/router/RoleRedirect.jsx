// src/components/RoleRedirect.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRedirect() {
	const { user, role, loading } = useAuth();
	if (loading) return <p>Loading...</p>;
	
	if (!user) return <Navigate to="/login" />;
	switch (role) {
		case "admin":
			return <Navigate to="/admin/dashboard" />;
		case "manufacturer":
			return <Navigate to="/manufacturer/dashboard" />;
		default:
			return <Navigate to="/unauthorized" />;
	}
}
