import React from 'react';
import SemanticSegmentation from "@/components/segmentation";
import { Camera, Upload, Download, Shield, Clock, HardHat as Magic, Sparkles, Star, Users, Crown, Laptop, Share2, Database, Cloud, Gift } from 'lucide-react';
import FAQ from './faq';
import { Navbar } from './navbar';


const Page = () => {
	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
			<Navbar />
			<Hero />
			<Awards />
			<HowToUse />
			<Features />
			<Testimonials />
			<FAQ />
		</div>
	);
};


const Hero = () => {
	return (
		<div className="relative overflow-hidden bg-gray-50">
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-50" />
			<div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
						Remove Background with
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI</span>
					</h1>
					<p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12">
						Get perfect results in seconds. No credit card required.
					</p>
					<SemanticSegmentation  />
					<div className="mt-8 flex justify-center gap-4 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4" />
							Fast Processing
						</div>
						<div className="flex items-center gap-2">
							<Shield className="w-4 h-4" />
							100% Secure
						</div>
						<div className="flex items-center gap-2">
							<Magic className="w-4 h-4" />
							High Quality
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
const Awards = () => {
	const awards = [
		{ icon: "🏆", title: "Product of the Year", subtitle: "AI Awards 2024" },
		{ icon: "⭐", title: "Editor's Choice", subtitle: "Tech Review" },
		{ icon: "💫", title: "Best AI Tool", subtitle: "Designer's Pick" }
	];

	return (
		<div className="bg-white py-16">
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-center text-2xl font-bold mb-8">Our Awards</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{awards.map((award) => (
						<div key={award.title} className="flex items-center justify-between p-8 rounded-2xl transition-colors">
							<Flag_l />
							<div className='flex flex-col items-center text-center'>
								<span className="text-6xl mb-4">{award.icon}</span>
								<h3 className="text-lg font-semibold text-gray-900">{award.title}</h3>
								<p className="text-sm text-gray-600">{award.subtitle}</p>
							</div>
							<Flag_r />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};




const HowToUse = () => {
	const steps = [
		{ icon: <Upload className="w-6 h-6" />, title: "Upload Image" },
		{ icon: <Magic className="w-6 h-6" />, title: "Auto Remove" },
		{ icon: <Download className="w-6 h-6" />, title: "Download" }
	];

	return (
		<div id='how' className="bg-gray-50 py-24">
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
				<div className="relative">
					<div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
					<div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
						{steps.map((step, index) => (
							<div key={index} className="flex flex-col items-center">
								<div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 relative z-10">
									{step.icon}
								</div>
								<h3 className="text-lg font-semibold">{step.title}</h3>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const Features = () => {
	const features = [
		{
			icon: <Clock />,
			title: "Lightning Fast Processing",
			description: "Process HD images in under 5 seconds. Batch process up to 100 images simultaneously with our enterprise plan.",
			stat: "5s average"
		},
		{
			icon: <Magic />,
			title: "Smart AI Detection",
			description: "Advanced neural networks trained on 100M+ images. Handles complex edges, hair, and transparent objects with precision.",
			stat: "99.9% accuracy"
		},
		{
			icon: <Sparkles />,
			title: "Perfect Results Every Time",
			description: "Export in any format up to 4K resolution. Preserve fine details with our proprietary edge refinement technology.",
			stat: "4K support"
		},
		{
			icon: <Shield />,
			title: "Enterprise-Grade Security",
			description: "ISO 27001 certified. All images are encrypted at rest and in transit. Auto-deletion after processing.",
			stat: "ISO 27001"
		},
		{
			icon: <Cloud />,
			title: "Cloud Storage Integration",
			description: "Direct integration with Dropbox, Google Drive, and AWS. Automatic backup and version control.",
			stat: "Unlimited storage"
		},
		{
			icon: <Database />,
			title: "Powerful API Access",
			description: "RESTful API with comprehensive documentation. Process thousands of images programmatically.",
			stat: "99.9% uptime"
		},
		{
			icon: <Share2 />,
			title: "Team Collaboration",
			description: "Share projects, comment on edits, and manage permissions. Real-time notifications and activity tracking.",
			stat: "Unlimited users"
		},
		{
			icon: <Gift />,
			title: "Premium Assets",
			description: "Access 1M+ premium backgrounds, effects, and templates. New content added weekly.",
			stat: "1M+ assets"
		}
	];

	return (
		<div className="bg-white py-24">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful tools trusted by 10+ businesses worldwide</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{features.map((feature) => (
						<div key={feature.title} className="group">
							<div className="mb-6 w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
								{feature.icon}
							</div>
							<div className="flex justify-between items-start mb-2">
								<h3 className="text-lg font-semibold">{feature.title}</h3>
								<span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-nowrap">{feature.stat}</span>
							</div>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const Testimonials = () => {
	const testimonials = [
		{
			name: "Sarah Johnson",
			role: "Lead Designer at Dribbble",
			quote: "We've processed over 100,000 product images using removebackground.figuro.in. The time savings are incredible, and the quality is consistently outstanding.",
			image: <Users className="w-12 h-12 text-blue-600" />,
			rating: 5,
			platform: "Trustpilot"
		},
		{
			name: "Mike Chen",
			role: "Professional Photographer",
			quote: "As someone who processes thousands of photos monthly, the batch processing and API integration have been game-changers for my workflow.",
			image: <Camera className="w-12 h-12 text-blue-600" />,
			rating: 5,
			platform: "G2"
		},
		{
			name: "Emma Davis",
			role: "Marketing Director at Shopify",
			quote: "The enterprise features like team collaboration and cloud storage integration fit perfectly into our content creation pipeline.",
			image: <Crown className="w-12 h-12 text-blue-600" />,
			rating: 5,
			platform: "Capterra"
		},
		{
			name: "Alex Rodriguez",
			role: "E-commerce Manager",
			quote: "We've seen a 60% reduction in image processing time since switching to removebackground.figuro.in. The API integration is flawless.",
			image: <Laptop className="w-12 h-12 text-blue-600" />,
			rating: 5,
			platform: "Trustpilot"
		}
	];

	return (
		<div className="bg-gray-50 py-24">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<span className="text-blue-600 font-semibold">TESTIMONIALS</span>
					<h2 className="text-3xl font-bold mt-2 mb-4">Loved by 100+ Creators</h2>
					<p className="text-xl text-gray-600">Join the community of satisfied professionals</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{testimonials.map((testimonial) => (
						<div key={testimonial.name} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
							<div className="flex justify-between items-start mb-6">
								<div className="flex gap-4">
									<div>
										<p className="font-semibold">{testimonial.name}</p>
										<p className="text-sm text-gray-500">{testimonial.role}</p>
									</div>
								</div>
								<div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
									<Star className="w-4 h-4 text-blue-600 fill-current" />
									<span className="text-sm text-blue-600">{testimonial.platform}</span>
								</div>
							</div>
							<p className="text-gray-600 mb-6">{'"'}{testimonial.quote}{'"'}</p>
							<div className="flex gap-1">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const Flag_r = () => {
	return (<svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:h-[60px] sm:w-[30px] h-8 w-4 shrink-0 -scale-x-100"><path d="M14.0947 9.35871C16.8587 9.08173 19.5519 5.86753 19.2482 1.59668C15.2005 2.17114 12.7117 6.59369 14.0947 9.35871Z" fill="#404147"></path><path d="M9.84495 15.0454C11.3313 13.8755 12.8841 8.96429 9.62272 5.5204C5.42024 8.68822 8.16782 14.1711 9.84495 15.0454Z" fill="#404147"></path><path d="M8.46051 23.3394C9.32182 21.6553 9.0378 16.0771 4.0246 15.0236C1.87123 19.234 6.57147 23.2461 8.46051 23.3394Z" fill="#404147"></path><path d="M8.77875 32.5161C9.07611 30.648 6.91525 24.8271 1.82228 25.3781C1.0788 30.0483 6.2582 32.8936 8.77875 32.5161Z" fill="#404147"></path><path d="M11.9011 41.4024C11.7067 39.4928 7.80018 34.1114 2.48796 34.954C3.04076 41.4024 10.0796 42.0072 11.9011 41.4024Z" fill="#404147"></path><path d="M17.5849 49.6023C16.9542 47.5302 10.9975 42.1893 5.07298 43.8383C7.33357 50.3866 15.6209 50.5148 17.5849 49.6023Z" fill="#404147"></path><path d="M24.8713 56.5979C23.8075 54.7112 17.1405 50.6749 11.7124 53.5655C14.3717 58.2824 21.3974 58.8228 24.8713 56.5979Z" fill="#404147"></path><path d="M26.5857 55.0667C28.347 54.4303 30.5452 48.9804 25.9242 46.1679C21.7057 49.784 24.2179 53.7486 26.5857 55.0667Z" fill="#404147"></path><path d="M19.5207 48.7717C21.3778 48.5311 24.5242 43.6143 20.6204 39.8695C15.7201 42.4882 18.3433 47.3157 19.5207 48.7717Z" fill="#404147"></path><path d="M13.8978 40.9918C15.6131 41.0353 18.6613 37.4608 16.1737 33.5105C12.0313 36.0546 13.0368 39.508 13.8978 40.9918Z" fill="#404147"></path><path d="M10.1811 32.3355C11.8166 32.7276 15.575 30.4957 14.2307 25.9681C9.53946 26.0767 9.8478 30.7897 10.1811 32.3355Z" fill="#404147"></path><path d="M10.12 23.6177C11.3059 24.3893 16.173 23.0644 16.1718 18.8474C12.0709 17.9523 10.1563 22.2037 10.12 23.6177Z" fill="#404147"></path><path d="M11.775 15.8755C12.9608 16.6471 18.1349 16.152 17.8265 11.7638C14.5411 11.176 11.8113 14.4615 11.775 15.8755Z" fill="#404147"></path></svg>
	)
}

const Flag_l = () => {
	return (
		<svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:h-[60px] sm:w-[30px] h-8 w-4 shrink-0"><path d="M14.0947 9.35871C16.8587 9.08173 19.5519 5.86753 19.2482 1.59668C15.2005 2.17114 12.7117 6.59369 14.0947 9.35871Z" fill="#404147"></path><path d="M9.84495 15.0454C11.3313 13.8755 12.8841 8.96429 9.62272 5.5204C5.42024 8.68822 8.16782 14.1711 9.84495 15.0454Z" fill="#404147"></path><path d="M8.46051 23.3394C9.32182 21.6553 9.0378 16.0771 4.0246 15.0236C1.87123 19.234 6.57147 23.2461 8.46051 23.3394Z" fill="#404147"></path><path d="M8.77875 32.5161C9.07611 30.648 6.91525 24.8271 1.82228 25.3781C1.0788 30.0483 6.2582 32.8936 8.77875 32.5161Z" fill="#404147"></path><path d="M11.9011 41.4024C11.7067 39.4928 7.80018 34.1114 2.48796 34.954C3.04076 41.4024 10.0796 42.0072 11.9011 41.4024Z" fill="#404147"></path><path d="M17.5849 49.6023C16.9542 47.5302 10.9975 42.1893 5.07298 43.8383C7.33357 50.3866 15.6209 50.5148 17.5849 49.6023Z" fill="#404147"></path><path d="M24.8713 56.5979C23.8075 54.7112 17.1405 50.6749 11.7124 53.5655C14.3717 58.2824 21.3974 58.8228 24.8713 56.5979Z" fill="#404147"></path><path d="M26.5857 55.0667C28.347 54.4303 30.5452 48.9804 25.9242 46.1679C21.7057 49.784 24.2179 53.7486 26.5857 55.0667Z" fill="#404147"></path><path d="M19.5207 48.7717C21.3778 48.5311 24.5242 43.6143 20.6204 39.8695C15.7201 42.4882 18.3433 47.3157 19.5207 48.7717Z" fill="#404147"></path><path d="M13.8978 40.9918C15.6131 41.0353 18.6613 37.4608 16.1737 33.5105C12.0313 36.0546 13.0368 39.508 13.8978 40.9918Z" fill="#404147"></path><path d="M10.1811 32.3355C11.8166 32.7276 15.575 30.4957 14.2307 25.9681C9.53946 26.0767 9.8478 30.7897 10.1811 32.3355Z" fill="#404147"></path><path d="M10.12 23.6177C11.3059 24.3893 16.173 23.0644 16.1718 18.8474C12.0709 17.9523 10.1563 22.2037 10.12 23.6177Z" fill="#404147"></path><path d="M11.775 15.8755C12.9608 16.6471 18.1349 16.152 17.8265 11.7638C14.5411 11.176 11.8113 14.4615 11.775 15.8755Z" fill="#404147"></path></svg>
	)
}
export default Page;