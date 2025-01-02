"use client"

import React, {  } from 'react';
import { Images } from './Images';

// ImageGallery Component
interface ImageGalleryProps {
	images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{images.map((imageUrl, index) => (
				<Images key={index} imageUrl={imageUrl} />
			))}
		</div>
	);
};

