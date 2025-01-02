import { Shield, Bot, Check, X } from "lucide-react";
import { WrapperGetStarted } from "./utils";

export const Call = () => {
	return (
        <WrapperGetStarted>
		<button className="bg-[#E90074] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#e28e4f] transition-all duration-300">
			Get Started for Free
		</button>
        </WrapperGetStarted>
	)
}

export const Midsection = () => {
	const comparisons = [
        {
          question: "Do you monitor for illegal usage of my content?",
          us: "Advanced AI and human expertise for thorough monitoring.",
          them: "Limited or manual monitoring options.",
          usHas: true,
          themHas: false,
        },
        {
          question: "Will I be notified about unauthorized use of my content?",
          us: "Prompt notifications with actionable insights.",
          them: "Delayed or incomplete updates.",
          usHas: true,
          themHas: false,
        },
        {
          question: "Can I handle content protection on my own terms?",
          us: "Full control over actions and protection levels.",
          them: "One-size-fits-all approach with minimal flexibility.",
          usHas: true,
          themHas: false,
        },
        {
          question: "Do you offer optional representation to fight for my rights?",
          us: "Optional representation with flexible pricing.",
          them: "No representation or bundled expensive services.",
          usHas: true,
          themHas: false,
        },
        {
          question: "Will you notify social media authorities on my behalf?",
          us: "Direct and efficient reporting to relevant authorities.",
          them: "Requires manual effort or no reporting services.",
          usHas: true,
          themHas: false,
        },
        {
          question: "Do you manage customer support interactions for content issues?",
          us: "Comprehensive customer support management.",
          them: "No support or minimal customer engagement.",
          usHas: true,
          themHas: false,
        },
        {
          question: "How do you ensure a seamless experience for creators?",
          us: "End-to-end service to save time and simplify the process.",
          them: "Fragmented services requiring constant creator involvement.",
          usHas: true,
          themHas: false,
        },
        {
          question: "Can I focus on creating while you handle content protection?",
          us: "Complete service lets you focus on your creativity.",
          them: "Creators must actively manage their own protection.",
          usHas: true,
          themHas: false,
        },
      ];
      

	return (
		<div className="w-full bg-white py-16">
			<div className="max-w-6xl mx-auto px-4">
				{/* Budget Section */}
				<div className="mb-16 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-8">
						Affordable Protection for Your Content
					</h2>
					<div className="max-w-3xl mx-auto">
						<p className="text-xl md:text-2xl mb-8 leading-relaxed">
							Stop losing your hard work to content theft. We bring you enterprise-grade protection at prices that fit creators, leveling the playing field against big brands.
						</p>
						<div className="grid md:grid-cols-2 gap-8 text-left mb-8">
							<div className="bg-gray-50 p-8 rounded-lg">
								<div className="flex items-center gap-3 mb-4">
									<Shield className="w-8 h-8 text-[#E90074]" />
									<h3 className="font-bold text-2xl">Comprehensive Protection</h3>
								</div>
								<p className="text-lg">
									24/7 monitoring to safeguard your brand and revenue, offering enterprise-level security without breaking the bank.
								</p>
							</div>
							<div className="bg-gray-50 p-8 rounded-lg">
								<div className="flex items-center gap-3 mb-4">
									<Bot className="w-8 h-8 text-[#E90074]" />
									<h3 className="font-bold text-2xl">AI-Driven Efficiency</h3>
								</div>
								<p className="text-lg">
									Our AI ensures quick action against content theft, outperforming traditional manual processes at a fraction of the cost.
								</p>
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
