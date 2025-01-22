import { Shield, Bot, Check, X } from "lucide-react";
import { WrapperCall } from "./utils";

export const Call = () => {
    return (
        <WrapperCall>
            <button className="bg-[#E90074] text-white py-4 px-12 rounded-lg text-lg font-semibold hover:bg-[#ff1a8c] hover:scale-105 transition-all duration-300 transform border-2 border-white/20 shadow-[0_4px_6px_-1px_rgba(233,0,116,0.3),0_2px_4px_-1px_rgba(233,0,116,0.2)] hover:shadow-[0_6px_8px_-1px_rgba(233,0,116,0.4),0_4px_6px_-1px_rgba(233,0,116,0.3)]">
                Book a Call
            </button>
        </WrapperCall>
    );
};

export const Midsection = () => {
    const comparisons = [
        {
            question: "Do you create custom workflows tailored to my needs?",
            us: "Fully customized workflows designed for your unique requirements.",
            them: "Pre-built templates with limited customization options.",
            usHas: true,
            themHas: false,
        },
        {
            question: "Can you integrate with my existing tools and platforms?",
            us: "Seamless integration with hundreds of apps and services.",
            them: "Limited integration capabilities or manual setups.",
            usHas: true,
            themHas: false,
        },
        {
            question: "Do you provide ongoing support and maintenance?",
            us: "Dedicated support and regular updates to keep workflows running smoothly.",
            them: "Minimal or no ongoing support after initial setup.",
            usHas: true,
            themHas: false,
        },
        {
            question: "Can you handle complex workflows for agencies?",
            us: "Expertise in building scalable workflows for agencies of all sizes.",
            them: "Focus on individual users with limited agency solutions.",
            usHas: true,
            themHas: false,
        },
        {
            question: "Do you offer training or documentation for my team?",
            us: "Comprehensive training and detailed documentation included.",
            them: "Limited or no training resources provided.",
            usHas: true,
            themHas: false,
        },
        {
            question: "Can you automate repetitive tasks to save time?",
            us: "Efficient automation of repetitive tasks to boost productivity.",
            them: "Manual processes or partial automation.",
            usHas: true,
            themHas: false,
        },
        {
            question: "Do you ensure workflows are scalable as my business grows?",
            us: "Scalable solutions designed to grow with your business.",
            them: "Static workflows that require frequent rework.",
            usHas: true,
            themHas: false,
        },
        {
            question: "Can I focus on my business while you handle the automation?",
            us: "End-to-end automation services so you can focus on what matters.",
            them: "Requires constant involvement and management from your side.",
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
                        Streamline Your Workflows with Expert Automation
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                            Transform your business with custom n8n workflows designed to save time, reduce errors, and boost efficiency. We bring enterprise-grade automation to individuals and agencies at affordable prices.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-8 h-8 text-[#E90074]" />
                                    <h3 className="font-bold text-2xl">Tailored Solutions</h3>
                                </div>
                                <p className="text-lg">
                                    Custom workflows built specifically for your business needs, ensuring maximum efficiency and scalability.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <Bot className="w-8 h-8 text-[#E90074]" />
                                    <h3 className="font-bold text-2xl">AI-Powered Automation</h3>
                                </div>
                                <p className="text-lg">
                                    Leverage AI to automate complex tasks, reduce manual effort, and improve accuracy across your workflows.
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