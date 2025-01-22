import Image from "next/image";
import { WrapperCall } from "./utils";
import me from "@/app/assets/me.png";

export const Hero = () => {
    // List of icons to display in the background
    const icons = [
        { src: "/icons/google.svg", alt: "Google", size: 40, top: "10%", left: "5%", animation: "float1" },
        { src: "/icons/microsoft.svg", alt: "Microsoft", size: 50, top: "20%", left: "80%", animation: "float2" },
        { src: "/icons/n8n.svg", alt: "n8n", size: 60, top: "50%", left: "15%", animation: "float3" },
        { src: "/icons/slack.svg", alt: "Slack", size: 45, top: "70%", left: "70%", animation: "float4" },
        { src: "/icons/zoom.svg", alt: "Zoom", size: 40, top: "30%", left: "50%", animation: "float5" },
        { src: "/icons/trello.svg", alt: "Trello", size: 50, top: "60%", left: "40%", animation: "float6" },
    ];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Pink top bar */}
            <div className="bg-[#E90074] h-2 w-full"></div>

            {/* Main hero section with grid lines */}
            <div className="bg-[#000000] min-h-screen lg:min-h-[80vh] relative">
                {/* Grid lines background */}
                <div className="absolute inset-0 w-full h-full bg-[size:40px_40px] bg-[linear-gradient(to_right,#2c2c2c_1px,transparent_1px),linear-gradient(to_bottom,#2c2c2c_1px,transparent_1px)] opacity-30"></div>

                {/* Floating Icons Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {icons.map((icon, index) => (
                        <div
                            key={index}
                            className="absolute opacity-50"
                            style={{
                                top: icon.top,
                                left: icon.left,
                                width: `${icon.size}px`,
                                height: `${icon.size}px`,
                                animation: `${icon.animation} 10s infinite ease-in-out`,
                            }}
                        >
                            <Image
                                src={icon.src}
                                alt={icon.alt}
                                width={icon.size}
                                height={icon.size}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Content wrapper */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen lg:min-h-[80vh] px-4 sm:px-8 md:px-16 pt-24 lg:pt-16">
                    {/* Top Left Section with Logo and Login Button */}
                    <div className="w-full max-w-6xl flex justify-between items-center absolute top-6 lg:top-8">
                        <div className="flex items-center space-x-2">
                            <span className="text-white text-2xl font-extrabold tracking-wide">Figuro</span>
                            <span className="text-sm font-bold text-[#E90074] bg-white px-2 py-0.5 rounded-md uppercase">Agency</span>
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:gap-12 gap-8 mt-16 lg:mt-0">
                        <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
                            <h1 className="text-4xl font-bold mb-6">
                                Automate Your Workflows, <span className="text-[#E90074]">Simplify Your Life</span>
                            </h1>
                            <p className="text-lg mb-8">
                                At Figuro, we specialize in crafting custom n8n workflows for individuals and agencies.
                                <span className="text-[#E90074] font-bold">
                                    Powered by Expertise
                                </span>, we streamline your processes, boost productivity, and help you focus on what truly matters.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <WrapperCall>
                                    <button className="bg-[#E90074] text-white py-4 px-12 rounded-lg text-lg font-semibold hover:bg-[#ff1a8c] hover:scale-105 transition-all duration-300 transform border-2 border-white/20 shadow-[0_4px_6px_-1px_rgba(233,0,116,0.3),0_2px_4px_-1px_rgba(233,0,116,0.2)] hover:shadow-[0_6px_8px_-1px_rgba(233,0,116,0.4),0_4px_6px_-1px_rgba(233,0,116,0.3)]">
                                        Book a Call
                                    </button>
                                </WrapperCall>
                            </div>
                        </div>

                        {/* Right Side: Your Image */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
                                <Image
                                    src={me}
                                    alt="Your Image"
                                    fill
                                    className="object-cover rounded-full border-4 border-[#E90074] shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};