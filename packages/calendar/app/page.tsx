"use client";

import React, { useState, MouseEvent } from "react";

interface Day {
	day: number;
	passed: boolean;
	disabled: boolean; // Indicates if the day is disabled
}

interface Tooltip {
	visible: boolean;
	content: string;
	x: number;
	y: number;
}

interface YearDotProps {
	columns?: number; // Allows dynamic control of columns
	xGap?: number; // Horizontal gap between cells
	yGap?: number; // Vertical gap between cells
}

export default function Home() {
	return <YearDot columns={20} xGap={15} yGap={30} />;
}

const YearDot: React.FC<YearDotProps> = ({ columns = 10, xGap = 5, yGap = 5 }) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const totalDaysInYear =
		(currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0
			? 366
			: 365;
	const daysPassed = Math.floor(
		(currentDate.getTime() - new Date(currentYear, 0, 1).getTime()) /
			(1000 * 60 * 60 * 24)
	);

	// Initial state for days array
	const [daysArray, setDaysArray] = useState<Day[]>(
		Array.from({ length: totalDaysInYear }, (_, index) => ({
			day: index + 1,
			passed: index < daysPassed,
			disabled: false,
		}))
	);

	// State for tooltip
	const [tooltip, setTooltip] = useState<Tooltip>({
		visible: false,
		content: "",
		x: 0,
		y: 0,
	});

	// Handlers for mouse events
	const handleMouseEnter = (event: MouseEvent<HTMLDivElement>, dayIndex: number) => {
		setTooltip({
			visible: true,
			content: `Day ${daysArray[dayIndex].day}`,
			x: event.clientX + 10, // Offset for better visibility
			y: event.clientY + 10,
		});

		// Disable subsequent days
		setDaysArray((prev) =>
			prev.map((day, index) =>
				index >= dayIndex ? { ...day, disabled: true } : { ...day, disabled: false }
			)
		);
	};

	const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (tooltip.visible) {
			setTooltip((prev) => ({
				...prev,
				x: event.clientX + 10,
				y: event.clientY + 10,
			}));
		}
	};

	const handleMouseLeave = () => {
		setTooltip({ ...tooltip, visible: false });

		// Reset all disabled states
		setDaysArray((prev) =>
			prev.map((day) => ({
				...day,
				disabled: false,
			}))
		);
	};

	return (
		<div className="flex items-center justify-center h-screen bg-black text-white">
			{/* Main Container */}
			<div
				className="grid"
				style={{
					gridTemplateRows: "auto 1fr auto", // Header, Days Grid, Footer
					gap: "20px",
					width: "100%",
					maxWidth: "1000px",
					height: "90%", // Leave space for margins
				}}
			>
				{/* Days Grid */}
				<div
					className="grid relative"
					style={{
						display: "grid",
						gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
						gap: `${yGap}px ${xGap}px`,
					}}
					onMouseMove={handleMouseMove}
				>
					{daysArray.map((day, index) => (
						<div
							key={day.day}
							className={`w-2 h-2 rounded-full ${
day.disabled
? "bg-gray-600"
: day.passed
? "bg-gray-300"
: "bg-gray-700"
}`}
							onMouseEnter={(event) => handleMouseEnter(event, index)}
							onMouseLeave={handleMouseLeave}
							style={{ cursor: "pointer" }}
						/>
					))}
				</div>

				{/* Footer Section */}
				<div
					className="grid grid-cols-2 w-full text-lg"
					style={{
						alignItems: "center",
						padding: "10px 20px",
					}}
				>
					<div className="text-left">{currentYear}</div>
					<div className="text-right">
						{daysArray.filter((day) => !day.passed && !day.disabled).length}
					</div>
				</div>
			</div>
		</div>
	);




};

