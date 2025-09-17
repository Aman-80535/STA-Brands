import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../../../common";
import { logout } from "../../../services/auth";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
	const navigate = useNavigate();
	const { role } = useAuth();
	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<header>
			<nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-md dark:bg-gray-900 lg:flex-wrap lg:justify-start lg:py-4">
				<div className="flex w-full flex-wrap items-center justify-between px-3">
					{/* Hamburger */}
					<button
						className="border-0 bg-transparent px-2 text-xl leading-none lg:hidden"
						type="button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-7 w-7 text-gray-600 dark:text-gray-200"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					</button>

					{/* Nav links */}
					<div className="grow basis-full items-center text-center lg:flex lg:basis-auto lg:text-left">
						<ul className="me-auto flex flex-col lg:flex-row">
							{navLinks.map(({ label, path }) => (
								<li key={path} className="mb-4 lg:mb-0 lg:pe-2">
									<NavLink
										to={`${role === "admin" ? "/admin" : "/manufacturer"}${path}`}
										className={({ isActive }) =>
											`block transition duration-200 lg:px-2 
											${isActive
												? "text-black dark:text-white font-semibold"
												: "text-gray-600 hover:text-black dark:text-white/60 dark:hover:text-white/80"
											}`
										}
									>
										{label}
									</NavLink>
								</li>
							))}

							{/* Logout button styled like NavLink */}
							<li className="mb-4 lg:mb-0 lg:pe-2">
								<button
									onClick={handleLogout}
									className="block w-full transition duration-200 lg:px-2 text-gray-600 hover:text-black dark:text-white/60 dark:hover:text-white/80"
								>
									Log Out
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;