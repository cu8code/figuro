"use client"

import React, { useRef, useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as deeplab from '../lib/tf_segmentation';
import { applyGaussianBlur } from '@/lib/utils';

export const SemanticSegmentation = () => {
	const [model, setModel] = useState<deeplab.SemanticSegmentation | null>(null);
	const [imageUrl, setImageUrl] = useState<string>('');
	// eslint-disable-next-line  @typescript-eslint/no-unused-vars
	const [isProcessing, setIsProcessing] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadModel = async () => {
			setIsLoading(true);
			try {
				const loadedModel = await deeplab.load({
					base: 'pascal',
					quantizationBytes: 4
				});
				setModel(loadedModel);
			} catch (err) {
				setError('Failed to load the model. Please try again later.');
				console.error('Model loading error:', err);
			} finally {
				setIsLoading(false);
			}
		};
		loadModel();
	}, []);

	const handleImageUpload = (file: File) => {
		if (file) {
			setImageUrl(URL.createObjectURL(file));
			setError(null);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			handleImageUpload(file);
		} else {
			setError('Invalid file type. Please upload an image.');
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

	const downloadImage = () => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const link = document.createElement('a');
		link.href = canvas.toDataURL('image/png');
		link.download = 'segmented-image.png';
		link.click();
	};

	if (isLoading){
		return (
			<div className='text-gray-800 text-4xl'>Loading</div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800">
			{isLoading && (
				<div className="text-center text-gray-500 mb-4">Loading model...</div>
			)}

			{error && (
				<div className="text-center text-red-500 mb-4">{error}</div>
			)}

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

			<div>
				<h3 className="text-lg font-medium mb-2">Blended Result</h3>
				<canvas
					ref={canvasRef}
					className="w-full border border-gray-200 rounded-lg"
				/>
				<button
					onClick={downloadImage}
					className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
				>
					Download Image
				</button>
			</div>
		</div>
	);
};

export default SemanticSegmentation;
