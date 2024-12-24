"use client";

import { HeroGraph } from "@/components/bargraph";
import { Plus, Play, Target, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Date() {
	const [selected, setSelected] = useState("Year");

	const options = ["Week", "Daily", "Month", "Year"];

	return (
		<div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
			<p className="text-xl md:text-2xl text-gray-800">Infringements Detected</p>
			<div className="flex space-x-1 text-sm bg-gray-100 p-2 rounded-2xl">
				{options.map((option) => (
					<div
						key={option}
						className={`cursor-pointer px-3 py-1 rounded-md transition ${
							selected === option ? "bg-black text-white" : ""
						}`}
						onClick={() => setSelected(option)}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	);
}

export default function Page() {
	return (
		<main className="flex-1 bg-white p-4 space-y-6">
			<div className="p-6 bg-[#e90074] text-white rounded-2xl shadow flex flex-col md:flex-row justify-between items-center gap-6">

				{/* Left Section for Scans and Percentage */}
				<div className="flex flex-col items-start gap-2">
					<h3 className="text-md font-semibold flex items-center gap-2">
						<Target className="w-5 h-5" />
						Total Copyright Scans
					</h3>
					<div className="flex flex-row items-baseline space-x-2">
						<p className="text-4xl font-bold">320</p>
						<div className="flex items-baseline text-xl font-bold text-white">
							<span>15.5%</span>
							<TrendingUp className="w-5 h-5 ml-1 text-green-300" />
						</div>
					</div>
				</div>

				{/* Right Section for Buttons */}
				<div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
					<button className="flex items-center gap-2 px-6 py-2 bg-white text-[#e90074] font-semibold rounded-lg shadow-md transition duration-200">
						<Plus className="w-5 h-5" />
						Add New Source
					</button>
					<button className="flex items-center gap-2 px-6 py-2 bg-white text-[#e90074] font-semibold rounded-lg shadow-md transition duration-200">
						<Plus className="w-5 h-5" />
						Add New Target
					</button>
					<button className="flex items-center gap-2 px-6 py-2 bg-white text-[#e90074] font-semibold rounded-lg shadow-md transition duration-200">
						<Play className="w-5 h-5" />
						Start A Full Scan
					</button>
				</div>
			</div>

			<div className="flex flex-col p-6 border rounded-2xl">
				<Date />

				<div className="flex flex-col md:flex-row gap-6">
					<div className="flex-1 basis-2/3">
						<HeroGraph />
					</div>

					{/* Styled Divider */}
					<div className="hidden md:block h-auto w-[1px] border-r mx-4 rounded-full"></div>

					<div className="flex flex-col basis-1/3 justify-center items-center gap-10">
						<div className="flex flex-row items-start gap-2">
							<div className="flex justify-center items-center">
								<AlertCircle className="text-6xl text-red-500" />
							</div>
							<div>
								<p className="text-md font-medium flex items-center gap-2">
									Infringements
								</p>
								<div className="flex items-baseline gap-3 text-lg font-semibold">
									<div className="text-6xl">511</div>
									<div className="text-md text-red-500">64.6%</div>
								</div>
							</div>
						</div>

						<div className="w-full border-b"></div>

						<div className="flex flex-col gap-2">
							<div className="flex flex-row items-start gap-2">
								<div className="flex justify-center items-center">
									<CheckCircle className="w-5 h-5 text-green-400" />
								</div>
								<div>
									<p className="text-md font-medium flex items-center gap-2">
										Resolved
									</p>
									<div className="flex items-baseline gap-3 text-lg font-semibold">
										<div className="text-6xl">100</div>
										<div className="text-md text-green-400">10.6%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
