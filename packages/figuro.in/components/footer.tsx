import { Check } from "lucide-react";
import { Card, CardContent, WrapperCall } from "./utils";

export const Footer = () => {
    const socials = [
        { name: "Twitter", url: "https://twitter.com/figuro" },
        { name: "LinkedIn", url: "https://linkedin.com/company/figuro" },
        { name: "YouTube", url: "https://youtube.com/@figuro" },
        { name: "Instagram", url: "https://instagram.com/figuro" },
    ];

    return (
        <footer className="bg-[#000] pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-12">Let’s Build Something Amazing Together</h2>
                    <div className="flex justify-center">
                        <Card className="border-2 hover:border-[#E90074] transition-all duration-300 w-full max-w-2xl">
                            <CardContent className="p-6">
                                <ul className="space-y-4 text-left">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span>Custom n8n workflow creation</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span>Custom n8n nodes development</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span>Individual automation solutions</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span>Payment and client management automation</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span>Dedicated support and consultation</span>
                                    </li>
                                </ul>
                                <div className="mt-8">
                                    <WrapperCall>
                                        <button className="w-full bg-[#E90074] text-white py-4 px-12 rounded-lg text-xl font-bold hover:bg-[#ff1a8c] hover:scale-105 transition-all duration-300 transform border-2 border-white/20 shadow-[0_4px_6px_-1px_rgba(233,0,116,0.3),0_2px_4px_-1px_rgba(233,0,116,0.2)] hover:shadow-[0_6px_8px_-1px_rgba(233,0,116,0.4),0_4px_6px_-1px_rgba(233,0,116,0.3)]">
                                            Book a Call
                                        </button>
                                    </WrapperCall>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="border-t text-white pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">© 2025 Figuro. All rights reserved.</div>
                    <div className="flex gap-6">
                        {socials.map((social) => (
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