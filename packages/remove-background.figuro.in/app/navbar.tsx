"use client";

import { Camera } from "lucide-react";
import Link from 'next/link';

export const Navbar = () => {

	return (
		<nav className="w-full backdrop-blur-md bg-white/80 p-4 sticky top-0 z-50 border-b border-gray-100">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center gap-2">
					{/* Show Camera icon only on medium screens and above */}
					<span className="hidden md:block">
						<Camera className="w-8 h-8 text-blue-600" />
					</span>
					<h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						removebackground
					</h1>
				</div>
				<div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
					<Link href="/how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
				</div>
			</div>
		</nav>
	);
};
