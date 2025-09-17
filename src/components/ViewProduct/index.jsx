import React, { use, useState } from 'react';
import { getProductById } from '../../services/product';
import {  useParams } from 'react-router-dom';

const ViewProduct = () => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams()


	useState(() => {
		const fetchProduct = async () => {
			setLoading(true);
			try {
				const response = await getProductById(id);
				setProduct(response);
			}
			catch (error) {
				console.error("Error fetching product:", error);
			}
			finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, []);


	if (loading) return <p className="text-center text-gray-500">Loading product...</p>;
	if (!product) return <p className="text-center text-gray-500">No product found.</p>;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

				{/* Product Image */}
				<div>
					<img
						src={product.image}
						alt={product.title}
						className="w-full h-auto object-cover rounded"
					/>
				</div>

				{/* Product Details */}
				<div className="flex flex-col justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
						<p className="text-gray-600 mb-1"><strong>Category:</strong> {product.category}</p>
						<p className="text-gray-600 mb-1"><strong>Description:</strong> {product.description}</p>
						<p className="text-gray-600 mb-1"><strong>Count:</strong> {product.count}</p>
						<p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{product.price}</p>
						<p className="text-gray-600 mb-1"><strong>Rating:</strong> {product.rate} / 5</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewProduct;
