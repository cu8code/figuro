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

