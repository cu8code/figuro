import { HeroGraph } from "@/components/bargraph";
import { SelectionDate } from "@/components/dateSelect";
import { RecentTables } from "@/components/recent";
import { Plus, Play, Target, TrendingUp, MoveDownLeft, MoveUpRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<main className="flex-1 p-4 space-y-6">
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
					<Link href={"/dashboard/scan-new-content"}>
						<button className="flex items-center gap-2 px-6 py-2 bg-white text-[#e90074] font-semibold rounded-lg shadow-md transition duration-200">
							<Plus className="w-5 h-5" />
							Scan New Content
						</button>
					</Link>
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

			<div className="flex flex-col p-6 border rounded-2xl bg-white">
				<SelectionDate />

				<div className="flex flex-col md:flex-row gap-6">
					<div className="flex-1 basis-2/3">
						<HeroGraph />
					</div>

					{/* Styled Divider */}
					<div className="hidden md:block h-auto w-[1px] border-r mx-4 rounded-full"></div>

					<div className="flex flex-col basis-1/3 justify-center items-center gap-10">
						<div className="flex flex-row items-start gap-2">
							<div className="flex w-full h-full justify-center items-center">
								<div className="bg-[#e90074] text-white rounded-xl p-2 font-bold">
									<MoveDownLeft className="w-10 h-10" />
								</div>
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
								<div className="flex w-full h-full justify-center items-center">
									<div className="bg-green-600 text-white rounded-xl p-2 font-bold">
										<MoveUpRight className="w-10 h-10" />
									</div>
								</div>
								<div>
									<p className="text-md font-medium flex items-center gap-2">
										Resolved
									</p>
									<div className="flex items-baseline gap-3 text-lg font-semibold">
										<div className="text-6xl">100</div>
										<div className="text-md text-green-600">10.6%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<RecentTables />
		</main>
	);
}
