import React from 'react';

const HowItWorksPage = () => {
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
					How It Works
				</h1>
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						Technical Overview of Background Removal
					</h2>
					<p className="text-gray-600 mb-6">
						Our background removal tool leverages state-of-the-art AI models to
						seamlessly separate the foreground from the background in any image.
						Here’s a step-by-step breakdown of the process:
					</p>

					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								1. Image Upload
							</h3>
							<p className="text-gray-600">
								Users upload an image in formats such as JPG, PNG, or WebP. The
								image is processed entirely on the client side, ensuring privacy
								and security.
							</p>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								2. AI-Powered Segmentation
							</h3>
							<p className="text-gray-600">
								Our AI model, based on TensorFlow.js, analyzes the image to
								identify the foreground (main subject) and the background. The
								model uses semantic segmentation techniques to achieve
								high-accuracy results, even for complex edges like hair or
								transparent objects.
							</p>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								3. Background Removal
							</h3>
							<p className="text-gray-600">
								Once the foreground is identified, the background is removed,
								resulting in a transparent background (alpha channel). The
								process is optimized for speed and quality, ensuring minimal
								artifacts.
							</p>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								4. Post-Processing
							</h3>
							<p className="text-gray-600">
								The output image undergoes post-processing to refine edges and
								enhance quality. This includes edge smoothing and noise
								reduction to ensure professional-grade results.
							</p>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								5. Download or Export
							</h3>
							<p className="text-gray-600">
								The final image is made available for download in various
								formats (PNG, JPG, etc.). Users can also directly export the
								image to their device.
							</p>
						</div>
					</div>

					<div className="mt-8">
						<h3 className="text-xl font-semibold text-gray-800 mb-4">
							Technical Stack
						</h3>
						<ul className="list-disc list-inside text-gray-600">
							<li>
								<strong>AI Model:</strong> TensorFlow.js with a pre-trained
								semantic segmentation model.
							</li>
							<li>
								<strong>Frontend:</strong> Next.js for a seamless user
								experience.
							</li>
							<li>
								<strong>Model Storage:</strong> IndexedDB for storing the AI
								model locally after the first load.
							</li>
							<li>
								<strong>Image Processing:</strong> All processing is done on the
								client side using WebAssembly and TensorFlow.js for optimal
								performance.
							</li>
						</ul>
					</div>

					<div className="mt-8">
						<h3 className="text-xl font-semibold text-gray-800 mb-4">
							How the Model is Loaded
						</h3>
						<p className="text-gray-600">
							When a user visits the site for the first time, the AI model is
							downloaded and stored in IndexedDB. On subsequent visits, the model
							is loaded directly from IndexedDB, reducing load times and
							improving performance.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowItWorksPage;
