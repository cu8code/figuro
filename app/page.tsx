import { Building2, AArrowDown, Shield, Bot} from 'lucide-react';

type CardProps = {
	className?: string;
	children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ className, children }) => {
	return (
		<div className={`rounded-lg shadow-md border border-gray-300 bg-white ${className}`}>
			{children}
		</div>
	);
};

type CardHeaderProps = {
	className?: string;
	children: React.ReactNode;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
	return (
		<div className={`p-4 border-b border-gray-200 ${className}`}>
			{children}
		</div>
	);
};


type CardContentProps = {
	className?: string;
	children: React.ReactNode;
};

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
	return (
		<div className={`p-4 ${className}`}>
			{children}
		</div>
	);
};

export default function Home() {
	return (
		<>
			<Hero />
			<Midsection />
			<Footer />
		</>
	);
}

export const Call = () => {
	return (
		<div></div>
	)
}

import React from 'react';
import { Check, X } from 'lucide-react';

export const Midsection = () => {
	const comparisons = [
		{
			question: "Anonymous Protection?",
			us: "Complete anonymity throughout the entire process",
			them: "Often requires public involvement",
			usHas: true,
			themHas: false
		},
		{
			question: "Control Level?",
			us: "Full control over protection levels and actions taken",
			them: "Fixed approach with limited flexibility",
			usHas: true,
			themHas: false
		},
		{
			question: "Real-time Updates?",
			us: "Instant notifications and status updates",
			them: "Delayed or limited communication",
			usHas: true,
			themHas: false
		},
		{
			question: "Brand Protection?",
			us: "Quiet, behind-the-scenes resolution",
			them: "Public callouts and confrontations",
			usHas: true,
			themHas: false
		},
		{
			question: "AI-Powered?",
			us: "Advanced AI detection and monitoring",
			them: "Manual review processes",
			usHas: true,
			themHas: false
		},
		{
			question: "Customizable Actions?",
			us: "Multiple response options available",
			them: "One-size-fits-all approach",
			usHas: true,
			themHas: false
		}
	];

	return (
		<div className="w-full bg-white py-16">
			<div className="max-w-6xl mx-auto px-4">
				{/* Budget Section */}
				<div className="mb-16 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-8">
						Protecting Your Content Shouldn't Break the Bank
					</h2>
					<div className="max-w-3xl mx-auto">
						<p className="text-xl md:text-2xl mb-8 leading-relaxed">
							Tired of seeing your hard work stolen while big creators have teams of lawyers? We level the playing field. Our AI-powered protection means you get enterprise-level content security at creator-friendly prices.
						</p>
						<div className="grid md:grid-cols-2 gap-8 text-left mb-8">
							<div className="bg-gray-50 p-8 rounded-lg">
								<div className="flex items-center gap-3 mb-4">
									<Shield className="w-8 h-8 text-[#E90074]" />
									<h3 className="font-bold text-2xl">Smart Protection</h3>
								</div>
								<p className="text-lg">24/7 monitoring and instant action against content theft, keeping your brand and revenue safe without the enterprise price tag.</p>
							</div>
							<div className="bg-gray-50 p-8 rounded-lg">
								<div className="flex items-center gap-3 mb-4">
									<Bot className="w-8 h-8 text-[#E90074]" />
									<h3 className="font-bold text-2xl">AI-Powered Value</h3>
								</div>
								<p className="text-lg">Our AI technology works round the clock, catching thieves faster than human teams - at a fraction of the cost of traditional legal services.</p>
							</div>
						</div>
						<div className="flex justify-center">
							<Call />
						</div>
					</div>
				</div>

				{/* Responsive Comparison Table */}
				<div className="overflow-hidden shadow-lg rounded-2xl">
					<div className="hidden sm:grid sm:grid-cols-3 bg-gray-100">
						<div className="p-6 text-xl font-bold">Feature</div>
						<div className="p-6 text-xl font-bold bg-[#E90074] text-white">Figuro</div>
						<div className="p-6 text-xl font-bold bg-gray-600 text-white">Other Agencies</div>
					</div>

					{comparisons.map((item, index) => (
						<div
							key={index}
							className="grid grid-cols-1 sm:grid-cols-3 sm:gap-0 gap-4 sm:border-none border-b sm:bg-transparent bg-gray-50"
						>
							<div className="p-6 text-lg font-medium sm:border-b">{item.question}</div>
							<div className="p-6 text-lg bg-pink-50 sm:border-b">
								<div className="flex items-center gap-2">
									<Check className="w-6 h-6 text-green-500 flex-shrink-0" />
									<span>{item.us}</span>
								</div>
							</div>
							<div className="p-6 text-lg bg-gray-50 sm:border-b">
								<div className="flex items-center gap-2">
									<X className="w-6 h-6 text-red-500 flex-shrink-0" />
									<span className="text-gray-600">{item.them}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};




export const Footer = () => {
	const socials = [
		{ name: "Twitter", url: "https://twitter.com/figuro" },
		{ name: "LinkedIn", url: "https://linkedin.com/company/figuro" },
		{ name: "YouTube", url: "https://youtube.com/@figuro" },
		{ name: "Instagram", url: "https://instagram.com/figuro" }
	];

	return (
		<footer className="bg-[#000] pt-16 pb-8">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-12">Simple, Transparent Pricing</h2>
					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						<Card className="border-2 hover:border-[#E90074] transition-all duration-300">
							<CardHeader className="text-center p-6">
								<div className="flex justify-center mb-4">
									<AArrowDown className="w-12 h-12 text-[#E90074]" />
								</div>
								<h3 className="text-2xl font-bold">Individual Creator</h3>
								<div className="mt-4">
									<span className="text-4xl font-bold">$0</span>
									<span className="text-gray-600">/month</span>
								</div>
							</CardHeader>
							<CardContent className="p-6">
								<ul className="space-y-4 text-left">
									<li className="flex items-center gap-2">
										<Check className="w-5 h-5 text-green-500" />
										<span>Basic content monitoring</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="w-5 h-5 text-green-500" />
										<span>Up to 10 videos/month</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="w-5 h-5 text-green-500" />
										<span>Email support</span>
									</li>
								</ul>
								<button className="w-full bg-[#E90074] text-white py-3 rounded-lg mt-6 font-semibold">
									Get Started Free
								</button>
							</CardContent>
						</Card>

						<Card className="border-2 hover:border-[#E90074] transition-all duration-300 relative">
							<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
								<span className="bg-[#E90074] text-white px-4 py-1 rounded-full text-sm font-medium">
									Coming Soon
								</span>
							</div>
							<CardHeader className="text-center p-6">
								<div className="flex justify-center mb-4">
									<Building2 className="w-12 h-12 text-[#E90074]" />
								</div>
								<h3 className="text-2xl font-bold">Industry Leader</h3>
								<div className="mt-4">
									<span className="text-4xl font-bold">$10</span>
									<span className="text-gray-600">/month</span>
								</div>
							</CardHeader>
							<CardContent className="p-6">
								<ul className="space-y-4 text-left">
									<li className="flex items-center gap-2 text-gray-400">
										<Check className="w-5 h-5" />
										<span>Advanced AI monitoring</span>
									</li>
									<li className="flex items-center gap-2 text-gray-400">
										<Check className="w-5 h-5" />
										<span>Unlimited videos</span>
									</li>
									<li className="flex items-center gap-2 text-gray-400">
										<Check className="w-5 h-5" />
										<span>24/7 priority support</span>
									</li>
								</ul>
								<button disabled className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg mt-6 font-semibold cursor-not-allowed">
									Coming Soon
								</button>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="border-t text-white pt-8 flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						© 2024 Figuro. All rights reserved.
					</div>
					<div className="flex gap-6">
						{socials.map(social => (
							<a
								key={social.name}
								href={social.url}
								className="hover:text-[#E90074] transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								{social.name}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};



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
								Powered by AI
							</span>, we safeguard your creations and your passion.
						</p>
						{/* Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<button className="bg-[#E90074] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#e28e4f] transition-all duration-300">
								Get Started for Free
							</button>
							<button className="bg-transparent border-2 border-[#E90074] text-[#E90074] py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#E90074] hover:text-white transition-all duration-300">
								Book a Call
							</button>
						</div>
					</div>

					{/* Call the new Processing Visualization component */}
					<ProcessingVisualization />
				</div>
			</div>
		</div>
	);
};


const ProcessingVisualization = () => {
	return (
		<div className="w-full lg:w-1/2 flex justify-center items-center">
			<iframe
				width="100%"
				height="315"
				src="https://www.youtube.com/embed/hI9HQfCAw64"
				title="YouTube video"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="rounded-lg"
			></iframe>
		</div>
	);
};

