import React, { useEffect, useState } from 'react'
import { deleteOrder, getOrders } from '../../services/Orders';
import { orderStatus } from '../../common';
import './dashboard.css';

const Dashboard = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [key, setKey] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		const q = key.toLowerCase();

		const data = orders?.filter(i => i.id.toLowerCase().includes(q) || i?.fullName?.toLowerCase().includes(q))
		setFilteredData(data);
	}, [key])

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const data = await getOrders();
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

	console.log(orders)

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


	// Assign to company handler
	const handleAssign = (id) => {
		alert(`Order ${id} assigned to a company ✅`);
	};





	return (
		<>
			<div><h1>Dashboard</h1></div>
			<div>
				<div className="p-6 container">
					{/* Page Header */}
					<h1 className="text-2xl font-bold mb-6">📦 All Orders</h1>


					<div className="relative search-filter mb-4">
						<input type="text" class="flex h-[39px] w-full rounded-[20px] border text-center" placeholder='search by Id or User Name' value={key} onChange={(e) => setKey(e.target.value)} />
					</div>

					{/* Orders Table */}
					<div className="overflow-x-auto bg-white shadow-md rounded-lg main-table">
						<table className="w-full text-left border-collapse">
							<thead className="bg-gray-100">
								<tr>
									<th className="p-3">ID</th>
									<th className="p-3">Customer</th>
									<th className="p-3">Status</th>
									<th className="p-3">Payment Status</th>
									{/* <th className="p-3 text-right">Actions</th> */}
								</tr>
							</thead>
							<tbody>
								{orders.length === 0 ? (
									<tr>
										<td colSpan="5" className="text-center p-4 text-gray-500">
											No orders found.
										</td>
									</tr>
								) : (
									(key.length > 0 ? filteredData : orders)?.map((order) => (
										<tr
											key={order.id}
											className="border-b hover:bg-gray-50 transition"
										>
											<td className="p-3">{order.id}</td>
											<td className="p-3">{order.fullName}</td>
											{/* <td className="p-3">{order.product}</td> */}
											<td className="p-3">
												<span
													className={`px-3 py-1 rounded-full text-sm ${order.status ? orderStatus?.[order.status] : orderStatus.Pending
														}`}
												>
													{order.status ? order.status : "Pending"}
												</span>
											</td>
											<td className={`p-3`}>
												<span
													className={`px-3 py-1 rounded-full text-sm ${order.payment ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
												>
													{order?.payment ? order.payment : "Pending"}
												</span>
											</td>
											{/* <td className="p-3 flex justify-end gap-2">
												<button
													onClick={() => handleAssign(order.id)}
													className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
												>
													Assign
												</button>
												<button
													onClick={() => handleDelete(order.id)}
													className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
												>
													Delete
												</button>
											</td> */}
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard