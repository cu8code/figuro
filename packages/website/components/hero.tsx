import { ProcessingVisualization } from "./processVisulation";
import { WrapperCall, WrapperGetStarted } from "./utils";

export const Hero = () => {
	return (
		<div className="w-full flex flex-col">
			<div className="bg-[#E90074] h-2 w-full"></div>
			<div className="bg-[#000000] h-screen lg:h-[80vh] flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
				{/* Top Left Section with Logo and Login Button */}
				<div className="w-full max-w-6xl flex justify-between items-center absolute top-6">
					<div className="flex items-center space-x-2">
						<span className="text-white text-2xl font-extrabold tracking-wide">Figuro</span>
						<span className="text-sm font-bold text-[#E90074] bg-white px-2 py-0.5 rounded-md uppercase">Beta</span>
					</div>
					<button className="bg-[#E90074] text-white px-4 py-2 rounded-lg hover:bg-[#e28e4f]">
						<b>Log in</b>
					</button>
				</div>

				{/* Main Content Section */}
				<div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:gap-12 gap-4">
					<div className="w-full lg:w-1/2 text-white text-center lg:text-left">
						<h1 className="text-4xl font-bold mb-4">
							Empowering <span className="text-[#E90074]">Creators</span>, 
							Protecting <span className="text-[#E90074]">Content</span>
						</h1>
						<p className="text-lg mb-6">
							A platform <span className="text-[#E90074]">built by YouTubers</span>, 
							for YouTubers, ensuring your content is safe from theft and piracy. 
							<span className="text-[#E90074] font-bold">
								Powered by Humans
							</span>, we safeguard your creations and your passion.
						</p>
						{/* Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <WrapperGetStarted>
							<button className="bg-[#E90074] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#e28e4f] transition-all duration-300">
								Get Started for Free
							</button>
                            </WrapperGetStarted>
                            <WrapperCall>
							<button className="bg-transparent border-2 border-[#E90074] text-[#E90074] py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#E90074] hover:text-white transition-all duration-300">
								Book a Call
							</button>
                            </WrapperCall>
						</div>
					</div>

					{/* Call the new Processing Visualization component */}
					<ProcessingVisualization />
				</div>
			</div>
		</div>
	);
};
