export const generateGaussianKernel = (radius: number) => {
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

export	const applyGaussianBlur = (data: Uint8ClampedArray, width: number, height: number, radius: number = 1) => {
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

export function convertToColor(segmentationData: Uint8ClampedArray, width: number, height: number, targetColor: { r: number; g: number; b: number }): Uint8ClampedArray {
	const colorData = new Uint8ClampedArray(segmentationData.length);

	for (let i = 0; i < segmentationData.length; i += 4) {
		const r = segmentationData[i];     // Red channel
		const g = segmentationData[i + 1]; // Green channel
		const b = segmentationData[i + 2]; // Blue channel
		const a = segmentationData[i + 3]; // Alpha channel

		// If alpha is 0 or if the pixel is black (R = G = B = 0), set to target color
		if (a === 0 || (r === 0 && g === 0 && b === 0)) {
			colorData[i] = colorData[i + 1] = colorData[i + 2] = 0; // Set to black if transparent or black
		} else {
			// Set to target color if not transparent
			colorData[i] = targetColor.r;   // Red channel of target color
			colorData[i + 1] = targetColor.g; // Green channel of target color
			colorData[i + 2] = targetColor.b; // Blue channel of target color
		}

		colorData[i + 3] = a; // Retain alpha
	}

	return colorData;
}

export const isBackgroundPixel = (value: number) => {
	const alpha = (value >> 24) & 0xFF; // Extract alpha channel
	const red = (value >> 16) & 0xFF;   // Extract red channel
	const green = (value >> 8) & 0xFF;  // Extract green channel
	const blue = value & 0xFF;          // Extract blue channel

	// Check if fully transparent, fully opaque, or black
	return alpha === 0 || 
		(alpha === 255 && red === 0 && green === 0 && blue === 0); 
};

export const blendImagesTransParentMask = (
  resizedImageData: Uint8ClampedArray,
  maskImageData: Uint8ClampedArray,
  width: number,
  height: number
): Uint8ClampedArray => {
  if (!resizedImageData?.buffer || !maskImageData?.buffer) {
    throw new Error("Invalid image data");
  }

  const blendedData = new Uint8ClampedArray(width * height * 4);

  for (let i = 0; i < width * height * 4; i += 4) {
    const r = maskImageData[i];
    const g = maskImageData[i + 1];
    const b = maskImageData[i + 2];
    
    if (r === 0 && g === 0 && b === 0) {
      // For masked (black) areas, copy original pixel with alpha set to 0
      blendedData[i] = resizedImageData[i] + 80;
      blendedData[i + 1] = resizedImageData[i + 1];
      blendedData[i + 2] = resizedImageData[i + 2];
      blendedData[i + 3] = 100; // Transparent
    } else {
      // For non-masked areas, copy original pixel with full opacity
      blendedData[i] = resizedImageData[i];
      blendedData[i + 1] = resizedImageData[i + 1];
      blendedData[i + 2] = resizedImageData[i + 2];
      blendedData[i + 3] = 255; // Fully opaque
    }
  }

  return blendedData;
}

export const blendImages = (
	resizedImageData: Uint8ClampedArray,
	maskImageData: Uint8ClampedArray,
	height: number,
	width: number,
): Uint8ClampedArray => {
	if (!resizedImageData || !resizedImageData.buffer) {
		throw new Error("Invalid imageData passed to blendImages.");
	}
	if (!maskImageData || !maskImageData.buffer) {
		throw new Error("Invalid maskImageData in prediction.");
	}

	const blendedData = new Uint8ClampedArray(width * height * 4);
	const original = new Uint32Array(resizedImageData.buffer);
	const mask = new Uint32Array(maskImageData.buffer);
	const blended = new Uint32Array(blendedData.buffer);

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = y * width + x;

			if (isBackgroundPixel(mask[i])) {
				blended[i] = 0x00000000; // Transparent for background pixels
			} else {
				blended[i] = original[i]; // Keep original pixels
			}
		}
	}

	return blendedData;
};

export const createPreview = async ({
	canvasRef,
	width,
	height,
	maskImageData,
	resizedImageData,
	gaussianBlurIntensity = 2,
}: {
		canvasRef: React.RefObject<HTMLCanvasElement>;
		width: number;
		height: number;
		maskImageData: Uint8ClampedArray; // Assuming this is the segmentation map
		resizedImageData: Uint8ClampedArray;
		gaussianBlurIntensity?: number;
	}) => {
	console.log({ canvasRef, width, height, gaussianBlurIntensity });

	if (!canvasRef.current) throw new Error("Canvas reference is missing.");

	const canvas = canvasRef.current;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to get canvas context.");

	// Set canvas dimensions based on width and height
	canvas.width = width;
	canvas.height = height;

	// Draw the resized image data onto the canvas
	ctx.putImageData(new ImageData(resizedImageData, width, height), 0, 0);

	// Blend and smooth the image data using mask data
	const blendedData = blendImages(resizedImageData, maskImageData, width, height);

	const smoothedData = applyGaussianBlur(
		blendedData,
		width,
		height,
		gaussianBlurIntensity
	);

	ctx.putImageData(
		new ImageData(smoothedData, width, height),
		0,
		0
	);
};

interface CookImageResult {
  resizedImageData: Uint8ClampedArray; // ImageData for the resized image
  maskImageData: Uint8ClampedArray; // Mask data with dimensions and segmentation map
  width: number; // Width of the prediction
  height: number; // Height of the prediction
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function cookImage(imageUrlOriginal: string, model: any): Promise<CookImageResult> {
  if (!model) {
    throw new Error("Model not available.");
  }

  const virtualImageElement = document.createElement("img");
  virtualImageElement.src = imageUrlOriginal;

  return new Promise<CookImageResult>((resolve, reject) => {
    virtualImageElement.onload = async () => {
      try {
        const prediction = await model.segment(virtualImageElement);

        // Create a canvas to draw the resized image
        const canvas = document.createElement("canvas");
        canvas.width = prediction.width;
        canvas.height = prediction.height;
        const ctx = canvas.getContext("2d")!;

        // Draw the original image onto the canvas
        ctx.drawImage(virtualImageElement, 0, 0, canvas.width, canvas.height);

        // Get ImageData for both resized image and mask
        const resizedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const maskImageData = prediction.segmentationMap as Uint8ClampedArray;

        resolve({
          resizedImageData: resizedImageData.data,
          maskImageData,
          width: prediction.width,
          height: prediction.height,
        });
      } catch (error) {
        reject(error);
      }
    };

    virtualImageElement.onerror = () => {
      reject(new Error("Failed to load the image for processing."));
    };
  });
}
