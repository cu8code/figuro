"use client"

import React, { useRef, useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs"
import * as deeplab from '../lib/tf_segmentation';

const Page = () => {
	return (
		<div className='min-h-screen bg-white'>
			<Navbar />
			<div className='w-full h-1 bg-gray-100' />
			<Hero />
			<Footer />
		</div>
	)
}

export const Navbar = () => {
	return (
		<nav className="w-full bg-white p-4 shadow-sm">
			<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
				<h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
					Remove Background
				</h1>

				<div className="flex gap-3 text-sm md:text-base">
					<span className="bg-gray-800 text-white px-4 py-1.5 rounded-md font-medium hover:bg-gray-700 transition-colors">
						NO ADS
					</span>
					<span className="bg-gray-800 text-white px-4 py-1.5 rounded-md font-medium hover:bg-gray-700 transition-colors">
						UNLIMITED
					</span>
				</div>
			</div>
		</nav>
	);
};

export const Hero = () => {
	return (
		<div className="w-full min-h-[80vh] bg-white p-4">
			<div className="max-w-7xl mx-auto py-12">
				<SemanticSegmentation />
			</div>
		</div>
	)
}

export const Footer = () => {
	return (
		<footer className="w-full bg-white border-t border-gray-100 p-4">
			<div className="max-w-7xl mx-auto">
				{/* Footer content will go here */}
			</div>
		</footer>
	)
}


export default  Page


const SemanticSegmentation = () => {
	const [model, setModel] = useState<deeplab.SemanticSegmentation | null>(null);
	const [imageUrl, setImageUrl] = useState<string>('');
	const [isProcessing, setIsProcessing] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const imageRef = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadModel = async () => {
			const loadedModel = await deeplab.load({
				base: 'pascal',
				quantizationBytes: 4
			});
			setModel(loadedModel);
		};
		loadModel();
	}, []);

	const handleImageUpload = (file: File) => {
		if (file) {
			setImageUrl(URL.createObjectURL(file));
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			handleImageUpload(file);
		}
	};

	const processImage = async () => {
		if (!model || !imageRef.current || !canvasRef.current) return;
		setIsProcessing(true);
		try {
			const prediction = await model.segment(imageRef.current);
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			if (!ctx) return;
			canvas.width = prediction.width;
			canvas.height = prediction.height;

			console.log(prediction );
			console.log(imageRef.current, imageRef.current.width, imageRef.current.height);

			ctx.drawImage(imageRef.current, 0, 0);
			const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			const segMap = prediction.segmentationMap;
			const imageData = originalImageData;

			for (let i = 0; i < segMap.length; i++) {
				const j = i * 4;
				if (segMap[i] === 0) {
					imageData.data[j + 3] = 0;
				}
			}

			ctx.putImageData(imageData, 0, 0);
		} catch (error) {
			console.error('Error:', error);
		}
		setIsProcessing(false);
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div
				ref={dropZoneRef}
				onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
				className={`
border-2 border-dashed rounded-lg p-8 text-center transition-all
${isDragging ? 'border-gray-800 bg-gray-50' : 'border-gray-300'}
${!imageUrl && 'hover:border-gray-800 hover:bg-gray-50'}
`}
			>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
					className="hidden"
					id="imageUpload"
				/>

				{!imageUrl ? (
					<label htmlFor="imageUpload" className="cursor-pointer">
						<div className="space-y-4">
							<div className="text-4xl">📸</div>
							<p className="text-gray-600">Drag & drop an image here or click to browse</p>
						</div>
					</label>
				) : (
						<img
							ref={imageRef}
							src={imageUrl}
							className="max-h-96 mx-auto object-contain"
							onLoad={processImage}
							alt="Upload"
						/>
					)}
			</div>

			<canvas
				ref={canvasRef}
				className="w-full mt-6 border border-gray-200 rounded-lg"
			/>

			<button 
				onClick={processImage}
				disabled={!imageUrl || isProcessing}
				className={`
w-full py-3 px-4 mt-6 rounded-lg font-medium transition-colors
${isProcessing 
? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
: 'bg-gray-800 text-white hover:bg-gray-700'
}
`}
			>
				{isProcessing ? 'Processing...' : 'Process Image'}
			</button>
		</div>
	);
};
