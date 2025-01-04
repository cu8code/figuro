"use client"
import { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Importing the ChevronDown icon

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const faqs = [
		{
			question: "How accurate is the AI?",
			answer: "The AI is trained on extensive datasets and continuously learns to improve its accuracy.",
		},
		{
			question: "Is it free?",
			answer: "Yes, we offer a free tier with limited features.",
		},
		{
			question: "Is it unlimited?",
			answer: "The free tier has usage limits, but paid plans offer unlimited access.",
		},
		{
			question: "Is it free for a lifetime?",
			answer: "The free tier is available indefinitely, but premium features require a subscription.",
		}
	];

	const toggleAnswer = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="bg-white py-24">
			<div className="max-w-3xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-16">Common Questions</h2>
				<div className="space-y-6">
					{faqs.map((faq, index) => (
						<div key={index} className="border-b border-gray-200">
							<button 
								className="flex justify-between items-center w-full py-6 text-left"
								onClick={() => toggleAnswer(index)}
							>
								<h3 className="text-lg font-medium">{faq.question}</h3>
								<ChevronDown 
									className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} 
								/>
							</button>
							<div 
								className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
							>
								<p className="mt-2 text-gray-600">{faq.answer}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FAQ;
