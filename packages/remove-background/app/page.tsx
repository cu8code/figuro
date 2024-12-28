import SemanticSegmentation from "@/components/segmentation";

const Page = () => {
	return (
		<div className='min-h-screen bg-white'>
			<Navbar />
			<div className='w-full h-1 bg-gray-100' />
			<Hero />
			<Footer />
		</div>
	)
}

const Navbar = () => {
	return (
		<nav className="w-full bg-white p-4 shadow-sm">
			<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
				<h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
					Remove Background
				</h1>

				<div className="flex gap-3 text-sm md:text-base">
					<span className="bg-gray-800 text-white px-4 py-1.5 rounded-md font-medium hover:bg-gray-700 transition-colors">
						NO ADS
					</span>
					<span className="bg-gray-800 text-white px-4 py-1.5 rounded-md font-medium hover:bg-gray-700 transition-colors">
						UNLIMITED
					</span>
				</div>
			</div>
		</nav>
	);
};

const Hero = () => {
	return (
		<div className="w-full min-h-[80vh] bg-white p-4">
			<div className="max-w-7xl mx-auto py-12">
				<SemanticSegmentation />
			</div>
		</div>
	)
}

const Footer = () => {
	return (
		<footer className="w-full bg-white border-t border-gray-100 p-4">
			<div className="max-w-7xl mx-auto">
				{/* Footer content will go here */}
			</div>
		</footer>
	)
}


export default  Page

