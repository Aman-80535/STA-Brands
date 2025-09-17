import React, { useEffect, useState } from 'react'
import { deleteOrder, getBatchedOrders, getOrders } from '../../services/Orders';
import { orderStatus } from '../../common';
import './dashboard.css';
import { adminColumns, manufacturerColumns, orders } from '../../utils/data';
import Eye from "../../../public/eye.png"
import { useAuth } from '../../context/AuthContext';
import { getFromToDateForBacth } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const { role } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [key, setKey] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const q = key.toLowerCase();

		const data = orders?.filter(i => i.id.toLowerCase().includes(q) || i?.fullName?.toLowerCase().includes(q))
		setFilteredData(data);
	}, [key])
	console.log("333", orders)
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const data = await getBatchedOrders();
				console.log(data)
				setOrders(data);
				setError(""); // clear old errors
			} catch (err) {
				console.error(err);
				setError("Failed to load orders. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);


	// Delete order
	const handleDelete = async (id) => {
		try {
			setLoading(true);
			await deleteOrder(id);
			setOrders((prev) => prev.filter((order) => order.id !== id));
		} catch (err) {
			console.error(err);
			setError("Failed to delete order. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Render states
	if (loading) {
		return <div className="p-4 text-gray-500">Loading...</div>;
	}

	if (error) {
		return (
			<div className="p-4 text-red-600">
				{error}
				<button
					className="ml-4 px-3 py-1 bg-gray-200 rounded"
					onClick={() => window.location.reload()}
				>
					Retry
				</button>
			</div>
		);
	}


	// Assign to manufacturer handler
	const handleAssign = (id) => {
		alert(`Order ${id} assigned to a company ✅`);
	};


	return (
		<>
			<h1 className='mb-5 text-4xl font-sans'>{role === "admin" ? "All Batches" : "You Orders"}</h1>
			<div className="overflow-x-auto bg-white shadow-md rounded-lg main-table">
				<table className="w-full text-left border-collapse">
					<thead className="bg-gray-100">
						<tr>
							{(role === "admin" ? adminColumns : manufacturerColumns).map((col) => (
								<th key={col.key} className="p-3">
									{col.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{orders.length === 0 ? (
							<tr>
								<td colSpan={(role === "admin" ? manufacturerColumns : adminColumns).length} className="text-center p-4 text-gray-500">
									No orders found.
								</td>
							</tr>
						) : (
							orders.map((order) =>
							(
								<tr key={order.id} className="border-b hover:bg-gray-50 transition">
									{(role === "admin" ? adminColumns : manufacturerColumns).map((col) => {
										if (col.isStatus) {
											return (
												<td key={col.key} className="p-3">
													<span
														className={`px-3 py-1 rounded-full text-sm ${order[col.key] ? "bg-green-500 text-white" : "bg-red-500 text-white"
															}`}
													>

														{order?.[col.key] || "Pending"}
													</span>
												</td>
											);
										} else if (col.key === "sizing_breakdown") {
											return (
												<td key={col.key} className="p-3">
													<span
														className={`px-3 py-1 rounded-full text-sm ${order.status === "Inprocess"
															? "bg-blue-500 text-black"
															: "bg-yellow-500 text-black"
															}`}
													>
														{order?.sizing_breakdown &&
															Object.entries(order.sizing_breakdown).map(([size, qty]) =>
															(
																<li key={size}>
																	<span className="font-medium whitespace-nowrap">{size}</span>: {qty}
																</li>
															)
															)}
													</span>
												</td>
											);
										}
										else if (col.isOrderStatus) {
											return (
												<td key={col.key} className="p-3">
													<span
														className={`px-3 py-1 rounded-full text-sm ${order.status === "Printed"
															? "bg-blue-500 text-white"
															: "bg-yellow-500 text-white"
															}`}
													>
														{order?.status}
													</span>
												</td>
											);
										} else if (col.isAction) {
											return (
												<td key={col.key} className="p-3 flex gap-2">
													<button
														onClick={() => console.log("Assign", order.id)}
														className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
													>
														Done
													</button>
													{/* <button
														onClick={() => console.log("Delete", order.id)}
														className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
													>
														Delete
													</button> */}
												</td>
											);
										}
										else if (col.key === "image") {
											return <td><img style={{ width: "20px", cursor: "pointer" }} src={Eye} onClick={() => navigate(`/view-product/${order?.productId}`)} /></td>

										}
										else {
											return <td key={col.key} className="p-3">{col.key === "created_at" ? getFromToDateForBacth(order[col.key]) : order[col.key]}</td>;
										}
									})}
								</tr>
							)
							)
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Dashboard