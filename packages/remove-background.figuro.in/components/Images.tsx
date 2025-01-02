import React, { useRef, useState, useEffect, useContext } from "react";
import { createPreview } from "@/lib/utils"; 
import { ModelContext } from "./ModalContex"; 
import { Copy, Download, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { cookImage } from "@/lib/utils"; 

interface ImageProps {
	imageUrl: string;
}

export const Images: React.FC<ImageProps> = React.memo(({ imageUrl }) => {
	const model = useContext(ModelContext);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const processImage = async () => {
			if (!model) {
				setError("Model not available.");
				return;
			}

			try {
				const { resizedImageData, maskImageData, width, height } = await cookImage(imageUrl, model);

				// Call createPreview with the processed data
				if (canvasRef.current) {
					await createPreview({
						canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
						width, 
						height, 
						maskImageData,
						resizedImageData,
						gaussianBlurIntensity: 2,
					});
				}

			} catch (err) {
				console.error("Error:", err);
				setError("An error occurred during processing.");
			}
		};

		processImage();
	}, [imageUrl, model]);

	const handleCopyToClipboard = () => {
		navigator.clipboard
			.writeText(imageUrl)
			.then(() => alert("Image URL copied to clipboard!"))
			.catch((err) => {
				console.error("Failed to copy:", err);
				alert("Failed to copy image URL.");
			});
	};

	const handleDownloadImage = () => {
		if (!canvasRef.current) return;

		const link = document.createElement("a");
		link.href = canvasRef.current.toDataURL("image/png");
		link.download = "processed-image.png";
		link.click();
	};

	const handleEdit = () => {
		router.push(`/editor?imageUrl=${encodeURIComponent(imageUrl)}`);
	};

	return (
		<div className="relative border rounded-lg overflow-hidden">
			<canvas ref={canvasRef} className="w-full h-auto" />
			{error && <p className="text-red-500">{error}</p>}
			<div className="absolute top-2 right-2 flex space-x-2">
				<button
					onClick={handleCopyToClipboard}
					className="p-2 bg-white text-black rounded hover:bg-gray-200"
				>
					<Copy size={16} />
				</button>
				<button
					onClick={handleDownloadImage}
					className="p-2 bg-white text-black rounded hover:bg-gray-200"
				>
					<Download size={16} />
				</button>
				<button
					onClick={handleEdit}
					className="p-2 bg-white text-black rounded hover:bg-gray-200"
				>
					<Edit size={16} />
				</button>
			</div>
		</div>
	);
});

// Set display name for better debugging
Images.displayName = "Images";
