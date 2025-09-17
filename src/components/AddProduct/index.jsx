import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { addProduct } from '../../services/product';
import { TextAreaField } from '../UI/TeaxtAreaField';
import { InputField } from '../UI/InputField';

const AddProduct = () => {

	const [formData, setFormData] = useState({
		title: '',
		category: '',
		description: '',
		price: '',
		rate: '',
		count: '',
	});

	const [imageFiles, setImageFiles] = useState([]);
	const [uploading, setUploading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			setImageFiles(p => ([...p, file]));
		} else {
			alert('Please select a valid image file.');
			setImageFiles(null);
		}
	};
	const handleRemoveImage = (indexToRemove) => {
		setImageFiles(prev => prev.filter((_, i) => i !== indexToRemove));
	};
	console.log(formData)
	const handleSubmit = async (e) => {
		e.preventDefault();

		if ((imageFiles?.length <= 0)) {
			alert('Please select an image before submitting.');
			return;
		}

		try {
			setUploading(true);

			// Step 1: Upload image to Firebase Storage
			// const uploadPromises = imageFiles.map(file => {
			// 	const imageRef = ref(storage, `products/${Date.now()}-${file.name}`);
			// 	return uploadBytes(imageRef, file).then(() => getDownloadURL(imageRef));
			// });
			// const imageUrls = await Promise.all(uploadPromises);

			// Step 2: Save product data to Firestore via Redux
			const completeData = {
				...formData,
				price: parseFloat(formData.price),
				rate: parseFloat(formData.rate),
				count: parseInt(formData.count),
				image: "data:image/jpeg;base64,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"
			};

			await addProduct(completeData);
			alert('Product added successfully!');

			// Reset form
			setFormData({
				title: '',
				category: '',
				description: '',
				price: '',
				rate: '',
				count: '',
			});
			setImageFiles([]);
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('Failed to add product.');
		} finally {
			setUploading(false);
		}
	};
	console.log(imageFiles)
	return (
		<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
			<h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
			<form onSubmit={handleSubmit} className="space-y-6">

				{/* Fields */}
				<InputField name="title" label="Title" value={formData.title} onChange={handleChange} />
				<InputField name="category" label="Category" value={formData.category} onChange={handleChange} />
				<TextAreaField name="description" label="Description" value={formData.description} onChange={handleChange} />
				<InputField name="price" label="Price" type="number" value={formData.price} onChange={handleChange} />
				<InputField name="rate" label="Rating (Rate)" type="number" step="0.1" max="5" value={formData.rate} onChange={handleChange} />
				<InputField name="count" label="Rating (Count)" type="number" value={formData.count} onChange={handleChange} />


				{/* Image */}
				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">Product Image</label>
					<input type="file" accept="image/*" multiple onChange={handleImageChange}
						className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
				</div>
				{imageFiles.length > 0 && (
					<div className="flex flex-wrap gap-3 mt-4">
						{imageFiles.map((file, idx) => (
							<div key={idx} className="relative group">
								<img
									src={URL.createObjectURL(file)}
									alt={`preview-${idx}`}
									className="w-24 h-24 object-cover rounded border shadow"
								/>
								<button
									type="button"
									onClick={() => handleRemoveImage(idx)}
									className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 group-hover:opacity-100 opacity-0 transition"
								>
									✕
								</button>
							</div>
						))}
					</div>
				)}

				{/* Submit */}
				<div className="pt-4">
					<button type="submit" disabled={uploading}
						className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
						{uploading ? 'Uploading...' : 'Submit'}
					</button>
				</div>
			</form>
		</div>
	);
};



export default AddProduct;
