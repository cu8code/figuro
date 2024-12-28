"use client"

import React, { useRef, useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as deeplab from '../lib/tf_segmentation';
import { applyGaussianBlur } from '@/lib/utils';

export const SemanticSegmentation = () => {
	const [model, setModel] = useState<deeplab.SemanticSegmentation | null>(null);
	const [imageUrl, setImageUrl] = useState<string>('');
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
    setError(null);
    try {
        const prediction = await model.segment(imageRef.current);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let originalWidth = imageRef.current.naturalHeight;
        let originalHeight = imageRef.current.naturalWidth;
        canvas.width = originalWidth;
        canvas.height = originalHeight;

        // Create tensors and get image data
        const tensors = tf.tidy(() => ({
            resizedNewOutputPredection: tf.tensor(
                prediction.segmentationMap,
                [prediction.height, prediction.width, 4]
            ).div(tf.scalar(255)),
            reshapedNewOutputTensorPredection: tf.tensor(
                prediction.segmentationMap,
                [prediction.height, prediction.width, 4]
            ).div(tf.scalar(255)).expandDims(0),
            resize: tf.image.resizeBilinear(
                tf.tensor(prediction.segmentationMap, [prediction.height, prediction.width, 4])
                    .div(tf.scalar(255))
                    .expandDims(0) as  any,
                [originalHeight, originalWidth]
            )
        }));

        const imageDataForNewResizedOutputPredection = await tf.browser.toPixels(tensors.resize.squeeze());
        const originalImageTensor = tf.browser.fromPixels(imageRef.current);
        const originalImageData = await tf.browser.toPixels(originalImageTensor);

        // Create blended data array
        const blendedData = new Uint8ClampedArray(originalHeight * originalWidth * 4);
        
        // Convert to Uint32 for faster processing
        const original = new Uint32Array(originalImageData.buffer);
        const segmentation = new Uint32Array(imageDataForNewResizedOutputPredection.buffer);
        const blended = new Uint32Array(blendedData.buffer);

        const isBackgroundPixel = (value: number) => 
            (value & 0xFF000000) === 0xFF000000 || 
            (value & 0x00FFFFFF) === 0x00000000;

        // Process pixels
        for (let y = 0; y < originalHeight; y++) {
            for (let x = 0; x < originalWidth; x++) {
                const i = y * originalWidth + x;
                    blended[i] = segmentation[i];
                if (isBackgroundPixel(segmentation[i])) {
                    blended[i] = 0x00000000;
                } else {
                    blended[i] = original[i];
                }
            }
        }

        ctx.putImageData(new ImageData(blendedData, originalWidth, originalHeight), 0, 0);

        // Cleanup
        tensors.resize.dispose();
        tensors.resizedNewOutputPredection.dispose();
        tensors.reshapedNewOutputTensorPredection.dispose();
        originalImageTensor.dispose();

    } catch (err) {
        setError('Error processing the image. Please try again.');
        console.error('Processing error:', err);
    } finally {
        setIsProcessing(false);
    }
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

export default SemanticSegmentation;
