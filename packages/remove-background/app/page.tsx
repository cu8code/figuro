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

const Navbar = () => {
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

const Hero = () => {
	return (
		<div className="w-full min-h-[80vh] bg-white p-4">
			<div className="max-w-7xl mx-auto py-12">
				<SemanticSegmentation />
			</div>
		</div>
	)
}

const Footer = () => {
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
	const outlineCanvasRef = useRef<HTMLCanvasElement>(null);
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


	const applyGaussianBlur = (data: Uint8ClampedArray, width: number, height: number, radius: number = 1) => {
		const kernel = generateGaussianKernel(radius);
		const result = new Uint8ClampedArray(data.length);

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let r = 0, g = 0, b = 0, a = 0;
				let weightSum = 0;

				// Apply kernel
				for (let ky = -radius; ky <= radius; ky++) {
					for (let kx = -radius; kx <= radius; kx++) {
						const px = x + kx;
						const py = y + ky;

						if (px >= 0 && px < width && py >= 0 && py < height) {
							const i = (py * width + px) * 4;
							const weight = kernel[ky + radius][kx + radius];

							r += data[i] * weight;
							g += data[i + 1] * weight;
							b += data[i + 2] * weight;
							a += data[i + 3] * weight;
							weightSum += weight;
						}
					}
				}

				// Set result
				const i = (y * width + x) * 4;
				result[i] = r / weightSum;
				result[i + 1] = g / weightSum;
				result[i + 2] = b / weightSum;
				result[i + 3] = a / weightSum;
			}
		}

		return result;
	};

	// Generate Gaussian kernel
	const generateGaussianKernel = (radius: number) => {
		const size = radius * 2 + 1;
		const kernel = Array(size).fill(0).map(() => Array(size).fill(0));
		const sigma = radius / 2;

		for (let y = -radius; y <= radius; y++) {
			for (let x = -radius; x <= radius; x++) {
				const exponent = -(x * x + y * y) / (2 * sigma * sigma);
				kernel[y + radius][x + radius] = Math.exp(exponent) / (2 * Math.PI * sigma * sigma);
			}
		}

		return kernel;
	};

	const processImage = async () => {
		if (!model || !imageRef.current || !canvasRef.current || !outlineCanvasRef.current) return;
		setIsProcessing(true);

		try {
			const prediction = await model.segment(imageRef.current);
			const canvas = canvasRef.current;
			const outlineCanvas = outlineCanvasRef.current;
			const ctx = canvas.getContext('2d');
			const outlineCtx = outlineCanvas.getContext('2d');
			if (!ctx || !outlineCtx) return;

			canvas.width = prediction.width;
			canvas.height = prediction.height;
			outlineCanvas.width = prediction.width;
			outlineCanvas.height = prediction.height;

			const tensor = tf.browser.fromPixels(imageRef.current).div(tf.scalar(255));
			const reshapedTensor = tensor.expandDims(0);

			if (reshapedTensor.shape[0] === 1) {
				// eslint-disable-next-line  @typescript-eslint/no-explicit-any
				const resize = tf.image.resizeBilinear(reshapedTensor as any, [prediction.height, prediction.width]);
				const imageData = await tf.browser.toPixels(resize.squeeze());

				const blendedData = new Uint8ClampedArray(prediction.width * prediction.height * 4);

				const original = new Uint32Array(imageData.buffer);
				const segmentation = new Uint32Array(prediction.segmentationMap.buffer);
				const blended = new Uint32Array(blendedData.buffer);

				const isBackgroundPixel = (value: number) => 
					(value & 0xFF000000) === 0xFF000000 || 
						(value & 0x00FFFFFF) === 0x00000000;

				// Process pixels
				for (let y = 0; y < prediction.height; y++) {
					for (let x = 0; x < prediction.width; x++) {
						const i = y * prediction.width + x;

						if (isBackgroundPixel(segmentation[i])) {
							blended[i] = 0x00000000;
						} else {
							blended[i] = original[i];
						}
					}
				}

				// Apply edge smoothing
				const smoothedData = applyGaussianBlur(blendedData, prediction.width, prediction.height, 2);

				// Put the results onto both canvases
				ctx.putImageData(new ImageData(smoothedData, prediction.width, prediction.height), 0, 0);
				outlineCtx.putImageData(new ImageData(prediction.segmentationMap, prediction.width, prediction.height), 0, 0);

				// Cleanup
				resize.dispose();
				tensor.dispose();
				reshapedTensor.dispose();
			}
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

				{/* eslint-disable @next/next/no-img-element */}
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

			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h3 className="text-lg font-medium mb-2">Blended Result</h3>
					<canvas
						ref={canvasRef}
						className="w-full border border-gray-200 rounded-lg"
					/>
				</div>
				<div>
					<h3 className="text-lg font-medium mb-2">Segmentation Output</h3>
					<canvas
						ref={outlineCanvasRef}
						className="w-full border border-gray-200 rounded-lg"
					/>
				</div>
			</div>

			<button 
				onClick={processImage}
				disabled={!imageUrl || isProcessing}
				className={`
w-full py-3 px-4 mt-6 rounded-lg font-medium transition-colors
${isProcessing 
? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
: 'bg-gray-800 text-white hover:bg-gray-700'}
`}
			>
				{isProcessing ? 'Processing...' : 'Process Image'}
			</button>
		</div>
	);
};
