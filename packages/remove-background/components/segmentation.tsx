"use client"

import React, { useState } from 'react';
import { ImageGallery } from './ImageGallry';

// Main SemanticSegmentation Component
export const SemanticSegmentation: React.FC = () => {
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleImageUpload = (files: FileList) => {
		if (files) {
			const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
			setImageUrls(prevUrls => [...prevUrls, ...newImageUrls]); // Append new images
			setError(null);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		handleImageUpload(e.dataTransfer.files);
	};

	return (
		<div className="max-w-4xl mx-auto p-8 text-gray-800">
			{isLoading && (
				<div className="text-center text-gray-500 mb-6">Loading model...</div>
			)}

			{error && (
				<div className="text-center text-red-500 mb-6">{error}</div>
			)}

			<div
				onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
				className={`
border-2 border-dashed rounded-lg p-10 text-center transition-all mb-6
${isDragging ? 'border-gray-800 bg-gray-50' : 'border-gray-300'}
${!imageUrls.length && 'hover:border-gray-800 hover:bg-gray-50'}
`}
			>
				<input
					type="file"
					id="imageUpload"
					className="hidden"
					multiple // Allow multiple file uploads
					onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
				/>

				{/* Removed the "Images ready for processing..." message */}
				<label htmlFor="imageUpload" className="cursor-pointer">
					<div className="space-y-4">
						<div className="text-5xl">📸</div>
						<p className="text-gray-600">Drag & drop images here or click to browse</p>
					</div>
				</label>
			</div>

			{/* Display processed images in a gallery */}
			{imageUrls.length > 0 && <ImageGallery images={imageUrls} />}
		</div>
	);
};

export default SemanticSegmentation;
