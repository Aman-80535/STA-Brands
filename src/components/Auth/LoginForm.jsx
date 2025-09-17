import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await signInWithEmailAndPassword(auth, email, password);
			setTimeout(() => {
				navigate("/");
			}
				, 700);
			console.log("✅ Login successful");
		} catch (err) {
			console.error("Login error:", err.message);
			setError("❌ Invalid email or password");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

				<form onSubmit={handleLogin} className="space-y-5">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
					>
						Login
					</button>

					{error && (
						<p className="text-sm text-red-600 text-center">{error}</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginForm;